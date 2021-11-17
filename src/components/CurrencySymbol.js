export default function CurrencySymbol({children, symbol}) {
  return (
    <>
      {children}{' '}
      <span className="text-gray-700 text-xs">
        {symbol}{' '}
      </span>
    </>
  )
}