import './styles/global.css'
import '@bignumber/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'

import { ApolloProvider, APOLLO_CLIENT } from '@graphql'


import { TransactionHistoryStore } from '@store/TransactionHistoryStore'
import { SettingsStore } from '@store/SettingsStore'
import { ChainStore } from '@store/ChainStore'

import { ChainId } from '@constants/networks'
import { MEME_ASCII_ART, LOGO_ASCII_ART, THE_PLAN } from '@constants/misc'
import { NetworkContextName } from '@constants/networks'

import { BlockUpdater } from '@providers/BlockUpdater'

import { MulticallUpdater } from '@providers/MulticallUpdater'
import {
  getLibrary,
  getLibraryBsc,
  getLibraryEth,
  getLibraryPolygon,
  getLibraryFantom,
  getLibraryBoba,
  getLibraryMoonriver,
  getLibraryArbitrum,
  getLibraryAvalanche,
  getLibraryHarmony,
} from '@utils/getLibrary'



import CustomToaster from '@layouts/CustomToaster'
import App from './App'


/**
 * The retarded ape who wrote the below has very serious mental issues
 */

const Web3ProviderNetwork   = createWeb3ReactRoot(NetworkContextName)
const Web3ProviderEth       = createWeb3ReactRoot(`${ChainId.ETH}`)
const Web3ProviderBsc       = createWeb3ReactRoot(`${ChainId.BSC}`)
const Web3ProviderPolygon   = createWeb3ReactRoot(`${ChainId.POLYGON}`)
const Web3ProviderFantom    = createWeb3ReactRoot(`${ChainId.FANTOM}`)
const Web3ProviderBoba      = createWeb3ReactRoot(`${ChainId.BOBA}`)
const Web3ProviderMoonriver = createWeb3ReactRoot(`${ChainId.MOONRIVER}`)
const Web3ProviderArbitrum  = createWeb3ReactRoot(`${ChainId.ARBITRUM}`)
const Web3ProviderAvalanche = createWeb3ReactRoot(`${ChainId.AVALANCHE}`)
const Web3ProviderHarmony   = createWeb3ReactRoot(`${ChainId.HARMONY}`)


// The Plan
console.log(MEME_ASCII_ART)
console.log(THE_PLAN)
console.log(LOGO_ASCII_ART)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div dangerouslySetInnerHTML={{ __html: `<!-- ${MEME_ASCII_ART} -->` }}/>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ProviderEth getLibrary={getLibraryEth}>
          <Web3ProviderBsc getLibrary={getLibraryBsc}>
            <Web3ProviderPolygon getLibrary={getLibraryPolygon}>
              <Web3ProviderFantom getLibrary={getLibraryFantom}>
                <Web3ProviderBoba getLibrary={getLibraryBoba}>
                  <Web3ProviderMoonriver getLibrary={getLibraryMoonriver}>
                    <Web3ProviderArbitrum getLibrary={getLibraryArbitrum}>
                      <Web3ProviderAvalanche getLibrary={getLibraryAvalanche}>
                        <Web3ProviderHarmony getLibrary={getLibraryHarmony}>
                          <ApolloProvider client={APOLLO_CLIENT}>
                            <ChainStore>
                              <SettingsStore>
                                <TransactionHistoryStore>
                                  <Router>
                                    <App />
                                  </Router>
                                </TransactionHistoryStore>
                              </SettingsStore>
                              <MulticallUpdater chainId={ChainId.ETH} />
                              <MulticallUpdater chainId={ChainId.BSC} />
                              <MulticallUpdater chainId={ChainId.POLYGON} />
                              <MulticallUpdater chainId={ChainId.FANTOM} />
                              <MulticallUpdater chainId={ChainId.BOBA} />
                              <MulticallUpdater chainId={ChainId.MOONRIVER} />
                              <MulticallUpdater chainId={ChainId.ARBITRUM} />
                              <MulticallUpdater chainId={ChainId.AVALANCHE} />
                              <MulticallUpdater chainId={ChainId.HARMONY} />
                              <BlockUpdater />
                            </ChainStore>
                          </ApolloProvider>
                        </Web3ProviderHarmony>
                      </Web3ProviderAvalanche>
                    </Web3ProviderArbitrum>
                  </Web3ProviderMoonriver>
                </Web3ProviderBoba>
              </Web3ProviderFantom>
            </Web3ProviderPolygon>
          </Web3ProviderBsc>
        </Web3ProviderEth>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
    <CustomToaster />
  </>
)

console.log(process.env.NODE_ENV)
// ReactDOM.render(
//   <>
//   </>,
//   document.getElementById('root')
// )
