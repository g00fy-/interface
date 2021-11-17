import { useState, useEffect, Fragment } from 'react'

import { Transition, Popover } from '@headlessui/react'

import {
  DocumentTextIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'

import { useKeyPress } from '@hooks/useKeyPress'

import {
  SWAP_PATH,
  POOLS_PATH,
  BRIDGE_PATH,
  STAKE_PATH,
  CONTRACTS_PATH,
  PORTFOLIO_PATH,
  DOCS_URL,
  DISCORD_URL,
  TELEGRAM_URL,
  FORUM_URL,
  SYNAPSE_HOME_URL,
  TWITTER_URL,
  getBuySynUrl,
  AIRDROP_PATH,
} from '@urls'


import Grid from '@tw/Grid'

import AddToWalletButton from '@components/AddToWalletButton'

import ForumIcon from '@icons/ForumIcon'
import TwitterIcon from '@icons/TwitterIcon'
import DiscordIcon from '@icons/DiscordIcon'
import TelegramIcon from '@icons/TelegramIcon'
import SynapseLogoSvg from '@icons/SynapseLogoSvg'

import TopBarNavLink from './TopBarNavLink'
import WalletNetworkSection from './WalletNetworkSection'
import MoreButton from './MoreButton'
import PageFooter from './PageFooter'
import { useActiveWeb3React } from '@hooks/useActiveWeb3React'




export default function PageWrapper({ children }) {
  const [open, setOpen] = useState(false)
  const escPressed = useKeyPress("Escape")


  function escEffect() {
    if (escPressed) {
      setOpen(false)
    }
  }

  useEffect(escEffect, [escPressed])



  const topBarBtns    = <TopBarButtons />
  const mobileBarBtns = <MobileBarButtons />
  const moreInfoBtns  = <MoreInfoButtons />
  const socialBtns    = <SocialButtons />


  return (
    <div className='min-h-screen overflow-hidden bg-gray-100 dark:bg-coolGray-900'>
      <Popover className="relative ">
        <div className="flex items-center justify-between px-4 py-1 border-b sm:px-6 md:justify-start md:space-x-10 border-coolGray-300 dark:border-coolGray-800 ">
          <SynapseTitleLogo showText={false} />
          <div className="hidden space-x-2 sm:block md:hidden">
            <WalletNetworkSection />
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button
              className={`
                rounded-lg p-2 inline-flex items-center justify-center
                text-gray-400 hover:text-coolGray-500 hover:bg-coolGray-100
                dark:hover:text-coolGray-400 dark:hover:bg-coolGray-800
                focus:outline-none
              `}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex md:space-x-2">
              {topBarBtns}
            </Popover.Group>
            <div className="flex items-center md:ml-4">
              <div className='space-x-2'>
                <WalletNetworkSection />
                <Popover className="relative inline-block">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        onMouseEnter={() => {
                          setOpen(true)
                        }}
                        className={`
                          ${open ? 'text-gray-900' : 'text-purple-800'}
                          group  rounded-md inline-flex items-center  hover:text-gray-900 focus:outline-none
                        `}
                      >
                        <MoreButton open={open} />
                      </Popover.Button>
                      <PopoverPanelContainer className='-translate-x-full'>
                        {moreInfoBtns}
                        {socialBtns}
                      </PopoverPanelContainer>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-100 ease-out"
          enterFrom=" opacity-0"
          enterTo=" opacity-100"
          leave="duration-75 ease-in"
          leaveFrom=" opacity-100"
          leaveTo=" opacity-0"
          // className="origin-right"
        >
          <Popover.Panel focus className="absolute inset-x-0 top-0 z-10 transition origin-top-right transform md:hidden">
            <div className="h-full min-h-full bg-white divide-y shadow-lg ring-1 ring-opacity-5 dark:bg-coolGray-800 divide-gray-50 dark:divide-coolGray-600" >
              <div className="px-4 pt-1 pb-6">
                <div className="flex items-center justify-between">
                  <SynapseTitleLogo showText={true}/>
                  <div className="-mr-2">
                    <Popover.Button
                      className={`
                        rounded-lg p-2 inline-flex items-center justify-center
                        text-gray-400 hover:text-coolGray-500 hover:bg-coolGray-100
                        dark:hover:text-coolGray-400 dark:hover:bg-coolGray-900
                        focus:outline-none
                      `}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <Grid cols={{xs: 1}} gap={2}>
                    {mobileBarBtns}
                    {moreInfoBtns}
                  </Grid>
                </div>
              </div>
                <Grid cols={{ xs: 1 }} gap={4} className="px-4 py-4">
                  <WalletNetworkSection />
                </Grid>
              <div className="px-2 py-6">
                {socialBtns}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <main className='relative flex-1 overflow-y-auto focus:outline-none'>
        {children}
      </main>
      <PageFooter/>
    </div>
  )
}


function PopoverPanelContainer({ children, className }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel
        className={`
          absolute z-10 left-1/2 transform-gpu
          ${className ?? "-translate-x-1/2"}
          mt-3 w-screen max-w-xs sm:px-0
        `}
      >
        <div className="overflow-hidden shadow-xl rounded-xl">
          <div className="relative grid gap-3 bg-white dark:bg-coolGray-800 px-2.5 py-3  sm:p-2">
            {children}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}


function TopBarButtons() {
  return (
    <>
      <TopBarNavLink
        to={BRIDGE_PATH}
        labelText='Bridge'
      />
      <TopBarNavLink
        to={SWAP_PATH}
        labelText='Swap'
      />
      <TopBarNavLink
        to={POOLS_PATH}
        labelText='Pools'
      />
      <TopBarNavLink
        to={STAKE_PATH}
        labelText='Stake'
      />
    </>
  )
}


function MoreInfoButtons() {
  const {chainId } = useActiveWeb3React()

  return (
    <>
      <MoreInfoItem
        to={getBuySynUrl({ chainId })}
        labelText='Buy $SYN'
        description="Trade and add liquidity to $SYN pools"
      />
      <MoreInfoItem
        to={AIRDROP_PATH}
        labelText='Claim'
        description="Claim SYN & NRV from "
      />
      <MoreInfoItem
        to={CONTRACTS_PATH}
        labelText='Contracts'
        description="View contract related information such as contract addresses"
      />
      <MoreInfoItem
        to={PORTFOLIO_PATH}
        labelText='Portfolio'
        description="View your portfolio of related assets on this chain"
      />
    </>
  )
}


function SocialButtons() {
  return (
    <Grid cols={{ xs: 2, sm: 1 }} gapY={1} >
      <MiniInfoItem
        href={DOCS_URL}
        labelText='Docs'
        icon={
          <DocumentTextIcon
            className={`
              w-4 -ml-1 mr-2  inline group-hover:text-blue-700
              dark:text-blue-700
            `}
          />
        }
      />
      <MiniInfoItem
        href={DISCORD_URL}
        labelText='Discord'
        icon={
          <DiscordIcon
            className={`
              w-4 -ml-1 mr-2  inline group-hover:text-indigo-500
              dark:text-indigo-500
            `}
          />
        }
      />
      <MiniInfoItem
        href={TELEGRAM_URL}
        labelText='Telegram'
        icon={
          <TelegramIcon
            className={`
              w-4 -ml-1 mr-2  inline group-hover:text-blue-400
              dark:text-blue-400
            `}
          />
        }
      />
      <MiniInfoItem
        href={TWITTER_URL}
        labelText='Twitter'
        icon={
          <TwitterIcon
            className={`
              w-4 -ml-1 mr-2  inline group-hover:text-sky-400
              dark:text-sky-400
            `}
          />
        }
      />
      <MiniInfoItem
        href={FORUM_URL}
        labelText='Forum'
        icon={
          <ForumIcon
            className={`
              w-4 -ml-1 mr-2  inline group-hover:text-purple-700
              dark:text-purple-700
            `}
          />
        }
      />
    </Grid>
  )
}

/**
 * Not actually a bar, part of the dropdown nav controller
 */
function MobileBarButtons() {
  return (
    <>
      <MoreInfoItem
        to={BRIDGE_PATH}
        labelText='Bridge'
      />
      <MoreInfoItem
        to={SWAP_PATH}
        labelText='Swap'
      />
      <MoreInfoItem
        to={POOLS_PATH}
        labelText='Pools'
      />
      <MoreInfoItem
        to={STAKE_PATH}
        labelText='Stake'
      />
    </>
  )
}


function MoreInfoItem({to, labelText, description}) {

  return (
    <a
      key={labelText}
      href={to}
      target={(to[0] === '/') ? undefined : "_blank"}
      className="block px-3 pt-2 pb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-coolGray-900"
    >
      <p className="text-base font-medium text-coolGray-900 dark:text-coolGray-400">
        {labelText}
      </p>
      <p className="hidden mt-1 text-sm md:block text-coolGray-500 dark:text-coolGray-500">
        {description}
      </p>
    </a>
  )
}


function MiniInfoItem({ href, icon, labelText }) {
  return (
    <a key={labelText} href={href} className="block px-3 pt-1 pb-2 text-sm rounded-lg group hover:bg-gray-50 dark:hover:bg-coolGray-900" target="_blank">

      <div>
        <p className="text-sm text-coolGray-500 dark:text-coolGray-500 group-hover:text-coolGray-600 dark:group-hover:text-coolGray-400">
          {icon}<span className="mt-1">{labelText}</span>
        </p>
      </div>

    </a>
  )
}




function SynapseTitleLogo({ showText }) {
  return (
    <div>
      <a href="#makethestarsaligncodecannotdescribe" className="flex">
        <div className='flex items-center flex-shrink-0 py-1 '>
          <div className='mr-2'>
            <SynapseLogoSvg />
          </div>
          <span
            className={`
              ${showText ? '' : 'hidden' }
              font-medium text-2xl tracking-wider pl-2
              bg-clip-text text-transparent bg-gradient-to-r
              from-purple-600 to-blue-600
              active:from-purple-700 active:to-blue-700
              hover:animate-pulse
              transform transition-all
            `}
          >
            Synapse
          </span>
        </div>
      </a>
    </div>

  )
}