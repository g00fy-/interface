export default function InfoListItem({labelText, content, className=""}) {
  return (
    <li className={`pl-3 pr-4 py-2 text-sm w-full flex border-gray-200 ${className}`}>
      <div className="dark:text-coolGray-400">{labelText} </div>
      <div className="self-center ml-auto dark:text-coolGray-400">
        {content}
      </div>
    </li>
  )
}
