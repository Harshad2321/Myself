import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PatientDashboard from './pages/PatientDashboard'
import MemoryLibrary from './pages/MemoryLibrary'
import VirtualGarden from './pages/VirtualGarden'
import CaregiverDashboard from './pages/CaregiverDashboard'
import FamilyPortal from './pages/FamilyPortal'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient/:id" element={<PatientDashboard />} />
        <Route path="/memory-library/:id" element={<MemoryLibrary />} />
        <Route path="/virtual-garden/:id" element={<VirtualGarden />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
        <Route path="/family/:id" element={<FamilyPortal />} />
      </Routes>
    </Router>
  )
}

export default App

