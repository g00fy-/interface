import { useRef, useEffect } from 'react'

import { commify } from '@ethersproject/units'
import { formatBnMagic } from '@bignumber/format'

import { useTokenBalance } from '@hooks/tokens/useTokenBalances'
import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

import {
  getBorderStyleForCoin,
  getMenuItemStyleForCoinCombined
} from '@styles/coins'
import { ETH, WETH } from '@constants/tokens/basic'



export default function TokenMenuItem({active, coin, selected, onClick}) {
  const ref = useRef(null)
  let balanceCoin
  if (coin.symbol == WETH.symbol) {
    balanceCoin = ETH
  } else {
    balanceCoin = coin
  }
  const tokenBalance = useTokenBalance(balanceCoin)
  const tokenInfo = useTokenInfo(coin)
  const formattedBalance = commify(formatBnMagic(tokenBalance, tokenInfo, 2))

  const isCurrentlySelected = selected.symbol === coin.symbol

  useEffect(() => {
    if (active) {
      ref?.current?.focus()
    }
  }, [active])


  let isCurrentClassname
  if (isCurrentlySelected) {
    isCurrentClassname = getBorderStyleForCoin(balanceCoin)
  } else {
    isCurrentClassname = 'dark:border-coolGray-700'
  }

  return (
    <div className="px-2 py-1 bg-transparent">
      <div
        ref={ref}
        tabindex={active ? "1" : "0"} // might be -1 instead of 0
        onClick={onClick}
        className={`
          cursor-pointer px-4 py-2 transition w-full
          rounded-lg border focus:outline-none
          ${getMenuItemStyleForCoinCombined(balanceCoin)}
          ${isCurrentClassname}
        `}
      >
        <img
          className="w-6 mr-2 inline-block "
          src={balanceCoin.icon}
        />
        <div className="inline-block">
          <span className="dark:text-coolGray-300">
            {balanceCoin.symbol}
          </span>
          <span className="text-coolGray-500 text-sm">
            {" "} - {balanceCoin.name}
          </span>

        </div>
        <div className="inline-block float-right pt-1.5">
          {!tokenBalance.eq(0) &&
            <p className="text-xs text-coolGray-600 dark:text-coolGray-400 text-right">
              {formattedBalance}
              <span className="text-coolGray-400 dark:text-coolGray-500">
                {" "}{balanceCoin.symbol}
              </span>
            </p>
          }
        </div>
      </div>
    </div>
  )
}