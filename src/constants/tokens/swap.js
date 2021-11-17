import nerveLogo from '@assets/icons/synapse.svg'

import { Token } from '@utils/classes/Token'
import { SYNAPSE_DOCS_URL } from '@urls'
import { ChainId } from '@constants/networks'

import {
  BUSD,
  USDC,
  USDT,
  DAI,
  MIM,
  NUSD,
  NETH,
  WETH,
  ETH,
  FRAX
} from '@constants/tokens/basic'

import { ETH_POOL_SWAP_TOKEN } from '@constants/tokens/poolswap'



// Stablecoin Swap
export const BSC_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.BSC]:     '0xF0b8B631145d393a767b4387d08Aa09969b2dFed',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token',
  logo:          nerveLogo,
  poolName:      'Stablecoin 3Pool',
  routerIndex:   'bsc3pool',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.BSC]:     '0x938aFAFB36E8B1AB3347427eb44537f543475cF9',
  },
  poolTokens:  [BUSD, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token",
  docUrl:      SYNAPSE_DOCS_URL,
})

/**
 * Eth Stablecoin Swap
 */
export const ETH_STABLE_SWAP_TOKEN = ETH_POOL_SWAP_TOKEN

/**
 * Polygon Stablecoin Swap
 */
export const POLYGON_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.POLYGON]: '0x128A587555d1148766ef4327172129B50EC66E5D',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token Polygon',
  logo:          nerveLogo,
  poolName:      'Polygon Stableswap Pool',
  routerIndex:   'polygon3pool',
  poolId:        42069,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.POLYGON]: '0x3f52E42783064bEba9C1CFcD2E130D156264ca77',
  },
  poolTokens:  [DAI, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token on Polygon/Matic",
  docUrl:      SYNAPSE_DOCS_URL,
})

/**
 * Avalanche Stablecoin Swap
 */
export const AVALANCHE_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.AVALANCHE]: '0x55904F416586b5140A0f666CF5AcF320AdF64846',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token Avalanche',
  logo:          nerveLogo,
  poolName:      'Avalanche Stableswap Pool',
  routerIndex:   'avalanche3pool',
  poolId:        42069,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.AVALANCHE]: '0xE55e19Fb4F2D85af758950957714292DAC1e25B2',
  },
  poolTokens:  [DAI, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token on Avalanche",
  docUrl:      SYNAPSE_DOCS_URL,
})


/**
 * Avalanche Stablecoin Swap
 */
export const ARBITRUM_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.ARBITRUM]: '0xE264Cb5A941F98A391B9d5244378EDf79BF5C19E',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token Arbitrum',
  logo:          nerveLogo,
  poolName:      'Arbitrum Stableswap Pool',
  routerIndex:   'arbitrum3pool',
  poolId:        42069,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.ARBITRUM]: '0xbaFc462d00993fFCD3417aBbC2eb15a342123FDA',
  },
  poolTokens:  [DAI, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token on Arbitrum",
  docUrl:      SYNAPSE_DOCS_URL,
})


/**
 * Fantom Stablecoin Swap
 */
export const FANTOM_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.FANTOM]: '0x43cf58380e69594fA2A5682DE484ae00EdD83E94',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token Fantom',
  logo:          nerveLogo,
  poolName:      'Fantom Stableswap Pool',
  routerIndex:   'fantom3pool',
  poolId:        42069,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.FANTOM]: '0x080f6aed32fc474dd5717105dba5ea57268f46eb',
  },
  poolTokens:  [MIM, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token on Fantom",
  docUrl:      SYNAPSE_DOCS_URL,
})


/**
 * Harmony Stablecoin Swap
 */
export const HARMONY_STABLE_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.HARMONY]: '0x43cf58380e69594fA2A5682DE484ae00EdD83E94',
  },
  decimals:      18,
  symbol:        'USD-LP',
  name:          'Synapse 3pool LP Token Harmony',
  logo:          nerveLogo,
  poolName:      'Harmony Stableswap Pool',
  routerIndex:   'harmony3pool',
  poolId:        42069,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.HARMONY]: '0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb',
  },
  poolTokens:  [DAI, USDC, USDT],
  description: "Synapse's 3pool stableswap LP token on Harmony",
  docUrl:      SYNAPSE_DOCS_URL,
})






/**
 * NOTE: ALL NUSD_SWAP_TOKENS HAVE poolId = 0,  NOT A BUG
 *
 */


/** nUSD swap token */
export const BSC_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.BSC]: '0xdd17344F7537DF99f212A08F5A5480af9F6c083A'
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP BSC',
  logo:          nerveLogo,
  poolName:      'Legacy BSC nUSD Pool',
  routerIndex:   'bscnusd',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.BSC]: '0x930d001b7efb225613aC7F35911c52Ac9E111Fa9',
  },
  swapDepositAddresses: {
    [ChainId.BSC]: '0x07085dB878e51743e83de0D3D73C083E77d7bB71',
  },
  poolTokens:     [NUSD, BUSD, USDC, USDT],
  metapoolTokens: [NUSD, BSC_STABLE_SWAP_TOKEN],
})

/** Polygon nUSD swap token */
export const POLYGON_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.POLYGON]: '0x398a2D1b343d09261dF990c2Fcc97B5d5d62c1B5'
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Polygon',
  logo:          nerveLogo,
  poolName:      'Legacy Polygon nUSD Pool',
  routerIndex:   'polygonnusd',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.POLYGON]: '0x96cf323E477Ec1E17A4197Bdcc6f72Bb2502756a',
  },
  swapDepositAddresses: {
    [ChainId.POLYGON]: '0xbe67Dbe294bD99402Ca8961dF4f7138b950513DB',
  },
  poolTokens:     [NUSD, DAI, USDC, USDT],
  metapoolTokens: [NUSD, POLYGON_STABLE_SWAP_TOKEN],
})

/** Avalanche nUSD swap token */
export const AVALANCHE_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.AVALANCHE]: '0x2c6d91accC5Aa38c84653F28A80AEC69325BDd12',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Avalanche',
  logo:          nerveLogo,
  poolName:      'Legacy Avalanche nUSD Pool',
  routerIndex:   'avalanchenusd',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.AVALANCHE]: '0xF44938b0125A6662f9536281aD2CD6c499F22004',
  },
  swapDepositAddresses: {
    [ChainId.AVALANCHE]: '0x957B42Ff75B486F8e9163652Eb8A9B46a12006a2',
  },
  poolTokens:     [NUSD, DAI, USDC, USDT],
  metapoolTokens: [NUSD, AVALANCHE_STABLE_SWAP_TOKEN],
})

/** Arbitrum nUSD swap token */
export const ARBITRUM_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.ARBITRUM]: '0xF1FD0b04b9508B7e9498C7bB389D3452Cc008757',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Arbitrum',
  logo:          nerveLogo,
  poolName:      'Legacy Arbitrum nUSD Pool',
  routerIndex:   'arbitrumnusd',
  poolId:        1,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.ARBITRUM]: '0x84cd82204c07c67dF1C2C372d8Fd11B3266F76a3',
  },
  swapDepositAddresses: {
    [ChainId.ARBITRUM]: '0x412b6875Ac7250198c80D2C8ABc8433590e77f53',
  },
  poolTokens:     [NUSD, DAI, USDC, USDT],
  metapoolTokens: [NUSD, ARBITRUM_STABLE_SWAP_TOKEN],
})

/** Arbitrum nUSD swap token */
export const FANTOM_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.FANTOM]: '0x08928492691b64E6fe6Ff9DEAd42F557D20A4a18',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Fantom',
  logo:          nerveLogo,
  poolName:      'Legacy Fantom nUSD Pool',
  routerIndex:   'fantomnusd',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.FANTOM]: '0x1f6A0656Ff5061930076bf0386b02091e0839F9f',
  },
  swapDepositAddresses: {
    [ChainId.FANTOM]: '0xcEf6C2e20898C2604886b888552CA6CcF66933B0',
  },
  poolTokens:     [NUSD, MIM, USDC, USDT],
  metapoolTokens: [NUSD, FANTOM_STABLE_SWAP_TOKEN],
})


/** Harmony nUSD swap token */
export const HARMONY_NUSD_SWAP_TOKEN = new Token({
  addresses: {
    [ChainId.HARMONY]: '0xC6f684aE516480A35f337a4dA8b40EB6550e07E0',
  },
  decimals:      18,
  symbol:        'nUSD-LP',
  name:          'Synapse nUSD LP Harmony',
  logo:          nerveLogo,
  poolName:      'Legacy Harmony nUSD Pool',
  routerIndex:   'harmonynusd',
  poolId:        0,
  poolType:      'USD',
  swapAddresses: {
    [ChainId.HARMONY]: '0x555982d2E211745b96736665e19D9308B615F78e',
  },
  swapDepositAddresses: {
    [ChainId.HARMONY]: '0xD8836aF2e565D3Befce7D906Af63ee45a57E8f80',
  },
  poolTokens:     [NUSD, DAI, USDC, USDT],
  metapoolTokens: [NUSD, HARMONY_STABLE_SWAP_TOKEN],
})

/**
 * This is super sketch test code... do not use and MUST BE TORN OUT BEFORE PROD
 */



export const SWAPABLE_TOKENS = {
  [ChainId.BSC]: [
    BUSD,
    USDT,
    USDC,
    NUSD,

    BSC_STABLE_SWAP_TOKEN,
  ],
  [ChainId.ETH]: [
    DAI,
    USDC,
    USDT
  ],
  [ChainId.POLYGON]: [
    DAI,
    USDC,
    USDT,
    NUSD,

    POLYGON_STABLE_SWAP_TOKEN
  ],
  [ChainId.FANTOM]: [
    MIM,
    USDC,
    USDT,
    NUSD,

    FANTOM_STABLE_SWAP_TOKEN
  ],
  [ChainId.ARBITRUM]: [
    WETH,
    NETH,

    MIM, // DAI,
    USDC,
    USDT,
    NUSD,

    ARBITRUM_STABLE_SWAP_TOKEN
  ],
  [ChainId.AVALANCHE]: [
    DAI,
    USDC,
    USDT,
    NUSD,

    AVALANCHE_STABLE_SWAP_TOKEN
  ],
  [ChainId.HARMONY]: [
    DAI,
    USDC,
    USDT,
    NUSD,

    HARMONY_STABLE_SWAP_TOKEN
  ],
  [ChainId.BOBA]: [
    // WETH,
    // NETH,

    DAI,
    USDC,
    USDT,
    NUSD
  ],
  [ChainId.MOONRIVER]: [
    FRAX,
  ],
}