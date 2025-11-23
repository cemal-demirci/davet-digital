import { useState, useEffect } from 'react'
import { Shield, Save, Upload, Trash2, Plus, Heart, Settings as SettingsIcon, Image as ImageIcon, Calendar, Eye, EyeOff, QrCode, Users, CheckSquare, MessageSquare, Gift, Clock, Cloud } from 'lucide-react'
import axios from 'axios'
import QRManager from '../components/QRManager'
import GuestGallery from '../components/GuestGallery'
import RSVPManager from '../components/RSVPManager'
import MessageManager from '../components/MessageManager'
import GiftManager from '../components/GiftManager'
import TimelineManager from '../components/TimelineManager'
import GoogleDriveManager from '../components/GoogleDriveManager'
import { formatDateTime } from '../utils/dateFormatter'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('settings')

  const [settings, setSettings] = useState({
    coupleNames: '',
    mainDate: '',
    engagementDate: '',
    storyTitle: '',
    storyText: '',
    musicUrl: '',
    password: '',
    isPasswordProtected: false
  })

  const [events, setEvents] = useState([])
  const [photos, setPhotos] = useState([])
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  })

  const ADMIN_PASSWORD = 'admin123' // Değiştirin!

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData()
    }
  }, [isAuthenticated])

  const fetchAllData = async () => {
    try {
      const [settingsRes, eventsRes, photosRes] = await Promise.all([
        axios.get('http://localhost:5001/api/settings'),
        axios.get('http://localhost:5001/api/events'),
        axios.get('http://localhost:5001/api/photos')
      ])
      setSettings(settingsRes.data)
      setEvents(eventsRes.data)
      setPhotos(photosRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Yanlış şifre!')
    }
  }

  const handleSaveSettings = async () => {
    try {
      await axios.put('http://localhost:5001/api/settings', settings)
      alert('Ayarlar kaydedildi!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Kaydetme hatası!')
    }
  }

  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date) {
      alert('Etkinlik adı ve tarihi gerekli!')
      return
    }
    try {
      await axios.post('http://localhost:5001/api/events', newEvent)
      setNewEvent({ name: '', date: '', location: '', description: '' })
      fetchAllData()
      alert('Etkinlik eklendi!')
    } catch (error) {
      console.error('Error adding event:', error)
      alert('Ekleme hatası!')
    }
  }

  const handleDeleteEvent = async (id) => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return
    try {
      await axios.delete(`http://localhost:5001/api/events/${id}`)
      fetchAllData()
      alert('Etkinlik silindi!')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('photo', file)
    formData.append('title', prompt('Fotoğraf başlığı:') || 'Untitled')
    formData.append('description', prompt('Açıklama (opsiyonel):') || '')
    formData.append('category', 'general')

    try {
      await axios.post('http://localhost:5001/api/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      fetchAllData()
      alert('Fotoğraf yüklendi!')
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Yükleme hatası!')
    }
  }

  const handleDeletePhoto = async (id) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return
    try {
      await axios.delete(`http://localhost:5001/api/photos/${id}`)
      fetchAllData()
      alert('Fotoğraf silindi!')
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-romantic-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-gray-600 mt-2">Düğün Sitesi Yönetimi</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Şifresi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-romantic-500 text-white py-3 rounded-lg hover:bg-romantic-600 transition-colors font-medium"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-romantic-500" />
              <h1 className="text-3xl font-bold text-gray-800">Düğün Sitesi Yönetimi</h1>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <SettingsIcon className="w-5 h-5 mr-2" />
              Genel Ayarlar
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'events'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Etkinlikler
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'photos'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Fotoğraflar
            </button>
            <button
              onClick={() => setActiveTab('qrcodes')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'qrcodes'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <QrCode className="w-5 h-5 mr-2" />
              QR Kodlar
            </button>
            <button
              onClick={() => setActiveTab('guest-gallery')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'guest-gallery'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Misafir Galerisi
            </button>
            <button
              onClick={() => setActiveTab('rsvp')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'rsvp'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              RSVP
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Mesajlar
            </button>
            <button
              onClick={() => setActiveTab('gifts')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'gifts'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <Gift className="w-5 h-5 mr-2" />
              Hediyeler
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              Program
            </button>
            <button
              onClick={() => setActiveTab('gdrive')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${
                activeTab === 'gdrive'
                  ? 'text-romantic-600 border-b-2 border-romantic-600'
                  : 'text-gray-600 hover:text-romantic-600'
              }`}
            >
              <Cloud className="w-5 h-5 mr-2" />
              Google Drive
            </button>
          </div>
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Genel Ayarlar</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Çift İsimleri
              </label>
              <input
                type="text"
                value={settings.coupleNames}
                onChange={(e) => setSettings({ ...settings, coupleNames: e.target.value })}
                placeholder="Örn: Cemal & Ayşe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nişan Tarihi
                </label>
                <input
                  type="datetime-local"
                  value={settings.engagementDate}
                  onChange={(e) => setSettings({ ...settings, engagementDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Düğün Tarihi
                </label>
                <input
                  type="datetime-local"
                  value={settings.mainDate}
                  onChange={(e) => setSettings({ ...settings, mainDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hikaye Başlığı
              </label>
              <input
                type="text"
                value={settings.storyTitle}
                onChange={(e) => setSettings({ ...settings, storyTitle: e.target.value })}
                placeholder="Örn: Hikayemiz"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hikaye Metni
              </label>
              <textarea
                value={settings.storyText}
                onChange={(e) => setSettings({ ...settings, storyText: e.target.value })}
                rows="6"
                placeholder="Hikayenizi buraya yazın..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Müzik URL (Opsiyonel)
              </label>
              <input
                type="url"
                value={settings.musicUrl}
                onChange={(e) => setSettings({ ...settings, musicUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <span>🎨 Premium Tema Seçimi</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { value: 'romantic-rose', name: 'Romantic Rose', colors: ['#ec4899', '#f9a8d4'], desc: 'Klasik romantik pembe' },
                  { value: 'elegant-black', name: 'Elegant Black', colors: ['#1f2937', '#d4af37'], desc: 'Şık siyah & altın' },
                  { value: 'garden-green', name: 'Garden Green', colors: ['#059669', '#10b981'], desc: 'Bahçe yeşili' },
                  { value: 'ocean-blue', name: 'Ocean Blue', colors: ['#0891b2', '#06b6d4'], desc: 'Okyanus mavisi' },
                  { value: 'sunset-orange', name: 'Sunset Orange', colors: ['#ea580c', '#fb923c'], desc: 'Gün batımı turuncu' },
                  { value: 'purple-dream', name: 'Purple Dream', colors: ['#9333ea', '#a855f7'], desc: 'Mor rüya' },
                  { value: 'lavender-mint', name: 'Lavender Mint', colors: ['#a855f7', '#14b8a6'], desc: 'Lavanta & nane' },
                  { value: 'coral-peach', name: 'Coral Peach', colors: ['#f43f5e', '#fb923c'], desc: 'Mercan & şeftali' },
                  { value: 'royal-navy', name: 'Royal Navy', colors: ['#1e40af', '#d4af37'], desc: 'Kraliyet lacivert' },
                  { value: 'champagne-gold', name: 'Champagne Gold', colors: ['#eab308', '#d4af37'], desc: 'Şampanya altın' }
                ].map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => setSettings({ ...settings, theme: theme.value })}
                    className={`p-4 border-2 rounded-xl transition-all group ${
                      settings.theme === theme.value
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 shadow-xl scale-105'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex space-x-1.5 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg shadow-sm group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: theme.colors[0] }}
                      ></div>
                      <div
                        className="w-10 h-10 rounded-lg shadow-sm group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: theme.colors[1] }}
                      ></div>
                    </div>
                    <div className="text-sm font-bold text-gray-800">{theme.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{theme.desc}</div>
                    {settings.theme === theme.value && (
                      <div className="text-xs text-pink-600 mt-2 font-semibold flex items-center">
                        <span className="mr-1">✓</span> Aktif Tema
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Özellikler</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">Misafir Fotoğraf Yükleme</span>
                  <input
                    type="checkbox"
                    checked={settings.guestUploadEnabled}
                    onChange={(e) => setSettings({ ...settings, guestUploadEnabled: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">RSVP (Katılım Onayı)</span>
                  <input
                    type="checkbox"
                    checked={settings.rsvpEnabled}
                    onChange={(e) => setSettings({ ...settings, rsvpEnabled: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">Hediye Listesi</span>
                  <input
                    type="checkbox"
                    checked={settings.giftListEnabled}
                    onChange={(e) => setSettings({ ...settings, giftListEnabled: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">Misafir Mesajları</span>
                  <input
                    type="checkbox"
                    checked={settings.guestMessagesEnabled}
                    onChange={(e) => setSettings({ ...settings, guestMessagesEnabled: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                </label>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <span>📺 Canlı Duvar (TV Gösterim)</span>
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">Canlı Duvar Aktif</span>
                  <input
                    type="checkbox"
                    checked={settings.liveWallEnabled}
                    onChange={(e) => setSettings({ ...settings, liveWallEnabled: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                </label>
                {settings.liveWallEnabled && (
                  <>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 bg-blue-50">
                      <div>
                        <div className="text-gray-700 font-medium">Admin Fotoğraflarını Göster</div>
                        <div className="text-xs text-gray-500">Galeri'den yüklediğiniz fotoğraflar</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.liveWallShowAdminPhotos}
                        onChange={(e) => setSettings({ ...settings, liveWallShowAdminPhotos: e.target.checked })}
                        className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 bg-green-50">
                      <div>
                        <div className="text-gray-700 font-medium">Misafir Fotoğraflarını Göster</div>
                        <div className="text-xs text-gray-500">QR kodla yüklenen ve onaylanan fotoğraflar</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.liveWallShowGuestPhotos}
                        onChange={(e) => setSettings({ ...settings, liveWallShowGuestPhotos: e.target.checked })}
                        className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <span>🔐 Misafir Galerisi Erişim Kodu</span>
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Misafirler bu kodu girerek tüm misafir fotoğraflarını (onaylı + onaysız) görebilir
                </p>
                <input
                  type="text"
                  value={settings.guestGalleryAccessCode || ''}
                  onChange={(e) => setSettings({ ...settings, guestGalleryAccessCode: e.target.value })}
                  placeholder="Örn: DUG2024 (boş bırakırsanız kod olmaz)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
                {settings.guestGalleryAccessCode && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      ✓ Kod aktif: <span className="font-bold">{settings.guestGalleryAccessCode}</span>
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      URL: {window.location.origin}/guest-gallery/{settings.guestGalleryAccessCode}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Şifre Koruması</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.isPasswordProtected}
                    onChange={(e) => setSettings({ ...settings, isPasswordProtected: e.target.checked })}
                    className="w-5 h-5 text-romantic-500 rounded focus:ring-romantic-500"
                  />
                  <span className="text-gray-700">Sayfayı şifre ile koru</span>
                </label>
                {settings.isPasswordProtected && (
                  <input
                    type="text"
                    value={settings.password}
                    onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                    placeholder="Ziyaretçi şifresi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full bg-romantic-500 text-white py-3 rounded-lg hover:bg-romantic-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Ayarları Kaydet</span>
            </button>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Yeni Etkinlik Ekle</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  placeholder="Etkinlik Adı (Örn: Nişan, Düğün)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
                <input
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Konum"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
                <input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Açıklama (Opsiyonel)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500"
                />
              </div>
              <button
                onClick={handleAddEvent}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Etkinlik Ekle</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mevcut Etkinlikler</h2>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <p className="text-gray-600">{formatDateTime(event.date)}</p>
                      {event.location && <p className="text-gray-600">📍 {event.location}</p>}
                      {event.description && <p className="text-gray-500 text-sm mt-2">{event.description}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Henüz etkinlik eklenmemiş</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fotoğraf Yükle</h2>
              <label className="block w-full">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-romantic-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Fotoğraf/Video/Müzik yüklemek için tıklayın</p>
                  <p className="text-sm text-gray-400 mt-2">JPG, PNG, MP4, MP3 (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*,audio/*,.mp3,.wav,.m4a"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fotoğraf Galerisi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map(photo => (
                  <div key={photo._id} className="relative group">
                    <img
                      src={`http://localhost:5001${photo.url}`}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleDeletePhoto(photo._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-700">{photo.title}</p>
                  </div>
                ))}
                {photos.length === 0 && (
                  <p className="col-span-4 text-center text-gray-500 py-8">Henüz fotoğraf yüklenmemiş</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR Codes Tab */}
        {activeTab === 'qrcodes' && <QRManager />}

        {/* Guest Gallery Tab */}
        {activeTab === 'guest-gallery' && <GuestGallery />}

        {/* RSVP Tab */}
        {activeTab === 'rsvp' && <RSVPManager />}

        {/* Messages Tab */}
        {activeTab === 'messages' && <MessageManager />}

        {/* Gifts Tab */}
        {activeTab === 'gifts' && <GiftManager />}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && <TimelineManager />}

        {/* Google Drive Tab */}
        {activeTab === 'gdrive' && <GoogleDriveManager />}
      </div>
    </div>
  )
}

export default Admin
