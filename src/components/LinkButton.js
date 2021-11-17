import ExternalLinkIcon from '@icons/ExternalLinkIcon'

import { Link } from 'react-router-dom'

export default function LinkButton({ className, text, href }) {
  const buttonContent =
    <button
      className={`
        px-2 group
        border border-gray-50 hover:border-gray-200 active:border-gray-300
        dark:border-coolGray-700 dark:hover:border-coolGray-500 dark:active:border-coolGray-500 rounded-full focus:ring-0 active:ring-0 focus:outline-none transform-gpu transition duration-500 ease-in-out {className}`}
    >
      <div className="-mt-1">
        <small className="text-gray-500 group-focus:text-gray-600 hidden group-hover:inline-block transition duration-500 ease-in-out">
          {text}
        </small>
        <div className="inline-block px-1 self-center -top-1">
          <ExternalLinkIcon className="h-4 w-4 inline self-center text-gray-500 group-focus:text-gray-600 group-hover:text-blue-600" />
        </div>
      </div>
    </button>

  if (href[0] == '/') {
    return (
      <Link to={href} className="float-right">
        {buttonContent}
      </Link>
    )
  } else {
    return (
      <a href={href} target="_blank" className="float-right">
        {buttonContent}
      </a>
    )
  }

}

