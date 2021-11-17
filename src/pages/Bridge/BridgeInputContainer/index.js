
import _ from 'lodash'

import { Zero } from '@ethersproject/constants'

import { formatBNToString } from '@bignumber/format'

import { useTokenBalance } from '@hooks/tokens/useTokenBalances'


import { ChevronDownIcon } from '@heroicons/react/outline'


import {
  getInputBorderFocusStyleForCoin,
  getMenuItemHoverBgForCoin,
} from '@styles/coins'


import MiniMaxButton from '@components/MiniMaxButton'



import {
  getNetworkBgClassName,
  getNetworkButtonBorder,
} from '@styles/networks'

import SwitchButton from '@components/SwitchButton'

import SelectTokenDropdown from './SelectTokenDropdown'
import ChainLabel from './ChainLabel'

export default function BridgeInputContainer({
  selected,
  inputValue,
  isSwapFrom,
  onChangeAmount,
  swapFromToChains,
  setDisplayType,
  inputRef,
  chainId
}) {
  const tokenBalance      = useTokenBalance(selected) ?? Zero
  const formattedBalance  = formatBNToString(tokenBalance, selected.decimals[chainId], 4)


  function onChange(e) {
    let val = e.target.value

    if (val === "") {
      onChangeAmount("")
    }
    if (val.match(/[0-9.]+/) && !val.match(/[a-zA-Z-\$\/]/) && !val.includes("\\")) {
      onChangeAmount(val.replace(/[$,]/g, '').replace('..', '.'))
    }
  }


  function onClickBalance() {
    onChangeAmount(formatBNToString(tokenBalance, selected.decimals[chainId]))
  }
  let balanceLabel
  if (isSwapFrom) {
    balanceLabel =
      <a onClick={onClickBalance} className="hover:underline group">
        <small
          className={`
                sm:inline-block float-right mt-1 -ml-10 sm:ml-0
                text-coolGray-500 group-hover:underline
                cursor-pointer
              `}
        >
          Max: {' '}
          <span className="text-coolGray-800 dark:text-coolGray-400 font-medium ">
            {formattedBalance}
          </span>
          {' '} {selected.symbol}
        </small>
      </a>
  }
  return (
    <div
      className={`
        text-left px-2 sm:px-4 pt-2 pb-4 rounded-xl
        ${!isSwapFrom && getNetworkBgClassName(chainId)}
        bg-opacity-90 dark:bg-opacity-50
      `}
    >
      <div>
        <div
          className={`
            pb-1 inline-block
            ${!isSwapFrom && "pt-3"}
          `}
        >
          {!isSwapFrom &&
            <div className="absolute">
              <div className="-mt-12">
                <SwitchButton
                  onClick={swapFromToChains}
                  className={`${getNetworkButtonBorder(chainId)} !border-opacity-20 hover:!border-opacity-80`}
                  innerClassName=""
                />
              </div>
            </div>
          }
          <ChainLabel
            isSwapFrom={isSwapFrom}
            chainId={chainId}
            setDisplayType={setDisplayType}
          />
        </div>
        {balanceLabel}
      </div>
      <div className='h-16 flex space-x-2'>
        <div
          className={`
            flex flex-grow
            w-full h-16  border
            pl-3 sm:pl-4
            pr-0 sm:pr-4
            py-1 sm:py-2 rounded-xl
            ${ isSwapFrom ?
                `
                ${getInputBorderFocusStyleForCoin(selected)}
                bg-coolGray-50       border-coolGray-100
                dark:bg-coolGray-900 dark:border-coolGray-900
                `
              : `
                bg-white             border-coolGray-100
                dark:bg-coolGray-800 dark:border-coolGray-800
                `
            }
          `}
        >

          <input
            ref={inputRef}
            pattern="[0-9.]+"
            disabled={!isSwapFrom} // may cause issues idk goal is to prevent to result from being selectable
            className={`
              ml-auto sm:mr-2
              focus:outline-none
              bg-transparent
              h-full font-mono
              dark:text-coolGray-300
              w-[300px]
              sm:w-full
              max-w-[calc(100%-92px)]
              sm:min-w-[300px]
              flex-grow
            `}
            placeholder='0.0'
            onChange={isSwapFrom ? onChange : (() => {})}
            value={inputValue}
          />
          <SelectTokenDropdown
            selected={selected}
            onClick={() => setDisplayType(isSwapFrom ? "from" : "to")}
          />
        </div>
      </div>
    </div>
  )
}

