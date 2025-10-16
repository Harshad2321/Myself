import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { Flower2, Calendar, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MemoryCard from '../components/MemoryCard'
import ChartMock from '../components/ChartMock'
import { patients } from '../data/samplePatients'

const PatientDashboard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = patients.find(p => p.id === parseInt(id)) || patients[0]

  const suggestedMemories = patient.memories.slice(0, 3)

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
            Welcome back, {patient.name.split(' ')[0]}
          </h1>
          <p className="text-xl text-gray-600">
            Let's take a gentle walk through your memory garden today
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-8 mb-12 max-w-4xl mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-8">
            <img 
              src={patient.profileImage} 
              alt={patient.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-cognite-lavender"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{patient.name}</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <span className="font-semibold">Age:</span> {patient.age}
                </div>
                <div>
                  <span className="font-semibold">Theme:</span> {patient.theme}
                </div>
                <div>
                  <span className="font-semibold">Diagnosis:</span> {patient.diagnosis}
                </div>
                <div>
                  <span className="font-semibold">Caregiver:</span> {patient.caregiver}
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/virtual-garden/${patient.id}`)}
              className="btn-primary flex items-center gap-2"
            >
              <Flower2 className="w-5 h-5" />
              Visit Garden
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-cognite-gold" />
            <h2 className="text-3xl font-bold text-gray-800">Today's Suggested Memories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {suggestedMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <MemoryCard 
                  memory={memory}
                  onClick={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-cognite-rose fill-current" />
            <h2 className="text-3xl font-bold text-gray-800">Your Memory Timeline</h2>
          </div>
          <div className="glass-card p-8">
            <div className="flex gap-6 overflow-x-auto pb-4">
              {patient.memories.map((memory) => (
                <motion.div
                  key={memory.id}
                  className="min-w-[300px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                >
                  <MemoryCard 
                    memory={memory}
                    onClick={() => navigate(`/memory-library/${patient.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ChartMock title="Your Weekly Engagement & Emotional Wellness" />
        </motion.div>

        <motion.div 
          className="flex justify-center gap-6 mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            onClick={() => navigate(`/memory-library/${patient.id}`)}
            className="btn-secondary"
          >
            Browse All Memories
          </button>
          <button 
            onClick={() => navigate(`/virtual-garden/${patient.id}`)}
            className="btn-primary flex items-center gap-2"
          >
            <Flower2 className="w-5 h-5" />
            Start Memory Walk
          </button>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default PatientDashboard

