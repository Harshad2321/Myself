import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Flower2, TreePine, Home, X, Play } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EmotionTag from '../components/EmotionTag'
import { patients } from '../data/samplePatients'

const VirtualGarden = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = patients.find(p => p.id === parseInt(id)) || patients[0]
  const [selectedMemory, setSelectedMemory] = useState(null)

  const gardenItems = [
    { 
      id: 1, 
      type: 'flower', 
      position: { top: '20%', left: '15%' },
      memory: patient.memories[0],
      icon: Flower2,
      color: 'text-pink-400'
    },
    { 
      id: 2, 
      type: 'tree', 
      position: { top: '15%', left: '70%' },
      memory: patient.memories[1],
      icon: TreePine,
      color: 'text-green-500'
    },
    { 
      id: 3, 
      type: 'flower', 
      position: { top: '60%', left: '30%' },
      memory: patient.memories[2] || patient.memories[0],
      icon: Flower2,
      color: 'text-purple-400'
    },
    { 
      id: 4, 
      type: 'tree', 
      position: { top: '55%', left: '75%' },
      memory: patient.memories[3] || patient.memories[1],
      icon: TreePine,
      color: 'text-emerald-600'
    },
    { 
      id: 5, 
      type: 'flower', 
      position: { top: '75%', left: '50%' },
      memory: patient.memories[0],
      icon: Flower2,
      color: 'text-yellow-400'
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar patientId={id} showNavigation={true} />
      
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #B8E6D5 50%, #90EE90 100%)',
        }}
      >
        <motion.div
          className="absolute top-10 w-32 h-16 bg-white/60 rounded-full blur-sm"
          animate={{ x: [-100, 1400] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-24 w-40 h-20 bg-white/50 rounded-full blur-sm"
          animate={{ x: [1400, -200] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 pt-28 pb-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-white mb-3 font-poppins drop-shadow-lg">
            {patient.name.split(' ')[0]}'s Memory Garden
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            Click on the flowers and trees to explore your memories
          </p>
        </motion.div>

        <motion.div 
          className="relative h-[600px] glass-card overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(184,230,213,0.4))',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-700/40 to-transparent" />

          {gardenItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                className={`absolute ${item.color} hover:scale-125 transition-transform cursor-pointer`}
                style={{ top: item.position.top, left: item.position.left }}
                onClick={() => setSelectedMemory(item.memory)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <Icon className="w-16 h-16 drop-shadow-lg filter" />
                  <motion.div
                    className="absolute -inset-2 rounded-full bg-white/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>
              </motion.button>
            )
          })}

          <div className="absolute bottom-8 left-10 w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full blur-xl opacity-30 animate-pulse-soft" />
          <div className="absolute bottom-12 right-20 w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse-soft" />
        </motion.div>

        <motion.button
          onClick={() => navigate(`/patient/${id}`)}
          className="fixed bottom-8 right-8 btn-primary flex items-center gap-2 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          <Home className="w-5 h-5" />
          Return to Dashboard
        </motion.button>
      </motion.div>

      {selectedMemory && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedMemory(null)}
        >
          <motion.div 
            className="glass-card max-w-2xl w-full p-8 relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="mb-6">
              <img 
                src={selectedMemory.image} 
                alt={selectedMemory.title}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {selectedMemory.title}
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <EmotionTag emotion={selectedMemory.emotion} />
              {selectedMemory.decade && (
                <span className="px-3 py-1 bg-cognite-gold/20 text-cognite-purple rounded-full text-sm font-semibold border border-cognite-gold">
                  {selectedMemory.decade}
                </span>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {selectedMemory.description}
            </p>

            <div className="flex gap-4">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Play Memory
              </button>
              <button className="btn-secondary flex-1">
                Guided by Voice of {patient.caregiver.split(' ')[1] || 'Family'}
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4 italic">
              "Take your time. There's no rush in remembering."
            </p>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  )
}

export default VirtualGarden

