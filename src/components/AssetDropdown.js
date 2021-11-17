import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/outline'


import {
  getMenuItemStyleForCoinCombined,
  getMenuItemBgForCoin
} from '@styles/coins'




export default function AssetDropdown({ coins, onSelectCoin, children, dropdownClassName, targetCoin}) {

  return (
    <Menu>
      { ({ open }) => (
        <div
          className={`
            absolute bg-white border shadow-sm rounded-lg
            text-base focus:outline-none overflow-hidden z-10
            transform transition-0

            dark:bg-coolGray-700 dark:border-coolGray-700
          `}
        >
          <Menu.Button className="relative focus:outline-none text-left">
            <CoinItemContent
              coin={targetCoin}
              open={open}
              expanderIcon={true}
            />
          </Menu.Button>
          { open && <hr className="dark:border-coolGray-800"/> }
          <Transition
            appear={true}
            unmount={false}
            show={open}
            enter='transition duration-100 ease-out'
            enterFrom='transform-gpu scale-y-0 '
            enterTo='transform-gpu scale-y-100'
            leave='transition duration-75 ease-out '
            leaveFrom='transform-gpu scale-y-100'
            leaveTo='transform-gpu scale-y-0 '
            className='origin-top '
          >
            <Menu.Items
              static
              as="ul"
              className="w-full mx-auto transform transition focus:outline-none "
            >
              {
                coins
                  .filter((coin) => (coin.symbol !== targetCoin.symbol))
                  .map((coin) => (
                      <CoinItem
                        coin={coin}
                        onSelectCoin={onSelectCoin}
                      />
                    )
                  )
              }
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}


function CoinItem({ coin, onSelectCoin }) {
  return (
    <Menu.Item
      as="li"
      onClick={() => {
        onSelectCoin(coin)
      }}
    >
      {
        ({active}) => (
          <CoinItemContent
            coin={coin}
            active={active}
          />
        )
      }
    </Menu.Item>
  )
}






function CoinItemContent({coin, expanderIcon=false, open=false, active=false}) {
  return (
    <div
      className={`
        transition cursor-pointer px-4 py-2 w-48 sm:w-80
        ${getMenuItemStyleForCoinCombined(coin)}
        ${active && getMenuItemBgForCoin(coin)}
      `}
    >
      <img
        alt="coinicon"
        className="w-6 mr-2 inline"
        src={coin.icon}
      />
      <span className="dark:text-coolGray-400">{coin.symbol}</span>
      { expanderIcon &&
        <ChevronDownIcon
          className={`
            ml-1 w-4 inline float-right mt-1.5 transform transition dark:text-coolGray-500
            ${ open ? "rotate-180" : "" }
          `}
        />
      }
    </div>
  )
}