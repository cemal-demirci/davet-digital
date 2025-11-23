import { Link } from 'react-router-dom'
import { Heart, Calendar, Users, Camera, QrCode, Palette, Globe, Sparkles, Check, ArrowRight, Star, Zap, Shield, ClipboardList, LogIn, DollarSign, Building2, Award, Briefcase, TrendingUp, PartyPopper, Baby, Gift, Smile, Music, FileText, Download, Printer } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'

const LandingPage = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: '10 Premium Tema',
      description: 'Romantik pembe\'den şık siyaha kadar özelleştirilebilir güzel temalar',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: 'QR Kod ile Fotoğraf Yükleme',
      description: 'Misafirleriniz her masa için benzersiz QR kodlarla anında fotoğraf yükleyebilir',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Canlı Fotoğraf Duvarı',
      description: 'Düğün salonunuzdaki TV ekranlar için gerçek zamanlı fotoğraf gösterisi',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Geri Sayım Sayacı',
      description: 'Büyük güne kalan gün, saat, dakika ve saniye ile heyecanı yaşatın',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'RSVP Yönetimi',
      description: 'Misafir katılımını, diyet kısıtlamalarını ve özel istekleri takip edin',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Misafir Galerisi',
      description: 'Onay sistemi ile şifre korumalı galeriler',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Çoklu Dil Desteği',
      description: 'Türkçe, İngilizce ve daha fazla dil desteği',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Online Düğün Planlayıcı',
      description: 'Bütçe takibi, görev listesi, misafir yönetimi ve daha fazlası ile düğününüzü profesyonelce planlayın',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Canvas Davetiye Tasarımcısı',
      description: 'Sürükle-bırak ile profesyonel davetiyeler tasarlayın. Metin, resim, şekil ekleyin, PDF ve baskı siparişi verin',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'PDF & Baskı Siparişi',
      description: 'Tasarladığınız davetiyeleri yüksek kalitede PDF olarak indirin veya profesyonel baskı siparişi verin',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  const stats = [
    { number: '500+', label: 'Mutlu Çift' },
    { number: '50K+', label: 'Paylaşılan Fotoğraf' },
    { number: '10K+', label: 'Katılımcı Misafir' },
    { number: '4.9/5', label: 'Ortalama Puan' }
  ]

  const testimonials = [
    {
      name: 'Ayşe & Mehmet',
      text: 'QR kod özelliği harikaydı! Misafirlerimiz anında fotoğraf yükleyebildiler, çok beğendiler.',
      rating: 5,
      image: '👰'
    },
    {
      name: 'Elif & Can',
      text: 'Çok profesyonel ve kullanımı kolay. Düğünümüz için mükemmel bir çözüm oldu!',
      rating: 5,
      image: '🤵'
    },
    {
      name: 'Zeynep & Burak',
      text: 'Canlı fotoğraf duvarı muhteşemdi! Düğündeki herkes hayran kaldı.',
      rating: 5,
      image: '💑'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <FloatingDecor />
      <SEO
        title="DAVET.digital - Dijital Davetiye ve Etkinlik Yönetimi Platformu"
        description="QR kodlu fotoğraf paylaşımı, canlı ekran gösterileri, RSVP yönetimi ile düğün, nişan, sünnet, doğum günü ve kurumsal etkinlikler için profesyonel dijital davetiye platformu. 30 günlük ücretsiz deneme."
        keywords="dijital davetiye, etkinlik yönetimi, düğün sitesi, nişan sitesi, sünnet sitesi, doğum günü sitesi, kurumsal etkinlik, online davetiye, QR kod, davet.digital"
        url="https://davet.digital/"
      />
      <MarketingNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdi0yIDJ6bS0yIDB2LTIgMnptLTIgMGgtMiAyem0wIDBoMi0yem0wLTJoLTIgMnptMiAwaDItMnptMC0yaDItMnptMCAyaC0yIDJ6bTAgMGgyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Sparkles className="w-24 h-24 text-indigo-600 animate-pulse" />
                <Zap className="w-10 h-10 text-blue-500 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">DAVET</span>
              <span className="text-gray-700">.digital</span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-heading">
              Tüm Etkinlikleriniz İçin Profesyonel Dijital Davetiye Platformu
            </p>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Düğün, nişan, sünnet, doğum günü, mezuniyet, baby shower ve kurumsal etkinlikler için QR kodlu fotoğraf paylaşımı, canlı ekran gösterileri, RSVP yönetimi. Kod yazmaya gerek yok.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/start"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Hemen Başlayın</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/demo"
                className="px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all border-2 border-indigo-200"
              >
                Canlı Demo'yu İncele
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              ✨ Kredi kartı gerektirmez • 30 günlük ücretsiz deneme • İstediğiniz zaman iptal edin
            </p>
          </div>
        </div>
      </div>

      {/* Login Section for Existing Customers */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-12 border-y-4 border-purple-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Zaten Üye Misiniz?</h3>
                <p className="text-gray-700">Düğün sitenize giriş yapın ve yönetmeye devam edin</p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 whitespace-nowrap"
            >
              <LogIn className="w-5 h-5" />
              <span>Giriş Yap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* NEW: Advanced Wedding Planner Section */}
      <div className="py-24 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZDlhODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdi0yIDJ6bS0yIDB2LTIgMnptLTIgMGgtMiAyem0wIDBoMi0yem0wLTJoLTIgMnptMiAwaDItMnptMC0yaDItMnptMCAyaC0yIDJ6bTAgMGgyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* NEW Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold text-lg">YENİ ÖZELLIK!</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-script text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-4">
              Gelişmiş Düğün Planlayıcı
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Profesyonel bir organizatör gibi düğününüzü planlayın ve takip edin. Bütçe yönetimi, görev listesi, misafir takibi ve daha fazlası!
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Akıllı Bütçe Takibi</h3>
              <p className="text-gray-600 mb-4">
                Tüm masraflarınızı kategorilere ayırın, gerçek harcamalarınızı takip edin ve bütçenizi aşmayın.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Kategori bazlı bütçeleme
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Gerçek zamanlı harcama takibi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Kalan bütçe uyarıları
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Görev Yönetimi</h3>
              <p className="text-gray-600 mb-4">
                Düğün hazırlıklarını adım adım takip edin. Hiçbir detayı atlamayın, her şey zamanında tamamlansın.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  Öncelik bazlı görevler
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  Son tarih takibi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  İlerleme göstergeleri
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Misafir Organizasyonu</h3>
              <p className="text-gray-600 mb-4">
                Tüm misafirlerinizi yönetin, masa düzenlerini oluşturun ve RSVP durumlarını takip edin.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-pink-500 mr-2" />
                  Detaylı misafir listesi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-pink-500 mr-2" />
                  Masa ve grup düzenlemeleri
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-pink-500 mr-2" />
                  RSVP takip sistemi
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <ClipboardList className="w-6 h-6" />
              <span>Hemen Başlayın</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-4 text-gray-600">
              30 günlük ücretsiz deneme • Kredi kartı gerektirmez
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Events Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZDlhODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdi0yIDJ6bS0yIDB2LTIgMnptLTIgMGgtMiAyem0wIDBoMi0yem0wLTJoLTIgMnptMiAwaDItMnptMC0yaDItMnptMCAyaC0yIDJ6bTAgMGgyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg">
              <Building2 className="w-5 h-5" />
              <span className="font-bold text-lg">KURUMSAL ETKİNLİKLER</span>
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
              Kurumsal Etkinlikleriniz İçin
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Konferanslar, galalar, ürün lansmanları ve kurumsal toplantılar için profesyonel etkinlik siteleri. Markanızı yansıtan, etkileşimli deneyimler oluşturun.
            </p>
          </div>

          {/* Corporate Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Marka Kimliği</h3>
              <p className="text-gray-600 mb-4">
                Şirket logonuz, kurumsal renkleriniz ve marka kimliğinizle özelleştirilmiş etkinlik siteleri.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  Logo ve renk özelleştirme
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  Kurumsal tasarım şablonları
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-blue-500 mr-2" />
                  Özel domain desteği
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Canlı Etkileşim</h3>
              <p className="text-gray-600 mb-4">
                Katılımcılarınızın fotoğraf ve anılarını gerçek zamanlı olarak paylaşabilecekleri interaktif platform.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  QR kodlu fotoğraf paylaşımı
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  Canlı ekran gösterileri
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-cyan-500 mr-2" />
                  Sosyal medya entegrasyonu
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Etkinlik Yönetimi</h3>
              <p className="text-gray-600 mb-4">
                Katılımcı kaydı, davetiye gönderimi ve etkinlik programı yönetimi. Her şey tek platformda.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-indigo-500 mr-2" />
                  RSVP ve kayıt sistemi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-indigo-500 mr-2" />
                  Katılımcı listesi yönetimi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-indigo-500 mr-2" />
                  Program ve ajanda takibi
                </li>
              </ul>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hangi Etkinlikler İçin Kullanılabilir?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Konferanslar</h4>
                <p className="text-sm text-gray-600">Sektör etkinlikleri ve seminerler</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Gala & Ödül Törenleri</h4>
                <p className="text-sm text-gray-600">Prestijli kurumsal geceler</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-cyan-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Ürün Lansmanları</h4>
                <p className="text-sm text-gray-600">Yeni ürün tanıtımları</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Ekip Etkinlikleri</h4>
                <p className="text-sm text-gray-600">Team building ve sosyal aktiviteler</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/signup?type=corporate"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Building2 className="w-6 h-6" />
              <span>Kurumsal Etkinlik Sitesi Oluştur</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-4 text-gray-600">
              Profesyonel çözümler • Sınırsız özelleştirme • 7/24 destek
            </p>
          </div>
        </div>
      </div>

      {/* Circumcision Events Section */}
      <div className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNTk3MjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdi0yIDJ6bS0yIDB2LTIgMnptLTIgMGgtMiAyem0wIDBoMi0yem0wLTJoLTIgMnptMiAwaDItMnptMC0yaDItMnptMCAyaC0yIDJ6bTAgMGgyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg">
              <PartyPopper className="w-5 h-5" />
              <span className="font-bold text-lg">SÜNNET ETKİNLİKLERİ</span>
              <PartyPopper className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
              Çocuğunuzun Özel Günü İçin
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Sünnet düğününüzü unutulmaz kılın. Eğlenceli, renkli ve çocuklarınızın seveceği bir etkinlik sitesi oluşturun. Tüm anıları bir arada toplayın!
            </p>
          </div>

          {/* Circumcision Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Çocuk Dostu Tasarım</h3>
              <p className="text-gray-600 mb-4">
                Renkli, eğlenceli ve çocukların seveceği özel temalar. Çizgi film karakterleri ve neşeli tasarımlar.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-amber-500 mr-2" />
                  Renkli ve neşeli temalar
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-amber-500 mr-2" />
                  Çocuk dostu arayüz
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-amber-500 mr-2" />
                  Karakter ve sticker desteği
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Hediye Takip Sistemi</h3>
              <p className="text-gray-600 mb-4">
                Misafirlerinizin getirdiği hediyeleri kaydedin. Teşekkür mesajları gönderirken unutmayın.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-orange-500 mr-2" />
                  Hediye listesi yönetimi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-orange-500 mr-2" />
                  Kişi bazlı takip
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-orange-500 mr-2" />
                  Teşekkür kartı şablonları
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Eğlence & Aktiviteler</h3>
              <p className="text-gray-600 mb-4">
                Oyunlar, yarışmalar ve aktiviteler için program oluşturun. Tüm misafirlerinizi bilgilendirin.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-yellow-500 mr-2" />
                  Aktivite programı
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-yellow-500 mr-2" />
                  Oyun ve yarışma listesi
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-yellow-500 mr-2" />
                  Animasyon bilgileri
                </li>
              </ul>
            </div>
          </div>

          {/* Special Features */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sünnet Etkinliği Özel Özellikleri</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Fotoğraf Çerçeveleri</h4>
                <p className="text-sm text-gray-600">Çocuk temalı eğlenceli çerçeveler</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smile className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Dijital Albüm</h4>
                <p className="text-sm text-gray-600">Tüm anılar bir arada</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Misafir Yönetimi</h4>
                <p className="text-sm text-gray-600">Davetli listesi ve RSVP</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Dilek ve Mesajlar</h4>
                <p className="text-sm text-gray-600">Misafirlerden özel mesajlar</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/signup?type=circumcision"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <PartyPopper className="w-6 h-6" />
              <span>Sünnet Sitesi Oluştur</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-4 text-gray-600">
              Çocuk dostu özellikler • Hediye takibi • Eğlenceli tasarımlar
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              İhtiyacınız Olan Her Şey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern düğünler için özel olarak tasarlanmış profesyonel özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600">
              3 basit adımda düğün siteniz hazır
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kayıt Olun</h3>
              <p className="text-gray-600 leading-relaxed">
                Birkaç basit form ile düğün bilgilerinizi girin ve özel alt alan adınızı alın. Kredi kartı gerektirmez.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Özelleştirin</h3>
              <p className="text-gray-600 leading-relaxed">
                10 premium temadan birini seçin, fotoğraflarınızı yükleyin ve etkinlik detaylarınızı ekleyin.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paylaşın</h3>
              <p className="text-gray-600 leading-relaxed">
                Benzersiz linkinizi misafirlerinizle paylaşın ve canlı fotoğraf akışını gerçek zamanlı izleyin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Neden Davet Digital?
            </h2>
            <p className="text-xl text-gray-600">
              Modern çiftler için tasarlandı
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Kod Yazmaya Gerek Yok</h3>
                  <p className="text-gray-600">
                    Teknik bilgi gerektirmeyen sürükle-bırak arayüzü ile dakikalar içinde sitenizi oluşturun.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Anında Kurulum</h3>
                  <p className="text-gray-600">
                    5 dakikada canlı. Tema seçin, bilgilerinizi girin ve hemen başlayın. Hiçbir bekleme yok.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mobil Öncelikli</h3>
                  <p className="text-gray-600">
                    Tüm misafirleriniz telefonlarından mükemmel bir deneyim yaşar. Responsive tasarım.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenli & Özel</h3>
                  <p className="text-gray-600">
                    Şifre koruması, onay sistemi ve güvenli fotoğraf yükleme ile anılarınız güvende.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitation Designer Showcase */}
      <div className="py-24 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-lg mb-6">
              <span className="text-purple-600 font-bold text-sm">🎨 YENİ ÖZELLİK</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 mb-6">
              Profesyonel Davetiye Tasarımcısı
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Adobe Photoshop ve Canva tarzında profesyonel bir editör ile hayalinizdeki davetiyeleri kendiniz tasarlayın
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Features */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sürükle-Bırak Tasarım</h3>
                    <p className="text-gray-600">
                      Hiçbir tasarım bilgisi gerektirmeden elementleri sürükleyip bırakın, boyutlandırın, döndürün
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tam Metin Kontrolü</h3>
                    <p className="text-gray-600">
                      6+ profesyonel font, boyut, renk, hizalama, kalın, italik ve altı çizili seçenekleri
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Resim & Şekil Ekleme</h3>
                    <p className="text-gray-600">
                      Fotoğraflarınızı yükleyin, dikdörtgen ve daire şekiller ekleyin, katmanları düzenleyin
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PDF & Baskı Siparişi</h3>
                    <p className="text-gray-600">
                      Yüksek kalitede PDF indirin veya profesyonel baskı siparişi verin (A4, A5, A6 boyutları)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Demo/Preview */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all">
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Simulated Canvas Editor Preview */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Palette className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
                      Ayşe & Mehmet
                    </h3>
                    <p className="text-purple-700 text-sm mb-4">Düğünümüze Davetlisiniz</p>
                    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg px-6 py-3">
                      <p className="text-purple-900 font-semibold">15 Haziran 2024</p>
                      <p className="text-purple-700 text-sm">Grand Salon</p>
                    </div>
                  </div>

                  {/* Floating toolbar simulation */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 flex gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Type className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Camera className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                      <Palette className="w-4 h-4 text-pink-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-xl font-bold">
                300 DPI Baskı Kalitesi
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full shadow-xl font-bold">
                Sınırsız Tasarım
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">↩️</div>
              <h4 className="font-bold text-gray-900 mb-1">Undo/Redo</h4>
              <p className="text-sm text-gray-600">Sınırsız geri al</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-bold text-gray-900 mb-1">Zoom</h4>
              <p className="text-sm text-gray-600">Detaylı düzenleme</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📐</div>
              <h4 className="font-bold text-gray-900 mb-1">Katmanlar</h4>
              <p className="text-sm text-gray-600">Öne/arkaya taşıma</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">💾</div>
              <h4 className="font-bold text-gray-900 mb-1">Otosave</h4>
              <p className="text-sm text-gray-600">Kaybolma riski yok</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/canvas-invitation-creator"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              <Palette className="w-6 h-6" />
              Hemen Tasarlamaya Başla
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-gray-600 mt-4">Ücretsiz deneyin, kredi kartı gerekmez</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Çiftlerin Tercihi
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce çiftin güvendiği platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
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
      <div className="py-24 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi0yem0wIDB2LTIgMnptLTIgMHYtMiAyem0tMiAwaC0yIDJ6bTAgMGgyLTJ6bTAtMmgtMiAyem0yIDBoMi0yem0wLTJoMi0yem0wIDJoLTIgMnptMCAwaDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-script mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-2xl mb-8 text-white/90">
            Davet Digital'i seçen binlerce çifte katılın
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Ücretsiz Başla
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Güvenli & Özel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Anında Kurulum</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Kod Yazmaya Gerek Yok</span>
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default LandingPage
