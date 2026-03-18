import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import Input from '../Input'
import * as api from '../../api'

library.add(fas)

export default function DashboardPassword() {
  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [failMessage, setFailMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleChangePassword(e) {
    e.preventDefault()

    setIsLoading(true)
    setFailMessage('')

    if (newPassword !== confirmNewPassword) {
      setFailMessage('Hasła nie są identyczne')
      setIsLoading(false)
      return
    }

    const token = localStorage.getItem('token')

    try {
      await api.updatePassword(oldPassword, newPassword, token)
    } catch (err) {
      if (err instanceof api.ApiError) {
        setFailMessage(err.message)
        setIsLoading(false)
        return
      }
    }

    setIsLoading(false)

    navigate('/dashboard')
  }

  return (
    <div className="absolute top-1/2 left-1/2 flex h-2/3 w-1/3 -translate-1/2 flex-col justify-center">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-0 right-0 flex h-13 w-13 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400"
      >
        <FontAwesomeIcon className="text-xl" icon="fa-solid fa-xmark" />
      </button>
      <form onSubmit={handleChangePassword} className="flex w-full flex-col">
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
        <label className="self-start">
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords((p) => !p)}
            className="mr-1 scale-[140%] self-start"
          />{' '}
          Pokaż hasła
        </label>
        <p className="text-red-700">{failMessage}</p>
        <button
          disabled={isLoading}
          className="w-1/4 cursor-pointer self-end rounded-full bg-green-800 p-2 text-center text-gray-100 hover:bg-green-900"
        >
          {isLoading ? (
            <FontAwesomeIcon
              icon="fa-solid fa-arrows-rotate"
              className="animate-spin text-white"
            />
          ) : (
            'Zatwierdź'
          )}
        </button>
      </form>
    </div>
  )
}
