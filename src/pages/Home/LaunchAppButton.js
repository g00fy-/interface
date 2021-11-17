import { SYNAPSE_BASE_URL } from '@urls'

import Button from '@tw/Button'


export default function LaunchAppButton() {
  return (
    <a href={SYNAPSE_BASE_URL}>
      <Button
        fancy={true}
        className='rounded-xl py-2 px-4 w-full hover:shadow-indigo-2xl opacity-90'
      >
        Launch App
      </Button>
    </a>

  )
}