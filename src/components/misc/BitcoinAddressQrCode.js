import QrCode from "qrcode.react"


export default function BitcoinAddressQrCode({ address, amount, message, ...props }) {
  // ? amount = ${ amount }& message=${ encodeURIComponent message }
  return (
    <QrCode
      value={`bitcoin:${address}`}
      {...props}
    />
  )
}