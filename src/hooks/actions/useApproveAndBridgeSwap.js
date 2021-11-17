import _ from 'lodash'

import toast from 'react-hot-toast'

import { ChainId, CHAIN_INFO_MAP } from '@constants/networks'
import { SYN, NUSD, NETH, WETH, ETH, FRAX } from '@constants/tokens/basic'
import { DOG, HIGHSTREET, JUMP } from '@constants/tokens/mintable'
import { BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN } from '@constants/tokens/tokenGroups'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useBlockNumber } from '@hooks/useBlockNumber'
import { useTxHistory } from '@hooks/useTxHistory'
import { useGetTxArgs } from '@hooks/useGetTxArgs'
import { useAllContracts } from '@hooks/contracts/useAllContracts'
import { useBridgeZapContract } from '@hooks/contracts/useBridgeZapContract'

import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

import { Slippages, subtractSlippage } from '@utils/slippage'

import ExplorerToastLink from '@components/ExplorerToastLink'
import { txErrorHandler } from '@utils/txErrorHandler'

import { validateAndParseAddress } from '@utils/validateAndParseAddress'
import { useDestinationInfo } from '@hooks/store/useDestinationInfo'


export function useApproveAndBridgeSwap() {

  const bridgeZapContract = useBridgeZapContract()

  const nusd       = useTokenInfo(NUSD)
  const neth       = useTokenInfo(NETH)
  const syn        = useTokenInfo(SYN)
  const highstreet = useTokenInfo(HIGHSTREET)
  const dog        = useTokenInfo(DOG)
  const jump       = useTokenInfo(JUMP)
  const frax       = useTokenInfo(FRAX)

  const tokenContracts = useAllContracts()
  const { account, chainId } = useActiveWeb3React()
  const { addTransaction } = useTxHistory()
  const [blockNumber, setBlockNumber] = useBlockNumber(chainId)
  const getTxArgs = useGetTxArgs()

  const [addressesForAccount, setAddressesForAccount] = useDestinationInfo()


  return async function approveAndBridgeSwap({
    destinationAddress,
    fromChainId,
    toChainId,
    fromCoin,
    toCoin,
    fromAmount,
    toAmount,
  }) {
    try {
      if (!account) throw new Error('Wallet must be connected')
      if (!bridgeZapContract) throw new Error('Bridge Zap contract is not loaded')
      let destAddr
      if (destinationAddress && (destinationAddress != "")) {
        if (validateAndParseAddress(destinationAddress)) {
          destAddr = destinationAddress
        } else {
          throw new Error('Destnation Address is invalid')
        }
      } else {
        destAddr = account
      }

      let fromTokenSymbol = fromCoin.symbol
      let toTokenSymbol = toCoin.symbol

      const fromChainName = CHAIN_INFO_MAP[fromChainId].chainName
      const toChainName   = CHAIN_INFO_MAP[toChainId].chainName

      const fromChainTokens = BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN[fromChainId][fromCoin.swapableType].poolTokens
      const toChainTokens = BRIDGE_SWAPABLE_TYPE_POOLS_BY_CHAIN[toChainId][toCoin.swapableType].poolTokens


      const fromSymbol = fromTokenSymbol
      const toSymbol = toTokenSymbol
      if (fromTokenSymbol == ETH.symbol) {
        fromTokenSymbol = WETH.symbol
      }

      if (toTokenSymbol == ETH.symbol) {
        toTokenSymbol = WETH.symbol
      }
      const tokenIndexFrom = fromChainTokens.findIndex(i => i.symbol === fromTokenSymbol)
      const tokenIndexTo = toChainTokens.findIndex(i => i.symbol === toTokenSymbol)
      // For each token being deposited, check the allowance and approve it if necessary

      const tokenContract = tokenContracts?.[fromTokenSymbol]
      if (tokenContract == null) return

      const {
        slippageCustom,
        slippageSelected,
        transactionDeadline,  // in minutes
        bridgeTransactionDeadline,
      } = getTxArgs()


      const selectedGasArgs = [slippageSelected, slippageCustom]
      const twoTenthGasArgs = [Slippages.TwoTenth, slippageCustom]
      const quarterGasArgs = [Slippages.Quarter, slippageCustom]

      const minToSwapOrigin         = subtractSlippage(fromAmount, ...selectedGasArgs)
      const minToSwapDest           = subtractSlippage(toAmount, ...selectedGasArgs)
      const minToSwapDestFromOrigin = subtractSlippage(minToSwapDest, ...selectedGasArgs)

      const minToSwapOriginMediumSlippage         = subtractSlippage(fromAmount, ...twoTenthGasArgs)
      const minToSwapDestMediumSlippage           = subtractSlippage(toAmount, ...twoTenthGasArgs)
      const minToSwapDestFromOriginMediumSlippage = subtractSlippage(minToSwapDestMediumSlippage, ...twoTenthGasArgs)

      const minToSwapOriginHighSlippage         = subtractSlippage(fromAmount, ...quarterGasArgs)
      const minToSwapDestHighSlippage           = subtractSlippage(toAmount, ...quarterGasArgs)
      const minToSwapDestFromOriginHighSlippage = subtractSlippage(minToSwapDestHighSlippage, ...quarterGasArgs)



      let bridgeZapSwapTransaction
      if (fromChainId == ChainId.ETH) {
        if (toTokenSymbol == syn.symbol) {
          // This is the new part added while sleep deprived.
          bridgeZapSwapTransaction = await bridgeZapContract.redeem(
            destAddr, // to address
            toChainId, // to chainId
            syn.address,
            fromAmount,
          )
        } else if (toTokenSymbol == highstreet.symbol) {
          // needs to be merged w/ syn conditional
          bridgeZapSwapTransaction = await bridgeZapContract.deposit(
            destAddr, // to address
            toChainId, // to chainId
            highstreet.address,
            fromAmount,
          )
        } else if (toTokenSymbol == dog.symbol) {
          // needs to be merged w/ syn conditional
          bridgeZapSwapTransaction = await bridgeZapContract.deposit(
            destAddr, // to address
            toChainId, // to chainId
            dog.address,
            fromAmount,
          )
        } else if (toTokenSymbol == frax.symbol) {
          // needs to be merged w/ syn conditional
          bridgeZapSwapTransaction = await bridgeZapContract.deposit(
            destAddr, // to address
            toChainId, // to chainId
            frax.address,
            fromAmount,
          )
        } else if (toTokenSymbol == neth.symbol) {
          bridgeZapSwapTransaction = await bridgeZapContract.depositETH(
            destAddr, // to address
            toChainId, // to chainId
            fromAmount,
            { value: fromAmount }
          )
        } else if (toTokenSymbol == WETH.symbol) {
          bridgeZapSwapTransaction = await bridgeZapContract.depositETHAndSwap(
            destAddr, // to address
            toChainId, // to chainId
            fromAmount,
            0, // tokenIndexFrom for nusd
            tokenIndexTo, // tokenIndexTo + 1,
            minToSwapDestFromOrigin, // minDy
            bridgeTransactionDeadline,
            { value: fromAmount }
          )
        } else if (toTokenSymbol == nusd.symbol) {
          if (fromTokenSymbol == nusd.symbol) {
            bridgeZapSwapTransaction = await bridgeZapContract.deposit(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              fromAmount,
            )
          } else {
            const liquidityAmounts = fromChainTokens.map(t => {
              if (t.symbol === fromTokenSymbol) {
                return fromAmount
              } else {
                return 0
              }
            })
            bridgeZapSwapTransaction = await bridgeZapContract.zapAndDeposit(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              liquidityAmounts,
              minToSwapDest,
              transactionDeadline,
            )
          }
        } else {
          const liquidityAmounts = fromChainTokens.map(t => {
            if (t.symbol === fromTokenSymbol) {
              return fromAmount
            } else {
              return 0
            }
          })
          /** coin on ETH -> coin L2  */
          bridgeZapSwapTransaction = await bridgeZapContract.zapAndDepositAndSwap(
            destAddr,
            toChainId,
            nusd.address,
            liquidityAmounts,
            minToSwapOriginMediumSlippage, // minToSwapOrigin,
            transactionDeadline,
            0, // tokenIndexFrom for nusd
            tokenIndexTo, // tokenIndexTo + 1,
            minToSwapDestFromOriginMediumSlippage, //, minToSwapDestFromOrigin, // minDy
            bridgeTransactionDeadline,
          )
        }
      } else {
        if (toTokenSymbol == syn.symbol) {
          // This is the new part added while sleep deprived.
          bridgeZapSwapTransaction = await bridgeZapContract.redeem(
            destAddr, // to address
            toChainId, // to chainId
            syn.address,
            fromAmount,
          )
        } else if (toTokenSymbol == highstreet.symbol) {
          // This is the new part added while sleep deprived.
          bridgeZapSwapTransaction = await bridgeZapContract.redeem(
            destAddr, // to address
            toChainId, // to chainId
            highstreet.address,
            fromAmount,
          )
        } else if (toTokenSymbol == dog.symbol) {
          bridgeZapSwapTransaction = await bridgeZapContract.redeem(
            destAddr, // to address
            toChainId, // to chainId
            dog.address,
            fromAmount,
          )
        } else if (toTokenSymbol == frax.symbol) {
          bridgeZapSwapTransaction = await bridgeZapContract.redeem(
            destAddr, // to address
            toChainId, // to chainId
            frax.address,
            fromAmount,
          )
        } else if (toTokenSymbol == jump.symbol) {
          if (fromChainId == ChainId.FANTOM) {
            bridgeZapSwapTransaction = await bridgeZapContract.deposit(
              destAddr, // to address
              toChainId, // to chainId
              jump.address,
              fromAmount,
            )
          } else {
            bridgeZapSwapTransaction = await bridgeZapContract.redeem(
              destAddr, // to address
              toChainId, // to chainId
              jump.address,
              fromAmount,
            )
          }

        } else if (toTokenSymbol == nusd.symbol) {
          /** basic token on L2 -> NUSD on ETH */
          if (fromTokenSymbol == nusd.symbol) {
            /** NUSD on L2 -> NUSD on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.redeem(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              fromAmount,
            )
          } else {
            bridgeZapSwapTransaction = await bridgeZapContract.swapAndRedeem(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              tokenIndexFrom, // tokenIndexFrom
              0, // tokenIndexTo, // token
              fromAmount,
              minToSwapOriginHighSlippage,
              transactionDeadline,
            )
          }
        } else if (toTokenSymbol == neth.symbol) {
          /** basic token on L2 -> NUSD on ETH */
          if (fromTokenSymbol == neth.symbol) {
            /** NUSD on L2 -> NUSD on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.redeem(
              destAddr, // to address
              toChainId, // to chainId
              neth.address,
              fromAmount,
            )
          } else {
            bridgeZapSwapTransaction = await bridgeZapContract.swapETHAndRedeem(
              destAddr, // to address
              toChainId, // to chainId
              neth.address,
              tokenIndexFrom, // tokenIndexFrom
              0, // tokenIndexTo, // token
              fromAmount,
              minToSwapOriginHighSlippage,
              transactionDeadline,
              { value: fromAmount },
            )
          }
        } else if (toChainId == ChainId.ETH) {
          /** basic token on L2 -> ETH */
          console.log({ fromChainId, fromTokenSymbol, swapableType: fromCoin.swapableType})
          if ([ChainId.BOBA, ChainId.ARBITRUM].includes(fromChainId) && (fromCoin.swapableType == "ETH")) {
            if (fromTokenSymbol == neth.symbol) {
              bridgeZapSwapTransaction = await bridgeZapContract.redeem(
                destAddr, // to address
                toChainId, // to chainId
                neth.address,
                fromAmount,
              )
            } else {
              bridgeZapSwapTransaction = await bridgeZapContract.swapETHAndRedeem(
                destAddr, // to address
                toChainId, // to chainId
                neth.address,
                tokenIndexFrom, // tokenIndexFrom
                0, // tokenIndexTo, // token
                fromAmount,
                minToSwapOriginHighSlippage, // minToSwapOrigin, // minToSwapOriginHighSlippage,
                transactionDeadline,
                {value: fromAmount},
              )
            }
          } else {
            bridgeZapSwapTransaction = await bridgeZapContract.swapAndRedeemAndRemove(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              tokenIndexFrom,
              0, // tokenIndexTo
              fromAmount,
              minToSwapOriginHighSlippage,
              transactionDeadline,
              tokenIndexTo, //swapTokenIndex
              minToSwapDestFromOriginHighSlippage, // swapMinAmount
              bridgeTransactionDeadline, // toSwapDeadline, // swapDeadline
            )
          }

        } else {
          /** L2 -> L2 */
          if (fromTokenSymbol === nusd.symbol) {
            /** NUSD on L2 -> basic token on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.redeemAndSwap(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              fromAmount,
              0, // tokenIndexFrom, // tokenIndexFrom + 1, // tokenIndexFrom
              tokenIndexTo, // tokenIndexTo + 1, //swapTokenIndex
              minToSwapDest,
              transactionDeadline,
            )
          } else if (fromTokenSymbol === neth.symbol) {
            /** NUSD on L2 -> basic token on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.redeemAndSwap(
              destAddr, // to address
              toChainId, // to chainId
              neth.address,
              fromAmount,
              0, // tokenIndexFrom, // tokenIndexFrom + 1, // tokenIndexFrom
              tokenIndexTo, // tokenIndexTo + 1, //swapTokenIndex
              minToSwapDest,
              transactionDeadline,
            )
          } else if (fromCoin.swapableType == "ETH") {
            /** ETH on L2 -> ETH on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.swapETHAndRedeemAndSwap(
              destAddr, // to address
              toChainId, // to chainId
              neth.address,
              tokenIndexFrom, // tokenIndexFrom + 1, // tokenIndexFrom
              0, // tokenIndexTo, // token
              fromAmount,
              minToSwapOriginHighSlippage,
              transactionDeadline,
              0, // swapTokenIndexFrom
              tokenIndexTo, // tokenIndexTo + 1, //swapTokenIndex
              minToSwapDestFromOriginHighSlippage, // swapMinAmount
              bridgeTransactionDeadline, // toSwapDeadline, // swapDeadline
              { value: fromAmount },
            )
          } else {
            /** stablecoin on L2 -> stablecoin on L2 */
            bridgeZapSwapTransaction = await bridgeZapContract.swapAndRedeemAndSwap(
              destAddr, // to address
              toChainId, // to chainId
              nusd.address,
              tokenIndexFrom, // tokenIndexFrom + 1, // tokenIndexFrom
              0, // tokenIndexTo, // token
              fromAmount,
              minToSwapOriginHighSlippage,
              transactionDeadline,
              0, // swapTokenIndexFrom
              tokenIndexTo, // tokenIndexTo + 1, //swapTokenIndex
              minToSwapDestFromOriginHighSlippage, // swapMinAmount
              bridgeTransactionDeadline, // toSwapDeadline, // swapDeadline
            )
          }
        }
      }


      addTransaction({
        ...bridgeZapSwapTransaction,
        chainId
      })


      toast(`
          Bridging from ${fromSymbol} on ${fromChainName}
          to ${toSymbol} on ${toChainName}
      `)

      const tx = await bridgeZapSwapTransaction.wait()

      addTransaction({...tx, chainId})

      if (destAddr != account) {
        setAddressesForAccount(destAddr)
      }

      if (tx?.status === 1) {
        toast.success(
          <div>
            <div className="w-full">
              Successfully initiated bridge from {fromSymbol} on {fromChainName}{" "}
              to {toSymbol} on {toChainName}
            </div>
            <ExplorerToastLink {...tx} chainId={fromChainId} />
          </div>
        )
      }
      setBlockNumber(tx.blockNumber)
      return tx
    } catch (err) {
      txErrorHandler(err)
    }
  }
}


