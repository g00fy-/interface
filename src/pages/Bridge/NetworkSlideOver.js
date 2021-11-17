import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { XIcon } from '@heroicons/react/outline'

import { useKeyPress } from '@hooks/useKeyPress'

import { CHAIN_INFO_MAP } from '@constants/networks'

import { SelectSpecificNetworkButton } from '@components/SelectSpecificNetworkButton'


export default function NetworkSlideOver({ selectedChainId, onChangeChain, setDisplayType, isSwapFrom }) {
  const [currentIdx, setCurrentIdx] = useState(-1)

  const networks = _.toPairs(CHAIN_INFO_MAP)

  const ref = useRef(null)

  const escPressed   = useKeyPress("Escape")
  const arrowUp      = useKeyPress("ArrowUp")
  const arrowDown    = useKeyPress("ArrowDown")
  const enterPressed = useKeyPress("Enter")

  function onClose() {
    setCurrentIdx(-1)
    setDisplayType(undefined)
  }


  function escFunc() {
    if (escPressed) {
      onClose()
    }
  }

  useEffect(escFunc, [escPressed])

  function arrowDownFunc() {
    const nextIdx = currentIdx + 1
    if (arrowDown && (nextIdx < networks.length) ) {
      setCurrentIdx(nextIdx)
    }
  }

  useEffect(arrowDownFunc, [arrowDown])

  function arrowUpFunc() {
    const nextIdx = currentIdx - 1
    if (arrowUp && (-1 < nextIdx)) {
      setCurrentIdx(nextIdx)
    }
  }

  useEffect(arrowUpFunc, [arrowUp])

  function enterPressedFunc() {
    if (enterPressed && (currentIdx > -1)){
      onChangeChain(networks[currentIdx].chainId)
      onClose()
    }

  }

  useEffect(enterPressedFunc, [enterPressed])

  useEffect(() => ref?.current?.scrollTo(0,0), [])



  return (
    <div className="max-h-full overflow-auto rounded-2xl pb-4">
      <div className="bg-white dark:bg-coolGray-800 absolute w-full px-6 pt-3 rounded-t-xl">
        <div className="font-medium text-lg mb-2">
          <span className="dark:text-coolGray-400">
            {isSwapFrom ? "From Chain" : "To Chain"}
          </span>
          <div
            className={`
              inline-block float-right p-2
              group hover:bg-coolGray-50
              border border-white hover:border-coolGray-100 focus-within:border-coolGray-500
              rounded-full -mt-1
              dark:hover:bg-coolGray-900
              dark:border-transparent dark:hover:border-coolGray-800
              `
            }
            onClick={onClose}
          >
            <XIcon
              className={`
                w-5 text-coolGray-500 group-hover:text-coolGray-800 focus:text-coolGray-900
                dark:group-hover:text-coolGray-400 dark:focus:text-coolGray-800
              `}
            />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`
          bg-white dark:bg-coolGray-800
          pt-16 px-6 rounded-xl text-base focus:outline-none
          overflow-hidden z-10 w-full
          space-y-4
        `}
      >
        {
          networks.map(([rawItemChainId, retard]) => {
            const itemChainId = parseInt(rawItemChainId)
            const isCurrentChain = selectedChainId == itemChainId

            let onClickSpecificNetwork
            if (isCurrentChain) {
              onClickSpecificNetwork = () => console.log("INCEPTION")
            } else {
              onClickSpecificNetwork = () => {
                onChangeChain(itemChainId)
                onClose()
              }
            }
            return (
              <SelectSpecificNetworkButton
                itemChainId={itemChainId}
                isCurrentChain={isCurrentChain}
                onClick={onClickSpecificNetwork}
              />
            )
          })
        }
      </div>
    </div>
  )
}
