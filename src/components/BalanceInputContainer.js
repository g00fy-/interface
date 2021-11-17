
export default function BalanceInputContainer({ balanceStr, title, children, onClickBalance, className }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="pb-1">
        <span className="dark:text-coolGray-400">
          {title}
        </span>
        <a onClick={onClickBalance} className="hover:underline group">
          <small className="inline-block float-right mt-1 text-coolGray-500  group-hover:underline cursor-pointer">
            Max:{' '}
            <span className="text-coolGray-800 dark:text-coolGray-400 font-medium ">
              {balanceStr}
            </span>
          </small>
        </a>
      </div>
      {children}
    </div>
  )
}