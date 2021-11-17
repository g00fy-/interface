
import { RetryableError, retry } from '@utils/retry'

import { useEffect, useMemo, useRef } from 'react'

import { Contract } from 'ethers'
import { chunkArray } from '@utils/chunkArray'
import {
  errorFetchingMulticallResults,
  fetchingMulticallResults,
  updateMulticallResults
} from '@utils/multicall/actions'
import { parseCallKey } from '@utils/multicall/utils'

import { useBlockNumber } from '@hooks/useBlockNumber'

import { useGenericMulticall2Contract } from '@hooks/contracts/useMulticallContract' //useMulticall2Contract
import { useMulticallState } from '@hooks/multicall/useMulticallState'
import { ChainId } from '@constants/networks'


// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500

/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param {Contract} multicall multicall contract to fetch against
 * @param {Call[]} chunk chunk of calls to make
 * @param {number} minBlockNumber minimum block number of the result set
 */
async function fetchChunk(multicallContract, chunk, minBlockNumber) {
  let resultsBlockNumber
  let results
  try {
    /** @TODO: THIS IS THE PART THAT DEVIATES BETWEEN MULTICALL V1 & V2 */
    const { blockNumber, returnData } = await multicallContract.callStatic.tryBlockAndAggregate(
      false,
      chunk.map(obj => ({
        target:   obj.address,
        callData: obj.callData,
        gasLimit: obj.gasRequired ?? 1000000
      })),
      // { blockTag: minBlockNumber }
    )

    resultsBlockNumber = blockNumber.toNumber()
    results = returnData
  } catch (error) {
    console.debug('Failed to fetch chunk', error)
    throw error
  }
  if (resultsBlockNumber < minBlockNumber) {
    const retryMessage = `Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`
    console.debug(retryMessage)
    throw new RetryableError(retryMessage)
  }
  return { results, blockNumber: resultsBlockNumber }
}

/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param {number?} chainId the current chain id
 */
function activeListeningKeys(allListeners, chainId) {
  if (!allListeners || !chainId) return {}
  const listeners = allListeners[chainId]
  if (!listeners) return {}

  return Object.keys(listeners).reduce((memo, callKey) => {
    const keyListeners = listeners[callKey]

    memo[callKey] = Object.keys(keyListeners)
      .filter((key) => {
        const blocksPerFetch = parseInt(key)
        if (blocksPerFetch <= 0) return false
        return keyListeners[blocksPerFetch] > 0
      })
      .reduce(
        (previousMin, current) => {
          return Math.min(previousMin, parseInt(current))
        },
        Infinity
      )
    return memo
  }, {})
}

/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param {{ [callKey: string]: number }}listeningKeys each call key mapped to how old the data can be in blocks
 * @param {number} chainId the current chain id
 * @param {number} latestBlockNumber the latest block number
 */
function outdatedListeningKeys(
  callResults,
  listeningKeys,
  chainId,
  latestBlockNumber
) {
  if (!chainId || !latestBlockNumber) return []
  const results = callResults[chainId]
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys)

  return Object.keys(listeningKeys).filter((callKey) => {
    const blocksPerFetch = listeningKeys[callKey]

    const data = callResults[chainId][callKey]
    // no data, must fetch
    if (!data) return true

    const minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1)

    // already fetching it for a recent enough block, don't refetch it
    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false

    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber
  })
}

/**
 * should really be creating a seperate multicall updater for each chain?
 */
export function MulticallUpdater({ chainId }) {
  const [multicallState, setMulticallState] = useMulticallState()
  // wait for listeners to settle before triggering updates
  // const debouncedListeners = useDebounce(multicallState.callListeners, 100) // 200

  const [latestBlockNumber, setBlockNumber] = useBlockNumber(chainId)

  const multicall2Contract = useGenericMulticall2Contract(chainId)

  const cancellations = useRef()
  // NOTE:THE BELOW IS THE ORIGINAL MULTICALL activeListeningKeys CHECKER
  // REVERT TO THIS IF UPDATES NOT HAPPENING PROPERLY
  // const listeningKeys = activeListeningKeys(debouncedListeners, chainId)

  // TODO: MAKE SURE THIS DIDNT FUCK ANYTHING UP
  const listeningKeys = useMemo(
    () => activeListeningKeys(multicallState.callListeners, chainId),
    [multicallState, chainId, latestBlockNumber]
  )



  const unserializedOutdatedCallKeys = useMemo(
    () => outdatedListeningKeys(multicallState.callResults, listeningKeys, chainId, latestBlockNumber),
    [chainId, multicallState.callResults, listeningKeys, latestBlockNumber]
  )

  const serializedOutdatedCallKeys = useMemo(
    () => JSON.stringify(unserializedOutdatedCallKeys.sort()),
    [unserializedOutdatedCallKeys, chainId]
  )

  useEffect(
    () => {
      multicall2Contract?.getBlockNumber()
        .then( blockNumber => {
          setBlockNumber(blockNumber)
        })
        .catch( error => console.error(error) )
    },
    [
      multicall2Contract,
      chainId
    ]
  )


  useEffect(
    () => {
      if (!latestBlockNumber || !chainId || !multicall2Contract) return

      const outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys)

      if (outdatedCallKeys.length === 0) return

      const calls = outdatedCallKeys.map((key) => parseCallKey(key))

      const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE)

      if (cancellations.current && cancellations.current.blockNumber !== latestBlockNumber) {
        cancellations.current.cancellations.forEach((c) => c())
      }
      // console.log("%c@@@SETTING@@@", "color: red")
      setMulticallState(
        fetchingMulticallResults( multicallState, {
          calls,
          chainId,
          fetchingBlockNumber: latestBlockNumber,
        })
      )
      // console.log("%c@@@DONE SETTING@@@", "color: red")

      cancellations.current = {
        blockNumber: latestBlockNumber,
        cancellations: chunkedCalls.map((chunk, index) => {
          const { cancel, promise } = retry(
            () => fetchChunk(multicall2Contract, chunk, latestBlockNumber),
            {
              n: Infinity,
              minWait: 1000,
              maxWait: 2500,
            }
          )

          promise
            .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
              // accumulates the length of all previous indices
              const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce((memo, curr) => memo + curr.length, 0)
              const lastCallKeyIndex = firstCallKeyIndex + returnData.length

              const slice = outdatedCallKeys.slice(firstCallKeyIndex, lastCallKeyIndex)

              // split the returned slice into errors and success
              const { erroredCalls, results } = slice.reduce(
                (memo, callKey, i) => {
                  if (returnData[i].success) {
                    memo.results[callKey] = returnData[i].returnData ?? null
                  } else {
                    memo.erroredCalls.push(parseCallKey(callKey))
                  }
                  return memo
                },
                {
                  erroredCalls: [],
                  results:      {}
                }
              )

              // dispatch any new results
              if (Object.keys(results).length > 0) {
                setMulticallState(
                  updateMulticallResults(multicallState, {
                    chainId,
                    results,
                    blockNumber: fetchBlockNumber,
                  })
                )
              }

              // dispatch any errored calls
              if (erroredCalls.length > 0) {
                console.debug('Calls errored in fetch', erroredCalls)
                setMulticallState(
                  errorFetchingMulticallResults(multicallState, {
                    calls: erroredCalls,
                    chainId,
                    fetchingBlockNumber: fetchBlockNumber,
                  })
                )
              }

              if (fetchBlockNumber > latestBlockNumber) {
                setBlockNumber(fetchBlockNumber)
              }
            })
            .catch((error) => {
              if (error.isCancelledError) {
                console.debug(`
                  Cancelled fetch for
                  blockNumber:${latestBlockNumber}
                  chunk:${chunk}
                  chain: ${chainId}
                `)
                return
              }
              console.debug('Failed to fetch multicall chunk', chunk, chainId, error)
              setMulticallState(
                errorFetchingMulticallResults(multicallState, {
                  calls: chunk,
                  chainId,
                  fetchingBlockNumber: latestBlockNumber,
                })
              )
            })
          return cancel
      }),
      }
    },
    [chainId, multicall2Contract, serializedOutdatedCallKeys, latestBlockNumber] // setMulticallState
  )

  return null
}