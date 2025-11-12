import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { apiGet } from '../lib/api'

export default function Albums() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    apiGet('/albums').then(setAlbums).catch(()=> setAlbums([]))
  }, [])

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Albums</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((a, i) => (
            <motion.div key={a.id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:i*0.05}} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <Link to={`/albums/${a.id}`}>
                <div className="aspect-[16/10] bg-gray-100" style={{backgroundImage: a.cover_url? `url(${a.cover_url})` : undefined, backgroundSize:'cover', backgroundPosition:'center'}}/>
                <div className="p-4">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{a.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
