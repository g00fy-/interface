import CopyIcon from '@icons/CopyIcon'

export default function CopyableAddress({ address, className }) {
  return (
    <div
      className={`
        groupnrounded-full flex-shrink
        mb-2 -ml-1 py-0.5 px-1
        text-sm
        text-gray-500 focus-within:text-blue-500
        border border-transparent hover:border-gray-200
        dark:text-coolGray-400 dark:hover:border-coolGray-600
        ${className}
      `}
      onClick={() => writeToClipboard(address)}
    >
      {address}
      <CopyIcon
        className={`
          h-5 w-5 -mt-1 ml-1 inline-block
          group-hover:text-blue-500 active:text-blue-600
        `}
      />
    </div>
  )
}

async function writeToClipboard(contentText) {
  try {
    await navigator.clipboard.writeText(contentText)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}
