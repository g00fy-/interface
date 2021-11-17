import { formatBNToPercentString, formatBNToString } from '@bignumber/format'


export default function PriceImpactDisplay({priceImpact}) {
  let colorClassName
  let labelText
  if (priceImpact.gt(0)) {
    colorClassName = "text-green-500"
    labelText      = "Bonus"
  } else if (priceImpact.lt(0)) {
    colorClassName = "text-red-500"
    labelText      = "Price Impact"
  }


  let content
  if (priceImpact.eq(0)) {
    content = ""
  } else {
    content =
      <div className='text-center sm:text-right cursor-pointer'>
        <p className=' text-sm font-medium opacity-70 pb-0.5 dark:text-coolGray-300'>
          {labelText}
        </p>
        <span
          className={`
          pl-2 text-md font-medium ml-auto
          ${priceImpact.lt(0) ? 'text-red-500' : 'text-green-500'}
        `}
        >
          {formatBNToString(priceImpact.mul(100), 18, 6)}%
        </span>
      </div>
  }
  return (
    content
  )
}




// <div className="inline-flex mt-3 text-sm dark:text-coolGray-500">
//   {labelText &&
//     <div>

//       <div className={labelClassName}>{labelText}: </div>{' '}
//       <div className={`${colorClassName} ${numberClassName}`}>

//         {/* {formatBNToString(priceImpact.mul(10 ** 2 ), 18, 2)}% */}
//       </div>
//     </div>
//   }
// </div>