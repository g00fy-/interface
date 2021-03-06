
import { BigNumber } from '@ethersproject/bignumber'
import { ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'
import { Arc } from '@visx/shape'
import { Chord } from '@visx/chord'

import { getNetworkLinkTextColor, getNetworkTextColor } from '@styles/networks'
import { BRIDGE_REQUIRED_CONFIRMATIONS } from '@constants/bridge'
import { useBlockHeight } from '@hooks/useBlockHeight'

import { getCoinTextColorCombined } from '@styles/coins'

import { SubTransactionItem, EmptySubTransactionItem, CheckingConfPlaceholder, PendingCreditTransactionItem, CreditedTransactionItem } from './TransactionItems'

export default function BlockCountdown({ inputTx, outputTx, outToken, fromChainId, toChainId, outputExists, outAmount }) {
  const fromBlockHeight = useBlockHeight(fromChainId)

  // const [fromBlockHeight, setFromBlockHeight] = useBlockNumber(fromChainId)
  const fromChainConfirmations = BRIDGE_REQUIRED_CONFIRMATIONS[fromChainId]
  let blockNumberDiff
  if (inputTx?.blockNumber > 0) {
    blockNumberDiff = fromBlockHeight - (inputTx.blockNumber ?? 0)
  } else {
    blockNumberDiff = fromChainConfirmations
  }
  // const blockNumberDiff =
  const blocksFromConfirmation = fromChainConfirmations - blockNumberDiff

  const clampedDiff = _.clamp(blocksFromConfirmation, 0, fromChainConfirmations )


  const fromNetworkColorClassName = getNetworkTextColor(fromChainId)

  // console.log({outputTx, outputExists, fromChainId, toChainId})
  const bcd =
    <BlockCountdownCircle
      clampedDiff={clampedDiff}
      fromChainConfirmations={fromChainConfirmations}
      fromNetworkColorClassName={fromNetworkColorClassName}
    />

  return (
    <>
      <div className="flex-1">
        <div className={`flex items-center p-2 align-middle`}>

          {(!outputExists && (clampedDiff != 0)) &&
            <>
              <ChevronRightIcon
                className={`
                  w-5 h-5
                  place-self-center
                  ${fromNetworkColorClassName}
                  text-opacity-50
                `}
              />
              {bcd}
              <CheckingConfPlaceholder
                chainId={fromChainId}
              />
              <ChevronRightIcon
                className={`
                  w-5 h-5 animate-pulse
                  place-self-center
                  dark:text-coolGray-500
                `}
              />
              <EmptySubTransactionItem chainId={toChainId} />
            </>
          }
          {(clampedDiff == 0) &&
            <div className="flex-shrink-0 items-center align-middle">
            <ChevronDoubleRightIcon
              className={`
                w-5 h-5
                place-self-center
                ${outToken ? getCoinTextColorCombined(outToken) : "dark:text-coolGray-500"}
                text-opacity-50
              `}
            />
            </div>

          }
          {(!outputTx && (clampedDiff == 0) ) &&
            <div className="flex-1 ml-2">
              {!outputExists && <PendingCreditTransactionItem chainId={toChainId} />}
              {outputExists && <CreditedTransactionItem chainId={toChainId} />}
            </div>
          }
          {outputTx &&
            <div className="flex-1 ml-2">
              <SubTransactionItem {...outputTx} token={outToken} tokenAmount={outAmount} />
            </div>
          }

        </div>
      </div>

    </>
  )
}



function BlockCountdownCircle({ clampedDiff, fromChainConfirmations, fromNetworkColorClassName }) {
  const dataMatrix = [
    [(fromChainConfirmations - clampedDiff), 0, 0, 0],
    [clampedDiff, 0, 0, 0],
  ]
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`
            stroke-current stroke-[8px] text-coolGray-600
            bg-transparent
            fill-none
            w-16 h-16  -mb-3
          `}
    >
      <text
        textAnchor="middle"
        x="100"
        y="96"
        className="stroke-0 fill-current text-coolGray-400 tracking-wider"
        style={{ fontSize: 44 }}
      >
        {clampedDiff}
      </text>
      <g transform="translate(100, 80)">
        <Chord matrix={dataMatrix} padAngle={0}>
          {({ chords }) => (
            <g>
              {
                chords.groups
                  .filter(group => group.value != 0)
                  .map((group, i) => (
                    <Arc
                      key={`key-${i}`}
                      data={group}
                      innerRadius={72}
                      outerRadius={74}
                      className={`
                              ${i == 0 ? `fill-current ${fromNetworkColorClassName}` : undefined}
                              transform-gpu transition-all
                            `}
                    />
                  ))
              }
            </g>
          )}
        </Chord>
      </g>
    </svg>

  )
}