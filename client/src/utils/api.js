import axios from 'axios'
import { API_URL } from '../config'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL
})

// Add tenant information to requests
api.interceptors.request.use((config) => {
  // Try to get tenant from localStorage (set during login/signup)
  const tenantId = localStorage.getItem('tenantId')
  const tenantSlug = localStorage.getItem('tenantSlug')

  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId
  }

  // For demo/development, also try to get from URL
  if (!tenantId && tenantSlug) {
    config.params = {
      ...config.params,
      slug: tenantSlug
    }
  }

  return config
})

export default api
