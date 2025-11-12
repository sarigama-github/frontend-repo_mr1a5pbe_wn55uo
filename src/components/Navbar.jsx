import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, LogIn, LogOut, User, PlusSquare, Images } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-900 font-semibold">
          <Images className="w-6 h-6" />
          <span>LensCraft</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/albums" className="hover:text-gray-900 transition">Albums</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-gray-900 transition flex items-center gap-2">
              <PlusSquare className="w-4 h-4"/> Admin
            </Link>
          )}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <button onClick={()=> navigate('/login')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition">
              <LogIn className="w-4 h-4"/> Sign in
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4"/>
                <span className="hidden sm:block">{user.name}</span>
              </div>
              <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                <LogOut className="w-4 h-4"/> Logout
              </button>
            </div>
          )}
        </div>
        <button className="md:hidden p-2" onClick={()=> setOpen(!open)}><Menu/></button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white/80 backdrop-blur">
          <div className="px-4 py-3 space-y-2">
            <Link to="/albums" className="block">Albums</Link>
            {user?.role === 'admin' && <Link to="/admin" className="block">Admin</Link>}
            {!user ? (
              <button onClick={()=> {setOpen(false); location.pathname !== '/login' && (window.location.href = '/login')}} className="w-full text-left">Sign in</button>
            ) : (
              <button onClick={onLogout} className="w-full text-left">Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
