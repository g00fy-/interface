import { ChevronDownIcon } from '@heroicons/react/outline'

import { getMenuItemHoverBgForCoin } from '@styles/coins'

export default function SelectTokenDropdown({ selected, onClick }) {
  return (
    <div className="sm:mt-[-1px] flex-shrink-0 mr-[-1px] ">
      <div
        className={`
          group
          rounded-xl sm:-mr-4 sm:-my-2 py-2.5 sm:py-2 px-2
          ${getMenuItemHoverBgForCoin(selected)}
        `}
      >
        <div
          className="flex self-end"
          onClick={onClick}
        >
          <div className="mr-4 flex-shrink-0 self-center hidden sm:block">
            <img
              className='w-8 h-8 rounded-md'
              src={selected.icon}
            />
          </div>
          <div className="text-left cursor-pointer">
            <h4 className="text-lg font-medium ">
              <span className="dark:text-coolGray-400">
                {selected.symbol}
              </span>
              <ChevronDownIcon
                className="w-4 inline -mt-1 ml-2 text-coolGray-600 group-hover:text-coolGray-500 transform transition-all focus:rotate-180"
              />
            </h4>
            <p className="text-sm text-coolGray-500 group-hover:text-coolGray-400 hidden sm:block  ">
              {selected.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}