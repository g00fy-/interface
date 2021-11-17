import { Zero } from '@ethersproject/constants'

import { Transition } from '@headlessui/react'

import {
  commifyBnToString,
  commifyBnWithDefault,
  bnPercentFormat,
} from '@bignumber/format'

import { PRICE_UNITS_INDEX } from '@constants/priceUnits'

import Grid from '@tw/Grid'

import InfoListItem from '@components/InfoListItem'
import AugmentWithUnits from '@components/AugmentWithUnits'

import InfoSectionCard from './InfoSectionCard'
import UserPoolInfoCard from './UserPoolInfoCard'
import CurrencyReservesCard from './CurrencyReservesCard'



export default function PoolInfoSection({ data, userData }) {
  const swapFee = bnPercentFormat(data?.swapFee)
  // const defaultDepositFee = bnPercentFormat(data?.defaultDepositFee)
  let adminFee = bnPercentFormat(data?.adminFee)

  if (swapFee && adminFee) {
    adminFee = `${adminFee} of ${swapFee}`
  }

  const standardUnits = PRICE_UNITS_INDEX[data?.name] ?? ''


  const tokens = data?.tokens
  const underlyingTokens = data?.underlyingTokens
  let displayDecimals
  if (standardUnits === "ETH") {
    displayDecimals = 3
  } else {
    displayDecimals = 0
  }
  const totalLocked = commifyBnWithDefault(data?.totalLocked, displayDecimals)
  const totalLockedUSD = commifyBnWithDefault( data?.totalLockedUSD ?? Zero, 0 )

  const virtualPrice = data?.virtualPrice
    ? commifyBnToString(data.virtualPrice, 5)
    : null

  return (
    <Grid cols={{ xs: 1, sm: 2 }} gap={4} className='mt-2'>
      <div className='space-y-4'>
        <InfoTransition show={userData ? true : false}>
          <UserPoolInfoCard data={userData} />
        </InfoTransition>
        <InfoTransition show={Boolean(tokens)}>
          {tokens && <CurrencyReservesCard title="Currency Reserves" tokens={tokens} underlyingTokens={underlyingTokens} />}
        </InfoTransition>
      </div>
      <div>
        <InfoTransition show={totalLockedUSD ? true : false}>
          <InfoSectionCard title='Pool Info'>
            <InfoListItem labelText='Trading Fee' content={swapFee} />
            <InfoListItem
              labelText='Virtual Price'
              content={
                <AugmentWithUnits
                  content={virtualPrice}
                  label={standardUnits}
                />
              }
            />
            <InfoListItem
              labelText='Total Liquidity'
              content={
                <AugmentWithUnits
                  content={totalLocked}
                  label={standardUnits}
                />
              }
            />
            <InfoListItem
              labelText='Total Liquidity USD'
              content={`$${totalLockedUSD}`}
            />
          </InfoSectionCard>
        </InfoTransition>
      </div>
    </Grid>
  )
}

function InfoTransition({ show, children }) {
  return (
    <Transition
      show={show}
      enter='transition-all duration-75'
      enterFrom='opacity-0 scale-0'
      enterTo='opacity-100 scale-100'
      leave='transition-all duration-150'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-0'
      className='origin-center transform-gpu'
    >
      {children}
    </Transition>
  )
}
