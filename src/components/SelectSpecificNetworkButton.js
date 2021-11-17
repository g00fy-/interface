import { CHAIN_INFO_MAP } from '@constants/networks'

import {
  getNetworkButtonBgClassName,
  getNetworkButtonBgClassNameActive,
  getNetworkButtonBorderHover
} from '@styles/networks'

import Button from '@tw/Button'

export function SelectSpecificNetworkButton({ itemChainId, isCurrentChain, onClick }) {
  const { chainImg, chainName } = CHAIN_INFO_MAP[itemChainId]

  let activeClassName
  let activeTextClassName
  if (isCurrentChain) {
    activeClassName = getNetworkButtonBgClassName(itemChainId)
    activeTextClassName = ''
  } else {
    //bg-dark-800 hover:bg-dark-700
    activeClassName = getNetworkButtonBgClassNameActive(itemChainId)
    activeTextClassName = `
      dark:text-coolGray-400
      dark:group-hover:text-coolGray-300
    `
  }

  return (
    <Button
      outline={!isCurrentChain}
      className={`
        flex items-center w-full rounded-md
        !p-4
        cursor-pointer
        ${getNetworkButtonBorderHover(itemChainId)}
        ${activeClassName}
        focus:outline-none
      `}
      onClick={onClick}
    >
      <img src={chainImg} alt="Switch Network" className="rounded-md mr-2 w-6 h-6" />
      <div
        className={`
          text-primary font-medium ${activeTextClassName}
        `}
      >
        {chainName}
      </div>
    </Button>
  )
}