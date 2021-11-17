import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { Switch } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import { useKeyPress } from '@hooks/useKeyPress'




export default function SettingsSlideOver({ settings, setSettings, setDisplayType, }) {


  const escPressed = useKeyPress("Escape")


  function onClose() {
    setDisplayType(undefined)
  }


  function escFunc() {
    if (escPressed) {
      onClose()
    }
  }

  useEffect(escFunc, [escPressed])





  return (
    <div className="max-h-full overflow-auto rounded-2xl pb-4">
      <div className="bg-white dark:bg-coolGray-800 absolute w-full px-6 pt-3 rounded-t-xl">
        <div className="font-medium text-lg mb-2">
          <span className="dark:text-coolGray-400">
            Settings
          </span>
          <div
            className={`
              inline-block float-right p-2
              group hover:bg-coolGray-50
              border border-white hover:border-coolGray-100 focus-within:border-coolGray-500
              rounded-full -mt-1
              dark:hover:bg-coolGray-900
              dark:border-transparent dark:hover:border-coolGray-800
              `
            }
            onClick={onClose}
          >
            <XIcon
              className={`
                w-5 text-coolGray-500 group-hover:text-coolGray-800 focus:text-coolGray-900
                dark:group-hover:text-coolGray-400 dark:focus:text-coolGray-800
              `}
            />
          </div>
        </div>
      </div>
      <div
        className={`
          bg-white dark:bg-coolGray-800
          pt-16 px-6 rounded-xl text-base focus:outline-none
          overflow-hidden z-10 w-full
          space-y-4
        `}
      >
        <Switch.Group>
          <div className="flex items-center">
            <Switch.Label className="mr-4 text-coolGray-400">Expert Mode</Switch.Label>
            <Switch
              checked={settings.expertMode}
              onChange={ updatedExpertMode => {
                setSettings({
                  ...settings,
                  expertMode: updatedExpertMode
                })
              }}
              className={`
                bg-gradient-to-r
                ${settings.expertMode ? ' from-purple-600 to-blue-600' : 'from-coolGray-900 to-coolGray-900'}
                relative inline-flex items-center h-6 rounded-full w-11
                transition-colors focus:outline-none`}
            >
              <span
                className={`
                  ${settings.expertMode ? 'translate-x-6' : 'translate-x-1'}
                  inline-block w-4 h-4 transform bg-white rounded-full transition-transform
                `}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  )
}
