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
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import WeddingPlanner from './pages/WeddingPlanner'
import WeddingSite from './pages/WeddingSite'
import CorporateEventSite from './pages/CorporateEventSite'
import EngagementSite from './pages/EngagementSite'
import CircumcisionSite from './pages/CircumcisionSite'
import BirthdaySite from './pages/BirthdaySite'
import GraduationSite from './pages/GraduationSite'
import BabyShowerSite from './pages/BabyShowerSite'
import EventSelection from './pages/EventSelection'
import InvitationCreator from './pages/InvitationCreator'
import CanvasInvitationCreator from './pages/CanvasInvitationCreator'
import PrintOrder from './pages/PrintOrder'
import InvitationPricingAdmin from './pages/InvitationPricingAdmin'
import CemalLogin from './pages/CemalLogin'
import CemalAdmin from './pages/CemalAdmin'
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
        <Route path="/start" element={<EventSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/eula" element={<EULA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dynamic Wedding Site (subdomain support) */}
        <Route path="/w/:slug" element={<WeddingSite />} />
        <Route path="/wedding-site" element={<WeddingSite />} />

        {/* Corporate Event Site */}
        <Route path="/e/:slug" element={<CorporateEventSite />} />
        <Route path="/event-site" element={<CorporateEventSite />} />

        {/* Engagement Site */}
        <Route path="/eng/:slug" element={<EngagementSite />} />
        <Route path="/engagement-site" element={<EngagementSite />} />

        {/* Circumcision Site */}
        <Route path="/cir/:slug" element={<CircumcisionSite />} />
        <Route path="/circumcision-site" element={<CircumcisionSite />} />

        {/* Birthday Site */}
        <Route path="/bday/:slug" element={<BirthdaySite />} />
        <Route path="/birthday-site" element={<BirthdaySite />} />

        {/* Graduation Site */}
        <Route path="/grad/:slug" element={<GraduationSite />} />
        <Route path="/graduation-site" element={<GraduationSite />} />

        {/* Baby Shower Site */}
        <Route path="/baby/:slug" element={<BabyShowerSite />} />
        <Route path="/baby-shower-site" element={<BabyShowerSite />} />

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

        {/* Super Admin (Cemal) */}
        <Route path="/cemalogin" element={<CemalLogin />} />
        <Route path="/cemal-admin" element={<CemalAdmin />} />

        {/* Invitation Creator */}
        <Route path="/invitation-creator" element={<InvitationCreator />} />
        <Route path="/canvas-invitation-creator" element={<CanvasInvitationCreator />} />
        <Route path="/print-order/:invitationId" element={<PrintOrder />} />
        <Route path="/admin/invitation-pricing" element={<InvitationPricingAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
