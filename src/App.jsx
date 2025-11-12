import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Albums from './pages/Albums'
import AlbumDetail from './pages/AlbumDetail'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // naive: presence of token => logged in (backend will validate on actions)
    const token = localStorage.getItem('token')
    if (token) setUser({ name: 'Account', role: 'user' })
  }, [])

  const onLogout = () => { localStorage.removeItem('token'); setUser(null); navigate('/') }

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:album_id" element={<AlbumDetail />} />
        <Route path="/login" element={<Auth mode="login" onAuth={u=> {setUser(u); navigate('/admin')}} />} />
        <Route path="/register" element={<Auth mode="register" onAuth={u=> {setUser(u); navigate('/admin')}} />} />
        <Route path="/admin" element={<AdminGate />} />
      </Routes>
    </div>
  )
}

function AdminGate() {
  const [role, setRole] = useState('')
  useEffect(() => {
    // lazy check by calling /me when needed
    const token = localStorage.getItem('token')
    if (!token) { window.location.href = '/login'; return }
    fetch((import.meta.env.VITE_BACKEND_URL||'') + '/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok? r.json(): Promise.reject())
      .then(d => setRole(d.role))
      .catch(()=> window.location.href = '/login')
  }, [])
  if (role !== 'admin' && role !== 'user') return <div className="pt-24 px-6">Checking...</div>
  const Admin = require('./pages/Admin').default
  return <Admin />
}

export default App
