

export function getWalletStyle(walletId) {
  switch (walletId) {
    case 'metamask':      return "hover:!border-orange-500"
    case 'walletconnect': return "hover:!border-sky-500"
    case 'binancewallet': return "hover:!border-yellow-500"
    default:
      return ""
  }
}



export function getWalletHoverShadow(walletId) {
  switch (walletId) {
    case 'metamask':      return "shadow-orange-lg hover:!shadow-orange-2xl"
    case 'walletconnect': return "shadow-sky-lg hover:!shadow-sky-2xl"
    case 'binancewallet': return "shadow-yellow-lg hover:!shadow-yellow-2xl"
    default:
      return ""
  }
}

