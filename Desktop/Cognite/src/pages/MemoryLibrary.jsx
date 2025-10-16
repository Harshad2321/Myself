import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Music, Image, BookOpen, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MemoryCard from '../components/MemoryCard'
import EmotionTag from '../components/EmotionTag'
import { patients } from '../data/samplePatients'

const MemoryLibrary = () => {
  const { id } = useParams()
  const patient = patients.find(p => p.id === parseInt(id)) || patients[0]
  const [activeTab, setActiveTab] = useState('photos')
  const [filterEmotion, setFilterEmotion] = useState('all')
  const [filterDecade, setFilterDecade] = useState('all')

  const tabs = [
    { id: 'photos', label: 'Photos', icon: Image },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'stories', label: 'Stories', icon: BookOpen }
  ]

  const filteredMemories = patient.memories.filter(m => {
    if (filterEmotion !== 'all' && m.emotion !== filterEmotion) return false
    if (filterDecade !== 'all' && m.decade !== filterDecade) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <Navbar patientId={id} showNavigation={true} />
      
      <motion.div 
        className="container mx-auto px-6 pt-28 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-cognite-purple mb-3 font-poppins">
            Memory Library
          </h1>
          <p className="text-xl text-gray-600">
            Explore your collection of cherished moments
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 mb-8 flex items-center gap-6 flex-wrap"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-cognite-purple" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>
          
          <select 
            value={filterEmotion}
            onChange={(e) => setFilterEmotion(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-cognite-lavender bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-cognite-purple"
          >
            <option value="all">All Emotions</option>
            <option value="Love">Love</option>
            <option value="Joy">Joy</option>
            <option value="Calm">Calm</option>
            <option value="Peace">Peace</option>
            <option value="Nostalgia">Nostalgia</option>
            <option value="Triumph">Triumph</option>
            <option value="Pride">Pride</option>
          </select>

          <select 
            value={filterDecade}
            onChange={(e) => setFilterDecade(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-cognite-lavender bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-cognite-purple"
          >
            <option value="all">All Decades</option>
            <option value="1950s">1950s</option>
            <option value="1960s">1960s</option>
            <option value="1970s">1970s</option>
            <option value="1980s">1980s</option>
            <option value="1990s">1990s</option>
            <option value="2000s">2000s</option>
          </select>
        </motion.div>

        <motion.div 
          className="flex gap-4 mb-8 justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cognite-purple to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-cognite-lavender/20 border-2 border-cognite-lavender'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'photos' && (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredMemories.filter(m => m.type === 'photo').map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MemoryCard 
                    memory={memory}
                    onClick={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'music' && (
            <div className="grid md:grid-cols-3 gap-6">
              {patient.musicLibrary.map((song, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={song.cover} 
                    alt={song.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{song.title}</h3>
                  <p className="text-gray-600 mb-2">{song.artist}</p>
                  <span className="text-sm text-cognite-purple font-semibold">{song.decade}</span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="grid md:grid-cols-2 gap-6">
              {patient.stories.map((story, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-8 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{story.title}</h3>
                    <EmotionTag emotion={story.emotion} />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {story.text}
                  </p>
                  <button className="mt-4 text-cognite-purple font-semibold hover:underline">
                    Read Full Story →
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default MemoryLibrary

