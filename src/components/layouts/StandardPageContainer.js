import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { CHAIN_INFO_MAP } from '@constants/networks'
import { getNetworkTextColor } from '@utils/styles/networks'


export default function StandardPageContainer({ title, subtitle, children }) {

  async function accountChangeEvent(accounts) {
    const accountId = accounts[0]

    toast(
      <div>
        <div>
          Switched account to
        </div>
        <div className="break-all">
          {accountId}
        </div>
      </div>
    )
  }

  async function chainChangeEvent(hexChainId) {
    const chainId = parseInt(hexChainId, 16)
    const chainObj = CHAIN_INFO_MAP[chainId]
    const chainName = chainObj.chainShortName ?? chainObj.chainName

    toast(
      <>
        Switched to the {" "}<b className={`${getNetworkTextColor(chainId)} px-2`}>{chainName}</b>{" "} chain
      </>
    )
  }



  function walletActionCheckEffect() {
    window.ethereum?.removeAllListeners(["networkChanged"])
    window.ethereum?.on('chainChanged', chainChangeEvent)
    window.ethereum?.on('accountsChanged', accountChangeEvent)
    // THE BELOW RETURN WAS RECENTLY ADDED
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('chainChanged', chainChangeEvent)
        window.ethereum.removeListener('accountsChanged', accountChangeEvent)
      }
    }
  }

  useEffect(walletActionCheckEffect, [])

  return (
    <main className="flex-1 relative z-0 overflow-y-auto h-full focus:outline-none">
      <div className="2xl:w-3/4 items-center mt-4 sm:mt-6 mx-auto px-4 sm:px-8 md:px-12 py-8 md:pb-14">
        <span
          className={`
            text-3xl font-medium text-default
            bg-clip-text text-transparent bg-gradient-to-r
            from-purple-600 to-blue-600
          `}
        >
          {title}
        </span>
        <div className="text-sm font-medium text-gray-500 dark:text-coolGray-600 mt-1">
          {subtitle ?? ""}
        </div>
        {children}
      </div>
    </main>
  );
}
