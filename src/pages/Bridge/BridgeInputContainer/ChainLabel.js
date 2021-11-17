import { ChevronDownIcon } from '@heroicons/react/outline'
import { CHAIN_INFO_MAP } from '@constants/networks'

import {
  getNetworkTextColorContrast,
  getNetworkHoverShadow,
  getNetworkTextColor,
  getNetworkButtonBorder,
  getNetworkTextColorContrastHover,
  getNetworkButtonBgClassName,
  getNetworkBgClassNameLightDark,
  getNetworkBgClassName
} from '@styles/networks'



export default function ChainLabel({ isSwapFrom, chainId, setDisplayType, btnClassName, labelClassNameOverride, titleText }) {
  const { chainName, chainImg } = CHAIN_INFO_MAP[chainId]
  const networkTextColor = getNetworkTextColorContrast(chainId)
  let displayType
  let title
  let labelClassName

  if (isSwapFrom) {

    title            = titleText ?? "From"
    displayType      = "fromChain"
    labelClassName   = ""

  } else {
    title            = titleText ?? "To"
    displayType      = "toChain"
    labelClassName   = "text-coolGray-50"

  }



  return (
    <>
      <div className={`dark:text-coolGray-400 inline-block ${labelClassName} ${labelClassNameOverride} `}>
        {title}{"  "}
      </div>
      <div
        onClick={() => {
          setDisplayType(displayType)
        }}
        className={`
          inline-block group cursor-pointer
          border
          !border-opacity-50 hover:!border-opacity-100
          dark:hover:!border-opacity-100
          dark:text-coolGray-400
          ${isSwapFrom && "dark:hover:bg-coolGray-700"}
          bg-opacity-80 dark:bg-opacity-80
          ${getNetworkBgClassName(chainId)} dark:bg-transparent
          ${getNetworkButtonBorder(chainId)}
          ${getNetworkHoverShadow(chainId)}
          rounded-lg
          px-1.5 py-0.5
          ml-2 ${!isSwapFrom && "mt-2"} mb-1
          ${btnClassName}
        `}
      >
        <img
          src={chainImg}
          className={`
            inline-block w-6 h-6 rounded-md
            ml-1 mr-2 opacity-80 my-1
          `}
        />
        <div className="inline-block -mt-2">
          <div
            className={`
              ${networkTextColor}
              inline-block pt-2.5
              opacity-90 group-hover:opacity-100
            `}>
            {chainName}
          </div>
          <ChevronDownIcon
            className={`
              inline
              h-4 w-4
              ml-4 mr-1.5
              transform-gpu transition group-hover:rotate-180
              text-coolGray-300
              ${getNetworkTextColorContrastHover(chainId)}
            `}
          />
        </div>
      </div>
    </>
  )
}


