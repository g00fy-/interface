import { validateAndParseAddress } from "@utils/validateAndParseAddress"


export function DestinationAddressInput({ destinationAddress, setDestinationAddress }) {
  return (
    <div className='flex h-16 text-left px-2 sm:px-5 pb-4 space-x-2'>
      <div className="flex-1 pt-3 text-coolGray-400 text-sm h-full text-center">
        <span>Destination </span>
      </div>
      <div
        className={`
          flex-grow
          h-12
          border border-coolGray-800  focus-within:border-purple-700
          pl-3 sm:pl-4
          pr-0 sm:pr-4
          py-0.5 rounded-xl
          bg-coolGray-50
          dark:bg-coolGray-900
        `}
      >

        <input
          // ref={inputRef}
          className={`
              ml-auto sm:mr-2
              focus:outline-none
              bg-transparent
              h-full
              dark:text-coolGray-300
              w-[300px]
              sm:w-full
              sm:min-w-[300px]
              flex-grow
            `}
          placeholder='Destination Address...'
          onChange={(e) => {
            setDestinationAddress(e.target.value)
          }}
          value={destinationAddress}
        />
      </div>
    </div>
  )
}