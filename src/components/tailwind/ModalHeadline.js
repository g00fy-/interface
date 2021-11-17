import CloseIcon from '@icons/CloseIcon'

export default function ModalHeadline({ title, subtitle, onClose, closeIconClassName}) {
  return (
    <div className='flex'>
      <h3
        className='pt-4 mb-3'
        id='modal-headline'
      >
        <p
          className="text-2xl leading-6 font-medium text-gray-900 mb-3 dark:text-coolGray-300"
        >
          {title}
        </p>
        <p className="text-coolGray-700 dark:text-coolGray-400">
          {subtitle}
        </p>
      </h3>
      <div className=' w-16 ml-auto cursor-pointer pt-1.5  -mr-2' >
        <div
          className={`
            float-right hover:bg-coolGray-50 rounded-full p-1.5
            text-gray-600 hover:text-gray-900
            dark:text-coolGray-500 dark:hover:text-coolGray-300
            dark:hover:bg-coolGray-900
            ${closeIconClassName}
          `}
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  )
}