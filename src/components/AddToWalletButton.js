import METAMASK_ICON from '@assets/icons/metamask.svg'

import { addTokenToWallet } from '@utils/wallet'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import Button from '@tw/Button'
import { getSwapBorderHoverStyleForCoin } from '@styles/coins'


export default function AddToWalletButton({ token, icon, className }){
  const { chainId } = useActiveWeb3React()

  return (
    <Button
      onClick={() => addTokenToWallet({ token, icon, chainId })}
      outline={true}
      className={`px-2 !py-0 group border border-gray-50 hover:border-gray-200 active:border-gray-300 !rounded-full focus:ring-0 active:ring-0 outline-none transform-gpu transition duration-500 ease-in-out ${className}`}
    >
      <small
        className={`
        hidden group-hover:inline-block transition duration-500 ease-in-out mr-1
        `}
      >
        Add to Wallet
      </small>
      <img
        alt="metamask icon"
        src={METAMASK_ICON}
        className="h-6 w-6 inline"
      />
    </Button>
  )
}



export function AddToWalletMiniButton({ token, icon, className }) {
  const { chainId } = useActiveWeb3React()

  return (
    <Button
      onClick={() => addTokenToWallet({ token, icon, chainId })}
      outline={true}
      className={`
        px-2 !pt-0 !pb-0.5 group
        dark:!border-transparent hover:border ${getSwapBorderHoverStyleForCoin(token)}
        !rounded-full focus:ring-0 active:ring-0 outline-none
        transform-gpu transition duration-500 ease-in-out ${className}
      `}
    >
      <small
        className={`
        hidden group-hover:inline-block transition duration-200 ease-in-out mr-1 -mt-0.5
        `}
      >
        Add to Wallet
      </small>
      <img
        alt="metamask icon"
        src={METAMASK_ICON}
        className="h-5 w-5 inline opacity-50 group-hover:opacity-95 transition-all duration-200 ease-in-out"
      />
    </Button>
  )
}


