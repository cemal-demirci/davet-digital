import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Shield,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  Activity,
  Database,
  Image as ImageIcon,
  Mail,
  Bell,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CemalAdmin = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('superAdminToken')
    if (!token) {
      navigate('/cemalogin')
      return
    }

    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('superAdminToken')

      // Fetch stats
      const statsRes = await axios.get(`${API_URL}/api/super-admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(statsRes.data)

      // Fetch users
      const usersRes = await axios.get(`${API_URL}/api/super-admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(usersRes.data)

      // Fetch invitations
      const invitationsRes = await axios.get(`${API_URL}/api/super-admin/invitations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setInvitations(invitationsRes.data)

    } catch (error) {
      console.error('Error fetching data:', error)
      if (error.response?.status === 401) {
        navigate('/cemalogin')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('superAdminToken')
    localStorage.removeItem('superAdminId')
    localStorage.removeItem('superAdminUsername')
    navigate('/cemalogin')
  }

  const deleteUser = async (userId) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return

    try {
      const token = localStorage.getItem('superAdminToken')
      await axios.delete(`${API_URL}/api/super-admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchData()
    } catch (error) {
      alert('Kullanıcı silinemedi')
    }
  }

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-green-400 text-sm flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <RefreshCw className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold text-white">Super Admin</h1>
                <p className="text-xs text-gray-400">Platform Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'invitations', label: 'Invitations', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                label="Total Users"
                value={stats?.totalUsers || 0}
                color="from-blue-500 to-cyan-500"
                trend="+12%"
              />
              <StatCard
                icon={FileText}
                label="Total Invitations"
                value={stats?.totalInvitations || 0}
                color="from-purple-500 to-pink-500"
                trend="+8%"
              />
              <StatCard
                icon={DollarSign}
                label="Total Revenue"
                value={`₺${stats?.totalRevenue || 0}`}
                color="from-green-500 to-emerald-500"
                trend="+23%"
              />
              <StatCard
                icon={Calendar}
                label="Active Events"
                value={stats?.activeEvents || 0}
                color="from-orange-500 to-red-500"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {stats?.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-xl">
                    <Activity className="w-5 h-5 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-white">{activity.description}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-400 text-center py-8">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-bold text-white">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold">{user.username?.[0]?.toUpperCase()}</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-white font-medium">{user.username}</p>
                            <p className="text-gray-400 text-sm">{user.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400">
                          {user.eventType || 'wedding'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-all"
                          >
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

        {activeTab === 'invitations' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-bold text-white">All Invitations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {invitations.map(invitation => (
                <div key={invitation._id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                  {invitation.customDesign?.previewImage && (
                    <img
                      src={invitation.customDesign.previewImage}
                      alt="Invitation"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{invitation.eventInfo?.names || 'Untitled'}</p>
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {invitation.eventInfo?.date || 'No date'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-all text-sm">
                      <Eye className="w-4 h-4 inline mr-1" />
                      View
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Platform Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Platform Name</label>
                <input
                  type="text"
                  defaultValue="Davet Digital"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Support Email</label>
                <input
                  type="email"
                  defaultValue="destek@davet.digital"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Maintenance Mode</label>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 rounded text-purple-600" />
                  <span className="text-gray-400">Enable maintenance mode</span>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CemalAdmin
