import { useState, createRef } from 'react'
import { createPopper } from '@popperjs/core'



export default function Tooltip({ children, title, content, className}) {
  const [tooltipShow, setTooltipShow] = useState(false)
  const btnRef = createRef()
  const tooltipRef = createRef()
  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: 'bottom',
    })
    setTooltipShow(true)
  }
  const closeLeftTooltip = () => {
    setTooltipShow(false)
  }

  return (
    <>
      <div
        onMouseEnter={openLeftTooltip}
        onMouseLeave={closeLeftTooltip}
        ref={btnRef}
        className={`inline-block ${className}`}
      >
        {children}
      </div>
      <div className="overflow-visible">
        <div
          className={`
            bg-blueGray-800 dark:bg-blueGray-700
            opacity-90 border-0 mt-3 z-50 font-normal leading-normal
            text-sm max-w-xs text-left no-underline break-words rounded-lg
            ${tooltipShow ? 'block' : 'hidden'}
          `}
          ref={tooltipRef}
        >
          <div>
            { title &&
              <div
                className={`
                  opacity-75 font-semibold rounded-t-lg
                  py-2 px-3 mb-0
                  text-gray-50
                  border-b border-solid border-blueGray-600
                `}
              >
                {title}
              </div>
            }
            <div className="text-gray-50 p-3">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

