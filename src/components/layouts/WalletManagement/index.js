import { useState } from 'react'

import { UnsupportedChainIdError } from '@web3-react/core'
import { Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'

import { setupNetwork } from '@utils/wallet'

import { useActiveWeb3React } from '@hooks/useActiveWeb3React'
import { useENSName } from '@hooks/ens/useENSName'

import Modal from '@tw/Modal'

import ConnectWallet from './ConnectWallet'
import WalletConnectButton from './WalletConnectButton'


import AccountLabel from './AccountLabel'


export default function WalletManagement() {
  const [showWalletModal, setShowWalletModal] = useState()

  const handleClose = () => setShowWalletModal(false)


  return (
    <>
      <div className='flex items-center'>
        <WalletConnectButton
          setShowWalletModal={setShowWalletModal}

        />
      </div>
      <Modal isOpen={showWalletModal} onClose={handleClose}>
        <ConnectWallet onClose={handleClose} />
      </Modal>
    </>
  )
}

