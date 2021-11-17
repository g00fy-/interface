import _ from 'lodash'

import { useTokenBalance } from '@hooks/tokens/useTokenBalances'
import { useSwapPoolDeposit } from '@hooks/useSwapPoolDeposit'
import { useApproveAndDeposit } from '@hooks/actions/useApproveAndDeposit'

import Button from '@tw/Button'
import TokenInput from '@components/TokenInput'
import PoolStakingButton from '@components/PoolStakingButton'


import PriceImpactDisplay from './PriceImpactDisplay'
import { ETH, WETH } from '@constants/tokens/basic'


export default function PoolManagementDeposit({ poolName, poolStakingLink, poolStakingLinkText }) {
  const {
    onChangeTokenInputValue,
    clearInputs,
    priceImpact,
    poolTokens,
    inputState,
    tokenInputSum,
    depositAmount
  } = useSwapPoolDeposit(poolName)

  const approveAndDeposit = useApproveAndDeposit(poolName)

  return (
    <div className="flex-col space-y-4">
      <div className="space-y-4 pb-3">
        {
          poolTokens.map( token =>
            <TokenInputWithBalance
              token={token}
              inputValue={inputState[token.symbol]}
              onChangeTokenInputValue={onChangeTokenInputValue}
            />
          )
        }
      </div>
      <Button
        fancy={true}
        disabled={tokenInputSum.eq(0)}
        className="w-full mt-6 text-md items-center px-6 py-3 rounded-xl"
        onClick={async () => {
          const appAndDeposit = await approveAndDeposit({
            slippageCustom: null,
            slippageSelected: 'ONE_TENTH',
            infiniteApproval: true,
            inputState,
            depositAmount
          })
          // Clear input after deposit
          clearInputs()
        }}
      >
        Deposit
      </Button>
      <PriceImpactDisplay priceImpact={priceImpact} />
      {poolStakingLink &&
        <div className="pb-4">
          <PoolStakingButton
            poolName={poolName}
            poolStakingLink={poolStakingLink}
            poolStakingLinkText={poolStakingLinkText}
          />
        </div>
      }
    </div>
  )
}


function TokenInputWithBalance({ token, inputValue, onChangeTokenInputValue }) {
  let balanceToken
  if (token.symbol == WETH.symbol) {
    balanceToken = ETH
  } else {
    balanceToken = token
  }
  const balance = useTokenBalance(balanceToken)

  return (
    <TokenInput
      token={balanceToken}
      key={balanceToken.symbol}
      max={balance}
      inputValue={inputValue}
      onChange={value => onChangeTokenInputValue(token.symbol, value)}
      disabled={false}
    />
  )
}