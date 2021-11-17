import { ChainId } from '@constants/networks'

import highstreetLogo from '@assets/icons/highstreet.svg'
import hyperjumpLogo from '@assets/icons/hyperjump.png'
import dogLogo from '@assets/icons/dog.png'

import { Token } from '@utils/classes/Token'


export const HIGHSTREET = new Token({
  addresses: {
    [ChainId.ETH]: '0x71Ab77b7dbB4fa7e017BC15090b2163221420282',
    [ChainId.BSC]: '0x5f4bde007dc06b867f86ebfe4802e34a1ffeed63',
  },
  decimals:     18,
  symbol:       'HIGH',
  name:         'Highstreet',
  logo:         highstreetLogo,
  description:  'HIGH is the token behind Highstreet',
  swapableType: "HIGHSTREET",
})


export const JUMP = new Token({
  addresses: {
    [ChainId.BSC]:    '0x130025ee738a66e691e6a7a62381cb33c6d9ae83',   // redeem
    [ChainId.FANTOM]: '0x78DE9326792ce1d6eCA0c978753c6953Cdeedd73',   // deposit
  },
  decimals:     18,
  symbol:       'JUMP',
  name:         'HyperJump',
  logo:         hyperjumpLogo,
  description:  'JUMP is the token behind Hyperjump',
  docUrl:       '',
  swapableType: "JUMP",
})


export const DOG = new Token({
  addresses: {
    [ChainId.ETH]: '0xBAac2B4491727D78D2b78815144570b9f2Fe8899',
    [ChainId.BSC]: '0xaa88c603d142c371ea0eac8756123c5805edee03',
  },
  decimals:     18,
  symbol:       'DOG',
  name:         'The Doge NFT',
  logo:         dogLogo,
  description:  'DOG is the token behind the Doge NFT',
  docUrl:       '',
  swapableType: "DOG",
})