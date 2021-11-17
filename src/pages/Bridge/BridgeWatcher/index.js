import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { id } from '@ethersproject/hash'
import { BigNumber } from '@ethersproject/bignumber'

import { toHexStr } from '@utils/toHexStr'


import { NETH, NUSD, WETH } from '@constants/tokens/basic'

import { INCLUDED_BRIDGE_EVENTS } from '@constants/events'
import { ChainId } from '@constants/networks'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import { useTxHistory } from '@hooks/useTxHistory'
import { useGenericSynapseContract } from '@hooks/contracts/useSynapseContract'
import { usePoller } from '@hooks/usePoller'

import Grid from '@tw/Grid'
import Card from '@tw/Card'

import { useDestinationInfo } from '@hooks/store/useDestinationInfo'

import { pairTxKappa } from './pairTxKappa'

import PairedTransactionItem from './PairedTransactionItem'


export default function BridgeWatcher() {
  const { account, chainId } = useActiveWeb3React()

  const { library: ethLibrary }       = useWeb3React(`${ChainId.ETH}`)
  const { library: bscLibrary }       = useWeb3React(`${ChainId.BSC}`)
  const { library: polygonLibrary }   = useWeb3React(`${ChainId.POLYGON}`)
  const { library: fantomLibrary }    = useWeb3React(`${ChainId.FANTOM}`)
  const { library: bobaLibrary }      = useWeb3React(`${ChainId.BOBA}`)
  const { library: moonriverLibrary } = useWeb3React(`${ChainId.MOONRIVER}`)
  const { library: arbitrumLibrary }  = useWeb3React(`${ChainId.ARBITRUM}`)
  const { library: avalancheLibrary } = useWeb3React(`${ChainId.AVALANCHE}`)
  const { library: harmonyLibrary }   = useWeb3React(`${ChainId.HARMONY}`)

  const { transactions, updateTransactions, clear } = useTxHistory()



  const ethSynapseContract       = useGenericSynapseContract(ChainId.ETH)
  const bscSynapseContract       = useGenericSynapseContract(ChainId.BSC)
  const polygonSynapseContract   = useGenericSynapseContract(ChainId.POLYGON)
  const fantomSynapseContract    = useGenericSynapseContract(ChainId.FANTOM)
  const bobaSynapseContract      = useGenericSynapseContract(ChainId.BOBA)
  const moonriverSynapseContract = useGenericSynapseContract(ChainId.MOONRIVER)
  const arbitrumSynapseContract  = useGenericSynapseContract(ChainId.ARBITRUM)
  const avalancheSynapseContract = useGenericSynapseContract(ChainId.AVALANCHE)
  const harmonySynapseContract   = useGenericSynapseContract(ChainId.HARMONY)

  const [addressesForAccount, setAddressesForAccount] = useDestinationInfo()

  const getAllTransactions = useCallback( _.throttle(async () => {
    const sharedArgs = {
      account,
      transactions,
      addressesForAccount,
    }

    const ethZapEventsRequest = getBridgeZapsOnChain({
      library:         ethLibrary,
      synapseContract: ethSynapseContract,
      chainId:         ChainId.ETH,
      ...sharedArgs
    })

    const bscZapEventsRequest = getBridgeZapsOnChain({
      library:         bscLibrary,
      synapseContract: bscSynapseContract,
      chainId:         ChainId.BSC,
      ...sharedArgs
    })

    const polygonZapEventsRequest = getBridgeZapsOnChain({
      library:         polygonLibrary,
      synapseContract: polygonSynapseContract,
      chainId:         ChainId.POLYGON,
      ...sharedArgs
    })

    const fantomZapEventsRequest = getBridgeZapsOnChain({
      library:         fantomLibrary,
      synapseContract: fantomSynapseContract,
      chainId:         ChainId.FANTOM,
      ...sharedArgs
    })

    const bobaZapEventsRequest = getBridgeZapsOnChain({
      library:         bobaLibrary,
      synapseContract: bobaSynapseContract,
      chainId:         ChainId.BOBA,
      ...sharedArgs
    })

    const moonriverZapEventsRequest = getBridgeZapsOnChain({
      library:         moonriverLibrary,
      synapseContract: moonriverSynapseContract,
      chainId:         ChainId.MOONRIVER,
      ...sharedArgs
    })

    const arbitrumZapEventsRequest = getBridgeZapsOnChain({
      library:         arbitrumLibrary,
      synapseContract: arbitrumSynapseContract,
      chainId:         ChainId.ARBITRUM,
      ...sharedArgs
    })

    const avalancheZapEventsRequest = getBridgeZapsOnChain({
      library:         avalancheLibrary,
      synapseContract: avalancheSynapseContract,
      chainId:         ChainId.AVALANCHE,
      ...sharedArgs
    })

    const harmonyZapEventsRequest = getBridgeZapsOnChain({
      library:         harmonyLibrary,
      synapseContract: harmonySynapseContract,
      chainId:         ChainId.HARMONY,
      ...sharedArgs
    })

    const [
      ethZapEvents,
      bscZapEvents,
      polygonZapEvents,
      fantomZapEvents,
      bobaZapEvents,
      moonriverZapEvents,
      arbitrumZapEvents,
      avalancheZapEvents,
      harmonyZapEvents
    ] = (
      await Promise.allSettled([
        ethZapEventsRequest,
        bscZapEventsRequest,
        polygonZapEventsRequest,
        fantomZapEventsRequest,
        bobaZapEventsRequest,
        moonriverZapEventsRequest,
        arbitrumZapEventsRequest,
        avalancheZapEventsRequest,
        harmonyZapEventsRequest
      ])
    ).map(i => i.value ?? [])
    //.map(req => promiseTimeout(req, 2000))


    const arr = [
      ...ethZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.ETH }
      }),
      ...bscZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.BSC }
      }),
      ...polygonZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.POLYGON }
      }),
      ...fantomZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.FANTOM }
      }),
      ...bobaZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.BOBA }
      }),
      ...moonriverZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.MOONRIVER }
      }),
      ...arbitrumZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.ARBITRUM }
      }),
      ...avalancheZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.AVALANCHE }
      }),
      ...harmonyZapEvents?.map(tx => {
        return { ...tx, chainId: ChainId.HARMONY }
      }),
    ]
    // console.log({arr})
    return arr
  }, 10000, {leading: true}))


  const getAndUpdateTransactions = useCallback(
    () => {
      if (account) {
        getAllTransactions()
          .then(txns =>
            updateTransactions(txns)
          )
      }
    },
    [account]
  )

  useEffect(
    getAndUpdateTransactions,
    [
      chainId,
      account
    ]
  )


  usePoller(
    getAndUpdateTransactions,
    10000
  )



  return (
    <div className="space-y-2">
      {(transactions?.length > 0) &&
        <Card
          title="Bridge Watcher"
          divider={false}
        >
          <SynapseEvents transactions={transactions} />
        </Card>
      }
    </div>
  )
}



function SynapseEvents({ transactions }) {
  const pairedTransactions = pairTxKappa(transactions)


  return (
    <Grid cols={{ xs: 1 }} gap={2}>
      {pairedTransactions.map(([inputTx, outputTx]) => {
        return (
          <PairedTransactionItem
            key={`${inputTx?.transactionHash}-${outputTx?.transactionHash}`}
            inputTx={inputTx}
            outputTx={outputTx}
          />
        )
      })}
    </Grid>
  )
}



async function getBridgeZapsOnChain({ library, synapseContract, account, chainId, transactions, addressesForAccount }) {
  const currentBlock = await library.getBlock()

  const synapseContractEventHandles = Object.keys(synapseContract.filters)
    .filter(key => INCLUDED_BRIDGE_EVENTS.includes(key))


  // const retard = await Promise.all(transactions.map(tx => getTxWithLogEvents({tx, synapseContract})))

  const pastEventsByHandle = await Promise.all(
    synapseContractEventHandles.map(eventHandle => {
      return synapseContract.queryFilter(
        synapseContract.filters[eventHandle]([account, ...addressesForAccount]),
        toHexStr(currentBlock.number - 4000),
      )
    }
    ))



  const pastEvents = _.flatten(pastEventsByHandle)

  const [
    inputTimestamps,
    transactionReceipts
  ] = await Promise.all([
    Promise.all(
      pastEvents.map(eventObj => library.getBlock(eventObj.blockNumber))
    ),
    Promise.all(
      pastEvents.map(eventObj => eventObj.getTransactionReceipt())
    )
  ])


  const transactionsWithTimestamps = _.zip(
    pastEvents,
    inputTimestamps,
    transactionReceipts
  ).map(([eventObj, timestampObj, txReceipt]) => {
    return mergeTxObj(chainId, eventObj, timestampObj, txReceipt)
  })

  // console.log({ transactionsWithTimestamps })
  return transactionsWithTimestamps
}



function mergeTxObj(chainId, eventObj, timestampObj, txReceipt) {
  // console.log({eventObj})
  const swapTokenAddr = eventObj.args.token
  const { timestamp } = timestampObj ?? {}
  let outputTokenAddr
  if (_.toLower(swapTokenAddr) == _.toLower(NETH.addresses[chainId])) {
    outputTokenAddr = txReceipt.logs[txReceipt.logs.length - 2].address

  } else if (_.toLower(swapTokenAddr) == _.toLower(WETH.addresses[chainId])) {
    if (chainId == ChainId.ETH) {
      outputTokenAddr = txReceipt.logs[txReceipt.logs.length - 2].address
    } else {
      outputTokenAddr = txReceipt.logs[txReceipt.logs.length - 1].address
    }
  } else {
    if (txReceipt?.logs.length > 3) {
      outputTokenAddr = txReceipt.logs[txReceipt.logs.length - 2].address
    }
    if (!outputTokenAddr) {
      outputTokenAddr = NUSD.addresses[chainId]
    }
  }

  const inputTokenAmount = BigNumber.from(txReceipt.logs[0].data)

  return {
    // ...txReceipt, // ...tx,
    ...eventObj,
    timestamp,
    chainId,
    kekTxSig: id(eventObj.transactionHash),
    event: eventObj.event,
    args: eventObj.args,
    kappa: eventObj.args.kappa,
    inputTokenAmount: inputTokenAmount,
    inputTokenAddr: _.toLower(txReceipt.logs[0].address),
    outputTokenAddr: _.toLower(outputTokenAddr),
    txReceipt
  }
}


// function getTxWithLogEvents({ tx, synapseContract }) { //  library, synapseContract, account, chainId
//   console.log({tx})
//   const synapseContractEventTopics = Object.keys(synapseContract.filters)
//     .filter(key => INCLUDED_BRIDGE_EVENTS.includes(key))
//     .map(i => id(i))

//   console.log({ synapseContractEventTopics })
//   let matchedEvent
//   let matchedEventIndex
//   for (const event of tx.events) {
//     console.log({event})
//     const eventIndex = synapseContractEventTopics.indexOf(event.topics[0])
//     console.log({eventIndex})
//     if (eventIndex > -1) {
//       matchedEvent = event
//       matchedEventIndex = eventIndex
//       console.log({ matchedEvent, matchedEventIndex })
//     }

//   }



//   // const [timestampObj,] = await Promise.all([
//   //   library.getBlock(tx.blockNumber),
//   // ])



//   // const [
//   //   inputTimestamps,
//   //   transactionReceipts
//   // ] = await Promise.all([
//   //   Promise.all(
//   //     pastEvents.map(eventObj => library.getBlock(eventObj.blockNumber))
//   //   ),
//   //   Promise.all(
//   //     pastEvents.map(eventObj => eventObj.getTransactionReceipt())
//   //   )
//   // ])

//   // const transactionsWithTimestamps = _.zip(
//   //   pastEvents,
//   //   inputTimestamps,
//   //   transactionReceipts
//   // ).map(([eventObj, timestampObj, txReceipt]) => {
//   //   return mergeTxObj(chainId, eventObj, timestampObj, txReceipt)
//   // })
// }

