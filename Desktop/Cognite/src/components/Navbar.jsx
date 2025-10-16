import { Link } from 'react-router-dom'
import { Music, Home, BookOpen, Flower2 } from 'lucide-react'

const Navbar = ({ patientId, showNavigation = false }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <div className="w-12 h-12 bg-gradient-to-br from-cognite-purple to-cognite-lavender rounded-full flex items-center justify-center">
            <Flower2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cognite-purple font-poppins">COGNITE</h1>
            <p className="text-xs text-gray-600">Reminiscence With Us</p>
          </div>
        </Link>

        {showNavigation && patientId && (
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to={`/patient/${patientId}`}
              className="flex items-center gap-2 text-gray-700 hover:text-cognite-purple font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              to={`/memory-library/${patientId}`}
              className="flex items-center gap-2 text-gray-700 hover:text-cognite-purple font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Memory Library
            </Link>
            <Link 
              to={`/virtual-garden/${patientId}`}
              className="flex items-center gap-2 text-gray-700 hover:text-cognite-purple font-semibold transition-colors"
            >
              <Flower2 className="w-5 h-5" />
              Memory Garden
            </Link>
          </div>
        )}

        <button className="w-12 h-12 bg-cognite-lavender/20 rounded-full flex items-center justify-center hover:bg-cognite-lavender/40 transition-colors">
          <Music className="w-6 h-6 text-cognite-purple" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar

