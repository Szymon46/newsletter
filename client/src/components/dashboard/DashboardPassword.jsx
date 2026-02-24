import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import Input from '../Input'

library.add(fas)

export default function DashboardPassword() {
  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  async function handleChangePassword() {
    if (newPassword != confirmNewPassword) {
      console.log("Passwords don't match")
      return
    }

    const res = await fetch(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/api/users/pass`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    )

    if (!res.ok) {
      console.log('Could not change password')
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="absolute top-1/2 left-1/2 flex h-2/3 w-1/3 -translate-1/2 flex-col justify-evenly">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-0 right-0 flex h-13 w-13 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400"
      >
        <FontAwesomeIcon className="text-xl" icon="fa-solid fa-xmark" />
      </button>
      <Input
        label="Stare hasło"
        value={oldPassword}
        onChange={setOldPassword}
        isPassword={!showPasswords}
      />
      <Input
        label="Nowe hasło"
        value={newPassword}
        onChange={setNewPassword}
        isPassword={!showPasswords}
      />
      <Input
        label="Potwierdź nowe hasło"
        value={confirmNewPassword}
        onChange={setConfirmNewPassword}
        isPassword={!showPasswords}
      />
      <label>
        <input
          type="checkbox"
          checked={showPasswords}
          onChange={() => setShowPasswords((p) => !p)}
          className="mr-1 scale-[140%] self-start"
        />{' '}
        Pokaż hasła
      </label>
      <button
        className="w-1/4 cursor-pointer self-center rounded-full bg-green-800 p-2 text-center text-gray-100 hover:bg-green-900"
        onClick={handleChangePassword}
      >
        Zatwierdź
      </button>
    </div>
  )
}
