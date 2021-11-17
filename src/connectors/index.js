import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


import { BscConnector } from '@binance-chain/bsc-connector'

import { ChainId, CHAIN_RPC } from '@constants/networks'

import { NetworkConnector } from './NetworkConnector'





export const NETWORK_CONNECTOR = new NetworkConnector({
  defaultChainId: ChainId.ETH,
  urls:           CHAIN_RPC,
})

export const NETWORK_CONNECTOR_MAP = {
  [ChainId.BSC]: new NetworkConnector({
    defaultChainId: ChainId.BSC,
    urls:           CHAIN_RPC,
  }),
  [ChainId.ETH]: NETWORK_CONNECTOR,
  [ChainId.POLYGON]: new NetworkConnector({
    defaultChainId: ChainId.POLYGON,
    urls:           CHAIN_RPC,
  }),
  [ChainId.FANTOM]: new NetworkConnector({
    defaultChainId: ChainId.FANTOM,
    urls:           CHAIN_RPC,
  }),
  [ChainId.BOBA]: new NetworkConnector({
    defaultChainId: ChainId.BOBA,
    urls: CHAIN_RPC,
  }),
  [ChainId.MOONRIVER]: new NetworkConnector({
    defaultChainId: ChainId.MOONRIVER,
    urls: CHAIN_RPC,
  }),
  [ChainId.ARBITRUM]: new NetworkConnector({
    defaultChainId: ChainId.ARBITRUM,
    urls:           CHAIN_RPC,
  }),
  [ChainId.AVALANCHE]: new NetworkConnector({
    defaultChainId: ChainId.AVALANCHE,
    urls:           CHAIN_RPC,
  }),
  [ChainId.HARMONY]: new NetworkConnector({
    defaultChainId: ChainId.HARMONY,
    urls: CHAIN_RPC,
  })
}


export const injected = new InjectedConnector({
  supportedChainIds: [
    ChainId.ETH,
    ChainId.BSC,
    ChainId.POLYGON,
    ChainId.FANTOM,
    ChainId.BOBA,
    ChainId.MOONRIVER,
    ChainId.HARDHAT,
    ChainId.ARBITRUM,
    ChainId.AVALANCHE,
    ChainId.HARMONY,
  ],
})

export const bsc = new BscConnector({ supportedChainIds: [ChainId.ETH, ChainId.BSC] })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: CHAIN_RPC,
  qrcode: true,
})
