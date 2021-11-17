import { ExternalLinkIcon } from '@heroicons/react/outline'


export default function ExternalLinkButton({ className, text, href }) {
  return (
    <a href={href} target='_blank' className='float-right'>
      <button
        className={`
          px-2 rounded-full group
          border border-gray-50 hover:border-gray-200 active:border-gray-300
          dark:border-coolGray-700 dark:hover:border-coolGray-500 dark:active:border-coolGray-500
          focus:ring-0 active:ring-0 focus:outline-none
          transform-gpu transition duration-500 ease-in-out
          ${className}
        `}
      >
        <div className='-mt-1'>
          <small className='text-gray-500 group-focus:text-gray-600 hidden group-hover:inline-block transition duration-500 ease-in-out'>
            {text}
          </small>
          <div className='inline-block px-1 self-center -top-1'>
            <ExternalLinkIcon className='h-4 w-4 inline self-center text-gray-500 group-focus:text-gray-600 group-hover:text-blue-600' />
          </div>
        </div>
      </button>
    </a>
  )
}
