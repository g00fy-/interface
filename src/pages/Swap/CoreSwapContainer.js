
import _ from 'lodash'

import { Zero } from '@ethersproject/constants'

import { formatBNToString } from '@bignumber/format'

import { ChevronDownIcon } from '@heroicons/react/outline'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import { useTokenBalance } from '@hooks/tokens/useTokenBalances'

import {
  getSwapBorderStyleForCoin,
  getInputBorderFocusStyleForCoin,
  getMenuItemBgForCoin,
  getMenuItemHoverBgForCoin,
  getSwapBorderHoverStyleForCoin,
} from '@styles/coins'

import MiniMaxButton from '@components/MiniMaxButton'
import SwitchButton from '@components/SwitchButton'
import { ETH, WETH } from '@constants/tokens/basic'


export default function CoreSwapContainer({
  selected,
  inputValue,
  isSwapFrom,
  onChangeAmount,
  swapFromToCoins,
  setDisplayType,
  inputRef
}) {
  const { chainId } = useActiveWeb3React()

  let balanceCoin
  if (selected.symbol == WETH.symbol) {
    balanceCoin = ETH
  } else {
    balanceCoin = selected
  }
  const tokenBalance = useTokenBalance(balanceCoin) ?? Zero
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


  return (
    <div
      className={`
        text-left px-4 pt-2 pb-4 rounded-xl
        ${!isSwapFrom && getMenuItemBgForCoin(balanceCoin)}
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
                  selected={selected}
                  onClick={swapFromToCoins}
                  className={getSwapBorderStyleForCoin(balanceCoin)}
                  innerClassName={getSwapBorderHoverStyleForCoin(balanceCoin)}
                />
              </div>
            </div>
          }
          <span className="dark:text-coolGray-300">
            {isSwapFrom ? "From" : "To"}
          </span>
        </div>

        {isSwapFrom &&
          <a onClick={onClickBalance} className="hover:underline group">
            <small
              className={`
                inline-block float-right mt-1
                text-coolGray-500 group-hover:underline
                cursor-pointer
              `}
            >
              Max: {' '}
              <span className="text-coolGray-800 dark:text-coolGray-400 font-medium ">
                {formattedBalance}
              </span>
            {' '} {balanceCoin.symbol}
            </small>
          </a>
        }
      </div>
      <div className='h-16 flex space-x-2'>
        <div
          className={`
            rounded-xl -ml-2 px-2 py-2 h-16 flex-grow
            ${getMenuItemHoverBgForCoin(selected)}
          `}
        >
          <div
            className="flex self-center"
            onClick={() => setDisplayType(isSwapFrom ? "from" : "to")}
          >
            <div className="mr-4 flex-shrink-0 self-center hidden sm:block">
              <img
                className='w-8 h-8 '
                src={balanceCoin.icon}
              />
            </div>
            <div className="text-left cursor-pointer">
              <h4 className="text-lg font-medium ">
                <span className="dark:text-coolGray-400">
                  {balanceCoin.symbol}
                </span>
                <ChevronDownIcon
                  className="w-4 inline -mt-1 ml-2 text-coolGray-600 transform transition-all"
                />
              </h4>
              <p className="text-sm text-gray-500 hidden sm:block ">
                {balanceCoin.name}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`
            flex-grow items-stretch  h-16  border px-3 sm:px-4 py-1 sm:py-2 rounded-xl
            ${getInputBorderFocusStyleForCoin(balanceCoin)}
            ${ isSwapFrom ?
                `
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
            className={`
              ml-auto mr-2
              focus:outline-none
              bg-transparent
              h-full font-mono
              dark:text-coolGray-300
            `}
            placeholder='0.0'
            onChange={onChange}
            value={inputValue}
          />
          { isSwapFrom &&
            <div className="hidden sm:inline-block">
              <MiniMaxButton
                tokenBalance={tokenBalance}
                formattedBalance={formattedBalance}
                inputValue={inputValue}
                onClickBalance={onClickBalance}
                selected={selected}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
