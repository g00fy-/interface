import { Transition } from '@headlessui/react'

import { ChainId } from '@constants/networks'
import { COIN_SLIDE_OVER_PROPS } from '@styles/transitions'
import { getNetworkTextColorContrast, getNetworkBgClassName, getNetworkButtonBgClassName } from '@styles/networks'

import ModalHeadline from '@tw/ModalHeadline'



export default function EthChainSlideOver({ showEthereumModal, setShowEthereumModal }) {
  const chainId = ChainId.ETH
  const transitionProps = {
    ...COIN_SLIDE_OVER_PROPS,
    className:
      `origin-bottom absolute w-full h-full ${getNetworkBgClassName(chainId)} z-20 rounded-lg`,
  }

  return (
    <Transition show={showEthereumModal} {...transitionProps}>
      <div className="pt-2 px-6 pb-4">
        <ModalHeadline
          title={
            <span className="text-gray-200 text-xl">
              Switch to <b className={getNetworkTextColorContrast(chainId)}> Ethereum </b> using your wallet
            </span>
          }
          subtitle={
            <span className="text-gray-300">
              Please use your wallet to switch to the Ethereum network. (unfortunately out of our control)
            </span>
          }
          closeIconClassName={`text-gray-200 hover:text-white ${getNetworkButtonBgClassName(chainId)}`}
          onClose={() => setShowEthereumModal(false)}
        />
      </div>

    </Transition>
  )
}