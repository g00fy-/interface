
export default function StatDisplay({ className, title, infoTooltip, content }) {
  return (
    <div className={`inline-block pl-4 ${className}`}>
      <div className='text-sm text-gray-800 dark:text-coolGray-500 flex'>
        <div className='mr-1'>
          {title}
        </div>
        {infoTooltip}
      </div>
      <div className='mt-2.5 text-xl font-medium text-default dark:text-coolGray-400'>
        {content}
      </div>
    </div>
  )
}