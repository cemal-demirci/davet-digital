import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './i18n/config'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ClientAdmin from './pages/ClientAdmin'
import SuperAdmin from './pages/SuperAdmin'
import GuestUpload from './pages/GuestUpload'
import Gallery from './pages/Gallery'
import Timeline from './pages/Timeline'
import LiveWall from './pages/LiveWall'
import RSVP from './pages/RSVP'
import GuestGalleryView from './pages/GuestGalleryView'
import LandingPage from './pages/LandingPage'
import Pricing from './pages/Pricing'
import Signup from './pages/Signup'
import Demo from './pages/Demo'
import EULA from './pages/EULA'
import Login from './pages/Login'
import WeddingPlanner from './pages/WeddingPlanner'
import { API_URL } from './config'
import './App.css'

function App() {
  const [coupleNames, setCoupleNames] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/settings`)
      setCoupleNames(response.data.coupleNames)
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  return (
    <Router>
      <Navbar coupleNames={coupleNames} />
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/eula" element={<EULA />} />
        <Route path="/login" element={<Login />} />

        {/* Wedding Site Pages */}
        <Route path="/wedding" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/live-wall" element={<LiveWall />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/planner" element={<WeddingPlanner />} />
        <Route path="/guest-gallery/:code?" element={<GuestGalleryView />} />

        {/* Admin & Upload */}
        <Route path="/admin" element={<ClientAdmin />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/upload/:qrCode" element={<GuestUpload />} />
      </Routes>
    </Router>
  )
}

export default App
