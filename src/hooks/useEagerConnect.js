import { useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { isMobile } from 'react-device-detect'

import { injected } from '@connectors'


export function useEagerConnect() {
  const { activate, active } = useWeb3React() // specifically using useWeb3React because of what this hook does

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized || (isMobile && window.ethereum)) {
        activate(injected, undefined, true).catch(() => setTried(true) )
      } else {
        setTried(true)
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

