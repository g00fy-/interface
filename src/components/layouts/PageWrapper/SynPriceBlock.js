import _ from 'lodash'

import { useSynPrices } from '@hooks/useSynPrices'


import SynapseLogoSvg from '@icons/SynapseLogoSvg'


export default function SynPriceBlock() {

  const synPriceData = useSynPrices()

  const synPrice = synPriceData.synPrice
  const roundedSynPrice = _.round(synPrice, 4) // Math.round(synPrice * 10000) / 10000

  return (
    <div className='inline-block'>
      <p className='text-sm dark:font-light text-default dark:text-coolGray-500'>
        SYN
        {" "}
        <SynapseLogoSvg className="inline w-4 h-4"/>
        {" "}
        ${_.isNaN(roundedSynPrice) ? " - " : roundedSynPrice}
      </p>
    </div>
  )
}
