import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { ChainId } from '@constants/networks'


export function useGetBlockTime({ chainId }) {
  const { library } = useWeb3React(`${chainId}`)

  [blockHeightTimes, setBlockHeightTimes] = useState({})



  return async function getBlockTime(height) {
    if (blockHeightTimes[height]) {
      return blockHeightTimes[height]
    } else {
      const block = await library.getBlock(height)
      setBlockHeightTimes({...blockHeightTimes, [height]: block.timestamp })
      return block.timestamp
    }
  }
}
