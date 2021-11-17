import toast from 'react-hot-toast'
import { XIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'



export default function ToastContent({ toastData, icon, message }) {

  let toastContainerClassName
  let fancyIcon
  if (toastData.type === "success") {
    toastContainerClassName = "shadow-green-lg dark:shadow-green-lg"
    fancyIcon =
      <CheckCircleIcon className="h-5 w-5 text-green-700"/>
  } else if (toastData.type === "error") {
    toastContainerClassName = "shadow-red-lg dark:shadow-red-lg"
    fancyIcon = <ExclamationCircleIcon className="h-5 w-5 text-red-700" />
  } else {
    toastContainerClassName = "shadow-lg dark:shadow-indigo-lg"
  }


  return (
    <div
      className={`
        flex rounded
        min-w-[250px]
        px-2 pt-1 pb-2
        bg-white dark:bg-coolGray-800
        text-coolGray-800 dark:text-coolGray-400
        ${toastContainerClassName}
      `}
    >
      <div className=" flex flex-grow pt-1">
        <div className="flex-shrink justify-items-center align-middle self-center">
          {fancyIcon}
        </div>
        <div className="flex-grow">
          <div className="text-sm">
            {message}
          </div>
        </div>
      </div>
      <div className="flex-shrink px-2">{toastData.type !== 'loading' && (
        <button
          className={`
            rounded-full
            h-6 w-6
            mt-1.5
            focus:outline-none active:outline-none
            hover:bg-coolGray-900
            text-coolGray-400 hover:text-coolGray-300
          `}
          onClick={() => toast.dismiss(toastData.id)}
        >
          <XIcon
            className="h-full w-full p-1 align-middle place-self-center inline"
          />
        </button>
      )}
      </div>
    </div>
  )
}