import { useEffect, useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default function Dashboard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('username')
    const token = localStorage.getItem('token')

    if (!name || !token) {
      navigate('/')
    }

    setUsername(name)
  }, [])

  function handleLogout() {
    setUsername('')
    localStorage.removeItem('username')
    localStorage.removeItem('token')

    navigate('/')
  }

  return (
    <div className="grid h-screen w-screen grid-cols-[100%] grid-rows-[10%_90%] font-semibold">
      <div className="relative col-start-1 col-end-2 row-start-1 row-end-2 flex items-center bg-green-800 shadow-md shadow-gray-400">
        <button
          onClick={handleLogout}
          className="absolute left-[2%] h-13 w-13 cursor-pointer rounded-full bg-emerald-900 hover:bg-emerald-800"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-right-from-bracket"
            className="fa-xl text-gray-100"
          />
        </button>
        <h1 className="absolute left-[10%] text-5xl text-gray-100">
          Panel zarządzania
        </h1>
        <div className="group absolute top-1/4 right-[3%] z-10 w-40 rounded-md bg-green-900 p-4 text-center text-xl text-gray-100 hover:bg-green-900">
          <p className="capitalize">
            {username} <FontAwesomeIcon icon="fa-solid fa-user" />
            <FontAwesomeIcon icon="fa-solid fa-angle-down" />
          </p>
          <hr className="mt-2 mb-2 hidden rounded-md border-2 border-emerald-800 group-hover:block" />
          <Link
            to="password"
            className="hidden cursor-pointer group-hover:block hover:text-zinc-400"
          >
            Zmiana hasła
          </Link>
        </div>
      </div>

      <div className="col-start-1 col-end-2 row-start-2 row-end-3 flex items-start justify-center overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  )
}
