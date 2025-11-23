/**
 * Tarih ve saat formatlama fonksiyonları
 * Türkiye standartları: DD.MM.YYYY ve 24 saat formatı
 */

/**
 * Tarihi DD.MM.YYYY formatında döndürür
 * @param {Date|string} date - Tarih objesi veya string
 * @returns {string} Formatlanmış tarih
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

/**
 * Saati 24 saat formatında döndürür (HH:MM)
 * @param {Date|string} date - Tarih objesi veya string
 * @returns {string} Formatlanmış saat
 */
export const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Tarih ve saati birlikte döndürür (DD.MM.YYYY HH:MM)
 * @param {Date|string} date - Tarih objesi veya string
 * @returns {string} Formatlanmış tarih ve saat
 */
export const formatDateTime = (date) => {
  if (!date) return ''
  return `${formatDate(date)} ${formatTime(date)}`
}

/**
 * Uzun tarih formatı (15 Ocak 2024)
 * @param {Date|string} date - Tarih objesi veya string
 * @returns {string} Formatlanmış tarih
 */
export const formatLongDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Uzun tarih ve saat formatı (15 Ocak 2024, 14:30)
 * @param {Date|string} date - Tarih objesi veya string
 * @returns {string} Formatlanmış tarih ve saat
 */
export const formatLongDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

/**
 * Para formatı (₺1.234,56)
 * @param {number} amount - Miktar
 * @returns {string} Formatlanmış para
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₺0'
  return '₺' + amount.toLocaleString('tr-TR')
}
