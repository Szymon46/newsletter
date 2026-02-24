import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Input from '../Input'

// TODO: Add a spinning wheel on the button when logging in
export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [failMessage, setFailMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!(username && password)) {
      setPassword('')
      setUsername('')
      setFailMessage('Login i hasło nie mogą być puste')
      console.error("Login and password can't be empty")
      return
    }

    const res = await fetch(
      `http://${
        import.meta.env.VITE_SERVER_HOST || 'localhost'
      }:${import.meta.env.VITE_SERVER_PORT || 3000}/api/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password: password,
        }),
      }
    )

    setUsername('')
    setPassword('')

    if (!res.ok) {
      console.error('Incorrect login or password')
      setFailMessage('Niepoprawny login lub hasło')
      return
    }

    const data = await res.json()
    const token = res.headers.get('x-auth-token')

    localStorage.setItem('username', data.username)
    localStorage.setItem('token', token)

    setFailMessage('')
    navigate('/dashboard')
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-green-800 font-semibold">
      <div className="flex h-4/5 w-4/5 items-center justify-evenly rounded-3xl bg-zinc-300">
        <div className="h-4/5 w-1/3 rounded-2xl bg-gray-100 text-center">
          <h1 className="mt-20 mb-5 text-4xl">Chcesz zobaczyć aktualności?</h1>
          <p className="text-xl">
            Kliknij{' '}
            <Link
              className="text-blue-500 underline hover:text-blue-600"
              to="/news"
            >
              tutaj
            </Link>
          </p>
        </div>
        <div className="flex h-4/5 w-1/3 flex-col items-center justify-center rounded-2xl bg-gray-100">
          <h1 className="mt-20 mb-5 text-center text-4xl">
            Logowanie do panelu zarządzania
          </h1>
          <form className="flex h-4/5 w-1/2 flex-col">
            <Input label="Login" value={username} onChange={setUsername} />
            <Input label="Hasło" value={password} onChange={setPassword} />
            {failMessage !== '' ? (
              <p className="mb-3 text-red-500">{failMessage}</p>
            ) : (
              ''
            )}
            <button
              onClick={handleSubmit}
              className="h-10 w-3/4 cursor-pointer self-center rounded-xl bg-green-800 text-gray-50 hover:bg-green-900"
            >
              Zaloguj
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
