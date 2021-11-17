import Button from "@tw/Button"

import {
  getNetworkButtonBgClassName,
  getNetworkTextColorContrast,
  getNetworkHoverShadow,
  getNetworkButtonBorderHover
} from '@styles/networks'
import { useActiveWeb3React } from "@hooks/useActiveWeb3React"




export default function SelectChainButton({ onClick, children, className }) {
  const { chainId } = useActiveWeb3React()
  return (
    <Button
      onClick={onClick}
      outline={true}
      className={`
        w-full cursor-pointer
        py-[0.3125rem] pl-2.5 pr-2
        transform transition-all duration-100
        bg-transparent
        hover:bg-coolGray-50 dark:hover:bg-coolGray-800
         rounded-lg focus:!bg-transparent active:!bg-transparent
        border
        text-white focus:outline-none
        text-sm
        ${className}
        ${getNetworkButtonBorderHover(chainId)}
        ${getNetworkHoverShadow(chainId)}
      `}
    >
      {children}
    </Button>
  )
}