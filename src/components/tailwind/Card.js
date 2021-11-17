export default function Card({title, className, children, titleClassName, divider=true, ...props}) {
  let titleContent = ""
  if (title) {
    titleContent = (
      <>
        <div className={"font-medium text-lg mb-2 dark:text-coolGray-400 " + titleClassName}>
          {title}
        </div>
        {divider ? <hr className="dark:hidden"/> : ""}
      </>
    )
  }

  return (
    <div className={`bg-white dark:bg-coolGray-800 shadow-lg pt-3 px-6 pb-6 rounded-lg ${className ?? ""}`}>
      {titleContent}
      {children}
    </div>
  )
}