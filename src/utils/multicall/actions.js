import { toCallKey } from "@utils/multicall/utils"


/**
 * @param {number} chainId
 * @param {Call[]} calls
 * @param {ListenerOptions} options
 */
export function addMulticallListeners(state, { chainId, calls, options }) {
  // console.log("%caddMulticallListeners", "color: #00BEF6")
  const { blocksPerFetch } = options
  const listeners = state.callListeners
    ? state.callListeners
    : (state.callListeners = {})
  listeners[chainId] = listeners[chainId] ?? {}
  calls.forEach((call) => {
    const callKey = toCallKey(call)
    listeners[chainId][callKey] = listeners[chainId][callKey] ?? {}
    listeners[chainId][callKey][blocksPerFetch] = (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1
  })

  return {
    ...state,
    callListeners: listeners
  }
}

/**
 * @param {number} chainId
 * @param {Call[]} calls
 * @param {ListenerOptions} options
 */
export function removeMulticallListeners(state, { chainId, calls, options }) {
  // console.log("%cremoveMulticallListeners", "color: #00BEF6")
  const { blocksPerFetch } = options
  const listeners = state.callListeners
    ? state.callListeners
    : (state.callListeners = {})

  if (!listeners[chainId]) return
  calls.forEach((call) => {
    const callKey = toCallKey(call)
    if (!listeners[chainId][callKey]) return
    if (!listeners[chainId][callKey][blocksPerFetch]) return

    if (listeners[chainId][callKey][blocksPerFetch] === 1) {
      delete listeners[chainId][callKey][blocksPerFetch]
    } else {
      listeners[chainId][callKey][blocksPerFetch] -= 1
    }
  })

  return  {
    ...state,
    callListeners: listeners
  }
}

/**
 * @param {number} chainId
 * @param {Call[]} calls
 * @param {number} fetchingBlockNumber
 */
export function fetchingMulticallResults(state, { chainId, calls, fetchingBlockNumber }) {
  // console.log(`%cfetchingMulticallResults ${chainId}`, "color: #00BEF6")
  state.callResults[chainId] = state.callResults[chainId] ?? {}
  calls.forEach((call) => {
    const callKey = toCallKey(call)
    const current = state.callResults[chainId][callKey]
    if (!current) {
      state.callResults[chainId][callKey] = {
        fetchingBlockNumber,
      }
    } else {
      if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return
      state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber
    }
  })

  return {
    ...state,
    callResults: state.callResults
  }
}

/**
 * @param {number} chainId
 * @param {Call[]} calls
 * @param {number} fetchingBlockNumber
 */
export function errorFetchingMulticallResults(state, {chainId, calls, fetchingBlockNumber}) {
  // console.log("%cerrorFetchingMulticallResults", "color: #00BEF6")
  state.callResults[chainId] = state.callResults[chainId] ?? {}
  calls.forEach((call) => {
    const callKey = toCallKey(call)
    const current = state.callResults[chainId][callKey]
    if (!current) return // only should be dispatched if we are already fetching
    if (current.fetchingBlockNumber === fetchingBlockNumber) {
      delete current.fetchingBlockNumber
      current.data = null
      current.blockNumber = fetchingBlockNumber
    }
  })

  return {
    ...state,
    callResults: state.callResults
  }
}

/**
 * @param {number} chainId
 * @param {number} blockNumber
 * @param {[callKey: string]: string | null} results
 */
export function updateMulticallResults(state, {chainId, blockNumber, results }) {
  // console.log("%cupdateMulticallResults", "color: #00BEF6")
  state.callResults[chainId] = state.callResults[chainId] ?? {}
  Object.keys(results).forEach((callKey) => {
    const current = state.callResults[chainId][callKey]
    if ((current?.blockNumber ?? 0) > blockNumber) return
    state.callResults[chainId][callKey] = {
      data: results[callKey],
      blockNumber,
    }
  })

  return {
    ...state,
    callResults: state.callResults
  }
}

