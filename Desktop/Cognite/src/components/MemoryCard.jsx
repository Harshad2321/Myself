import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import EmotionTag from './EmotionTag'

const MemoryCard = ({ memory, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-4 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl mb-3">
        <img 
          src={memory.image || 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600'} 
          alt={memory.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-cognite-purple fill-current ml-1" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
          {memory.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {memory.description}
        </p>
        <div className="flex items-center justify-between">
          <EmotionTag emotion={memory.emotion} />
          {memory.decade && (
            <span className="text-xs text-gray-500 font-medium">
              {memory.decade}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MemoryCard

