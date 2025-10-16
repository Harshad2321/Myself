import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Upload, Image as ImageIcon, Type, Heart, CheckCircle, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MemoryCard from '../components/MemoryCard'
import { patients, emotionColors } from '../data/samplePatients'

const FamilyPortal = () => {
  const { id } = useParams()
  const patient = patients.find(p => p.id === parseInt(id)) || patients[0]
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    emotion: 'Love',
    decade: '1960s',
    imagePreview: null
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        title: '',
        description: '',
        emotion: 'Love',
        decade: '1960s',
        imagePreview: null
      })
    }, 3000)
  }

  const recentUploads = patient.memories.slice(0, 4)

  return (
    <div className="min-h-screen">
      <Navbar patientId={id} showNavigation={true} />
      
      <motion.div 
        className="container mx-auto px-6 pt-28 pb-12"
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
          <h1 className="text-5xl font-bold text-cognite-purple mb-3 font-poppins">
            Family Upload Portal
          </h1>
          <p className="text-xl text-gray-600">
            Share precious memories with {patient.name.split(' ')[0]}
          </p>
          <p className="text-md text-cognite-gold font-semibold mt-2">
            Your contributions help create meaningful moments of connection
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Upload className="w-7 h-7 text-cognite-purple" />
                Upload New Memory
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <ImageIcon className="w-5 h-5 inline mr-2" />
                  Photo or Image
                </label>
                <div className="border-3 border-dashed border-cognite-lavender rounded-2xl p-8 text-center hover:border-cognite-purple transition-colors cursor-pointer bg-white/50">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.imagePreview ? (
                      <div className="relative">
                        <img 
                          src={formData.imagePreview} 
                          alt="Preview" 
                          className="max-h-48 mx-auto rounded-lg shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setFormData({ ...formData, imagePreview: null })
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-cognite-lavender mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">Click to upload an image</p>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Type className="w-5 h-5 inline mr-2" />
                  Memory Title
                </label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Family Picnic at the Park"
                  className="w-full px-4 py-3 rounded-xl border-2 border-cognite-lavender focus:border-cognite-purple focus:outline-none text-gray-700 text-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share the story behind this memory..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cognite-lavender focus:border-cognite-purple focus:outline-none text-gray-700 resize-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Heart className="w-5 h-5 inline mr-2" />
                  Emotion Tag
                </label>
                <select
                  value={formData.emotion}
                  onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cognite-lavender focus:border-cognite-purple focus:outline-none text-gray-700 text-lg font-medium"
                >
                  {Object.keys(emotionColors).map(emotion => (
                    <option key={emotion} value={emotion}>{emotion}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Time Period
                </label>
                <select
                  value={formData.decade}
                  onChange={(e) => setFormData({ ...formData, decade: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cognite-lavender focus:border-cognite-purple focus:outline-none text-gray-700 text-lg font-medium"
                >
                  <option value="1950s">1950s</option>
                  <option value="1960s">1960s</option>
                  <option value="1970s">1970s</option>
                  <option value="1980s">1980s</option>
                  <option value="1990s">1990s</option>
                  <option value="2000s">2000s</option>
                  <option value="2010s">2010s</option>
                </select>
              </div>
              <button 
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Memory
              </button>

              <p className="text-sm text-gray-500 text-center mt-4 italic">
                Note: This is a demo. No files will be uploaded.
              </p>
            </form>
          </motion.div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Recent Uploads to {patient.name.split(' ')[0]}'s Library
              </h2>
              
              <div className="space-y-4">
                {recentUploads.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <MemoryCard memory={memory} onClick={() => {}} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-cognite-purple/10 to-cognite-lavender/10 rounded-2xl border-2 border-cognite-lavender">
                <h3 className="font-bold text-cognite-purple mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Choose clear, well-lit photos</li>
                  <li>✓ Include familiar faces and places</li>
                  <li>✓ Write detailed, loving descriptions</li>
                  <li>✓ Focus on positive emotions</li>
                  <li>✓ Upload 2-3 memories per week</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-12 glass-card p-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Memory Upload Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-pink-50 rounded-2xl">
              <h3 className="font-bold text-pink-800 mb-3">🎯 What to Upload</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Family gatherings & celebrations</li>
                <li>• Childhood and youth photos</li>
                <li>• Places they loved visiting</li>
                <li>• Hobbies and achievements</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl">
              <h3 className="font-bold text-blue-800 mb-3">💡 Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use high-quality images</li>
                <li>• Add context and stories</li>
                <li>• Tag emotions accurately</li>
                <li>• Regular small uploads work best</li>
              </ul>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl">
              <h3 className="font-bold text-green-800 mb-3">❤️ Impact</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Improves memory recall</li>
                <li>• Reduces anxiety & confusion</li>
                <li>• Strengthens family bonds</li>
                <li>• Creates moments of joy</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {showSuccess && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="glass-card max-w-md w-full p-8 text-center"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Memory Uploaded!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              "{formData.title}" has been added to {patient.name.split(' ')[0]}'s Timeline!
            </p>
            <p className="text-sm text-gray-500 italic">
              This memory will help create beautiful moments of connection.
            </p>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  )
}

export default FamilyPortal

