import _ from 'lodash'

import Grid from '@tw/Grid'

import { getCoinTextColorDark } from '@styles/coins'
import { commify } from '@ethersproject/units'
import { sanitizeValue } from '@utils/sanitizeValue'


export default function RecievedTokenSection({ inputState, poolTokens, label }) {
  return (
    <div className='text-center sm:text-left'>
      <p className='text-sm font-medium bg-opacity-70 pb-0.5 dark:text-coolGray-400'>
        {label ?? "You will receive "}
      </p>
      <Grid cols={{ xs: 2 }} gapX={2} >
        {
          poolTokens
            .filter(token => sanitizeValue(inputState[token.symbol]) > 0)
            .map((token) => {
              return (
                  <div className={`  rounded-full  self-center min-w-[96px] `}>
                    <span className={getCoinTextColorDark(token)}>
                      {commify(_.round(inputState[token.symbol], 2))}
                    </span>
                    <span className={`text-sm px-1 font-medium ${getCoinTextColorDark(token)}`}>
                      {token.symbol}
                    </span>
                    <img alt="" className="inline-block -mt-0.5 w-4 mr-1" src={token.icon}></img>
                  </div>
              )
            })
        }

      </Grid>
    </div>

  )
}