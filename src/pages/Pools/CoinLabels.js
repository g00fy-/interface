import Grid from '@tw/Grid'
import CoinLabel from './CoinLabel'



export default function CoinLabels({ coins }) {

  const maxGrid = coins.length

  let numCols = 3
  if (maxGrid < numCols) {
    numCols = maxGrid
  } else if (maxGrid == 4) {
    numCols = 2
  }

  return (
    <Grid
      cols={{
        xs: 2,
        sm: 2,
        md: 2,
        lg: numCols
      }}
      gap={2}
      className='pt-2'
    >
      {coins.map(coin => (
        <CoinLabel
          key={coin.symbol}
          coin={coin}
        />
      ))}
    </Grid>
  )
}