import { ChevronRightIcon } from '@heroicons/react/solid'

import nerveLogo from '@assets/icons/synapse.svg'
import nerveWhiteText from '@assets/icons/nerveWhiteText.png'
import homewaterbear from '@assets/icons/homewaterbear.png'

import Grid from '@tw/Grid'
import Col from '@tw/Col'

import HomeActionLauncher from './HomeActionLauncher'
import HomeFooter from './HomeFooter'

export default function HomePage() {
  return (
    <div className='h-screen flex overflow-hidden bg-gradient-to-br from-coolGray-900 to-coolGray-700'>
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <main className='flex-1 relative  overflow-y-auto focus:outline-none'>
          <main className='relative z-0 overflow-y-auto focus:outline-none h-full'>
            <div className='pt-2 pb-8 px-4 sm:px-6 md:px-8'>
              <Grid
                cols={{ xs: 1, sm: 3 }}
                gap={6}
                className='pt-20 pb-12 justify-center'
              >
                <Col xs="full" >
                  <img
                    className="h-11 w-auto inline-block"
                    src={nerveLogo}
                    alt="Nerve Logo"
                  />
                  <img
                    className="h-7 w-auto inline-block ml-6"
                    src={nerveWhiteText}
                    alt="Nerve Logo"
                  />
                  <div className="float-right hidden sm:block">
                    <HomeActionLauncher />
                  </div>
                </Col>
                <Col xs="full" sm={2}>
                  <LandingCopy/>
                </Col>
                <Col xs="full" sm={1}>
                  <img
                    src={homewaterbear}
                    className="w-full my-8 hidden sm:block "
                  />
                </Col>
                <Col xs="full">
                  <HomeFooter />
                </Col>
              </Grid>
            </div>
          </main>
        </main>
      </div>
    </div>
  )
}




function LandingCopy() {
  return (
    <>
      <div>
        <a href="#" className="inline-flex space-x-4">
          <span className="rounded bg-indigo-900 px-2.5 py-1 text-xs font-semibold text-indigo-300 tracking-wide uppercase opacity-80">
            What's new
          </span>
          <span className="inline-flex items-center text-sm font-medium text-indigo-300 space-x-1">
            <span>Just launched Cake V2 LP Pool</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>
      </div>
      <div className="mt-6 sm:max-w-xl">
        <h1 className="text-4xl font-medium text-coolGray-200 tracking-wide sm:text-5xl">
          A trustless on-ramp and stableswap on Binance Smart Chain
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-400">
          Bridge assets onto BSC and earn yield on BTC, ETH, and stablecoins
        </p>
      </div>
      <div className="mt-6 sm:mt-8 place-items-center sm:place-items-start">
        <HomeActionLauncher />
      </div>
    </>
  )
}