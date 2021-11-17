import binanceLogo from '@assets/icons/binance.svg'
import ethLogo from '@assets/icons/eth.svg'
import polygonLogo from '@assets/icons/polygon.svg'
import fantomLogo from '@assets/icons/fantom.svg'
import arbitrumLogo from '@assets/icons/arbitrum.svg'
import avalancheLogo from '@assets/icons/avalanche.svg'
import harmonyLogo from '@assets/icons/harmonyone.svg'
import optimismLogo from '@assets/icons/optimism.svg'
import bobaLogo from '@assets/icons/boba.svg'

import ethImg from '@assets/networks/eth.jpg'
import bscImg from '@assets/networks/bsc.jpg'
import polygonImg from '@assets/networks/polygon.jpg'
import fantomImg from '@assets/networks/fantom.jpg'
import arbitrumImg from '@assets/networks/arbitrum.jpg'
import avalancheImg from '@assets/networks/avalanche.jpg'
import harmonyImg from '@assets/networks/harmonyone.jpg'
import optimismImg from '@assets/networks/optimism.png'
import bobaImg from '@assets/networks/boba.png'
import moonriverImg from '@assets/networks/moonriver.jpeg'


import { toHexStr } from '@utils/toHexStr'


export const NetworkContextName = 'DEFAULT_NETWORK'

export const ChainId = {
  ETH:       1,
  ROPSTEN:   3,
  RINKEBY:   4,
  GÖRLI:     5,
  OPTIMISM:  10,
  KOVAN:     42,
  BSC:       56,
  POLYGON:   137,
  FANTOM:    250,
  BOBA:      288,
  MOONRIVER: 1285,
  HARDHAT:   31337,
  ARBITRUM:  42161,
  AVALANCHE: 43114,
  HARMONY:   1666600000,
}

export const INVERTED_CHAIN_ID_MAP = Object.fromEntries(
  Object.entries(ChainId).map(([k, v]) => [v, k])
)

export const CHAIN_INFO_MAP = {
  [ChainId.ETH]: {
    chainId:     ChainId.ETH,
    chainSymbol: 'ETH',
    chainName:   'Ethereum',
    chainLogo:   ethLogo,
    chainImg:    ethImg,
  },
  // [ChainId.OPTIMISM]: {
  //   chainId:     ChainId.OPTIMISM,
  //   chainSymbol: 'OPTIMISM',
  //   chainName:   'Optimism',
  //   chainLogo:   optimismLogo,
  //   chainImg:    optimismImg,
  // },
  [ChainId.BSC]: {
    chainId:        ChainId.BSC,
    chainSymbol:    'BSC',
    chainName:      'Binance Smart Chain',
    chainShortName: 'BSC',
    chainLogo:      binanceLogo,
    chainImg:       bscImg,
  },
  [ChainId.POLYGON]: {
    chainId:     ChainId.POLYGON,
    chainSymbol: 'POLYGON',
    chainName:   'Polygon',
    chainLogo:   polygonLogo,
    chainImg:    polygonImg,
  },
  [ChainId.FANTOM]: {
    chainId:     ChainId.FANTOM,
    chainSymbol: 'FANTOM',
    chainName:   'Fantom',
    chainLogo:   fantomLogo,
    chainImg:    fantomImg,
  },
  [ChainId.BOBA]: {
    chainId:     ChainId.BOBA,
    chainSymbol: 'BOBA',
    chainName:   'Boba Network',
    chainLogo:   bobaLogo,
    chainImg:    bobaImg,
  },
  [ChainId.MOONRIVER]: {
    chainId:     ChainId.MOONRIVER,
    chainSymbol: 'MOONRIVER',
    chainName:   'Moonriver',
    chainLogo:   moonriverImg,
    chainImg:    moonriverImg,
  },
  [ChainId.ARBITRUM]: {
    chainId:     ChainId.ARBITRUM,
    chainSymbol: 'ARBITRUM',
    chainName:   'Arbitrum',
    chainLogo:   arbitrumLogo,
    chainImg:    arbitrumImg,
  },
  [ChainId.AVALANCHE]: {
    chainId:     ChainId.AVALANCHE,
    chainSymbol: 'AVALANCHE',
    chainName:   'Avalanche',
    chainLogo:   avalancheLogo,
    chainImg:    avalancheImg,
  },
  [ChainId.HARMONY]: {
    chainId:     ChainId.HARMONY,
    chainSymbol: 'HARMONY',
    chainName:   'Harmony',
    chainLogo:   harmonyLogo,
    chainImg:    harmonyImg,
  },
}


export const SUPPORTED_CHAINS = Object.keys(CHAIN_INFO_MAP)

export const CHAIN_RPC = {
  [ChainId.ETH]:      'https://eth-mainnet.alchemyapi.io/v2/0AovFRYl9L7l4YUf6nPaMrs7H2_pj_Pf',
  [ChainId.OPTIMISM]: 'https://mainnet.optimism.io',
  [ChainId.BSC]:      'https://bsc-dataseed.binance.org/',
  [ChainId.ROPSTEN]:  'https://eth-ropsten.alchemyapi.io/v2/tmEmzPXw-YAGzFPxNjcYACSGIY8stGs0',
  [ChainId.RINKEBY]:  'https://eth-rinkeby.alchemyapi.io/v2/UlKX4pmZf6UY2n_42lJdX4AmZqEjY5w7',
  [ChainId.GÖRLI]:    'https://eth-goerli.alchemyapi.io/v2/uevnVeooZkhfVmgQi65iSyzhHRa18zrA',
  [ChainId.KOVAN]:    'https://eth-kovan.alchemyapi.io/v2/XmzNAwfGCoJqigHeDengWVvNwmhGk1Bp',
  [ChainId.FANTOM]:   'https://rpc.ftm.tools/',
  [ChainId.BOBA]:     'https://mainnet.boba.network/',
  [ChainId.MOONRIVER]: 'https://rpc.moonriver.moonbeam.network',
  [ChainId.POLYGON]:  'https://polygon-mainnet.g.alchemy.com/v2/TXIDdlhxWM3VmgCcIkb8NXAuWdELAidn',
    //'https://polygon-mainnet.g.alchemy.com/v2/TXIDdlhxWM3VmgCcIkb8NXAuWdELAidn',
    // Original MAIN: 'https://polygon-mainnet.infura.io/v3/1ed5f5745cdd4c6093369a9df6627145',
    // 'https://polygon-mainnet.infura.io/v3/ce8ef4b53e0c45c899ef862be05afd55',
    // https://rpc-mainnet.matic.network or
    // https://matic-mainnet.chainstacklabs.com or
    // https://rpc-mainnet.maticvigil.com or
    // https://rpc-mainnet.matic.quiknode.pro or
    // https://matic-mainnet-full-rpc.bwarelabs.com or
    // https://matic-mainnet-archive-rpc.bwarelabs.com
    //
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.ARBITRUM]:  'https://arb1.arbitrum.io/rpc',
  [ChainId.HARMONY]:   'https://api.harmony.one',
  // [ChainId.XDAI]: 'https://rpc.xdaichain.com',

}


const ETH_NATIVE_CURRENCY = {
  name:     'Ethereum',
  symbol:   'ETH',
  decimals: 18,
}

/**
 * The below need to be MetaMask compatible keys/objects.
 * extra keys can cause MetaMask to cause really unexpected errors
 */
export const CHAIN_PARAMS = {
  [ChainId.ETH]: {
    chainId:           toHexStr(ChainId.ETH),
    chainName:         CHAIN_INFO_MAP[ChainId.ETH].chainName,
    nativeCurrency:    ETH_NATIVE_CURRENCY,
    rpcUrls:           [CHAIN_RPC[ChainId.ETH]],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  // [ChainId.OPTIMISM]: {
  //   chainId:        toHexStr(ChainId.OPTIMISM),
  //   chainName:      CHAIN_INFO_MAP[ChainId.OPTIMISM].chainName,
  //   nativeCurrency: {
  //     name:     'Ethereum',
  //     symbol:   'ETH',
  //     decimals: 18,
  //   },
  //   rpcUrls:           [CHAIN_RPC[ChainId.OPTIMISM]],
  //   blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  // },
  [ChainId.BSC]: {
    chainId:        toHexStr(ChainId.BSC),
    chainName:      CHAIN_INFO_MAP[ChainId.BSC].chainName,
    nativeCurrency: {
      name:     'Binance Coin',
      symbol:   'BNB',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.BSC]],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.POLYGON]: {
    chainId:        toHexStr(ChainId.POLYGON),
    chainName:      CHAIN_INFO_MAP[ChainId.POLYGON].chainName,
    nativeCurrency: {
      name:     'Matic',
      symbol:   'MATIC',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.POLYGON]],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [ChainId.FANTOM]: {
    chainId: toHexStr(ChainId.FANTOM),
    chainName: CHAIN_INFO_MAP[ChainId.FANTOM].chainName,
    nativeCurrency: {
      name:     'Fantom',
      symbol:   'FTM',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.FANTOM]],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  [ChainId.BOBA]: {
    chainId:           toHexStr(ChainId.BOBA),
    chainName:         CHAIN_INFO_MAP[ChainId.BOBA].chainName,
    nativeCurrency:    ETH_NATIVE_CURRENCY,
    rpcUrls:           [CHAIN_RPC[ChainId.BOBA]],
    blockExplorerUrls: ['https://blockexplorer.boba.network/'],
  },
  [ChainId.MOONRIVER]: {
    chainId:        toHexStr(ChainId.MOONRIVER),
    chainName:      CHAIN_INFO_MAP[ChainId.MOONRIVER].chainName,
    nativeCurrency: {
      name:     'Moonriver',
      symbol:   'MOVR',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.MOONRIVER]],
    blockExplorerUrls: ['https://moonriver.moonscan.io//'],
  },
  [ChainId.ARBITRUM]: {
    chainId:           toHexStr(ChainId.ARBITRUM),
    chainName:         CHAIN_INFO_MAP[ChainId.ARBITRUM].chainName,
    nativeCurrency:    ETH_NATIVE_CURRENCY,
    rpcUrls:           [CHAIN_RPC[ChainId.ARBITRUM]],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  [ChainId.AVALANCHE]: {
    chainId:        toHexStr(ChainId.AVALANCHE),
    chainName:      CHAIN_INFO_MAP[ChainId.AVALANCHE].chainName,
    nativeCurrency: {
      name:     'Avax',
      symbol:   'AVAX',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.AVALANCHE]],
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  [ChainId.HARMONY]: {
    chainId:        toHexStr(ChainId.HARMONY),
    chainName:      CHAIN_INFO_MAP[ChainId.HARMONY].chainName,
    nativeCurrency: {
      name:     'Harmony One',
      symbol:   'ONE',
      decimals: 18,
    },
    rpcUrls:           [CHAIN_RPC[ChainId.HARMONY]],
    blockExplorerUrls: ['https://explorer.harmony.one'],
  },
}

/**
 * NOTE: this is currently set to a far lower value than what it normally is.  normally 2500
 */
export const BLOCK_TIME = 5000 // 30000   // 5000

export const CHAIN_BLOCK_TIME = {
  [ChainId.ETH]:       BLOCK_TIME,   // 15000,
  [ChainId.OPTIMISM]:  BLOCK_TIME,
  [ChainId.BSC]:       BLOCK_TIME,   // 5000,
  [ChainId.POLYGON]:   BLOCK_TIME,   // 5000,
  [ChainId.FANTOM]:    BLOCK_TIME,
  [ChainId.BOBA]:      BLOCK_TIME,
  [ChainId.MOONRIVER]: BLOCK_TIME,
  [ChainId.ARBITRUM]:  BLOCK_TIME,
  [ChainId.AVALANCHE]: BLOCK_TIME,
  [ChainId.HARMONY]:   BLOCK_TIME,
}