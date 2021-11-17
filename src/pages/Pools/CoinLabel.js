import { getButtonStyleForCoin, getCoinTextColorDark } from '@styles/coins'


export default function CoinLabel({ coin }) {
  return (
    <div className="justify-self-center">
      <div className={`rounded-full border self-center py-1 px-2 min-w-[96px] ${getButtonStyleForCoin(coin)}`}>
        <img alt="" className="inline-block -mt-1 w-5 mr-1" src={coin.icon}></img>
        <span className={`text-md px-1 font-medium ${getCoinTextColorDark(coin)}`}>
          {coin.symbol}
        </span>
      </div>
    </div>
  )
}