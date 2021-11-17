import { ChainId } from '@constants/networks'


const ETH_CURRENCY_TEXT_CLASSNAME = "text-[#5170ad] dark:text-[#78a5ff]"

export function getNetworkCurrencyColor(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC: return "text-[#ecae0b] dark:text-[#ecae0b]"
    case ChainId.ETH: return ETH_CURRENCY_TEXT_CLASSNAME
    case ChainId.POLYGON: return "text-purple-500 dark:text-purple-500"
    case ChainId.FANTOM: return "text-blue-500 dark:text-blue-500"
    case ChainId.BOBA: return "text-[#5170ad] dark:text-[#78a5ff]"
    case ChainId.ARBITRUM: return "text-[#5170ad] dark:text-[#78a5ff]"
    case ChainId.OPTIMISM: return "text-[#5170ad] dark:text-[#78a5ff]"
    case ChainId.AVALANCHE: return "text-red-500 dark:text-red-500"
    case ChainId.HARMONY: return "text-cyan-500 dark:text-cyan-500"
    default:
      return ""
  }
}



export function getNetworkButtonBgClassName(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "bg-gray-800 hover:bg-gray-900 active:bg-[#3c3c44]"
    case ChainId.ETH:       return "bg-[#5170ad] hover:bg-[#3f4f8c] active:bg-[#314367]"
    case ChainId.POLYGON:   return "bg-purple-500 hover:bg-purple-600 active:bg-purple-700"
    case ChainId.FANTOM:    return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
    case ChainId.BOBA:      return "bg-lime-500 hover:bg-lime-600 active:bg-lime-700"
    case ChainId.ARBITRUM:  return "bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-700"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "bg-red-500 hover:bg-red-600 active:bg-red-700"
    case ChainId.HARMONY:   return "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700"
    default:
      return ""
  }
}

export function getNetworkButtonBgClassNameActive(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "dark:active:!bg-[#3c3c44] "
    case ChainId.ETH:       return "dark:active:!bg-[#314367] "
    case ChainId.POLYGON:   return "dark:active:!bg-purple-700 "
    case ChainId.FANTOM:    return "dark:active:!bg-blue-700 "
    case ChainId.BOBA:      return "dark:active:!bg-lime-700 "
    case ChainId.ARBITRUM:  return "dark:active:!bg-coolGray-700 "
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "dark:active:!bg-red-700 "
    case ChainId.HARMONY:   return "dark:active:!bg-cyan-700 "
    default:
      return ""
  }
}

export function getNetworkButtonBorderHover(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "hover:!border-[#ecae0b]"
    case ChainId.ETH:       return "hover:!border-[#5170ad]"
    case ChainId.POLYGON:   return "hover:!border-purple-500"
    case ChainId.FANTOM:    return "hover:!border-blue-500"
    case ChainId.BOBA:      return "hover:!border-lime-500"
    case ChainId.ARBITRUM:  return "hover:!border-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "hover:!border-red-500"
    case ChainId.HARMONY:   return "hover:!border-cyan-500"
    default:
      return ""
  }
}

export function getNetworkButtonBorder(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "border-[#ecae0b] dark:border-[#ecae0b]"
    case ChainId.ETH:       return "border-[#5170ad] dark:border-[#5170ad]"
    case ChainId.POLYGON:   return "border-purple-500 dark:border-purple-500"
    case ChainId.FANTOM:    return "border-blue-500 dark:border-blue-500"
    case ChainId.BOBA:      return "border-lime-500 dark:border-lime-500"
    case ChainId.ARBITRUM:  return "border-coolGray-500 dark:border-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "border-red-500 dark:border-red-500"
    case ChainId.HARMONY:   return "border-cyan-500 dark:border-cyan-500"
    default:
      return ""
  }
}

export function getNetworkButtonBorderImportant(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "!border-[#ecae0b] dark:!border-[#ecae0b]"
    case ChainId.ETH:       return "!border-[#5170ad] dark:!border-[#5170ad]"
    case ChainId.POLYGON:   return "!border-purple-500 dark:!border-purple-500"
    case ChainId.FANTOM:    return "!border-blue-500 dark:!border-blue-500"
    case ChainId.BOBA:      return "!border-lime-500 dark:!border-lime-500"
    case ChainId.ARBITRUM:  return "!border-coolGray-500 dark:!border-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "!border-red-500 dark:!border-red-500"
    case ChainId.HARMONY:   return "!border-cyan-500 dark:!border-cyan-500"
    default:
      return ""
  }
}



export function getNetworkTextColor(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "text-[#ecae0b] dark:text-[#ecae0b]"
    case ChainId.ETH:       return "text-[#5170ad] dark:text-[#78a5ff]"
    case ChainId.POLYGON:   return "text-purple-500 dark:text-purple-500"
    case ChainId.FANTOM:    return "text-blue-500 dark:text-blue-500"
    case ChainId.BOBA:      return "text-lime-500 dark:text-lime-500"
    case ChainId.ARBITRUM:  return "text-coolGray-500 dark:text-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "text-red-500 dark:text-red-500"
    case ChainId.HARMONY:   return "text-cyan-500 dark:text-cyan-500"
    default:
      return ""
  }
}


export function getNetworkLinkTextColor(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "!text-gray-800 hover:!text-[#ecae0b] dark:!text-[#ecae0b] dark:hover:!text-[#ecae0b]"
    case ChainId.ETH:       return "!text-[#5170ad] hover:!text-[#78a5ff] dark:hover:!text-[#78a5ff]"
    case ChainId.POLYGON:   return "!text-purple-500 hover:!text-purple-600 dark:hover:!text-purple-500"
    case ChainId.FANTOM:    return "!text-blue-500 hover:!text-blue-600 dark:hover:!text-blue-500"
    case ChainId.BOBA:      return "!text-lime-500 hover:!text-lime-600 dark:hover:!text-lime-500"
    case ChainId.ARBITRUM:  return "!text-coolGray-500 hover:!text-coolGray-600 dark:hover:!text-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "!text-red-500 hover:!text-red-600 dark:hover:!text-red-500"
    case ChainId.HARMONY:   return "!text-cyan-500 hover:!text-red-600 dark:hover:!text-cyan-500"
    default:
      return ""
  }
}


export function getNetworkTextColorContrast(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "text-[#ecae0b]"
    case ChainId.ETH:       return "text-white"
    case ChainId.POLYGON:   return "text-white"
    case ChainId.FANTOM:    return "text-white"
    case ChainId.BOBA:      return "text-white"
    case ChainId.ARBITRUM:  return "text-white"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "text-white"
    case ChainId.HARMONY:   return "text-white"
    default:
      return ""
  }
}

export function getNetworkTextColorContrastHover(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "group-hover:text-[#ecae0b]"
    case ChainId.ETH:       return "group-hover:text-white"
    case ChainId.POLYGON:   return "group-hover:text-white"
    case ChainId.FANTOM:    return "group-hover:text-white"
    case ChainId.BOBA:      return "group-hover:text-white"
    case ChainId.ARBITRUM:  return "group-hover:text-white"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "group-hover:text-white"
    case ChainId.HARMONY:   return "group-hover:text-white"
    default:
      return ""
  }
}

export function getNetworkBgClassName(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "bg-gray-800"
    case ChainId.ETH:       return "bg-[#5170ad]"
    case ChainId.POLYGON:   return "bg-purple-500"
    case ChainId.FANTOM:    return "bg-blue-500"
    case ChainId.BOBA:      return "bg-lime-500"
    case ChainId.ARBITRUM:  return "bg-coolGray-500"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "bg-red-500"
    case ChainId.HARMONY:   return "bg-cyan-500"
    default:
      return ""
  }
}

export function getNetworkBgClassNameLightDark(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "bg-[#ecae0b] "
    case ChainId.ETH:       return "bg-[#5170ad] "
    case ChainId.POLYGON:   return "bg-purple-500 "
    case ChainId.FANTOM:    return "bg-blue-500 "
    case ChainId.BOBA:      return "bg-lime-500 "
    case ChainId.ARBITRUM:  return "bg-coolGray-500 "
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "bg-red-500 "
    case ChainId.HARMONY:   return "bg-cyan-500 "
    default:
      return ""
  }
}


export function getNetworkShadow(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "!shadow-yellow-xl hover:!shadow-yellow-2xl"
    case ChainId.ETH:       return "!shadow-blue-xl hover:!shadow-blue-2xl"
    case ChainId.POLYGON:   return "!shadow-purple-xl hover:!shadow-purple-2xl"
    case ChainId.FANTOM:    return "!shadow-blue-xl hover:!shadow-blue-2xl"
    case ChainId.BOBA:      return "!shadow-lime-xl hover:!shadow-lime-2xl"
    case ChainId.ARBITRUM:  return "!shadow-xl hover:!shadow-2xl"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "!shadow-red-xl hover:!shadow-red-2xl"
    case ChainId.HARMONY:   return "!shadow-cyan-xl hover:!shadow-cyan-2xl"
    default:
      return ""
  }
}

export function getNetworkHoverShadow(chainId) {
  switch (parseInt(chainId)) {
    case ChainId.BSC:       return "dark:!shadow-yellow-lg dark:hover:!shadow-yellow-2xl"
    case ChainId.ETH:       return "dark:!shadow-blue-lg dark:hover:!shadow-blue-2xl"
    case ChainId.POLYGON:   return "dark:!shadow-purple-lg dark:hover:!shadow-purple-2xl"
    case ChainId.FANTOM:    return "dark:!shadow-blue-lg dark:hover:!shadow-blue-2xl"
    case ChainId.BOBA:      return "dark:!shadow-lime-lg dark:hover:!shadow-lime-2xl"
    case ChainId.ARBITRUM:  return "dark:!shadow-lg dark:hover:!shadow-2xl"
    case ChainId.OPTIMISM:
    case ChainId.AVALANCHE: return "dark:!shadow-red-lg dark:hover:!shadow-red-2xl"
    case ChainId.HARMONY:   return "dark:!shadow-cyan-lg dark:hover:!shadow-cyan-2xl"
    default:
      return ""
  }
}


