import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiUpload } from '../lib/api'

export default function Admin() {
  const [albums, setAlbums] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [cover, setCover] = useState('')
  const [selected, setSelected] = useState(null)

  const refresh = () => apiGet('/albums').then(setAlbums)
  useEffect(() => { refresh() }, [])

  const createAlbum = async (e) => {
    e.preventDefault()
    const data = await apiPost('/albums', { title, description, cover_url: cover, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) })
    setTitle(''); setDescription(''); setCover(''); setTags('');
    setSelected(data.id)
    refresh()
  }

  const uploadPhoto = async (e) => {
    e.preventDefault()
    if (!selected) return
    const form = new FormData()
    const file = e.target.file.files[0]
    form.append('file', file)
    form.append('title', e.target.title.value)
    form.append('description', e.target.description.value)
    await apiUpload(`/albums/${selected}/photos`, form)
    e.target.reset()
    alert('Uploaded')
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold">Create album</h2>
          <form onSubmit={createAlbum} className="mt-4 space-y-4 bg-white p-4 rounded-xl border border-gray-100">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border rounded-md px-3 py-2"/>
            <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border rounded-md px-3 py-2"/>
            <input value={cover} onChange={e=>setCover(e.target.value)} placeholder="Cover image URL (optional)" className="w-full border rounded-md px-3 py-2"/>
            <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags, comma, separated" className="w-full border rounded-md px-3 py-2"/>
            <button className="px-4 py-2 rounded-md bg-gray-900 text-white">Create</button>
          </form>

          <h2 className="text-2xl font-bold mt-10">Upload photo</h2>
          <form onSubmit={uploadPhoto} className="mt-4 space-y-4 bg-white p-4 rounded-xl border border-gray-100">
            <select value={selected || ''} onChange={e=>setSelected(e.target.value)} className="w-full border rounded-md px-3 py-2">
              <option value="" disabled>Select album</option>
              {albums.map(a=> <option value={a.id} key={a.id}>{a.title}</option>)}
            </select>
            <input name="title" placeholder="Title (optional)" className="w-full border rounded-md px-3 py-2"/>
            <input name="description" placeholder="Description (optional)" className="w-full border rounded-md px-3 py-2"/>
            <input name="file" type="file" accept="image/*" className="w-full"/>
            <button className="px-4 py-2 rounded-md bg-gray-900 text-white">Upload</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Your albums</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {albums.map(a => (
              <div key={a.id} className={`rounded-xl border ${selected===a.id? 'border-gray-900' : 'border-gray-100'} overflow-hidden`}> 
                <div className="aspect-[16/10] bg-gray-100" style={{backgroundImage: a.cover_url? `url(${a.cover_url})` : undefined, backgroundSize:'cover', backgroundPosition:'center'}}/>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.tags?.join(', ')}</p>
                  </div>
                  <button onClick={()=> setSelected(a.id)} className="text-sm px-3 py-1 rounded-md border">Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
