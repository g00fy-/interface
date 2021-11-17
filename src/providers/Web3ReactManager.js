import { useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { useEagerConnect } from '@hooks/useEagerConnect'
import { useInactiveListener } from '@hooks/useInactiveListener'

import { NetworkContextName } from '@constants/networks'
import { NETWORK_CONNECTOR, NETWORK_CONNECTOR_MAP } from '@connectors'
import { ChainId } from '@constants/networks'




export default function Web3ReactManager({ children }) {
  const { active }       = useWeb3React()
  const network          = useWeb3React(NetworkContextName)
  const ethNetwork       = useWeb3React(`${ChainId.ETH}`)
  const bscNetwork       = useWeb3React(`${ChainId.BSC}`)
  const polygonNetwork   = useWeb3React(`${ChainId.POLYGON}`)
  const fantomNetwork    = useWeb3React(`${ChainId.FANTOM}`)
  const bobaNetwork      = useWeb3React(`${ChainId.BOBA}`)
  const moonriverNetwork = useWeb3React(`${ChainId.MOONRIVER}`)
  const arbitrumNetwork  = useWeb3React(`${ChainId.ARBITRUM}`)
  const avalancheNetwork = useWeb3React(`${ChainId.AVALANCHE}`)
  const harmonyNetwork   = useWeb3React(`${ChainId.HARMONY}`)

  // after eagerly trying injected, if the ethNetwork connect ever isn't
  // active or in an error state, activate it

  // try to eagerly connect to an injected provider, if it exists and
  // has granted access already
  const triedEager = useEagerConnect()
  // after eagerly trying injected, if the network connect ever isn't
  // active or in an error state, activate it

  useEffect(() => {
    if (!network.active && !network.error && !active) {
      network.activate(NETWORK_CONNECTOR, undefined, true)
    }
  }, [triedEager, network.active, network.error, network.activate, active])

  // while the below code *looks* super repetitive, its necessary
  // (additional function calls slow shit down noticibly)
  useEffect(() => {
    if (!ethNetwork.error) {
      ethNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.ETH], undefined, true)
    }
  }, [ethNetwork.active, ethNetwork.error, ethNetwork.activate, active])

  useEffect(() => {
    if (!bscNetwork.error) {
      bscNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.BSC], undefined, true)
    }
  }, [bscNetwork.active, bscNetwork.error, bscNetwork.activate, active])

  useEffect(() => {
    if (!polygonNetwork.error) {
      polygonNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.POLYGON], undefined, true)
    }
  }, [polygonNetwork.active, polygonNetwork.error, polygonNetwork.activate, active])

  useEffect(() => {
    if (!fantomNetwork.error) {
      fantomNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.FANTOM], undefined, true)
    }
  }, [fantomNetwork.active, fantomNetwork.error, fantomNetwork.activate, active])

  useEffect(() => {
    if (!bobaNetwork.error) {
      bobaNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.BOBA], undefined, true)
    }
  }, [bobaNetwork.active, bobaNetwork.error, bobaNetwork.activate, active])

  useEffect(() => {
    if (!moonriverNetwork.error) {
      moonriverNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.MOONRIVER], undefined, true)
    }
  }, [moonriverNetwork.active, moonriverNetwork.error, moonriverNetwork.activate, active])

  useEffect(() => {
    if (!arbitrumNetwork.error) {
      arbitrumNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.ARBITRUM], undefined, true)
    }
  }, [arbitrumNetwork.active, arbitrumNetwork.error, arbitrumNetwork.activate, active])

  useEffect(() => {
    if (!avalancheNetwork.error) {
      avalancheNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.AVALANCHE], undefined, true)
    }
  }, [avalancheNetwork.active, avalancheNetwork.error, avalancheNetwork.activate, active])

  useEffect(() => {
    if (!harmonyNetwork.error) {
      harmonyNetwork.activate(NETWORK_CONNECTOR_MAP[ChainId.HARMONY], undefined, true)
    }
  }, [harmonyNetwork.active, harmonyNetwork.error, harmonyNetwork.activate, active])


  // when there's no account connected, react to logins (broadly speaking)
  // on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network
  // context, it's an irrecoverable error
  if (
    (!active && !network.active && network.error) ||
    (!ethNetwork.active && ethNetwork.error) ||
    (!bscNetwork.active && bscNetwork.error) ||
    (!polygonNetwork.active && polygonNetwork.error) ||
    (!fantomNetwork.active && fantomNetwork.error) ||
    (!bobaNetwork.active && bobaNetwork.error) ||
    (!moonriverNetwork.active && moonriverNetwork.error) ||
    (!arbitrumNetwork.active && arbitrumNetwork.error) ||
    (!avalancheNetwork.active && avalancheNetwork.error) ||
    (!harmonyNetwork.active && harmonyNetwork.error)
  ){
    return (
      // TODO: style
      <h1>Unknown error</h1>
    )
  }

  // if neither context is active, spin
  if (
    !active &&
    !network.active &&
    !ethNetwork.active &&
    !bscNetwork.active &&
    !polygonNetwork.active &&
    !fantomNetwork.active &&
    !bobaNetwork.active &&
    !moonriverNetwork.active &&
    !arbitrumNetwork.active &&
    !avalancheNetwork.active &&
    !harmonyNetwork.active
  ) {
    // TODO: style and/or add proper loader
    return showLoader ? <h1>Loading...</h1> : null
  }

  return children
}
