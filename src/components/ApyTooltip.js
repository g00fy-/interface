import { InformationCircleIcon } from '@heroicons/react/outline'

import { fixNumberToPercentageString } from '@utils/fixNumberToPercentageString'

import Grid from '@tw/Grid'
import Tooltip from '@tw/Tooltip'




export default function ApyTooltip({ apyData, baseApyData={}, className }) {
  const compoundedApy = apyData.fullCompoundedAPY
  const weeklyApr     = apyData.weeklyAPR
  const dailyApr      = (weeklyApr / 7)
  const yearlyApr     = weeklyApr * 52

  const baseCompoundedApy = baseApyData.yearlyCompoundedApy ?? 0
  const baseWeeklyApr     = (baseApyData.dailyApr ?? 0 ) * 7
  const baseDailyApr      = baseApyData.dailyApr ?? 0
  const baseYearlyApr     = baseApyData.yearlyApr ?? 0


  return (
    <Tooltip
      title="Rewards"
      content={apyData &&
        <div className="pb-2">
          <Grid cols={{xs:1, sm:1}} gap={2} className="inline-block font-medium">
            <PercentageRow
              title="Daily APR"
              baseApr={baseDailyApr}
              rewardApr={dailyApr}
            />
            <PercentageRow
              title="Weekly APR"
              baseApr={baseWeeklyApr}
              rewardApr={weeklyApr}
            />
            <PercentageRow
              title="Yearly APR"
              baseApr={baseYearlyApr}
              rewardApr={yearlyApr}
            />
            <PercentageRow
              title="Yearly APY"
              baseApr={baseCompoundedApy}
              rewardApr={compoundedApy}
            />
          </Grid>
        </div>
      }
    >
      <InformationCircleIcon
        className="w-4 h-4 inline mx-1 -mt-0.5 text-gray-400 hover:text-gray-600"
      />
    </Tooltip>
  )
}



function PercentageRow({title, rewardApr, baseApr}) {
  const totalApr = baseApr + rewardApr
  return (
    <div>
      <div className=" text-coolGray-100  font-normal text-sm">
        {title}{" "}
        <span className="pl-4 inline-block float-right font-medium">
          {fixNumberToPercentageString(totalApr)}
        </span>
      </div>
      {(baseApr > 0 ) &&
        <small className="float-left font-normal text-coolGray-300 italic">

          {fixNumberToPercentageString(rewardApr)} reward
          {" "}
          +
          {" "}
          {fixNumberToPercentageString(baseApr)} base

        </small>
      }

    </div>
  )
}
