
export default function InfoSection({ title, children, className, showDivider=false, showOutline=true }) {
  let dividerClassName
  if (showDivider) {
    dividerClassName = "divide-y divide-solid divide-gray-200 dark:divide-coolGray-700"
  } else {
    dividerClassName = ""
  }
  return (
    <>
      { title &&
        <h3 className="text-sm mt-4 mb-1">
          {title}
        </h3>
      }
      <ul className={`${showOutline ? "border border-gray-200 dark:border-coolGray-700" : ""} text-default rounded-md ${dividerClassName} ${className}`}>
        {children}
      </ul>
    </>
  )
}