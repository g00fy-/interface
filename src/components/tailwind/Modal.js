import { useEffect } from 'react'
import { useKeyPress } from '@hooks/useKeyPress'

export default function Modal({ isOpen, onClose, children }) {
  const escPressed = useKeyPress("Escape")

  function escEffect() {
    if (escPressed) {
      onClose()
    }
  }

  useEffect(escEffect, [escPressed])

  if (isOpen) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div
              className={`
                border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none
                bg-white
                dark:bg-coolGray-800
              `}
            >
              {children}
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black md:ml-0 md:space-x-0 -top-2"></div>
      </>
    )
  } else {
    return null
  }
}
