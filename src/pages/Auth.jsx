import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Auth({ mode='login', onAuth }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register'
      const body = mode === 'login' ? { email, password } : { name, email, password }
      const data = await apiPost(path, body)
      localStorage.setItem('token', data.token)
      onAuth && onAuth(data.user)
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6 flex items-start justify-center bg-gradient-to-br from-white to-gray-50">
      <form onSubmit={submit} className="w-full max-w-md bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-2xl font-bold">{mode==='login'? 'Sign in' : 'Create account'}</h2>
        <p className="text-sm text-gray-600 mt-1">Welcome to the portfolio dashboard.</p>
        {mode==='register' && (
          <div className="mt-5">
            <label className="text-sm">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-200" />
          </div>
        )}
        <div className="mt-4">
          <label className="text-sm">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-200" />
        </div>
        <div className="mt-4">
          <label className="text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-200" />
        </div>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        <button disabled={loading} className="mt-6 w-full px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition">{loading? 'Please wait...' : (mode==='login'? 'Sign in' : 'Create account')}</button>
      </form>
    </div>
  )
}
