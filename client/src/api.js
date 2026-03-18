const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'localhost'
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3000

class ApiError extends Error {}

const msg = {
  1: 'Brak dostępu',
  2: 'Niepoprawny token',
  3: 'Brak uprawnień',
  4: 'Nazwa i hasło są wymagane. Nazwa musi mieć od 1 do 64 znaków. Hasło musi mieć od 1 do 512 znaków',
  5: 'Niepoprawna nazwa lub hasło',
  6: 'Kategoria i opis są wymagane. Kategoria wiadomości musi mieć od 1 do 64 znaków. Opis musi mieć od 1 do 1024 znaków',
  7: 'Błąd serwera',
  8: 'Nowe hasło nie może być puste',
}

// /api/auth
async function auth(username, password) {
  const res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.toLowerCase(),
      password,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }

  const token = res.headers.get('x-auth-token')

  return { data, token }
}

// /api/news
async function createNews(category, text, token) {
  const res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify({
      category,
      text,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }

  return data
}

async function getNews() {
  const res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/news`)

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }

  data.news = data.news.map((n) => ({
    ...n,
    date: new Date(n.date),
  }))

  return data
}

async function deleteNews(ids, token) {
  const res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/news`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify({ ids }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }
}

// /api/users
async function createUser(username, password, token) {
  const res = fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }

  return data
}

async function getUsers(token) {
  const res = fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/users`, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }

  return data
}

async function updatePassword(oldPassword, newPassword, token) {
  const res = await fetch(
    `http://${SERVER_HOST}:${SERVER_PORT}/api/users/password`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(msg[data.errcode])
  }
}

export {
  auth,
  createNews,
  getNews,
  deleteNews,
  updatePassword,
  createUser,
  getUsers,
  ApiError,
}
