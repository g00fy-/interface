import { BigNumber } from '@ethersproject/bignumber'
import { id } from '@ethersproject/hash'


import { SYN, NUSD, NETH, TOKEN_HASH_MAP, WETH } from '@constants/tokens/basic'
import { DOG, HIGHSTREET, JUMP } from '@constants/tokens/mintable'
import { ChainId } from '@constants/networks'


import { formatTimestampToDate } from '@utils/datetime'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useGenericSynapseContract } from '@hooks/contracts/useSynapseContract'
import { useSingleCallResult } from '@hooks/multicall'


import { SubTransactionItem } from './TransactionItems'


import BlockCountdown from './BlockCountdown'





export default function PairedTransactionItem({inputTx, outputTx}) {
  const { chainId } = useActiveWeb3React()
  const targetChainId = inputTx?.args?.chainId ?? ChainId.ETH
  const synapseContract = useGenericSynapseContract(targetChainId)
  const kekTxSig = id(inputTx?.transactionHash ?? "")
  const kappaExistsResult = useSingleCallResult(
    targetChainId,
    synapseContract,
    'kappaExists',
    [kekTxSig],
    { resultOnly: true }
  )
  const outputExists = kappaExistsResult?.[0] ?? false

  const inAmount = inputTx?.inputTokenAmount
  const outAmount = outputTx?.args?.amount


  let inToken
  let outToken
  try {
    if (inputTx) {
      const lowerInTokenAddr = _.toLower(inputTx.args.token)
      if ([SYN, HIGHSTREET, DOG, JUMP].map(t => _.toLower(t.addresses[inputTx.chainId])).includes(lowerInTokenAddr)  ) {
        inToken = TOKEN_HASH_MAP[inputTx.chainId][lowerInTokenAddr]
        if (inToken) {
          outToken = inToken
        }
      // } else if (lowerInTokenAddr === _.toLower(SYN.addresses[inputTx.chainId])) {
      //   inToken = SYN
      //   outToken = SYN
      // // } else if (lowerInTokenAddr === _.toLower(NUSD.addresses[inputTx.chainId])) {
      // } else if (lowerInTokenAddr === _.toLower(HIGHSTREET.addresses[inputTx.chainId])) {
      //   inToken = HIGHSTREET
      //   outToken = HIGHSTREET
      //   // } else if (lowerInTokenAddr === _.toLower(NUSD.addresses[inputTx.chainId])) {
      // } else if (lowerInTokenAddr === _.toLower(DOG.addresses[inputTx.chainId])) {
      //   inToken = DOG
      //   outToken = DOG
      //   // } else if (lowerInTokenAddr === _.toLower(NUSD.addresses[inputTx.chainId])) {
      // } else if (lowerInTokenAddr === _.toLower(JUMP.addresses[inputTx.chainId])) {
      //   inToken = JUMP
      //   outToken = JUMP
        // } else if (lowerInTokenAddr === _.toLower(NUSD.addresses[inputTx.chainId])) {
      }else if ([NUSD, NETH, WETH].map(t => _.toLower(t.addresses[inputTx.chainId])).includes(lowerInTokenAddr)) {
        inToken = TOKEN_HASH_MAP[inputTx.chainId][_.toLower(inputTx.inputTokenAddr)]
        outToken = TOKEN_HASH_MAP[outputTx.chainId][_.toLower(outputTx.outputTokenAddr)]
      }
    } else {
      outToken = TOKEN_HASH_MAP[outputTx.chainId][_.toLower(outputTx.outputTokenAddr)]
    }
  } catch (e) {
    console.error(e)
  }


  try {
    return (
      <div>
        <div className="flex items-center dark:text-coolGray-500">
          <div className="flex-1 ">
            <div className='pb-1 text-sm text-coolGray-500'>
              {inputTx &&
                formatTimestampToDate(inputTx?.timestamp)
              }
            </div>
          </div>
          <div className="flex-shrink-0 p-2 align-middle w-9">
            <div/>
          </div>
          <div className="flex-1 ">
            <div className='pb-1 pl-4 text-sm text-coolGray-500'>
              {(outputTx && outputTx?.timestamp) &&
                formatTimestampToDate(outputTx?.timestamp)
              }
            </div>
          </div>
        </div>
        <div className="flex items-center dark:text-coolGray-500">
          <div className="flex-1 ">
            {inputTx &&
              <SubTransactionItem {...inputTx} token={inToken} tokenAmount={inAmount} />
            }

          </div>

          <BlockCountdown
            inputTx={inputTx}
            outputTx={outputTx}
            inToken={inToken}
            outToken={outToken}
            outputExists={outputExists}
            outAmount={outAmount}
            fromChainId={inputTx?.chainId ?? chainId}
            toChainId={targetChainId}
          />
        </div>
      </div>
    )
  } catch (e) {
    return ""
  }
}



