import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Calendar, Users, Camera, QrCode, Eye, ArrowRight, CheckCircle, Star, Play, Pause, Sparkles, Image as ImageIcon, Upload, Palette, Building2, Award, TrendingUp, PartyPopper, Cake, GraduationCap, Baby, Gift } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'

const Demo = () => {
  const [demoType, setDemoType] = useState('wedding') // wedding, engagement, corporate, circumcision, birthday, graduation, baby-shower
  const [activeTab, setActiveTab] = useState('home')
  const [selectedTheme, setSelectedTheme] = useState('romantic')
  const [photoCount, setPhotoCount] = useState(120)
  const [isPhotoAnimating, setIsPhotoAnimating] = useState(false)
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 34, seconds: 22 })
  const [isAutoPlay, setIsAutoPlay] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-play tabs
  useEffect(() => {
    if (!isAutoPlay) return
    const tabs = ['home', 'gallery', 'timeline', 'rsvp', 'qr']
    const currentIndex = tabs.indexOf(activeTab)
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex])
    }, 3000)
    return () => clearInterval(timer)
  }, [isAutoPlay, activeTab])

  // Simulate photo upload
  const simulatePhotoUpload = () => {
    setIsPhotoAnimating(true)
    setTimeout(() => {
      setPhotoCount(prev => prev + 1)
      setIsPhotoAnimating(false)
    }, 500)
  }

  const eventThemes = {
    wedding: [
      { id: 'romantic', name: 'Romantik', colors: 'from-pink-500 to-rose-600', bgColors: 'from-pink-100 via-purple-100 to-blue-100' },
      { id: 'classic', name: 'Klasik', colors: 'from-gray-700 to-gray-900', bgColors: 'from-gray-50 via-slate-100 to-gray-200' },
      { id: 'modern', name: 'Modern', colors: 'from-blue-500 to-cyan-600', bgColors: 'from-blue-50 via-cyan-50 to-teal-100' },
      { id: 'elegant', name: 'Şık', colors: 'from-purple-600 to-fuchsia-700', bgColors: 'from-purple-50 via-fuchsia-50 to-pink-100' }
    ],
    engagement: [
      { id: 'romantic', name: 'Romantik', colors: 'from-rose-500 to-pink-600', bgColors: 'from-rose-100 via-pink-100 to-purple-100' },
      { id: 'elegant', name: 'Şık', colors: 'from-purple-500 to-fuchsia-600', bgColors: 'from-purple-50 via-fuchsia-50 to-pink-100' },
      { id: 'modern', name: 'Modern', colors: 'from-indigo-500 to-purple-600', bgColors: 'from-indigo-50 via-purple-50 to-pink-100' }
    ],
    corporate: [
      { id: 'professional', name: 'Profesyonel', colors: 'from-blue-600 to-cyan-600', bgColors: 'from-blue-50 via-cyan-50 to-slate-50' },
      { id: 'executive', name: 'Yönetici', colors: 'from-slate-700 to-gray-900', bgColors: 'from-slate-50 via-gray-100 to-zinc-100' },
      { id: 'tech', name: 'Teknoloji', colors: 'from-indigo-600 to-purple-600', bgColors: 'from-indigo-50 via-purple-50 to-blue-100' },
      { id: 'creative', name: 'Yaratıcı', colors: 'from-cyan-500 to-teal-600', bgColors: 'from-cyan-50 via-teal-50 to-emerald-100' }
    ],
    circumcision: [
      { id: 'fun', name: 'Eğlenceli', colors: 'from-amber-500 to-orange-600', bgColors: 'from-amber-50 via-orange-50 to-yellow-100' },
      { id: 'colorful', name: 'Renkli', colors: 'from-blue-500 to-green-500', bgColors: 'from-blue-50 via-green-50 to-yellow-100' },
      { id: 'classic', name: 'Klasik', colors: 'from-indigo-500 to-blue-600', bgColors: 'from-indigo-50 via-blue-50 to-cyan-100' }
    ],
    birthday: [
      { id: 'festive', name: 'Şenlik', colors: 'from-pink-500 to-purple-600', bgColors: 'from-pink-50 via-purple-50 to-blue-100' },
      { id: 'vibrant', name: 'Canlı', colors: 'from-yellow-500 to-orange-600', bgColors: 'from-yellow-50 via-orange-50 to-red-100' },
      { id: 'playful', name: 'Eğlenceli', colors: 'from-green-500 to-teal-600', bgColors: 'from-green-50 via-teal-50 to-cyan-100' }
    ],
    graduation: [
      { id: 'academic', name: 'Akademik', colors: 'from-indigo-600 to-blue-700', bgColors: 'from-indigo-50 via-blue-50 to-slate-100' },
      { id: 'success', name: 'Başarı', colors: 'from-emerald-600 to-teal-700', bgColors: 'from-emerald-50 via-teal-50 to-cyan-100' },
      { id: 'elegant', name: 'Şık', colors: 'from-purple-600 to-indigo-700', bgColors: 'from-purple-50 via-indigo-50 to-blue-100' }
    ],
    'baby-shower': [
      { id: 'baby-blue', name: 'Bebek Mavisi', colors: 'from-blue-400 to-cyan-500', bgColors: 'from-blue-50 via-cyan-50 to-sky-100' },
      { id: 'baby-pink', name: 'Bebek Pembesi', colors: 'from-pink-400 to-rose-500', bgColors: 'from-pink-50 via-rose-50 to-purple-100' },
      { id: 'neutral', name: 'Nötr', colors: 'from-teal-400 to-green-500', bgColors: 'from-teal-50 via-green-50 to-emerald-100' }
    ]
  }

  const themes = eventThemes[demoType] || eventThemes.wedding

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0]

  // Event-specific content
  const eventContent = {
    wedding: {
      title: 'Ayşe & Mehmet',
      subtitle: '15 Haziran 2024',
      icon: <Heart className="w-12 h-12" />,
      fontClass: 'font-script',
      attendees: 150,
      attendeeLabel: 'Katılacak',
      urlSlug: 'ayse-mehmet',
      timeline: [
        { time: '14:00', event: 'Misafir Karşılama', icon: '👋' },
        { time: '15:00', event: 'Nikah Töreni', icon: '💍' },
        { time: '16:00', event: 'Kokteyil', icon: '🥂' },
        { time: '18:00', event: 'Akşam Yemeği', icon: '🍽️' },
        { time: '20:00', event: 'İlk Dans', icon: '💃' },
        { time: '21:00', event: 'Pasta Kesimi', icon: '🎂' }
      ]
    },
    engagement: {
      title: 'Elif & Can',
      subtitle: '20 Mayıs 2024',
      icon: <Gift className="w-12 h-12" />,
      fontClass: 'font-script',
      attendees: 120,
      attendeeLabel: 'Katılacak',
      urlSlug: 'elif-can',
      timeline: [
        { time: '18:00', event: 'Misafir Karşılama', icon: '👋' },
        { time: '19:00', event: 'Nişan Töreni', icon: '💍' },
        { time: '19:30', event: 'Yüzük Takma', icon: '💕' },
        { time: '20:00', event: 'Kokteyil', icon: '🥂' },
        { time: '21:00', event: 'Akşam Yemeği', icon: '🍽️' },
        { time: '22:30', event: 'Pasta Kesimi', icon: '🎂' }
      ]
    },
    corporate: {
      title: 'Yıllık Şirket Galası 2024',
      subtitle: 'ABC Teknoloji A.Ş.',
      icon: <Building2 className="w-12 h-12" />,
      fontClass: 'font-bold',
      attendees: 250,
      attendeeLabel: 'Katılımcı',
      urlSlug: 'abc-teknoloji-gala',
      timeline: [
        { time: '18:00', event: 'Kayıt ve Karşılama', icon: '📋' },
        { time: '19:00', event: 'Açılış Konuşması', icon: '🎤' },
        { time: '19:30', event: 'Ödül Töreni', icon: '🏆' },
        { time: '20:30', event: 'Kokteyil', icon: '🥂' },
        { time: '21:00', event: 'Akşam Yemeği', icon: '🍽️' },
        { time: '23:00', event: 'Canlı Müzik & Eğlence', icon: '🎵' }
      ]
    },
    circumcision: {
      title: 'Ahmet\'in Sünnet Şöleni',
      subtitle: '10 Temmuz 2024',
      icon: <PartyPopper className="w-12 h-12" />,
      fontClass: 'font-bold',
      attendees: 180,
      attendeeLabel: 'Katılacak',
      urlSlug: 'ahmet-sunnet',
      timeline: [
        { time: '13:00', event: 'Misafir Karşılama', icon: '👋' },
        { time: '14:00', event: 'Öğle Yemeği', icon: '🍽️' },
        { time: '15:00', event: 'Çocuk Oyunları', icon: '🎮' },
        { time: '16:00', event: 'Pasta Kesimi', icon: '🎂' },
        { time: '17:00', event: 'Hediye Açılışı', icon: '🎁' },
        { time: '18:00', event: 'Eğlence ve Müzik', icon: '🎵' }
      ]
    },
    birthday: {
      title: 'Zeynep\'in 25. Yaş Günü',
      subtitle: '5 Ağustos 2024',
      icon: <Cake className="w-12 h-12" />,
      fontClass: 'font-bold',
      attendees: 80,
      attendeeLabel: 'Katılacak',
      urlSlug: 'zeynep-dogumgunu',
      timeline: [
        { time: '19:00', event: 'Misafir Karşılama', icon: '👋' },
        { time: '20:00', event: 'Aperatif', icon: '🥂' },
        { time: '21:00', event: 'Akşam Yemeği', icon: '🍽️' },
        { time: '22:00', event: 'Pasta Kesimi', icon: '🎂' },
        { time: '22:30', event: 'Müzik & Dans', icon: '💃' },
        { time: '00:00', event: 'Gece Devam Ediyor', icon: '🎉' }
      ]
    },
    graduation: {
      title: 'Burak\'ın Mezuniyet Töreni',
      subtitle: 'İTÜ Bilgisayar Mühendisliği',
      icon: <GraduationCap className="w-12 h-12" />,
      fontClass: 'font-bold',
      attendees: 100,
      attendeeLabel: 'Katılımcı',
      urlSlug: 'burak-mezuniyet',
      timeline: [
        { time: '10:00', event: 'Tören Başlangıcı', icon: '🎓' },
        { time: '11:00', event: 'Diploma Töreni', icon: '📜' },
        { time: '12:00', event: 'Fotoğraf Çekimi', icon: '📸' },
        { time: '13:00', event: 'Öğle Yemeği', icon: '🍽️' },
        { time: '15:00', event: 'Kutlama Resepsiyonu', icon: '🎉' },
        { time: '17:00', event: 'Pasta Kesimi', icon: '🎂' }
      ]
    },
    'baby-shower': {
      title: 'Selin\'in Baby Shower',
      subtitle: 'Bebeğimiz Geliyor!',
      icon: <Baby className="w-12 h-12" />,
      fontClass: 'font-script',
      attendees: 60,
      attendeeLabel: 'Katılacak',
      urlSlug: 'selin-babyshower',
      timeline: [
        { time: '14:00', event: 'Misafir Karşılama', icon: '👋' },
        { time: '14:30', event: 'Oyunlar', icon: '🎮' },
        { time: '15:30', event: 'Hediye Açılışı', icon: '🎁' },
        { time: '16:30', event: 'Pasta & İkramlar', icon: '🍰' },
        { time: '17:00', event: 'Fotoğraf Çekimi', icon: '📸' },
        { time: '18:00', event: 'Veda', icon: '👋' }
      ]
    }
  }

  const currentEvent = eventContent[demoType]

  const demoSections = [
    {
      id: 'home',
      name: 'Ana Sayfa',
      icon: <Heart className="w-5 h-5" />,
      preview: '/demo-preview-home.jpg'
    },
    {
      id: 'gallery',
      name: 'Galeri',
      icon: <Camera className="w-5 h-5" />,
      preview: '/demo-preview-gallery.jpg'
    },
    {
      id: 'timeline',
      name: 'Zaman Çizelgesi',
      icon: <Calendar className="w-5 h-5" />,
      preview: '/demo-preview-timeline.jpg'
    },
    {
      id: 'rsvp',
      name: 'RSVP',
      icon: <Users className="w-5 h-5" />,
      preview: '/demo-preview-rsvp.jpg'
    },
    {
      id: 'qr',
      name: 'QR Kod Yükleme',
      icon: <QrCode className="w-5 h-5" />,
      preview: '/demo-preview-qr.jpg'
    }
  ]

  // Event-specific features
  const eventFeatures = {
    wedding: [
      { title: 'Premium Düğün Temaları', description: 'Romantik, Klasik, Modern ve Şık temalar', icon: <Heart className="w-6 h-6" /> },
      { title: 'Canlı Fotoğraf Duvarı', description: 'Misafirlerinizin yüklediği fotoğraflar gerçek zamanlı görüntülenir', icon: <Camera className="w-6 h-6" /> },
      { title: 'Masa Bazlı QR Kodlar', description: 'Her masa için özel QR kod, anında fotoğraf paylaşımı', icon: <QrCode className="w-6 h-6" /> },
      { title: 'RSVP & Diyet Yönetimi', description: 'Misafir katılımı, diyet tercihleri ve özel istekler', icon: <Users className="w-6 h-6" /> },
      { title: 'Düğün Geri Sayımı', description: 'Büyük güne kalan süreyi gün, saat, dakika olarak göster', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Düğün Hikayeniz', description: 'Tanışma hikayenizi ve özel anılarınızı paylaşın', icon: <Heart className="w-6 h-6" /> }
    ],
    engagement: [
      { title: 'Romantik Nişan Temaları', description: 'Romantik, Şık ve Modern temalar', icon: <Gift className="w-6 h-6" /> },
      { title: 'Canlı Fotoğraf Galerisi', description: 'Nişan anlarınızı gerçek zamanlı paylaşın', icon: <Camera className="w-6 h-6" /> },
      { title: 'Misafir Fotoğraf Yükleme', description: 'QR kod ile kolay fotoğraf paylaşımı', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Katılım Yönetimi', description: 'Misafir listesi ve katılım takibi', icon: <Users className="w-6 h-6" /> },
      { title: 'Nişan Geri Sayımı', description: 'Özel güne kalan süreyi göster', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Aşk Hikayeniz', description: 'Yolculuğunuzu misafirlerinizle paylaşın', icon: <Heart className="w-6 h-6" /> }
    ],
    corporate: [
      { title: 'Kurumsal Temalar', description: 'Profesyonel, Yönetici, Teknoloji ve Yaratıcı temalar', icon: <Building2 className="w-6 h-6" /> },
      { title: 'Etkinlik Fotoğrafları', description: 'Profesyonel etkinlik fotoğraflarını anında paylaşın', icon: <Camera className="w-6 h-6" /> },
      { title: 'Bölge Bazlı QR Kodlar', description: 'Her alan için özel QR kod sistemi', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Katılımcı Kaydı', description: 'Profesyonel katılımcı yönetimi ve check-in', icon: <Users className="w-6 h-6" /> },
      { title: 'Etkinlik Programı', description: 'Detaylı ajanda ve konuşmacı bilgileri', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Kurumsal Branding', description: 'Logonuz ve marka renkleriyle özelleştirme', icon: <Award className="w-6 h-6" /> }
    ],
    circumcision: [
      { title: 'Renkli Sünnet Temaları', description: 'Eğlenceli, Renkli ve Klasik temalar', icon: <PartyPopper className="w-6 h-6" /> },
      { title: 'Eğlence Anları', description: 'Sünnet şöleninin neşeli anlarını paylaşın', icon: <Camera className="w-6 h-6" /> },
      { title: 'Kolay Fotoğraf Paylaşımı', description: 'Misafirleriniz QR kod ile kolayca fotoğraf yükleyebilir', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Misafir Listesi', description: 'Davetli yönetimi ve katılım takibi', icon: <Users className="w-6 h-6" /> },
      { title: 'Şölen Programı', description: 'Yemek, oyunlar ve eğlence programı', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Hediye Listesi', description: 'İstek listesi ve hediye önerileri', icon: <Gift className="w-6 h-6" /> }
    ],
    birthday: [
      { title: 'Şenlikli Parti Temaları', description: 'Şenlik, Canlı ve Eğlenceli temalar', icon: <Cake className="w-6 h-6" /> },
      { title: 'Parti Anları', description: 'Doğum günü partisinin eğlenceli anları', icon: <Camera className="w-6 h-6" /> },
      { title: 'Misafir Fotoğrafları', description: 'QR kod ile fotoğraf paylaşımı', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Davetli Yönetimi', description: 'Katılımcı listesi ve RSVP', icon: <Users className="w-6 h-6" /> },
      { title: 'Parti Programı', description: 'Oyunlar, pasta ve eğlence zamanlaması', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Dilek Listesi', description: 'Hediye istekleri ve öneriler', icon: <Gift className="w-6 h-6" /> }
    ],
    graduation: [
      { title: 'Akademik Temalar', description: 'Akademik, Başarı ve Şık temalar', icon: <GraduationCap className="w-6 h-6" /> },
      { title: 'Tören Fotoğrafları', description: 'Mezuniyet anlarını ölümsüzleştirin', icon: <Camera className="w-6 h-6" /> },
      { title: 'Kolay Paylaşım', description: 'QR kod ile fotoğraf paylaşımı', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Katılımcı Listesi', description: 'Mezuniyet töreni davetli yönetimi', icon: <Users className="w-6 h-6" /> },
      { title: 'Tören Programı', description: 'Diploma töreni ve kutlama programı', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Başarı Hikayesi', description: 'Eğitim yolculuğunuzu paylaşın', icon: <Award className="w-6 h-6" /> }
    ],
    'baby-shower': [
      { title: 'Sevimli Baby Shower Temaları', description: 'Bebek Mavisi, Pembesi ve Nötr temalar', icon: <Baby className="w-6 h-6" /> },
      { title: 'Kutlama Anları', description: 'Baby shower anlarını paylaşın', icon: <Camera className="w-6 h-6" /> },
      { title: 'Misafir Fotoğrafları', description: 'QR kod ile fotoğraf paylaşımı', icon: <QrCode className="w-6 h-6" /> },
      { title: 'Davetli Yönetimi', description: 'Katılımcı listesi ve organizasyon', icon: <Users className="w-6 h-6" /> },
      { title: 'Etkinlik Programı', description: 'Oyunlar, hediyeler ve ikramlar', icon: <Calendar className="w-6 h-6" /> },
      { title: 'Bebek Bilgileri', description: 'İsim önerileri ve bebek bilgileri', icon: <Heart className="w-6 h-6" /> }
    ]
  }

  const features = eventFeatures[demoType] || eventFeatures.wedding

  // Event-specific testimonials
  const eventTestimonials = {
    wedding: [
      { name: 'Ayşe & Mehmet', text: 'QR kod sistemi muhteşemdi! Misafirlerimiz çok kolay fotoğraf yüklediler.', rating: 5, image: '👰' },
      { name: 'Elif & Can', text: 'Canlı fotoğraf duvarı düğünün en çok beğenilen özelliği oldu!', rating: 5, image: '🤵' },
      { name: 'Zeynep & Burak', text: 'Çok profesyonel ve kullanımı kolay. Herkese tavsiye ediyorum!', rating: 5, image: '💑' }
    ],
    engagement: [
      { name: 'Selin & Mert', text: 'Nişanımız için harika bir platform. Tüm anılarımız bir arada!', rating: 5, image: '💍' },
      { name: 'Deniz & Arda', text: 'Misafirlerimiz QR kod ile fotoğraf yüklemesini çok sevdi.', rating: 5, image: '💕' },
      { name: 'Esra & Emre', text: 'Modern ve şık temalar nişanımıza çok yakıştı!', rating: 5, image: '🎉' }
    ],
    corporate: [
      { name: 'ABC Teknoloji A.Ş.', text: 'Yıllık galamız için profesyonel bir çözüm. Tüm fotoğraflar düzenli.', rating: 5, image: '🏢' },
      { name: 'XYZ Holding', text: 'Kurumsal etkinliklerimiz için ideal. Check-in sistemi harika!', rating: 5, image: '💼' },
      { name: 'İnovasyon Zirvesi', text: '500+ katılımcılı etkinliğimizi başarıyla yönettik.', rating: 5, image: '🎯' }
    ],
    circumcision: [
      { name: 'Ahmet\'in Ailesi', text: 'Sünnet törenimiz çok eğlenceli geçti. Tüm anlar kayıt altında!', rating: 5, image: '🎊' },
      { name: 'Mehmet\'in Babası', text: 'Çocuklar QR kod sistemini çok sevdi. Kolay ve eğlenceli!', rating: 5, image: '🎈' },
      { name: 'Oğuz\'un Annesi', text: 'Renkli temalar ve kolay kullanım. Herkese tavsiye ederim!', rating: 5, image: '🎁' }
    ],
    birthday: [
      { name: 'Zeynep - 25 Yaş', text: 'Doğum günüm için harika bir sürpriz oldu. Tüm anılar bir arada!', rating: 5, image: '🎂' },
      { name: 'Can - 30 Yaş', text: 'Arkadaşlarım fotoğraf yüklemeyi çok sevdi. Eğlenceli bir gece!', rating: 5, image: '🎉' },
      { name: 'Aylin - 21 Yaş', text: 'Modern ve şık! Tam istediğim gibiydi.', rating: 5, image: '🎈' }
    ],
    graduation: [
      { name: 'Burak - İTÜ Mezunu', text: 'Mezuniyet törenim için profesyonel bir çözüm. Ailemi gururu!', rating: 5, image: '🎓' },
      { name: 'Elif - Boğaziçi Mezunu', text: 'Tüm mezuniyet fotoğraflarım düzenli. Çok memnunum!', rating: 5, image: '📜' },
      { name: 'Murat - ODTÜ Mezunu', text: 'Başarı hikayemi paylaşmak için harika bir platform!', rating: 5, image: '🏆' }
    ],
    'baby-shower': [
      { name: 'Selin - Hamile Anne', text: 'Baby shower\'ım için mükemmel! Tüm anıları saklamak çok kolay.', rating: 5, image: '🍼' },
      { name: 'Ayşe - Anne Adayı', text: 'Sevimli temalar ve kolay kullanım. Çok beğendim!', rating: 5, image: '👶' },
      { name: 'Merve - Yeni Anne', text: 'Bebeğim için güzel bir başlangıç. Tüm dostlarımız katıldı!', rating: 5, image: '🎀' }
    ]
  }

  const testimonials = eventTestimonials[demoType] || eventTestimonials.wedding

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <FloatingDecor />
      <SEO
        title="Canlı Demo - DAVET.digital | Tüm Etkinlik Özellikleri"
        description="DAVET.digital'in tüm özelliklerini canlı demo ile keşfedin: Premium temalar, QR kod sistemi, canlı fotoğraf duvarı, RSVP yönetimi. Düğün, nişan, kurumsal, sünnet, doğum günü, mezuniyet ve baby shower etkinlikleri için."
        keywords="dijital davetiye demo, etkinlik sitesi demo, online davetiye demo, QR kod fotoğraf demo, RSVP demo, düğün sitesi demo"
        url="https://davet.digital/demo"
      />
      <MarketingNavbar />

      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Eye className="w-20 h-20 text-indigo-500 animate-pulse" />
              <Star className="w-8 h-8 text-blue-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-6">
            Canlı Demo
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Tüm Etkinlik Tiplerine Göre Özellikleri Keşfedin
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            DAVET.digital ile neler yapabileceğinizi görün. Farklı etkinlik tipleri için özel temalar ve interaktif demo ile tüm özellikleri deneyimleyin.
          </p>

          {/* Event Type Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto">
            <button
              onClick={() => { setDemoType('wedding'); setSelectedTheme('romantic') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'wedding' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Düğün</span>
            </button>
            <button
              onClick={() => { setDemoType('engagement'); setSelectedTheme('romantic') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'engagement' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span className="hidden sm:inline">Nişan</span>
            </button>
            <button
              onClick={() => { setDemoType('corporate'); setSelectedTheme('professional') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'corporate' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="hidden sm:inline">Kurumsal</span>
            </button>
            <button
              onClick={() => { setDemoType('circumcision'); setSelectedTheme('fun') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'circumcision' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <PartyPopper className="w-5 h-5" />
              <span className="hidden sm:inline">Sünnet</span>
            </button>
            <button
              onClick={() => { setDemoType('birthday'); setSelectedTheme('festive') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'birthday' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Cake className="w-5 h-5" />
              <span className="hidden sm:inline">Doğum Günü</span>
            </button>
            <button
              onClick={() => { setDemoType('graduation'); setSelectedTheme('academic') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'graduation' ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="hidden sm:inline">Mezuniyet</span>
            </button>
            <button
              onClick={() => { setDemoType('baby-shower'); setSelectedTheme('baby-blue') }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                demoType === 'baby-shower' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-xl' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <Baby className="w-5 h-5" />
              <span className="hidden sm:inline">Baby Shower</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={`/start?type=${demoType}`}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Preview Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
              İnteraktif Demo
            </h2>
            <p className="text-xl text-gray-600">
              Etkinlik sitenizin nasıl görüneceğini görün
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="mb-8 space-y-4">
            {/* Theme Selector */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-800">Tema Seç:</span>
                </div>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isAutoPlay
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAutoPlay ? 'Durdur' : 'Otomatik Oynat'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedTheme === theme.id
                        ? `bg-gradient-to-r ${theme.colors} text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-3">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveTab(section.id)
                    setIsAutoPlay(false)
                  }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === section.id
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.icon}
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border border-purple-200">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white rounded px-4 py-1 text-sm text-gray-600 font-mono">
                  {currentEvent.urlSlug}.davet.digital/{activeTab}
                </div>
              </div>

              {/* Demo Content */}
              <div className={`aspect-video bg-gradient-to-br ${currentTheme.bgColors} overflow-hidden transition-colors duration-500`}>
                {activeTab === 'home' && (
                  <div className="h-full p-8 space-y-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-2">
                        {React.cloneElement(currentEvent.icon, {
                          className: `w-12 h-12 bg-gradient-to-r ${currentTheme.colors} bg-clip-text text-transparent ${demoType === 'wedding' ? 'animate-pulse' : ''}`
                        })}
                      </div>
                      <h1 className={`text-4xl ${currentEvent.fontClass} text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.colors} mb-2`}>
                        {currentEvent.title}
                      </h1>
                      <p className="text-gray-600 flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{currentEvent.subtitle}</span>
                      </p>
                    </div>

                    {/* Live Countdown */}
                    <div className="bg-white/80 backdrop-blur rounded-2xl p-6 max-w-3xl mx-auto shadow-lg">
                      <h3 className="text-center text-sm font-semibold text-gray-600 mb-3 flex items-center justify-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Büyük Güne Kalan Süre (Canlı!)</span>
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-3 text-center shadow-md`}>
                          <p className="text-2xl md:text-3xl font-bold text-white">{countdown.days}</p>
                          <p className="text-xs font-medium text-white/90">Gün</p>
                        </div>
                        <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-3 text-center shadow-md`}>
                          <p className="text-2xl md:text-3xl font-bold text-white">{countdown.hours}</p>
                          <p className="text-xs font-medium text-white/90">Saat</p>
                        </div>
                        <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-3 text-center shadow-md`}>
                          <p className="text-2xl md:text-3xl font-bold text-white">{countdown.minutes}</p>
                          <p className="text-xs font-medium text-white/90">Dakika</p>
                        </div>
                        <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-3 text-center shadow-md animate-pulse`}>
                          <p className="text-2xl md:text-3xl font-bold text-white">{countdown.seconds}</p>
                          <p className="text-xs font-medium text-white/90">Saniye</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-4 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer`}>
                        <Camera className="w-8 h-8 text-white mx-auto mb-1" />
                        <p className="text-xs font-bold text-white">Fotoğraflar</p>
                        <p className={`text-xl font-bold text-white mt-1 ${isPhotoAnimating ? 'animate-bounce' : ''}`}>{photoCount}</p>
                      </div>
                      <div className={`bg-gradient-to-br ${currentTheme.colors} rounded-xl p-4 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer`}>
                        <Users className="w-8 h-8 text-white mx-auto mb-1" />
                        <p className="text-xs font-bold text-white">{currentEvent.attendeeLabel}</p>
                        <p className="text-xl font-bold text-white mt-1">{currentEvent.attendees}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div className="h-full p-6 overflow-auto">
                    <div className="text-center mb-4">
                      <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.colors} mb-2`}>
                        Fotoğraf Galerisi
                      </h2>
                      <p className="text-sm text-gray-600">Misafirlerinizin paylaştığı anılar</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-lg flex items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer ${
                            i % 4 === 0 ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                            i % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-fuchsia-500' :
                            i % 4 === 2 ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                            'bg-gradient-to-br from-violet-400 to-purple-500'
                          }`}
                        >
                          <Camera className="w-8 h-8 text-white/90" />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={simulatePhotoUpload}
                      className={`w-full py-2 bg-gradient-to-r ${currentTheme.colors} text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Yeni Fotoğraf Yükle ({photoCount})</span>
                    </button>
                  </div>
                )}
                {activeTab === 'timeline' && (
                  <div className="h-full p-8 overflow-auto">
                    <div className="text-center mb-6">
                      <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.colors} mb-2`}>
                        Etkinlik Programı
                      </h2>
                      <p className="text-sm text-gray-600">{currentEvent.subtitle} - Detaylı program</p>
                    </div>
                    <div className="space-y-3 max-w-xl mx-auto">
                      {currentEvent.timeline.map((item, i) => (
                        <div key={i} className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br ${currentTheme.colors}`}>
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 flex items-center space-x-2">
                              <span>{item.event}</span>
                              <span className="text-xl">{item.icon}</span>
                            </p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'rsvp' && (
                  <div className="h-full p-8 flex items-center justify-center overflow-auto">
                    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
                      <div className="text-center mb-6">
                        <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.colors} mb-2`}>
                          Katılım Bildirimi
                        </h2>
                        <p className="text-sm text-gray-600">Lütfen katılım durumunuzu bildirin</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                          <input
                            type="text"
                            placeholder="Örn: Ayşe Yılmaz"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            placeholder="ayse@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Katılım Durumu</label>
                          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                            <option>✅ Katılacağım</option>
                            <option>❌ Katılamayacağım</option>
                            <option>🤔 Henüz Karar Vermedim</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kişi Sayısı</label>
                          <input
                            type="number"
                            placeholder="1"
                            min="1"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <button className={`w-full py-4 bg-gradient-to-r ${currentTheme.colors} text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all`}>
                          Bildirimi Gönder
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'qr' && (
                  <div className={`h-full p-8 flex items-center justify-center bg-gradient-to-br ${currentTheme.bgColors}`}>
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className={`w-56 h-56 bg-white rounded-2xl shadow-2xl mx-auto flex items-center justify-center border-4 ${
                          selectedTheme === 'romantic' ? 'border-pink-400' :
                          selectedTheme === 'classic' ? 'border-gray-400' :
                          selectedTheme === 'modern' ? 'border-cyan-400' :
                          'border-fuchsia-400'
                        } hover:scale-105 transition-transform`}>
                          <QrCode className="w-40 h-40 text-gray-800" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg max-w-md mx-auto">
                        <h3 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.colors} mb-2`}>
                          Masa 12
                        </h3>
                        <p className="text-gray-700 font-medium mb-1">Aile ve Arkadaşlar</p>
                        <p className="text-sm text-gray-600 mb-6">QR kodu tarayın ve fotoğraflarınızı yükleyin</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
                          <ImageIcon className="w-4 h-4" />
                          <span>{photoCount} fotoğraf yüklendi</span>
                        </div>
                        <button
                          onClick={simulatePhotoUpload}
                          className={`w-full px-8 py-4 bg-gradient-to-r ${currentTheme.colors} text-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2`}
                        >
                          <Upload className="w-6 h-6" />
                          <span>Fotoğraf Yükle</span>
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                          📱 Telefonunuzdan kolayca fotoğraf yükleyin
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  💡 <span className="font-semibold">İpucu:</span> Üstteki butonları tıklayarak farklı sayfaları görüntüleyin
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white rounded-xl p-4 shadow-md">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{photoCount}</p>
                  <p className="text-xs text-gray-600">Toplam Fotoğraf</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">150</p>
                  <p className="text-xs text-gray-600">Katılacak Misafir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-xs text-gray-600">Masa Sayısı</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{countdown.days}</p>
                  <p className="text-xs text-gray-600">Gün Kaldı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
              Tüm Özellikler
            </h2>
            <p className="text-xl text-gray-600">
              Her etkinlik tipi için ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
              Mutlu Müşteriler
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce etkinliğin tercihi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-indigo-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <span className="text-4xl mr-3">{testimonial.image}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">Onaylı Müşteri</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Hazır mısınız?
          </h2>
          <p className="text-2xl mb-8 text-white/90">
            30 günlük ücretsiz deneme ile başlayın
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/start"
              className="px-10 py-5 bg-white text-indigo-600 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Ücretsiz Başla
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-5 bg-indigo-500/20 backdrop-blur text-white rounded-full text-xl font-semibold hover:bg-indigo-500/30 transition-all border-2 border-white/30"
            >
              Fiyatları İncele
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/80">
            Kredi kartı gerektirmez • İstediğiniz zaman iptal edin
          </p>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default Demo
