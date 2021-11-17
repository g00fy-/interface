import Tooltip from '@tw/Tooltip'
import { InformationCircleIcon } from '@heroicons/react/outline'

export default function LabelWrapper({ labelText, content }) {
  return (
    <div className="w-40 sm:w-60">
      {labelText}
      { content &&
        <Tooltip
          title={labelText}
          content={content}
        >
          <InformationCircleIcon className="w-4 h-4 inline mx-1 -mt-0.5 text-gray-400 hover:text-gray-600" />
        </Tooltip>
      }
    </div>
  )
}



