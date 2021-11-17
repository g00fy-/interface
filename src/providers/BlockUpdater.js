import { useEffect } from 'react'
import { CHAIN_BLOCK_TIME, ChainId, BLOCK_TIME } from '@constants/networks'

import { usePoller } from '@hooks/usePoller'

import { useBlockNumber } from '@hooks/useBlockNumber'
import { useGenericMulticall2Contract } from '@hooks/contracts/useMulticallContract'


/**
 * This should be rewritten to trigger updates based on subscrptions rather than polling
 */
export function BlockUpdater() {
  const ethMulticall2Contract       = useGenericMulticall2Contract(ChainId.ETH)
  const bscMulticall2Contract       = useGenericMulticall2Contract(ChainId.BSC)
  const polygonMulticall2Contract   = useGenericMulticall2Contract(ChainId.POLYGON)
  const fantomMulticall2Contract    = useGenericMulticall2Contract(ChainId.FANTOM)
  const bobaMulticall2Contract      = useGenericMulticall2Contract(ChainId.BOBA)
  const moonriverMulticall2Contract = useGenericMulticall2Contract(ChainId.MOONRIVER)
  const arbitrumMulticall2Contract  = useGenericMulticall2Contract(ChainId.ARBITRUM)
  const avalancheMulticall2Contract = useGenericMulticall2Contract(ChainId.AVALANCHE)
  const harmonyMulticall2Contract   = useGenericMulticall2Contract(ChainId.HARMONY)

  const [ethBlockNumber, setBlockNumberEth]             = useBlockNumber(ChainId.ETH)
  const [bscBlockNumber, setBlockNumberBsc]             = useBlockNumber(ChainId.BSC)
  const [polygonBlockNumber, setBlockNumberPolygon]     = useBlockNumber(ChainId.POLYGON)
  const [fantomBlockNumber, setBlockNumberFantom]       = useBlockNumber(ChainId.FANTOM)
  const [bobaBlockNumber, setBlockNumberBoba]           = useBlockNumber(ChainId.BOBA)
  const [moonriverBlockNumber, setBlockNumberMoonriver] = useBlockNumber(ChainId.MOONRIVER)
  const [arbitrumBlockNumber, setBlockNumberArbitrum]   = useBlockNumber(ChainId.ARBITRUM)
  const [avalancheBlockNumber, setBlockNumberAvalanche] = useBlockNumber(ChainId.AVALANCHE)
  const [harmonyBlockNumber, setBlockNumberHarmony]     = useBlockNumber(ChainId.HARMONY)


  function updaterFunc() {
    ethMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(ethBlockNumber)) {
          setBlockNumberEth(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    bscMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(bscBlockNumber)) {
          setBlockNumberBsc(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    polygonMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(polygonBlockNumber)) {
          setBlockNumberPolygon(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    fantomMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(fantomBlockNumber)) {
          setBlockNumberFantom(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    bobaMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(bobaBlockNumber)) {
          setBlockNumberBoba(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    moonriverMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(moonriverBlockNumber)) {
          setBlockNumberMoonriver(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    arbitrumMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(arbitrumBlockNumber)) {
          setBlockNumberArbitrum(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    avalancheMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(avalancheBlockNumber)) {
          setBlockNumberAvalanche(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))

    harmonyMulticall2Contract?.getBlockNumber()
      .then(blockNumber => {
        if (!blockNumber?.eq(harmonyBlockNumber)) {
          setBlockNumberHarmony(blockNumber)
        }
      })
      .catch(error => console.log(`error updating block number ${error}`))
  }

  useEffect(updaterFunc, [])
  usePoller(updaterFunc, BLOCK_TIME) //CHAIN_BLOCK_TIME[chainId])


  return null
}
