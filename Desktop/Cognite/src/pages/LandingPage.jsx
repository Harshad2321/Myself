import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Users, Heart, Sparkles, Flower2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LandingPage = () => {
  const navigate = useNavigate()

  const FloatingFlower = ({ delay = 0, x = 0 }) => (
    <motion.div
      className="absolute text-cognite-lavender/30"
      initial={{ y: 0, x, opacity: 0 }}
      animate={{ 
        y: [-20, -80, -20],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      <Flower2 className="w-12 h-12" />
    </motion.div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none">
        <FloatingFlower delay={0} x={100} />
        <FloatingFlower delay={2} x={300} />
        <FloatingFlower delay={4} x={500} />
        <FloatingFlower delay={1} x={700} />
        <FloatingFlower delay={3} x={900} />
        <FloatingFlower delay={5} x={1100} />
      </div>

      <motion.div 
        className="container mx-auto px-6 pt-32 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-cognite-purple to-cognite-lavender rounded-full flex items-center justify-center shadow-2xl">
              <Flower2 className="w-20 h-20 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-7xl font-bold mb-4 font-poppins"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cognite-purple via-purple-600 to-cognite-lavender bg-clip-text text-transparent">
              COGNITE
            </span>
          </motion.h1>

          <motion.p 
            className="text-3xl text-cognite-purple font-semibold mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Reminiscence With Us
          </motion.p>

          <motion.p 
            className="text-xl text-gray-600 mb-12 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A digital space that evokes memory, comfort, and calm.<br />
            <span className="text-cognite-gold font-semibold">Helping dementia patients reconnect with their past.</span>
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button 
              onClick={() => navigate('/patient/1')}
              className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <User className="w-12 h-12 text-cognite-purple mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-cognite-purple mb-2">Patient</h3>
              <p className="text-gray-600">Enter your memory garden</p>
            </button>

            <button 
              onClick={() => navigate('/family/1')}
              className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-12 h-12 text-cognite-rose mx-auto mb-4 group-hover:scale-110 transition-transform fill-current" />
              <h3 className="text-2xl font-bold text-cognite-purple mb-2">Family Member</h3>
              <p className="text-gray-600">Upload cherished memories</p>
            </button>

            <button 
              onClick={() => navigate('/caregiver')}
              className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Users className="w-12 h-12 text-cognite-mint mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-cognite-purple mb-2">Caregiver</h3>
              <p className="text-gray-600">Monitor patient engagement</p>
            </button>

            <button 
              onClick={() => navigate('/patient/1')}
              className="group glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-12 h-12 text-cognite-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-cognite-purple mb-2">Guest Demo</h3>
              <p className="text-gray-600">Explore the experience</p>
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12"
          >
            <button 
              onClick={() => navigate('/patient/1')}
              className="btn-primary text-xl px-12 py-5"
            >
              Explore Demo Experience
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cognite-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower2 className="w-8 h-8 text-cognite-purple" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Personalized Memories</h4>
            <p className="text-gray-600">Curated photos, music, and stories from your past</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cognite-rose/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-cognite-rose fill-current" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Emotional Comfort</h4>
            <p className="text-gray-600">Calming visuals designed to reduce anxiety</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cognite-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-700" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Family Connected</h4>
            <p className="text-gray-600">Caregivers and family stay engaged together</p>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default LandingPage
