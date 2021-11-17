
import { UserIcon } from '@heroicons/react/outline'

import { getWalletStyle, getWalletHoverShadow } from '@styles/wallets'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'



import { UnsupportedChainIdError } from '@web3-react/core'

import { setupNetwork } from '@utils/wallet'

import Button from '@tw/Button'


import AccountLabel from './AccountLabel'




export default function WalletConnectButton({ children, className, setShowWalletModal,  ...props }) {
  const { library, error, account, chainId } = useActiveWeb3React()
  const walletId = library?.connection?.url

  const handleShow = () => setShowWalletModal(true)


  let btnContent
  let btnClassName
  let onClick
  if (account && !error) {
    btnContent =
      <AccountLabel account={account} />

    onClick = handleShow
  } else if (error) {
    btnContent = "Wrong Network"
    btnClassName = "bg-red-600 dark:!border-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-0"
    onClick = async () => {
      if (error instanceof UnsupportedChainIdError) {
        const hasSetup = await setupNetwork(chainId)
        if (hasSetup) {
          handleShow()
        }
      } else {
        console.log(error)
      }
    }
  } else {
    btnContent = "Connect Wallet"
    btnClassName = "shadow-indigo-sm flex-shrink rounded-md"
    onClick = handleShow
  }


  return (
    <Button
      onClick={onClick}
      className={`
        w-full cursor-pointer rounded-lg
        py-0.5 pl-2.5 pr-0.5 group
        focus:outline-none focus:ring-0
        hover:bg-coolGray-50 dark:hover:bg-coolGray-800
        ${getWalletStyle(walletId)}
        ${getWalletHoverShadow(walletId)}
        ${btnClassName}
        ${className}
        text-sm

      `}
      outline={true}
      {...props}
    >
      <div className="space-x-2">

          <div className='inline-block rounded-md text-coolGray-500 group-hover:text-coolGray-600 dark:text-coolGray-400 dark:group-hover:text-coolGray-300  bg-opacity-30 px-0.5 py-1 group-hover:bg-opacity-10 bg-gray-900 tracking-wide font-light'>
            {btnContent}
          </div>
          <div className='inline-block rounded-md pt-0.5 pr-2 '>
            <UserIcon
              className={`
                    -mt-1
                    inline-block w-4 h-4 text-white opacity-50 group-hover:opacity-100
                    `
              }
            />
          </div>
      </div>
    </Button>
  )
}