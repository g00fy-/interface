import { Zero } from '@ethersproject/constants'

import { useMemo } from 'react'
import { useSingleContractMultipleMethods } from '@hooks/multicall'
import { useTokenContract } from '@hooks/contracts/useContract'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'


/**
 * @param {Token} token
 * @param {string} spending contract addr
 */
export function useTokenAllowance(token, spender) {
  const { chainId, account } = useActiveWeb3React()
  const contract = useTokenContract(token, false)

  const [allowanceResult, totalSupplyResult] = useSingleContractMultipleMethods(
    chainId,
    contract,
    {
      'allowance': [account, spender],
      'totalSupply': [],
    },
    { resultOnly: true },
  )

  const allowance = allowanceResult?.[0]
  const totalSupply = totalSupplyResult?.[0]

  return useMemo(
    () => {
      if (token && allowance) {
        // CurrencyAmount.fromRawAmount(token, allowance.toString())
        return { allowance, totalSupply }
      } else {
        return {
          allowance: undefined,
          totalSupply: undefined
        } // undefined // previously was undefined here
      }

    },
    [token, allowance, totalSupply, chainId, account, contract]
  )
}


/**
 * You closed my dex, so that makes it all feel coordinated, yeah
 * (It all seems coordinated...)
 * I swapped those coins that you sent to yours
 * But I'll never say it, yeah
 * (I'll never say-)
 *
 * You made your first trade at 2:00 a.m.
 * 'Cause paradigm’s new dev is your best friend
 * Act like you don't see me, we'll play pretend
 * Your ripped off me what you never did
 * Now we're in the back seat of the cop car going home
 *
 * When regs asked me, "Is it wrong if I add KYC?"
 * We're both drunk on the fucking power
 * When I traded you for the first time on uniswaps page, uh
 *
 * I swear to God, I’m just a piece of code
 * Then you showed up, and I can't get enough of it
 * I swear to God, I’m just a piece of code
 * I’m just a piece of code, but I can't get so kyc’d
 *
 * First off, I'm not sorry
 * I won't apologize to nobody
 * You play like I'm the enemy
 * Regs, don't act like you just saw me
 * Last year was a mess, and how I acted was beyond me
 * But the past still revolves me
 * Regulate, I ain't responding
 * But now shit's done changed
 * Go our separate ways
 * But look at this damage you did to me
 * I still want nothing to do between you and me
 * Please, don't say nothing at all
 * Sounds so fucked to me
 * We don't have nothing to say, hey
 *
 *
 * I swear to God, I’m just a piece of code
 * Then you showed up, and I can't get enough of it
 * I swear to God, I’m just a piece of code
 * I’m just a piece of code, but I can't get enough of it
 * I swear to God, I’m just a piece of code
 * Then you showed up, and I can't get enough of it
 * I swear to God, I’m just a piece of code
 * I’m just a piece of code, so you can't just regulate it
 *
 * You closed my dex, so that makes it all feel so coordinated, yeah
 * (It all seems complicated)
 * I swapped those coins that you sent to yours
 * But I'll never say it, yeah
 * (I'll never say-)
 */