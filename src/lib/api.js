const BASE = import.meta.env.VITE_BACKEND_URL || ''

export function authHeader() {
  const t = localStorage.getItem('token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export async function apiGet(path) {
  const res = await fetch(BASE + path, { headers: { ...authHeader() } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiUpload(path, formData) {
  const res = await fetch(BASE + path, { method: 'POST', headers: { ...authHeader() }, body: formData })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
