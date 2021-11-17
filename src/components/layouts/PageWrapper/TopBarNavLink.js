import { NavLink, useLocation } from 'react-router-dom'

import { BASE_PATH } from '@urls'

export default function TopBarNavLink({ labelText, to }) {
  const location = useLocation()

  const match = location.pathname.split('/')[1] === to.split('/')[1] && (to !== "#")

  return (
    <NavLink
      exact={(BASE_PATH === to) && (to !== "#") }
      to={to}
      className={`
        group items-center px-2 my-2 font-light tracking-wide rounded-md
        bg-opacity-50
        transform-gpu transition-all duration-75
        text-coolGray-800
        dark:text-coolGray-400
        dark:hover:text-coolGray-300
        dark:hover:bg-coolGray-800
      `}
      activeClassName={`
        !font-normal
        !bg-opacity-90
        !bg-clip-text !text-transparent !bg-gradient-to-r
        !from-purple-600 !to-blue-600
        active:!from-purple-700 active:!to-blue-700
      `}
    >
      <div
        className={`py-2 px-2`}>
        <span
          className={`
            transform-gpu transition-all duration-75
            ${!match && `
              group-hover:text-coolGray-900
              dark:group-hover:text-coolGray-300
              `
            }
          `}
        >
          {labelText}
        </span>
      </div>
    </NavLink>
  )
}

