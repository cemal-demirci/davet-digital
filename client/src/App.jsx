import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './i18n/config'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import GuestUpload from './pages/GuestUpload'
import Gallery from './pages/Gallery'
import Timeline from './pages/Timeline'
import LiveWall from './pages/LiveWall'
import RSVP from './pages/RSVP'
import GuestGalleryView from './pages/GuestGalleryView'
import LandingPage from './pages/LandingPage'
import Pricing from './pages/Pricing'
import Signup from './pages/Signup'
import './App.css'

const API_URL = 'http://localhost:5001'

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/upload/:qrCode" element={<GuestUpload />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/live-wall" element={<LiveWall />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/guest-gallery/:code?" element={<GuestGalleryView />} />
      </Routes>
    </Router>
  )
}

export default App
