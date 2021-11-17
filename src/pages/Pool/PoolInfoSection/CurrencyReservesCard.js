import { commifyBnToString } from '@bignumber/format'

import { useSwapableTokensMap } from '@hooks/tokens/useSwapableTokens'

import InfoListItem from '@components/InfoListItem'
import AugmentWithUnits from '@components/AugmentWithUnits'

import InfoSectionCard from './InfoSectionCard'
import InfoSection from '@components/InfoSection'


export default function CurrencyReservesCard({ title, tokens, underlyingTokens }) {
  return (
    <InfoSectionCard title={title}>
      {
        tokens.map((token, idx) => {
          return (
            <div>
              <CurrencyInfoListItem
                key={token.symbol}
                {...token}
              />
              <InfoSection
                showDivider={false}
                showOutline={false}
                className="pl-8"
              >
              {((underlyingTokens?.length > 0) && (idx === tokens.length - 1)) &&
                underlyingTokens.map( underlyingToken =>
                    <CurrencyInfoListItem
                      key={underlyingToken.symbol}
                      {...underlyingToken}
                    />
                  )
              }
              </InfoSection>
            </div>
          )
        })
      }
    </InfoSectionCard>
  )
}



function CurrencyInfoListItem({ symbol, percent, value }) {
  const swapableTokensMap = useSwapableTokensMap()
  const { name, icon, swapableType } = swapableTokensMap[symbol]

  let decimalsToDisplay
  if (swapableType == "USD") {
    decimalsToDisplay = 0
  } else {
    decimalsToDisplay = 2
  }

  return (
    <InfoListItem
      labelText={
        <div className='inline-flex items-center'>
          <img
            className='relative text-white shadow-solid w-6 mr-2'
            src={icon}
          />
          <div>
            <div>
              {name}
            </div>
            <div className='font-medium'>
              {percent}
            </div>
          </div>
        </div>
      }
      content={
        <AugmentWithUnits
          content={commifyBnToString(value, decimalsToDisplay)}
          label={symbol}
        />
      }
    />
  )
}