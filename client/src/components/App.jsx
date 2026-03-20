import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import DashboardMenu from './dashboard/DashboardMenu'
import DashboardNews from './dashboard/DashboardNews'
import DashboardPassword from './dashboard/DashboardPassword'
import DashboardUsers from './dashboard/DashboardUsers'
import LoginForm from './menu/Menu'
import News from './news/News'
import { useEffect } from 'react'
import * as api from '../api'

// TODO: Add a burger icon for smaller screens and make the form the size of the screen when adding a new element. Order the main menu vertically too

export default function App() {
  useEffect(() => {
    async function getWeather() {
      api.getWeather()
    }

    getWeather()
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="news" element={<News />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardMenu />} />
          <Route path="news" element={<DashboardNews />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path="password" element={<DashboardPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
