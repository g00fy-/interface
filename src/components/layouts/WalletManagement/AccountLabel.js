import { Transition } from '@headlessui/react'
import { useENSName } from '@hooks/ens/useENSName'




const SHARED_TRANSITION_CLASSNAME = "inline-block transform transition-all ease-linear"

export default function AccountLabel({ account }) {
  const ensName = useENSName(account)

  const sharedTransitionProps = {
    enter: "transition-all duration-100",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-all duration-100",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  }

  const show = Boolean(ensName)

  const accContent =
    <>
      {account.substring(0, 6)}...
      {account.substring(account.length - 4, account.length)}
    </>


  return (
    <>
      <Transition
        show={show}
        {...sharedTransitionProps}
      >
        <div className="w-full">
          <div
            className={`
              ${SHARED_TRANSITION_CLASSNAME}
              w-full      group-hover:w-0
              opacity-100 group-hover:opacity-0
              scale-x-100 group-hover:scale-x-0
            `}
          >
            {show && ensName}
          </div>
          <div
            className={`
              ${SHARED_TRANSITION_CLASSNAME}
              w-0       group-hover:w-full
              opacity-0 group-hover:opacity-100
              scale-x-0 group-hover:scale-x-100
            `}
          >
            {accContent}
          </div>
        </div>
      </Transition>
      <Transition
        show={!show}
        {...sharedTransitionProps}
      >
        {!show &&
          accContent
        }
      </Transition>
    </>
  )

}