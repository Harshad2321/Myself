import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Download, Users, Calendar, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChartMock from '../components/ChartMock'
import EmotionTag from '../components/EmotionTag'
import { patients, caregiverSessions } from '../data/samplePatients'

const CaregiverDashboard = () => {
  const navigate = useNavigate()
  const [selectedPatient, setSelectedPatient] = useState(null)

  const engagementData = [
    { day: 'Mon', engagement: 65, calm: 60 },
    { day: 'Tue', engagement: 72, calm: 68 },
    { day: 'Wed', engagement: 68, calm: 72 },
    { day: 'Thu', engagement: 80, calm: 78 },
    { day: 'Fri', engagement: 85, calm: 82 },
    { day: 'Sat', engagement: 78, calm: 80 },
    { day: 'Sun', engagement: 88, calm: 85 }
  ]

  return (
    <div className="min-h-screen">
      <Navbar showNavigation={false} />
      
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
            Caregiver Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Monitor patient engagement and emotional well-being
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Weekly Engagement</h3>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-4xl font-bold text-cognite-purple mb-2">85%</p>
            <p className="text-sm text-green-600 font-semibold">
              ↑ 12% from last week
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Calm Index</h3>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-4xl font-bold text-cognite-purple mb-2">82%</p>
            <p className="text-sm text-green-600 font-semibold">
              ↑ 23% this week
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Active Patients</h3>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-4xl font-bold text-cognite-purple mb-2">{patients.length}</p>
            <p className="text-sm text-gray-600">
              All showing progress
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ChartMock data={engagementData} title="Weekly Emotional Engagement Trends" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Patient Sessions</h2>
                <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-cognite-lavender">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Patient</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Memory Type</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Emotion</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {caregiverSessions.map((session, index) => (
                      <motion.tr 
                        key={index}
                        className="border-b border-gray-200 hover:bg-cognite-lavender/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-gray-600 text-sm">{session.date}</td>
                        <td className="py-3 px-4 text-gray-800 font-medium">{session.patient}</td>
                        <td className="py-3 px-4 text-gray-600">{session.memoryType}</td>
                        <td className="py-3 px-4">
                          <EmotionTag emotion={session.emotion} />
                        </td>
                        <td className="py-3 px-4 text-gray-600">{session.duration}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Profiles</h2>
              <div className="space-y-4">
                {patients.map((patient, index) => (
                  <motion.button
                    key={patient.id}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                    className="w-full glass-card p-4 hover:shadow-lg transition-all text-left group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={patient.profileImage} 
                        alt={patient.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cognite-lavender group-hover:border-cognite-gold transition-colors"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-cognite-purple transition-colors">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-600">{patient.diagnosis}</p>
                        <p className="text-xs text-gray-500 mt-1">{patient.theme}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 glass-card p-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-200">
              <h3 className="font-bold text-green-800 mb-2">✓ Positive Trends</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Calm index increased by 23% across all patients</li>
                <li>• Memory recall sessions up 15% this week</li>
                <li>• Virtual garden visits showing highest engagement</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">📋 Recommendations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Continue music therapy sessions in the morning</li>
                <li>• Introduce more 1960s-1970s content</li>
                <li>• Family members upload 2-3 new memories weekly</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default CaregiverDashboard

