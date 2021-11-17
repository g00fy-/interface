import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

import Fuse from 'fuse.js'

import { XIcon } from '@heroicons/react/outline'

import { useKeyPress } from '@hooks/useKeyPress'


import TokenMenuItem from './TokenMenuItem'




export default function CoinSlideOver({ chainId, tokens, onChangeSelected, selected, setDisplayType, isSwapFrom }) {
  const [currentIdx, setCurrentIdx] = useState(-1)

  const [searchStr, setSearchStr] = useState(null)


  const fuse = new Fuse(tokens, {
    includeScore: true,
    keys: [
      {
        name: 'symbol',
        weight: 2
      },
      `addresses.${chainId}`,
      'name',
    ]
  })



  let resultTokens
  if (searchStr?.length > 0) {
    resultTokens = fuse.search(searchStr).map(i => i.item)
  } else {
    resultTokens = tokens
  }

  const ref = useRef(null)

  const escPressed   = useKeyPress("Escape")
  const arrowUp      = useKeyPress("ArrowUp")
  const arrowDown    = useKeyPress("ArrowDown")
  const enterPressed = useKeyPress("Enter")

  function onClose() {
    setCurrentIdx(-1)
    setDisplayType(undefined)
  }

  function onMenuItemClick(coin) {
    onChangeSelected(coin)
    onClose()
  }

  function escFunc() {
    if (escPressed) {
      onClose()
    }
  }

  useEffect(escFunc, [escPressed])

  function arrowDownFunc() {
    const nextIdx = currentIdx + 1
    if (arrowDown && (nextIdx < resultTokens.length) ) {
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
      onMenuItemClick(resultTokens[currentIdx])
    }
  }

  useEffect(enterPressedFunc, [enterPressed])

  useEffect(() => ref?.current?.scrollTo(0,0), [])


  function onSearch(e) {
    setSearchStr(e.target.value)
    setCurrentIdx(-1)
  }

  return (
    <div className="max-h-full overflow-scroll rounded-2xl">
      <div className="bg-white dark:bg-coolGray-800 absolute w-full px-6 pt-3 rounded-t-xl">
        <div className="font-medium text-lg mb-2">
          <span className="dark:text-coolGray-400">
            {isSwapFrom ? "From" : "To"}
          </span>
          <TokenSearchBox
            searchStr={searchStr}
            onSearch={onSearch}
          />
          <div
            className={`
              inline-block float-right p-2
              group hover:bg-coolGray-50
              border border-white hover:border-coolGray-100 focus-within:border-coolGray-500
              rounded-full -mt-1
              dark:hover:bg-coolGray-900
              dark:border-transparent dark:hover:border-coolGray-800
            `}
            onClick={onClose}
          >
            <XIcon
              className={`
                w-5 text-coolGray-500  group-hover:text-coolGray-800 focus:text-coolGray-900
                dark:group-hover:text-coolGray-400 dark:focus:text-coolGray-800
              `}
            />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className="bg-white dark:bg-coolGray-800 pt-12 rounded-xl text-base focus:outline-none overflow-scroll z-10 w-full"
      >
        {
          resultTokens.map((coin, idx) => (
            <TokenMenuItem
              chainId={chainId}
              coin={coin}
              selected={selected}
              active={idx === currentIdx}
              onClick={() => {
                onMenuItemClick(coin)
              }}
            />
          ))
        }
        {
          (resultTokens?.length === 0) && (
            <div className="px-6 py-4 text-coolGray-500">

              No results found for <i className="text-coolGray-400">{searchStr}</i>, try a different query
              <div className="text-center pt-4 align-bottom">
                <a
                  className="text-coolGray-400 hover:text-blue-600 underline cursor-pointer "
                  onClick={() => onSearch("")}
                >
                  Show All Tokens
                </a>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

function TokenSearchBox({ searchStr, onSearch }) {
  const inputRef = useRef(null)
  useEffect(() => inputRef.current?.focus() , [])

  return (
    <input
      ref={inputRef}
      className={`
        italic text-sm
        focus:outline-none
        hidden sm:inline-block
        flex-grow
        h-full min-w-[70%]
        ml-2 mr-auto
        py-1 pl-3 pr-2
        rounded
        bg-transparent
        dark:hover:bg-coolGray-700 dark:active:bg-coolGray-700 dark:focus:bg-coolGray-700
        dark:text-coolGray-400
        dark:placeholder-coolGray-500
      `}
      placeholder={`Search by symbol, address, etc`}
      onChange={onSearch}
      value={searchStr}
    />
  )
}