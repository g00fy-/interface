
import _ from 'lodash'
import busdLogo from '@assets/icons/busd.svg'
import usdcLogo from '@assets/icons/usdc.svg'
import usdtLogo from '@assets/icons/usdt.svg'
import nerveLogo from '@assets/icons/synapse.svg'

import ethLogo from '@assets/icons/eth.svg'
import nethLogo from '@assets/icons/neth.svg'
import mimLogo from '@assets/icons/mim.svg'

import ustLogo from '@assets/icons/ust.png'

import fraxLogo from '@assets/icons/frax.svg'

import daiLogo from '@assets/icons/dai.png'
import nusdLogo from '@assets/icons/nusd.svg'

import { ChainId } from '@constants/networks'

import { Token } from '@utils/classes/Token'

import { DOG, HIGHSTREET, JUMP } from '@constants/tokens/mintable'


export const BUSD = new Token({
  addresses: {
    [ChainId.BSC]:     '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  },
  decimals:    18,
  symbol:      'BUSD',
  name:        'Binance USD',
  logo:        busdLogo,
  description: `
    BUSD is a stablecoin that is pegged to the US dollar and
    backed/issued by Binance
  `,
  swapableType: "USD",
})




export const USDC = new Token({
  addresses: {
    [ChainId.BSC]:       '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    [ChainId.ETH]:       '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    [ChainId.POLYGON]:   '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    [ChainId.FANTOM]:    '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
    [ChainId.AVALANCHE]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    [ChainId.ARBITRUM]:  '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    [ChainId.HARMONY]:   '0x985458e523db3d53125813ed68c274899e9dfab4',
    [ChainId.BOBA]:      '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
  },
  decimals: {
    [ChainId.BSC]:       18,
    [ChainId.ETH]:       6,
    [ChainId.POLYGON]:   6,
    [ChainId.FANTOM]:    6,
    [ChainId.AVALANCHE]: 6,
    [ChainId.ARBITRUM]:  6,
    [ChainId.HARMONY]:   6,
    [ChainId.BOBA]:      6,
  },
  symbol:      'USDC',
  name:        'USD Circle',
  logo:        usdcLogo,
  description: `
    USD Coin (known by its ticker USDC) is a stablecoin that is pegged to the
    U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation
    is backed up by $1 that is held in reserve
    `,
  swapableType: "USD",
})




export const USDT = new Token({
  addresses: {
    [ChainId.BSC]:       '0x55d398326f99059ff775485246999027b3197955',
    [ChainId.ETH]:       '0xdac17f958d2ee523a2206206994597c13d831ec7',
    [ChainId.POLYGON]:   '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    [ChainId.AVALANCHE]: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    [ChainId.HARDHAT]:   '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
    [ChainId.ARBITRUM]:  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    [ChainId.FANTOM]:    '0x049d68029688eabf473097a2fc38ef61633a3c7a',
    [ChainId.HARMONY]:   '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
    [ChainId.BOBA]:      '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d'
  },
  decimals: {
    [ChainId.BSC]:       18,
    [ChainId.ETH]:       6,
    [ChainId.POLYGON]:   6,
    [ChainId.AVALANCHE]: 6,
    [ChainId.ARBITRUM]:  6,
    [ChainId.FANTOM]:    6,
    [ChainId.HARMONY]:   6,
    [ChainId.BOBA]:      6,

  },
  symbol:      'USDT',
  name:        'USD Tether',
  logo:        usdtLogo,
  description: `
    USDT mirrors the price of the U.S. dollar, issued by a Hong Kong-based company Tether.
    The token’s peg to the USD is achieved via maintaining a sum of dollars in reserves equal
    to the number of USDT in circulation.
    `,
  swapableType: "USD",
})



export const DAI = new Token({
  addresses:{
    [ChainId.BSC]:       '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    [ChainId.ETH]:       '0x6b175474e89094c44da98b954eedeac495271d0f',
    [ChainId.POLYGON]:   '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    [ChainId.AVALANCHE]: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    [ChainId.ARBITRUM]:  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    [ChainId.HARMONY]:   '0xef977d2f931c1978db5f6747666fa1eacb0d0339',
    [ChainId.BOBA]:      '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35'
  },
  decimals:     18,
  symbol:       'DAI',
  name:         'Dai',
  logo:         daiLogo,
  swapableType: "USD",
})



export const UST = new Token({
  addresses: {
    [ChainId.BSC]: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  },
  decimals:     18,
  symbol:       'UST',
  name:         'TerraUSD',
  logo:         ustLogo,
  swapableType: "USD",
})



export const MIM = new Token({
  addresses: {
    [ChainId.FANTOM]:     '0x82f0b8b456c1a451378467398982d4834b6829c1',
    [ChainId.ARBITRUM]:   '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
  },
  decimals:     18,
  symbol:       'MIM',
  name:         'MIM',
  logo:         mimLogo,
  swapableType: "USD",
})



export const WETH = new Token({
  addresses: {
    [ChainId.ETH]:      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [ChainId.ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    // [ChainId.BOBA]:     '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000' // NOT A PLACEHOLDER
  },
  decimals:     18,
  symbol:       'WETH', // SHOULD BE WETH
  name:         'Wrapped ETH',
  logo:         ethLogo,
  description:  "ERC-20 Wrapped form of ETH",
  swapableType: "ETH",
})



export const SYN = new Token({
  addresses: {
    [ChainId.ETH]:       '0x0f2d719407fdbeff09d87557abb7232601fd9f29',
    [ChainId.BSC]:       '0xa4080f1778e69467e905b8d6f72f6e441f9e9484',
    [ChainId.POLYGON]:   '0xf8f9efc0db77d8881500bb06ff5d6abc3070e695',
    [ChainId.FANTOM]:    '0xE55e19Fb4F2D85af758950957714292DAC1e25B2',   // yes this is same as avax swap addr, no its not error
    [ChainId.ARBITRUM]:  '0x080f6aed32fc474dd5717105dba5ea57268f46eb',
    [ChainId.AVALANCHE]: '0x1f1E7c893855525b303f99bDF5c3c05Be09ca251',
    [ChainId.HARMONY]:   '0xE55e19Fb4F2D85af758950957714292DAC1e25B2',
    [ChainId.BOBA]:      '0xb554A55358fF0382Fb21F0a478C3546d1106Be8c',
    [ChainId.MOONRIVER]: '0xd80d8688b02B3FD3afb81cDb124F188BB5aD0445'
  },
  decimals:    18,
  symbol:      'SYN',
  name:        'Synapse',
  logo:        nerveLogo,
  description: 'SYN is the base token behind synapse',
  swapableType: "SYN",
})


export const FRAX = new Token({
  addresses: {
    [ChainId.ETH]:       '0x853d955acef822db058eb8505911ed77f175b99e',
    [ChainId.MOONRIVER]: '0x1a93b23281cc1cde4c4741353f3064709a16197d'
  },
  decimals:    18,
  symbol:      'FRAX',
  name:        'Frax',
  logo:        fraxLogo,
  description: 'Frax',
  swapableType: "FRAX",
})

export const SYN_FRAX = new Token({
  addresses: {
    [ChainId.MOONRIVER]: '0xE96AC70907ffF3Efee79f502C985A7A21Bce407d'
  },
  decimals:    18,
  symbol:      'synFRAX',
  name:        'Synapse Frax',
  logo:        nerveLogo,
  description: 'Frax',
  // swapableType: "SYN",
})




/**
 * nUSD is the token involved in the bridge. it is backed by pixie dust...
 */
export const NUSD = new Token({
  addresses: {
    [ChainId.BSC]:       '0x23b891e5c62e0955ae2bd185990103928ab817b3',
    [ChainId.ETH]:       '0x1B84765dE8B7566e4cEAF4D0fD3c5aF52D3DdE4F',
    [ChainId.POLYGON]:   '0xb6c473756050de474286bed418b77aeac39b02af',
    [ChainId.FANTOM]:    '0xED2a7edd7413021d440b09D654f3b87712abAB66',
    [ChainId.AVALANCHE]: '0xCFc37A6AB183dd4aED08C204D1c2773c0b1BDf46',
    [ChainId.ARBITRUM]:  '0x2913E812Cf0dcCA30FB28E6Cac3d2DCFF4497688',
    [ChainId.HARMONY]:   '0xED2a7edd7413021d440b09D654f3b87712abAB66',
    [ChainId.BOBA]:       '0x6B4712AE9797C199edd44F897cA09BC57628a1CF'
  },
  decimals:    18,
  symbol:      'nUSD',
  name:        'Synapse nUSD',
  logo:        nusdLogo,
  description: 'nUSD',
  swapableType: "USD",
})

/**
 * nETH is the token involved in the bridge. it is backed by internet monies...
 */
export const NETH = new Token({
  addresses: {
    [ChainId.ARBITRUM]: '0x3ea9B0ab55F34Fb188824Ee288CeaEfC63cf908e',
    // [ChainId.BOBA]:     '0x96419929d7949D6A801A6909c145C8EEf6A40431',
  },
  decimals:    18,
  symbol:      'nETH',
  name:        'Synapse nETH',
  logo:        nethLogo,
  description: 'nETH',
  swapableType: "ETH",
})


export const ETH = new Token({
  addresses: {
    [ChainId.ETH]:      '',
    // [ChainId.BOBA]:     '',
    [ChainId.ARBITRUM]: '',
  },
  decimals:    18,
  symbol:      'ETH',
  name:        'Ethereum',
  logo:        ethLogo,
  description: 'ETH',
  isNative:    true,
  swapableType: "ETH",
})





export const BASIC_TOKENS_BY_CHAIN = {
  [ChainId.BSC]: [
    BUSD,
    USDC,
    USDT,
    NUSD,
    SYN,
    HIGHSTREET,
    DOG,
    JUMP,

  ],
  [ChainId.ETH]: [
    USDC,
    USDT,
    DAI,
    NUSD,
    SYN,
    WETH,
    ETH,
    HIGHSTREET,
    DOG,
    FRAX,
  ],
  [ChainId.POLYGON]: [
    USDC,
    USDT,
    DAI,
    NUSD,
    SYN
  ],
  [ChainId.FANTOM]: [
    MIM,
    USDC,
    USDT,
    NUSD,
    SYN,
    JUMP
  ],
  [ChainId.BOBA]: [
    SYN,
    // NETH,
    // WETH,
    // ETH,
    USDC,
    USDT,
    DAI,
    NUSD,
  ],
  [ChainId.MOONRIVER]: [
    SYN,
    FRAX,
  ],
  [ChainId.ARBITRUM]: [
    NETH,
    SYN,
    WETH,
    ETH,
    USDC,
    USDT,
    DAI,
    MIM,
    NUSD,
  ],
  [ChainId.AVALANCHE]: [
    USDC,
    USDT,
    DAI,
    NUSD,
    SYN
  ],
  [ChainId.HARMONY]: [
    USDC,
    USDT,
    DAI,
    NUSD,
    SYN
  ]
}

export const METAPOOL_TOKENS_BY_CHAIN = {
  [ChainId.BSC]:       [NUSD],
  [ChainId.ETH]:       [],
  [ChainId.POLYGON]:   [NUSD],
  [ChainId.FANTOM]:    [NUSD],
  [ChainId.BOBA]:      [NUSD],
  [ChainId.MOONRIVER]: [],
  [ChainId.ARBITRUM]:  [NUSD],
  [ChainId.AVALANCHE]: [NUSD],
  [ChainId.HARMONY]:   [NUSD],
}



let TOKEN_HASH_MAP = {}

for (const [chainId, tokensOnChain] of _.toPairs(BASIC_TOKENS_BY_CHAIN)) {
  TOKEN_HASH_MAP[chainId] = {}
  for (const token of tokensOnChain) {
    TOKEN_HASH_MAP[chainId][_.toLower(token.addresses[chainId])] = token
  }

}

export { TOKEN_HASH_MAP }


