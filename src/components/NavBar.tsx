import { Link } from 'react-router-dom'

/* 'Demos' Nested Dropdown menu */
export const NavBar = () => {
  const dropDownOptions = (
    <div
      id="dropdownNavbar"
      className="absolute top-full left-0 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 group-hover:block z-50"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-400"
        aria-labelledby="dropdownLargeButton"
      >
        <li>
          <Link
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            to="/whiteboard"
          >
            Whiteboard
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" to="/FormFill">
            Form Fill
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" to="/contact">
            Captcha
          </Link>
        </li>
      </ul>
    </div>
  )

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen flex flex-wrap items-center justify-evenly px-4">
          <a href="/" className="flex items-center">
            <span className="my-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CodeByCharlie
            </span>
          </a>

          <div className="w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-2 md:p-0  rounded-lg  md:flex-row md:space-x-8 md:mt-0 ">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>

              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/Posts"
                >
                  Posts
                </Link>
              </li>

              <li className="group relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Demos{' '}
                  <svg /* Caret icon.  Rotates 180 when dropdown is open */
                    className="w-2.5 h-2.5 ml-2.5 transform transition-transform duration-250 group-hover:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div className="relative">
                  {/* Relative class added so dropdown options appear in correct location */}
                  {dropDownOptions}
                </div>
              </li>
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/WordGame"
                >
                  Word Game
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
