import { useState, useEffect, useCallback, useContext } from 'react'
// import { Transaction } from '@utils/classes/Transaction'
import { NETWORK_CONNECTOR_MAP } from '@connectors'
import { useWeb3React } from '@web3-react/core'
import { ChainId } from '@constants/networks'
import { TransactionHistoryContext } from '@store/TransactionHistoryStore'
import _ from 'lodash'
import createPersistedState from 'use-persisted-state'
import { useActiveWeb3React } from './useActiveWeb3React'


const usePersistedTransactionHistory = createPersistedState("historical_transactions")


export function useTxHistory() {
  // const { account } = useActiveWeb3React()
  // const [transactionsByAccount, setTransactionsByAccount] = usePersistedTransactionHistory({})

  // const transactions = transactionsByAccount[account] ?? []

  // function setTransactions(txns) {
  //   setTransactionsByAccount({
  //     ...transactionsByAccount,
  //     [account]: txns
  //   })
  // }
  const [transactions, setTransactions] = useState([])

  function addTransaction({ transactionHash, hash, chainId, ...transaction }) {
    let formattedTx
    formattedTx = {
      transactionHash: transactionHash ?? hash,
      chainId,
      ...transaction
    }

    const filteredTransactions = transactions.filter(tx => tx.transactionHash !== formattedTx.transactionHash)
    const arr = [...filteredTransactions, formattedTx]

    setTransactions(arr)

  }

  function updateTransactions(txns) {
    const newTxnHashes = txns.map(tx => tx.transactionHash ?? tx.hash)
    // const avaxTxns = txns.filter(tx => tx.chainId == ChainId.AVALANCHE)
    // console.log(avaxTxns)

    // the ( outside the .includes is very important bc js is retarded)
    const filteredPrevTxns = transactions.filter(
      tx => {
        const txOverlap = newTxnHashes.includes(tx.transactionHash ?? tx.hash)
        return !txOverlap
      }
    )

    const txnsToAdd = _.sortBy([
      ...filteredPrevTxns,
      ...txns.map(tx => {
        return { ...tx, transactionHash: tx.transactionHash ?? tx.hash }
      })
    ],
      (tx) => -tx.timestamp
    )

    setTransactions(txnsToAdd)
  }

  function clear() {
    setTransactions([])
  }


  return {
    transactions,
    setTransactions,
    addTransaction,
    updateTransactions,
    clear
  }
}
