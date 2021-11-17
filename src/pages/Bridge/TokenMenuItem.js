import { useRef, useEffect } from 'react'

import { commify } from '@ethersproject/units'
import { formatBnMagic } from '@bignumber/format'

import { useTokenBalance, useGenericTokenBalance } from '@hooks/tokens/useTokenBalances'
import { useTokenInfo, getTokenOnChain } from '@hooks/tokens/useTokenInfo'

import {
  getBorderStyleForCoin,
  getMenuItemStyleForCoinDark,
  getSwapBorderHoverStyleForCoin,
  getMenuItemStyleForCoinCombined
} from '@styles/coins'



export default function TokenMenuItem({chainId, active, coin, selected, onClick}) {
  const ref = useRef(null)

  const tokenBalance = useGenericTokenBalance(chainId, coin)
  const tokenInfo = getTokenOnChain(chainId, coin)

  const formattedBalance = commify(formatBnMagic(tokenBalance, tokenInfo, 2))

  const isCurrentlySelected = selected.symbol === coin.symbol

  useEffect(() => {
    if (active) {
      ref?.current?.focus()
    }
  }, [active])


  let isCurrentClassname
  if (isCurrentlySelected) {
    isCurrentClassname = getBorderStyleForCoin(coin)
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
          ${getMenuItemStyleForCoinCombined(coin)}
          ${isCurrentClassname}
        `}
      >
        <img
          className="w-6 mr-2 inline-block rounded"
          src={coin.icon}
        />
        <div className="inline-block">
          <span className="dark:text-coolGray-300">
            {coin.symbol}
          </span>
          <span className="text-coolGray-500 text-sm">
            {" "} - {coin.name}
          </span>

        </div>
        <div className="inline-block float-right pt-1.5">
          {!tokenBalance.eq(0) &&
            <p className="text-xs text-coolGray-600 dark:text-coolGray-400 text-right">
              {formattedBalance}
              <span className="text-coolGray-400 dark:text-coolGray-500">
                {" "}{coin.symbol}
              </span>
            </p>
          }
        </div>
      </div>
    </div>
  )
}