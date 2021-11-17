

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


export default function HomeFooter() {
  return (
    <footer>
      <div className="max-w-md mx-auto pb-6 pt-4 px-4 sm:max-w-3xl sm:pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="xl:grid xl:gap-8">
          <div className="space-y-8 text-center ">
            <div className="flex space-x-6 place-content-center">
              <FooterSocialLink
                href={TWITTER_URL}
                IconComponent={TwitterIcon}
              />
              <FooterSocialLink
                href={DISCORD_URL}
                IconComponent={DiscordIcon}
              />
              <FooterSocialLink
                href={TELEGRAM_URL}
                IconComponent={TelegramIcon}
              />
              <FooterSocialLink
                href={FORUM_URL}
                IconComponent={ForumIcon}
              />
              <FooterSocialLink
                href={DOCS_URL}
                IconComponent={DocsIcon}
              />
              <FooterSocialLink
                href={GITHUB_URL}
                IconComponent={GitHubIcon}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-coolGray-200 pt-8 opacity-20">

        </div>
        <p className="text-base text-coolGray-200 text-center opacity-50">
          Don't get nervous now
          </p>
      </div>
    </footer>
  )
}



function FooterSocialLink({ href, iconSrc, IconComponent}) {
  const imgProps = {
    className: "h-6 w-6  text-coolGray-50 opacity-50 hover:opacity-90 transition"
  }

  let iconContent
  if (iconSrc) {
    iconContent =
      <img src={iconSrc} {...imgProps}/>
  } else if (IconComponent) {
    iconContent =
      <IconComponent {...imgProps}/>
  }


  return (
    <a href={href} className="text-warm-gray-400 hover:text-warm-gray-500">
      {iconContent}
    </a>
  )
}

