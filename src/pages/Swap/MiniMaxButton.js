import Tooltip from '@tw/Tooltip'
import Button from '@tw/Button'



export default function MiniMaxButton({
  tokenBalance,
  formattedBalance,
  onChangeAmount,
  inputValue,
  selected,
  onClickBalance
}) {
  // console.log({tokenBalance, inputValue})
  return (
    <Tooltip content={
      <>
        <b>{formattedBalance}</b> {selected.symbol}
      </>
    }>
      <Button
        className="pt-1 pb-1 text-xs"
        // fancy={allowMax}
        fancy={formattedBalance == `${Number(inputValue)}`}
        outline={true}
        onClick={onClickBalance}
      >
        Max
      </Button>
    </Tooltip>
  )
}
