import { useState } from 'react'
import Login from './pages/Login'
import DashboardCliente from './pages/DashboardCliente'
import DashboardGerente from './pages/DashboardGerente'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login setUser={setUser} />
  }

  if (user.permissao === 'gerente') {
    return <DashboardGerente user={user} />
  }

  return <DashboardCliente user={user} />
}