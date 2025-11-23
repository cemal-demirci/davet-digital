import { useState } from 'react'
import { DollarSign, CheckSquare, Users, TrendingUp, Calendar, Plus, Edit2, Trash2, Check, X } from 'lucide-react'
import { formatDate, formatCurrency } from '../utils/dateFormatter'

const WeddingPlanner = () => {
  const [activeTab, setActiveTab] = useState('budget')

  // Budget State
  const [budget, setBudget] = useState({
    total: 150000,
    spent: 65000,
    items: [
      { id: 1, category: 'Mekan', planned: 40000, actual: 38000, paid: true },
      { id: 2, category: 'Yemek & İçecek', planned: 35000, actual: 32000, paid: true },
      { id: 3, category: 'Fotoğraf & Video', planned: 20000, actual: 0, paid: false },
      { id: 4, category: 'Müzik & DJ', planned: 15000, actual: 15000, paid: true },
      { id: 5, category: 'Çiçek & Dekorasyon', planned: 18000, actual: 0, paid: false },
      { id: 6, category: 'Davetiye', planned: 5000, actual: 0, paid: false },
      { id: 7, category: 'Gelinlik & Smokin', planned: 12000, actual: 0, paid: false },
      { id: 8, category: 'Diğer', planned: 5000, actual: 0, paid: false }
    ]
  })

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Mekan rezervasyonu yap', deadline: '2024-03-15', completed: true, priority: 'high' },
    { id: 2, title: 'Fotoğrafçı seç ve sözleşme imzala', deadline: '2024-04-01', completed: false, priority: 'high' },
    { id: 3, title: 'Davetiye tasarımını onayla', deadline: '2024-04-10', completed: false, priority: 'medium' },
    { id: 4, title: 'Menü seçimi yap', deadline: '2024-04-15', completed: true, priority: 'high' },
    { id: 5, title: 'Nikah memuru randevusu al', deadline: '2024-05-01', completed: false, priority: 'high' },
    { id: 6, title: 'Balayı planını yap', deadline: '2024-05-15', completed: false, priority: 'low' },
    { id: 7, title: 'Playlist hazırla', deadline: '2024-05-20', completed: false, priority: 'medium' }
  ])

  // Guests State
  const [guests, setGuests] = useState([
    { id: 1, name: 'Ali Veli', email: 'ali@example.com', phone: '555-0101', rsvp: 'attending', guests: 2, table: 1 },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-0102', rsvp: 'attending', guests: 3, table: 1 },
    { id: 3, name: 'Mehmet Yılmaz', email: 'mehmet@example.com', phone: '555-0103', rsvp: 'pending', guests: 2, table: 2 },
    { id: 4, name: 'Fatma Kaya', email: 'fatma@example.com', phone: '555-0104', rsvp: 'declined', guests: 1, table: null },
    { id: 5, name: 'Can Öztürk', email: 'can@example.com', phone: '555-0105', rsvp: 'attending', guests: 4, table: 2 }
  ])

  const budgetPercentage = (budget.spent / budget.total) * 100
  const completedTasks = tasks.filter(t => t.completed).length
  const attendingGuests = guests.filter(g => g.rsvp === 'attending').reduce((sum, g) => sum + g.guests, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
            Düğün Planlayıcı
          </h1>
          <p className="text-gray-600">Düğün hazırlıklarınızı organize edin ve takip edin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-green-500" />
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                {budgetPercentage.toFixed(0)}% Kullanıldı
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Bütçe</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(budget.spent)}</p>
            <p className="text-sm text-gray-500 mt-1">/ {formatCurrency(budget.total)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <CheckSquare className="w-10 h-10 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {completedTasks}/{tasks.length}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Görevler</h3>
            <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
            <p className="text-sm text-gray-500 mt-1">Tamamlandı</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                {guests.length} Davetli
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Katılımcılar</h3>
            <p className="text-3xl font-bold text-gray-900">{attendingGuests}</p>
            <p className="text-sm text-gray-500 mt-1">Kişi gelecek</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('budget')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'budget'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Bütçe Takibi
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'tasks'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <CheckSquare className="w-5 h-5 inline mr-2" />
                Görev Listesi
              </button>
              <button
                onClick={() => setActiveTab('guests')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'guests'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Misafir Yönetimi
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Budget Tab */}
            {activeTab === 'budget' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Bütçe Detayları</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Kategori Ekle</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Kategori</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Planlanan</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Harcanan</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Kalan</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Durum</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budget.items.map((item) => {
                        const remaining = item.planned - item.actual
                        return (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                            <td className="py-4 px-4 font-medium text-gray-900">{item.category}</td>
                            <td className="py-4 px-4 text-right text-gray-700">{formatCurrency(item.planned)}</td>
                            <td className="py-4 px-4 text-right text-gray-700">{formatCurrency(item.actual)}</td>
                            <td className={`py-4 px-4 text-right font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {formatCurrency(remaining)}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {item.paid ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Ödendi</span>
                              ) : (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Bekliyor</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex justify-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Görev Listesi</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Görev Ekle</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
                        task.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setTasks(tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t))
                        }}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-purple-500'
                        }`}
                      >
                        {task.completed && <Check className="w-4 h-4 text-white" />}
                      </button>

                      <div className="flex-1">
                        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(task.deadline)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {task.priority === 'high' ? 'Yüksek' : task.priority === 'medium' ? 'Orta' : 'Düşük'} Öncelik
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guests Tab */}
            {activeTab === 'guests' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Misafir Listesi</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Misafir Ekle</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">İsim</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Telefon</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Kişi Sayısı</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">RSVP</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Masa</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((guest) => (
                        <tr key={guest.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-gray-900">{guest.name}</td>
                          <td className="py-4 px-4 text-gray-700">{guest.email}</td>
                          <td className="py-4 px-4 text-gray-700">{guest.phone}</td>
                          <td className="py-4 px-4 text-center text-gray-900 font-semibold">{guest.guests}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              guest.rsvp === 'attending' ? 'bg-green-100 text-green-700' :
                              guest.rsvp === 'declined' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {guest.rsvp === 'attending' ? 'Gelecek' : guest.rsvp === 'declined' ? 'Gelmeyecek' : 'Bekliyor'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center text-gray-700">
                            {guest.table ? `Masa ${guest.table}` : '-'}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeddingPlanner
