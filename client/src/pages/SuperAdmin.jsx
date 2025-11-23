import { useState } from 'react'
import { Users, DollarSign, Calendar, TrendingUp, Package, AlertCircle, CheckCircle, Clock, Search, Filter, Download, Eye, Edit2, Trash2, Lock, LogOut, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate, formatCurrency } from '../utils/dateFormatter'

const SuperAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'root' && password === 'root23') {
      setIsAuthenticated(true)
      setLoginError('')
      localStorage.setItem('superAdminAuth', 'true')
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    localStorage.removeItem('superAdminAuth')
  }

  // Check if already authenticated on component mount
  useState(() => {
    if (localStorage.getItem('superAdminAuth') === 'true') {
      setIsAuthenticated(true)
    }
  })

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin</h1>
            <p className="text-gray-600">Davet Digital Yönetim Paneli</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="root"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link to="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock data - gerçekte backend'den gelecek
  const stats = {
    totalCustomers: 142,
    activeSubscriptions: 118,
    totalRevenue: 356800,
    monthlyRevenue: 42500,
    trialUsers: 24,
    expiringSoon: 8
  }

  const customers = [
    {
      id: 1,
      coupleNames: 'Ayşe & Mehmet Yılmaz',
      email: 'ayse@example.com',
      phone: '555-0101',
      plan: 'premium',
      status: 'active',
      subscriptionDate: '2024-01-15',
      expiryDate: '2025-01-15',
      daysLeft: 245,
      revenue: 2499,
      slug: 'ayse-mehmet',
      weddingDate: '2024-06-15'
    },
    {
      id: 2,
      coupleNames: 'Elif & Can Demir',
      email: 'elif@example.com',
      phone: '555-0102',
      plan: 'platinum',
      status: 'active',
      subscriptionDate: '2024-02-01',
      expiryDate: '2025-02-01',
      daysLeft: 262,
      revenue: 4999,
      slug: 'elif-can',
      weddingDate: '2024-07-20'
    },
    {
      id: 3,
      coupleNames: 'Zeynep & Burak Kaya',
      email: 'zeynep@example.com',
      phone: '555-0103',
      plan: 'temel',
      status: 'trial',
      subscriptionDate: '2024-03-10',
      expiryDate: '2024-04-09',
      daysLeft: 15,
      revenue: 0,
      slug: 'zeynep-burak',
      weddingDate: '2024-08-30'
    },
    {
      id: 4,
      coupleNames: 'Selin & Ahmet Öztürk',
      email: 'selin@example.com',
      phone: '555-0104',
      plan: 'premium',
      status: 'expiring_soon',
      subscriptionDate: '2023-12-20',
      expiryDate: '2024-12-20',
      daysLeft: 5,
      revenue: 2499,
      slug: 'selin-ahmet',
      weddingDate: '2024-05-05'
    }
  ]

  const recentTransactions = [
    { id: 1, customer: 'Ayşe & Mehmet', amount: 2499, plan: 'Premium', date: '2024-03-15', status: 'completed' },
    { id: 2, customer: 'Elif & Can', amount: 4999, plan: 'Platinum', date: '2024-03-14', status: 'completed' },
    { id: 3, customer: 'Zeynep & Burak', amount: 999, plan: 'Temel', date: '2024-03-13', status: 'pending' },
    { id: 4, customer: 'Selin & Ahmet', amount: 2499, plan: 'Premium', date: '2024-03-12', status: 'completed' }
  ]

  const getPlanBadge = (plan) => {
    const badges = {
      temel: 'bg-blue-100 text-blue-700',
      premium: 'bg-purple-100 text-purple-700',
      platinum: 'bg-amber-100 text-amber-700'
    }
    return badges[plan] || badges.temel
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aktif' },
      trial: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Deneme' },
      expiring_soon: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Sona Eriyor' },
      expired: { bg: 'bg-red-100', text: 'text-red-700', label: 'Süresi Doldu' }
    }
    return badges[status] || badges.active
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 md:py-6 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-purple-100 mt-1 text-sm md:text-base">Davet Digital Yönetim Paneli</p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/"
                className="px-3 md:px-4 py-2 text-sm md:text-base bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Ana Sayfa
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 md:px-4 py-2 text-sm md:text-base bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Toplam Müşteri</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCustomers}</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% bu ay</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Aktif Abonelik</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeSubscriptions}</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% bu ay</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Toplam Gelir</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-purple-600 mt-1">{formatCurrency(stats.monthlyRevenue)} bu ay</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Sona Erecek</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.expiringSoon}</p>
                <p className="text-sm text-orange-600 mt-1">{stats.trialUsers} deneme kullanıcısı</p>
              </div>
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <TrendingUp className="w-5 h-5 inline mr-2" />
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'customers'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Müşteriler
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Ödemeler
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'pages'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Sayfalar
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Sistem Özeti</h2>

                {/* Revenue Chart Placeholder */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Aylık Gelir Grafiği</h3>
                  <div className="h-64 flex items-end justify-around space-x-2">
                    {[65, 45, 80, 55, 90, 70, 100, 85, 95, 75, 88, 92].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all">
                    <Users className="w-8 h-8 mb-2" />
                    <h4 className="font-bold">Yeni Müşteri Ekle</h4>
                  </button>
                  <button className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
                    <Download className="w-8 h-8 mb-2" />
                    <h4 className="font-bold">Rapor İndir</h4>
                  </button>
                  <button className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <h4 className="font-bold">Süresi Dolanlar</h4>
                  </button>
                </div>
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Müşteri ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filtrele</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
                    <Download className="w-5 h-5" />
                    <span>Excel İndir</span>
                  </button>
                </div>

                {/* Customers Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Çift</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">İletişim</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Paket</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Durum</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Kalan Gün</th>
                        <th className="text-right py-4 px-4 font-semibold text-gray-700">Gelir</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => {
                        const statusBadge = getStatusBadge(customer.status)
                        return (
                          <tr key={customer.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-semibold text-gray-900">{customer.coupleNames}</p>
                                <p className="text-sm text-gray-600">{customer.slug}.davet.digital</p>
                                <p className="text-xs text-gray-500">Düğün: {formatDate(customer.weddingDate)}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm">
                                <p className="text-gray-700">{customer.email}</p>
                                <p className="text-gray-600">{customer.phone}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanBadge(customer.plan)}`}>
                                {customer.plan.charAt(0).toUpperCase() + customer.plan.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.bg} ${statusBadge.text}`}>
                                {statusBadge.label}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`font-semibold ${customer.daysLeft < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                                {customer.daysLeft} gün
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-semibold text-gray-900">
                              {formatCurrency(customer.revenue)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Düzenle">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Son Ödemeler</h2>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
                    <Download className="w-5 h-5" />
                    <span>Tümünü İndir</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Müşteri</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Paket</th>
                        <th className="text-right py-4 px-4 font-semibold text-gray-700">Tutar</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Tarih</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-gray-900">{transaction.customer}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanBadge(transaction.plan.toLowerCase())}`}>
                              {transaction.plan}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right font-bold text-gray-900">{formatCurrency(transaction.amount)}</td>
                          <td className="py-4 px-4 text-gray-700">{formatDate(transaction.date)}</td>
                          <td className="py-4 px-4 text-center">
                            {transaction.status === 'completed' ? (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Tamamlandı</span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Bekliyor</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pages Management Tab */}
            {activeTab === 'pages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sayfa Yönetimi</h2>
                  <p className="text-gray-600">Ana sayfa, demo, fiyatlandırma ve diğer sayfaları buradan yönetin</p>
                </div>

                {/* Page Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Landing Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Ana Sayfa</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Landing page, hero section, features, testimonials</p>
                    <div className="flex space-x-2">
                      <Link to="/" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>

                  {/* Demo Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Demo Sayfası</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Canlı demo, örnek düğün sitesi</p>
                    <div className="flex space-x-2">
                      <Link to="/demo" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/demo" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>

                  {/* Pricing Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Fiyatlandırma</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Paket fiyatları, özellik karşılaştırmaları</p>
                    <div className="flex space-x-2">
                      <Link to="/pricing" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/pricing" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>

                  {/* Signup Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Kayıt Sayfası</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Üye kayıt formu, paket seçimi</p>
                    <div className="flex space-x-2">
                      <Link to="/signup" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/signup" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>

                  {/* Login Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Giriş Sayfası</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Müşteri giriş formu</p>
                    <div className="flex space-x-2">
                      <Link to="/login" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/login" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>

                  {/* EULA Page */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Kullanıcı Sözleşmesi</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">EULA, şartlar ve koşullar</p>
                    <div className="flex space-x-2">
                      <Link to="/eula" className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-center hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Görüntüle</span>
                      </Link>
                      <Link to="/eula" className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                        <Edit2 className="w-4 h-4" />
                        <span>Düzenle</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold mb-4">Hızlı İstatistikler</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-purple-100 text-sm">Toplam Sayfa</p>
                      <p className="text-3xl font-bold">6</p>
                    </div>
                    <div>
                      <p className="text-purple-100 text-sm">Aktif Sayfa</p>
                      <p className="text-3xl font-bold">6</p>
                    </div>
                    <div>
                      <p className="text-purple-100 text-sm">Son Güncelleme</p>
                      <p className="text-lg font-semibold">Bugün</p>
                    </div>
                    <div>
                      <p className="text-purple-100 text-sm">Durum</p>
                      <p className="text-lg font-semibold">✓ Tümü Çalışıyor</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin
