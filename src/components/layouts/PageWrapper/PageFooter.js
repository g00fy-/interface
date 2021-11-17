

import {
  DOCS_URL,
  DISCORD_URL,
  TELEGRAM_URL,
  FORUM_URL,
  TWITTER_URL,
  GITHUB_URL
} from '@urls'


import GitHubIcon from '@icons/GitHubIcon'
import TwitterIcon from '@icons/TwitterIcon'
import ForumIcon from '@icons/ForumIcon'
import DiscordIcon from '@icons/DiscordIcon'
import TelegramIcon from '@icons/TelegramIcon'
import DocsIcon from '@icons/DocsIcon'

import SynPriceBlock from './SynPriceBlock'

export default function PageFooter() {
  return (
    <footer>
      <div className="max-w-md mx-auto pb-6 pt-4 px-4 sm:max-w-3xl sm:pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="xl:grid xl:gap-8">

          <div className="space-y-8 text-center ">

            <div className="flex space-x-6 place-content-center">
              <FooterSocialLink
                href={TWITTER_URL}
                IconComponent={TwitterIcon}
                className="hover:!text-blue-400 dark:!text-blue-400"
              />
              <FooterSocialLink
                href={DISCORD_URL}
                IconComponent={DiscordIcon}
                className="group-hover:text-indigo-500 dark:!text-indigo-500"
              />
              <FooterSocialLink
                href={TELEGRAM_URL}
                IconComponent={TelegramIcon}
                className="group-hover:text-sky-400 dark:text-sky-400"
              />
              <FooterSocialLink
                href={FORUM_URL}
                IconComponent={ForumIcon}
                className="group-hover:text-purple-700 dark:text-purple-700"
              />
              <FooterSocialLink
                href={DOCS_URL}
                IconComponent={DocsIcon}
                className="group-hover:text-blue-700 dark:text-blue-700"
              />
              <FooterSocialLink
                href={GITHUB_URL}
                IconComponent={GitHubIcon}
              />
            </div>
          </div>
          <div className="float-right absolute ">
            <SynPriceBlock />
          </div>
        </div>
        <div className="mt-10 border-t border-coolGray-200 pt-8 opacity-20">

        </div>
        <p className="text-base text-coolGray-400 dark:text-coolGray-300 text-center ">
          <span className="opacity-50">
            Layer{" "}
          </span>
          <span
            className={`
              bg-clip-text text-transparent bg-gradient-to-r
              from-blue-600 via-purple-600 to-blue-600
              active:from-purple-700 active:to-blue-700
            `}
          >
            ∞
          </span>
          <span className="opacity-50">
            {" "}is here
          </span>
        </p>
      </div>
    </footer>
  )
}



function FooterSocialLink({ href, iconSrc, IconComponent, className }) {
  const imgProps = {
    className: `h-6 w-6 text-coolGray-50 opacity-50 hover:opacity-90 transition ${className}`
  }

  let iconContent
  if (iconSrc) {
    iconContent =
      <img src={iconSrc} {...imgProps} />
  } else if (IconComponent) {
    iconContent =
      <IconComponent {...imgProps} />
  }


  return (
    <a href={href} className={`group text-warm-gray-400 hover:text-warm-gray-500 `}>
      {iconContent}
    </a>
  )
}

