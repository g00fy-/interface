import InteractiveInputRow from '@components/InteractiveInputRow'


import { formatBNToString } from '@bignumber/format'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { formatUnits } from '@ethersproject/units'
import { checkValidNumberInput } from '@utils/checkValidNumberInput'


export default function TokenInput({
  token,
  max,
  inputValue,
  onChange,
}) {
  const { chainId } = useActiveWeb3React()


  function onClickMax(e) {
    e.preventDefault()
    const maxStr = formatUnits(max, token.decimals[chainId])
    if (maxStr != 'undefined') {
      onChange(maxStr)
    }
  }

  function onChangeInput(e) {
    if (checkValidNumberInput(e.target.value)) {
      onChange(e.target.value)
    }
  }


  let balanceStr
  if (max && max != '') {
    balanceStr = formatBNToString(max, token.decimals[chainId], 4)
  } else {
    balanceStr = '0.0'
  }

  return (
    <div className='items-center'>
      <div className='w-full'>
        <InteractiveInputRow
          title={token.symbol}
          balanceStr={balanceStr}
          onClickBalance={onClickMax}
          value={inputValue}
          placeholder={'0.0'}
          onChange={onChangeInput}
          disabled={inputValue == ''}
          showButton={false}
          icon={token.icon}
        />
      </div>
    </div>
  )
}

