// TEST
const baseClassname = `
  text-white

  px-2 py-2 rounded-md
  transition-all duration-75
  focus:!outline-none active:!outline-none ring-none
  group

  dark:disabled:text-coolGray-500
  `

const fancyBgClassname = `
  bg-gradient-to-r from-purple-600 to-blue-600
  hover:from-purple-700 hover:to-blue-700
  active:from-purple-800 active:to-blue-800
  disabled:from-coolGray-300 disabled:to-coolGray-200

  dark:disabled:from-coolGray-700 dark:disabled:to-coolGray-600
  `

const bgClassname = `
  bg-indigo-600 hover:bg-indigo-800 active:bg-indigo-900
  disabled:bg-coolGray-300
  dark:disabled:bg-coolGray-700
  `


const outlineClassname = `
  bg-transparent active:bg-gray-50 disabled:bg-coolGray-300
  border border-gray-200 hover:border-gray-500 active:border-blue-500
  text-gray-600 hover:text-gray-800

  active:bg-coolGray-800
  dark:border-coolGray-700 dark:hover:border-purple-500
  dark:text-coolGray-500 dark:hover:text-coolGray-400
  `



export default function Button({ className, children, fancy, outline, ...props}) {
  let btnStyleClassname
  if (fancy) {
    btnStyleClassname = fancyBgClassname
  } else if (outline) {
    btnStyleClassname = outlineClassname
  } else {
    btnStyleClassname = bgClassname
  }

  return (
    <button
      className={`${baseClassname} ${btnStyleClassname} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

