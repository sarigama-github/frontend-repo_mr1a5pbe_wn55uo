import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../lib/api'
import { motion } from 'framer-motion'

export default function AlbumDetail() {
  const { album_id } = useParams()
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    apiGet(`/albums/${album_id}`).then(setAlbum)
  }, [album_id])

  if (!album) return <div className="min-h-screen pt-24 px-6">Loading...</div>

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">{album.title}</h2>
            <p className="text-gray-600">{album.description}</p>
          </div>
          <a href={`${import.meta.env.VITE_BACKEND_URL || ''}/albums/${album_id}/download`} className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition">Download album</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {album.photos?.map((p, i) => (
            <motion.div key={p.id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:i*0.03}} className="group">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <img src={p.file_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition"/>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.title || 'Untitled'}</p>
                </div>
                <a href={`${import.meta.env.VITE_BACKEND_URL || ''}/photos/${p.id}/download`} className="text-sm text-gray-600 hover:text-gray-900">Download</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
