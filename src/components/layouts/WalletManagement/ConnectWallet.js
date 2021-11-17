import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

import metamaskIcon from '@assets/icons/metamask.svg'
import binanceIcon from '@assets/icons/binance.svg'
import walletconnectIcon from '@assets/icons/walletconnect.svg'

import { injected, bsc, walletconnect } from '@connectors'
import { setupNetwork } from '@utils/wallet'
import { getWalletStyle } from '@styles/wallets'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import ModalHeadline from '@tw/ModalHeadline'



const WALLETS = [
  {
    id:        'metamask',
    name:      'MetaMask',
    connector: injected,
    icon:      metamaskIcon,
  },
  {
    id:        'walletconnect',
    name:      'Wallet Connect',
    connector: walletconnect,
    icon:      walletconnectIcon,
  },
  {
    id:        'binancewallet',
    name:      'Binance Smart Chain Wallet',
    connector: bsc,
    icon:      binanceIcon,
  },
]

export default function ConnectWallet({ onClose }) {
  const { account, chainId } = useActiveWeb3React()
  const { activate } = useWeb3React()
  let accountSubtitle

  if (account) {
    accountSubtitle =
      <div className='space-x-2'>
        <div className='inline-block text-sm text-gray-500 dark:text-coolGray-500 overflow-none'>
          Current Account
        </div>
        <div
          className={`
                    inline-block text-sm px-2 rounded-full
                    border border-gray-100 hover:border-gray-200
                    text-gray-500  hover:text-gray-600
                    overflow-none tracking-wider
                    dark:border-coolGray-500 dark:hover:border-coolGray-400
                    dark:text-coolGray-400  dark:hover:text-coolGray-200
                    `
          }
        >
          {account.substring(0, 6)}...
          {account.substring(account.length - 4, account.length)}
        </div>
      </div>
  }
  return (
    <>
      <div
        className='inline-block align-bottom  rounded-lg pt-2 px-6 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-96 '
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <ModalHeadline
          title="Connect Wallet"
          subtitle={accountSubtitle}
          onClose={onClose}
        />
        <div>
          <div className='flex flex-col pt-4'>
            {WALLETS.map((wallet, index) => (
              <button
                className={`
                  inline-flex py-4 px-6 my-4
                  rounded-md mt-2 shadow-sm
                  border border-solid border-gray-300 hover:border-gray-600
                  dark:border-coolGray-600 dark:hover:border-coolGray-400
                  group transition-all duration-75
                  ${getWalletStyle(wallet.id)}
                `}
                key={index}
                onClick={() => {
                  activate(wallet.connector, async (error) => {
                    if (error instanceof UnsupportedChainIdError) {
                      const hasSetup = await setupNetwork(chainId)
                      if (hasSetup) {
                        activate(wallet.connector)
                      }
                      //
                    } else {
                      console.log(error)
                      // TODO: handle error
                    }
                  })
                  onClose()
                }}
              >
                <span
                  className={`
                    text-lg mt-0.5
                    transition-all duration-75
                    dark:text-coolGray-500 dark:group-hover:text-coolGray-300
                  `}
                >
                  {wallet.name}
                </span>
                <img
                  src={wallet.icon}
                  alt='icon'
                  className='ml-auto w-8 '
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


