
import { useTokenInfo } from '@hooks/tokens/useTokenInfo'

import AddToWalletButton from '@components/AddToWalletButton'
import ExternalLinkButton from '@components/ExternalLinkButton'
import CopyableAddress from '@components/CopyableAddress'



export default function ContractListItem({ token }) {
  const { address, symbol, icon, description, docUrl } = useTokenInfo(token)

  return (
    <li className='ml-auto py-2'>
      <div className='w-full'>
        <div className='inline-block'>
          <p className='text-md font-medium text-gray-900 dark:text-coolGray-300 mr-2'>
            {symbol}
            <img src={icon} className='w-4 h-4 inline -mt-1 ml-1'/>
          </p>
          <CopyableAddress address={address} />
        </div>
        <div className='inline-block float-right h-full self-center ml-auto'>
          <div>
            <AddToWalletButton
              token={token}
              icon={icon}
              className='float-right'
            />
          </div>
          <div>
            {
              ( docUrl &&
                <ExternalLinkButton
                  href={docUrl}
                  text={`Open ${symbol} Docs`}
                  className='float-right mt-1.5 py-0.5'
                />
              )
            }
          </div>
        </div>
      </div>
      <div className='w-full'>
        <p className='text-xs prose text-gray-600 dark:text-coolGray-500 mb-1.5 mr-2'>
          {description}
        </p>
      </div>
    </li>
  )
}
