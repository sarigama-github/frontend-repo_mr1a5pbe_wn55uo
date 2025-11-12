import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/80"/>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="text-5xl sm:text-6xl font-extrabold tracking-tight">
              Capturing stories in frames
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.15, duration:0.8}} className="mt-6 text-lg text-gray-700 max-w-xl">
              Minimal, modern portfolio for photographers. Explore curated albums, download selects, and book sessions.
            </motion.p>
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration:0.8}} className="mt-8 flex items-center gap-4">
              <Link to="/albums" className="px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-black transition">View albums</Link>
              <Link to="/login" className="px-5 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition">Sign in</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
