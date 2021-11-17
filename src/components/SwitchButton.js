import { SwitchVerticalIcon } from '@heroicons/react/outline'

export default function SwitchButton({ className, innerClassName, onClick }) {
  return (
    <div
      className={`
        rounded-full p-2 -mr-2 -ml-2
        ${className}
      `}
    >
      <div
        onClick={onClick}
        className={`
          group rounded-full border-3 inline-block p-2 bg-white dark:bg-coolGray-800
          transform-gpu transition-all duration-100
          active:rotate-180
          ${className}
          ${innerClassName}
        `}
      >
        <SwitchVerticalIcon
          className={`
            w-5 h-5 transition-all
            text-coolGray-600 group-hover:text-coolGray-900
            dark:text-coolGray-400 dark:group-hover:text-coolGray-100
          `}
        />
      </div>
    </div>
  )
}