import Button from "@tw/Button"
import { DotsHorizontalIcon } from '@heroicons/react/outline'


export default function MoreButton({ open, onClick, className, ...props }) {
  return (
    <Button
      onClick={onClick}
      className={`
        w-full cursor-pointer rounded-lg
        py-0.5 pl-2.5 pr-0.5 group
        focus:outline-none focus:ring-0
        hover:bg-coolGray-50 dark:hover:bg-coolGray-800
        ${className}
        text-sm
        ${open && "bg-coolGray-50 dark:bg-coolGray-800 !border-purple-700 dark:!border-purple-700"}
      `}
      outline={true}
      {...props}
    >
      <div className="space-x-2">


        <div className='inline-block rounded-md py-1 pr-2 '>
          <DotsHorizontalIcon
            className={`
              ${open && "opacity-100"}
              inline-block w-4 h-4 text-coolGray-500 dark:text-white opacity-50 group-hover:opacity-100
              `
            }
          />
        </div>
      </div>
    </Button>
  )
}