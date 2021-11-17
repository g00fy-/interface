import Button from '@tw/Button'

import BalanceInputContainer from '@components/BalanceInputContainer'
import ButtonLoadingSpinner from '@components/ButtonLoadingSpinner'

export default function InteractiveInputRow({ title, balanceStr, onClickBalance, value, placeholder, onChange, disabled, isPending, onClickEnter, buttonLabel, loadingLabel, icon, showButton=true }) {
  let titleContent
  if (icon) {
    titleContent =
      <div className="inline-block pb-1">
        <img className='w-5 mr-2.5 -mt-1 inline-block' alt='icon' src={icon} />
        <div className='inline-block  '>
          {title}
        </div>
      </div>
  } else {
    titleContent = title
  }

  return (
    <div className='mt-4'>
      <div className='inline-flex items-center space-x-2 w-full'>
        <BalanceInputContainer
          title={titleContent}
          balanceStr={balanceStr}
          className="w-full"
          onClickBalance={onClickBalance}
        >
          <input
            className={`
              block w-full
              border border-gray-300 hover:border-gray-400
              dark:border-coolGray-700 dark:hover:border-coolGray-600
              rounded-md pl-4 py-2
              focus:outline-none
              focus:ring-indigo-500 focus:border-indigo-500
              dark:focus:ring-purple-700 dark:focus:border-purple-700
              dark:bg-coolGray-700
              dark:text-coolGray-300
            `}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </BalanceInputContainer>
        {showButton &&
          <Button
            className={`w-2/5 max-w-content -mb-0.5 !py-[0.5625rem] ${!balanceStr && "mt-5"} ${balanceStr && "mt-[1.625rem]"} `}
            disabled={disabled}
            onClick={onClickEnter}
          >
            {isPending
              ?
                <>
                  {loadingLabel ?
                      <span className="animate-pulse">
                        {loadingLabel}
                        <ButtonLoadingSpinner className="ml-2" />
                      </span>
                    :
                      <ButtonLoadingSpinner />
                  }
                </>
              :
                <span>
                  {buttonLabel ?? title}
                </span>
            }
          </Button>
        }
      </div>
    </div>
  )
}