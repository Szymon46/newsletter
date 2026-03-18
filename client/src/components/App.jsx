import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import DashboardMenu from './dashboard/DashboardMenu'
import DashboardNews from './dashboard/DashboardNews'
import DashboardPassword from './dashboard/DashboardPassword'
import DashboardUsers from './dashboard/DashboardUsers'
import LoginForm from './menu/Menu'
import News from './news/News'

// TODO: Show current time and ???weather

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
