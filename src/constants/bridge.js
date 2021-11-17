// wtf is this bs
import {
  BUSD,
  USDC,
  USDT,
  DAI,
  NUSD,
  NETH,
  ETH,
  SYN,
  MIM,
  FRAX,
} from '@constants/tokens/basic'

import { DOG, HIGHSTREET, JUMP } from '@constants/tokens/mintable'

import { ChainId } from '@constants/networks'

/**
 * Underlying bridge addresses utilized by zaps
 *
 * abi specified by {@link `@abis/synapseBridge.json`}
 */
export const SYNAPSE_BRIDGE_ADDRESSES = {
  [ChainId.ETH]:       '0x2796317b0fF8538F253012862c06787Adfb8cEb6',
  [ChainId.BSC]:       '0xd123f70AE324d34A9E76b67a27bf77593bA8749f',
  [ChainId.POLYGON]:   '0x8F5BBB2BB8c2Ee94639E55d5F41de9b4839C1280',
  [ChainId.FANTOM]:    '0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b',
  [ChainId.BOBA]:      '0x432036208d2717394d2614d6697c46DF3Ed69540',
  [ChainId.ARBITRUM]:  '0x6F4e8eBa4D337f874Ab57478AcC2Cb5BACdc19c9',
  [ChainId.AVALANCHE]: '0xC05e61d0E7a63D27546389B7aD62FdFf5A91aACE',
  [ChainId.HARMONY]:   '0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b',
  [ChainId.MOONRIVER]: '0xaeD5b25BE1c3163c907a471082640450F928DDFE',
}

/**
 * ETH Only Bridge Config used to calculate swap fees
 *
 * abi specified by {@link `@abis/bridgeConfig.json`}
 */
export const BRIDGE_CONFIG_ADDRESSES = {
  [ChainId.ETH]: '0x7fd806049608b7d04076b8187dd773343e0589e6',
}

/**
 * abi for ETH specified by {@link `@abis/bridgeZap.json`}
 * Handles stables -> add liquidity, get nerveUSD-LP -> Mint nUSD -> Swap to stables on non-ETH chain
 * abi for others specified by {@link `@abis/l2bridgezap.json`}
 * Handles stables -> Swap to nUSD -> Redeem for nerveUSD-LP -> Remove liquidity
 */
export const BRIDGE_ZAP_ADDRESSES = {
  [ChainId.ETH]:       '0xa2569370A9D4841c9a62Fc51269110F2eB7E0171',
  [ChainId.BSC]:       '0x749F37Df06A99D6A8E065dd065f8cF947ca23697',
  [ChainId.POLYGON]:   '0x1c6aE197fF4BF7BA96c66C5FD64Cb22450aF9cC8',
  [ChainId.FANTOM]:    '0x7BC05Ff03397950E8DeE098B354c37f449907c20',
  [ChainId.BOBA]:      '0x84ea83B6E88C471a446Ae7007C252574E715711e',
  [ChainId.ARBITRUM]:  '0x26532682E1830cDACcCbb7e385Cff6de14dD08D8',
  [ChainId.AVALANCHE]: '0x997108791D5e7c0ce2a9A4AAC89427C68E345173',
  [ChainId.HARMONY]:   '0xF68cD56cF9a9e1cDa181fb2C44C5F0E98B5cC541',
  [ChainId.MOONRIVER]: '0x06Fea8513FF03a0d3f61324da709D4cf06F42A5c',

}



/**
 * Handles getting which tokens are shown on bridge card dropdown
 */
export const BRIDGABLE_TOKENS = {
  [ChainId.ETH]:       [USDC, USDT, DAI, SYN, NUSD, ETH, DOG, HIGHSTREET, FRAX],
  [ChainId.BSC]:       [BUSD, USDC, USDT, SYN, NUSD, DOG, JUMP, HIGHSTREET],
  [ChainId.FANTOM]:    [MIM, USDC, USDT, SYN, NUSD, JUMP],
  [ChainId.POLYGON]:   [USDC, USDT, DAI, SYN, NUSD],
  [ChainId.BOBA]:      [DAI, USDC, USDT, SYN, NUSD],                           // ETH, NETH,
  [ChainId.MOONRIVER]: [FRAX, SYN],
  [ChainId.ARBITRUM]:  [ETH, NETH, USDC, USDT, MIM, SYN, NUSD],
  [ChainId.AVALANCHE]: [USDC, USDT, DAI, SYN, NUSD],
  [ChainId.HARMONY]:   [USDC, USDT, DAI, SYN, NUSD],
}


/**
 * number of required confirmations from bridge, hardcoded bc fuck me
 */
export const BRIDGE_REQUIRED_CONFIRMATIONS = {
  [ChainId.ETH]:       7,
  [ChainId.BSC]:       14,
  [ChainId.POLYGON]:   128,
  [ChainId.FANTOM]:    1,     // 5,
  [ChainId.BOBA]:      1,     // all of this is retarded
  [ChainId.MOONRIVER]: 21,     // 5,
  [ChainId.ARBITRUM]:  40,
  [ChainId.AVALANCHE]: 1,
  [ChainId.HARMONY]:   1,     // This is exactly as retarded as you think

}

