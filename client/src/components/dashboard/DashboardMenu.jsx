import { Link } from 'react-router-dom'

function Button({ children, to }) {
  return (
    <Link className="h-1/5 w-4/5" to={to}>
      <button className="h-full w-full cursor-pointer rounded-full bg-gray-300 text-3xl text-gray-800 hover:bg-gray-400">
        {children}
      </button>
    </Link>
  )
}

export default function DashboardMenu() {
  return (
    <div className="flex h-4/5 w-3/10 flex-col items-center justify-evenly">
      <Button to="news">Aktualności</Button>
      <Button to="users">Użytkownicy</Button>
    </div>
  )
}
