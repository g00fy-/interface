import { Route, Redirect, Switch } from 'react-router-dom'

import {
  AIRDROP_PATH,
  SWAP_PATH,
  POOLS_PATH,
  BRIDGE_PATH,
  STAKE_PATH,
  CONTRACTS_PATH,
  PORTFOLIO_PATH,
  SYNAPSE_PFP_PATH,
} from '@urls'

import Swap from '@pages/Swap'
import Pools from '@pages/Pools'
import Pool from '@pages/Pool'
import Stake from '@pages/Stake'

import Bridge from '@pages/Bridge'
import ContractInfo from '@pages/ContractInfo'
import Portfolio from '@pages/Portfolio'
import Home from '@pages/Home'

import AirdropPage from '@pages/Airdrop'

import Web3ReactManager from '@providers/Web3ReactManager'
import ReturnToMonkePage from '@pages/ReturnToMonke'




export default function App() {
  return (
    <Web3ReactManager>
      <Switch>
        <Route exact path={AIRDROP_PATH} component={AirdropPage} />
        <Route exact path={SWAP_PATH} component={Swap} />
        <Route exact path={BRIDGE_PATH} component={Bridge} />
        <Route exact path={POOLS_PATH} component={Pools} />
        <Route path={`${POOLS_PATH}/:id`} component={Pool} />
        <Route path={STAKE_PATH} component={Stake} />
        <Route path={CONTRACTS_PATH} component={ContractInfo} />
        <Route path={PORTFOLIO_PATH} component={Portfolio} />
        <Route path="/home" component={Home} />
        <Route path={SYNAPSE_PFP_PATH} component={ReturnToMonkePage} />
        <Route exact path="/migrator">
          <Redirect to={AIRDROP_PATH} />
        </Route>
      </Switch>
    </Web3ReactManager>
  )
}

