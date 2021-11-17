import _ from 'lodash'
import { CHAIN_PARAMS } from '@constants/networks'

import {
  getNetworkTextColor,
  getNetworkShadow
} from '@styles/networks'

import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { useChainSwitcher } from '@hooks/useChainSwitcher'

import ModalHeadline from '@tw/ModalHeadline'

import { SelectSpecificNetworkButton } from '@components/SelectSpecificNetworkButton'



export default function SelectChain({ onClose, setShowEthereumModal }) {
  const triggerChainSwitch = useChainSwitcher()
  const { chainId } = useActiveWeb3React()
  const { chainName } = CHAIN_PARAMS[chainId]

  return (
    <div
      className={`
        inline-block rounded-xl
        pt-2 px-6 pb-4 text-left overflow-hidden shadow-xl ${getNetworkShadow(chainId)}
        transform transition-all w-96
        align-bottom sm:align-middle
      `}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-headline'
    >
      <div>
        <ModalHeadline
          title="Select Network"
          subtitle={
            <>
              Currently on <b className={getNetworkTextColor(chainId)}>{chainName} </b>
            </>
          }
          onClose={onClose}
          closeIconClassName={`
            dark:!text-coolGray-500 dark:hover:!text-coolGray-300
            dark:hover:!bg-coolGray-900
          `}
        />
        <div className="flex flex-col space-y-3 overflow-y-auto py-2">
          {
            _.entries(CHAIN_PARAMS).map(([rawItemChainId, params]) => {
              const itemChainId = parseInt(rawItemChainId)
              console.log({ chainId, itemChainId })
              const isCurrentChain = chainId == itemChainId

              let onClickSpecificNetwork
              if (isCurrentChain) {
                onClickSpecificNetwork = () => console.log("INCEPTION")
              } else {
                onClickSpecificNetwork = () => {
                  triggerChainSwitch(itemChainId)
                    .then(() => onClose())
                    .catch(error => {
                      console.error(error)
                      /** error.code 4001 is 'MetaMask User rejected the request' */
                      if (error?.code !== 4001) {
                        setShowEthereumModal(true)
                      }
                    }
                  )

                }
              }

              return (
                <SelectSpecificNetworkButton
                  key={itemChainId}
                  itemChainId={itemChainId}
                  isCurrentChain={isCurrentChain}
                  onClick={onClickSpecificNetwork}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

