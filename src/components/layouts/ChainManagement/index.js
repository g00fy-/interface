import { useState } from 'react'

import {
  getNetworkTextColorContrast,
} from '@styles/networks'

import Modal from '@tw/Modal'

import { CHAIN_INFO_MAP } from '@constants/networks'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'

import SelectChainButton from './SelectChainButton'
import SelectChain from './SelectChain'
import EthChainSlideOver from './EthChainSlideOver'


export default function ChainManagement() {
  const { account, error, chainId } = useActiveWeb3React()
  const [showModal, setShowModal] = useState()
  const [ showEthereumModal, setShowEthereumModal ] = useState(false)

  const handleShow = () => setShowModal(true)
  const handleClose = () => {
    setShowEthereumModal(false)
    setShowModal(false)
  }

  const {chainSymbol, chainImg} = CHAIN_INFO_MAP[chainId] ?? {}

  let chainButton
  if (account && !error) {
    chainButton = (
      <SelectChainButton onClick={handleShow}>
        <div>
          <div className='inline-block justify-center align-middle'>
            <div className='flex text-sm w-full'>
              <div className="flex-1">
                <span className="mr-1.5 hidden lg:inline text-coolGray-500 group-hover:text-coolGray-600 dark:text-coolGray-400 dark:group-hover:text-coolGray-300">
                  Connected to
                </span>
                <span className={getNetworkTextColorContrast(chainId)}>
                  {chainSymbol}
                </span>
              {' '}
              </div>
              <div className="flex-shrink">
                <img
                  src={chainImg}
                  className={`
                    w-5 h-5 rounded-md
                    ml-2 opacity-80
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </SelectChainButton>
    )
  } else {
    chainButton = (
      <SelectChainButton
        onClick={handleShow}
        className={`
          hover:bg-opacity-75
          focus:ring-0 shadow-indigo-sm

          `
        }
      >
        No Chain Selected
      </SelectChainButton>
    )
  }

  return (
    <>
      <div className='flex items-center'>{chainButton}</div>
      <Modal isOpen={showModal} onClose={handleClose}>
        <div>
          <EthChainSlideOver
            showEthereumModal={showEthereumModal}
            setShowEthereumModal={setShowEthereumModal}
          />
        </div>
        <SelectChain
          onClose={handleClose}
          setShowEthereumModal={setShowEthereumModal}
        />

      </Modal>
    </>
  )
}

