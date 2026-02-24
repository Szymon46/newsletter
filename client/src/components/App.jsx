import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import DashboardMenu from './dashboard/DashboardMenu'
import DashboardNews from './dashboard/DashboardNews'
import DashboardPassword from './dashboard/DashboardPassword'
import DashboardUsers from './dashboard/DashboardUsers'
import LoginForm from './menu/Menu'
import News from './news/News'

// 1. HTTPS???
// 2.
// Restructure the whole frontend to proper folders and create components where they're useful
// Add useful comments
// Change variables' names
// 3.
// Move the logout button
// Add password changing
// Add dropdown (where the username is showed) with logout option and password change option
//
// ubuntu - 100.122.20.126, 172.16.112.227

export default function App() {
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
