import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Plus, Trash2, Download, QrCode as QrIcon, Printer, Share2 } from 'lucide-react'
import axios from 'axios'
import { themes } from '../themes/themes'

const API_URL = 'http://localhost:5001'

const QRManager = () => {
  const [qrCodes, setQrCodes] = useState([])
  const [newQR, setNewQR] = useState({ name: '', tableNumber: '', count: 1 })
  const [settings, setSettings] = useState(null)
  const [qrType, setQRType] = useState('person') // 'person' veya 'table'

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/settings`)
      setSettings(response.data)
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const fetchQRCodes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/qrcodes`)
      setQrCodes(response.data)
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    }
  }

  const handleCreateQR = async () => {
    if (qrType === 'person' && !newQR.name) {
      alert('Lütfen isim girin!')
      return
    }

    if (qrType === 'table' && !newQR.tableNumber) {
      alert('Masa QR için masa numarası zorunludur!')
      return
    }

    try {
      const qrData = {
        ...newQR,
        name: qrType === 'table' ? `Masa ${newQR.tableNumber}` : newQR.name,
        isTableQR: qrType === 'table'
      }

      await axios.post(`${API_URL}/api/qrcodes`, qrData)
      setNewQR({ name: '', tableNumber: '', count: 1 })
      fetchQRCodes()
      alert('QR kod(lar) oluşturuldu!')
    } catch (error) {
      console.error('Error creating QR code:', error)
      alert('Oluşturma hatası!')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu QR kodu silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/qrcodes/${id}`)
      fetchQRCodes()
      alert('QR kod silindi!')
    } catch (error) {
      console.error('Error deleting QR code:', error)
    }
  }

  const shareViaWhatsApp = (qrCode) => {
    const qrUrl = `${window.location.origin}/upload/${qrCode.code}`
    const message = `Merhaba! 💒\n\nDüğünümüz için fotoğraf yüklemek ister misin?\n\n${qrCode.name}${qrCode.tableNumber ? ` - Masa ${qrCode.tableNumber}` : ''}\n\n👇 Buradan yükleyebilirsin:\n${qrUrl}\n\n📸 Anılarımızın bir parçası ol!`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const downloadQR = (qrCode) => {
    const svg = document.getElementById(`qr-${qrCode._id}`)
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = 400
      canvas.height = 500
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 400, 500)
      ctx.drawImage(img, 50, 50, 300, 300)

      // Add text
      ctx.fillStyle = 'black'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(qrCode.name, 200, 380)
      if (qrCode.tableNumber) {
        ctx.font = '16px Arial'
        ctx.fillText(`Masa ${qrCode.tableNumber}`, 200, 410)
      }
      ctx.font = '14px Arial'
      ctx.fillText('Fotoğraflarınızı Paylaşın', 200, 440)

      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `qr-${qrCode.name}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const printQR = (qrCode) => {
    // Önce SVG'yi canvas'a çevir
    const svgElement = document.getElementById(`qr-${qrCode._id}`)
    if (!svgElement) {
      alert('QR kod bulunamadı!')
      return
    }

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    const qrUrl = `${window.location.origin}/upload/${qrCode.code}`
    const currentTheme = themes[settings?.theme || 'romantic-rose']
    const coupleNames = settings?.coupleNames || 'Düğünümüze Hoşgeldiniz'

    // Tema renklerini ayarla
    const themeColors = {
      'romantic-rose': { primary: '#ec4899', secondary: '#f9a8d4', bg: '#fdf2f8' },
      'elegant-black': { primary: '#1f2937', secondary: '#d4af37', bg: '#f9fafb' },
      'garden-green': { primary: '#059669', secondary: '#10b981', bg: '#ecfdf5' },
      'ocean-blue': { primary: '#0891b2', secondary: '#06b6d4', bg: '#ecfeff' },
      'sunset-orange': { primary: '#ea580c', secondary: '#fb923c', bg: '#fff7ed' },
      'purple-dream': { primary: '#9333ea', secondary: '#a855f7', bg: '#faf5ff' }
    }

    const colors = themeColors[settings?.theme || 'romantic-rose']

    img.onload = () => {
      // Canvas'a QR kodu çiz
      canvas.width = 250
      canvas.height = 250
      ctx.drawImage(img, 0, 0, 250, 250)

      const qrDataUrl = canvas.toDataURL('image/png')

      // Yazdırma penceresi aç
      const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Kod - ${qrCode.name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Great+Vibes&display=swap" rel="stylesheet">
        <style>
          @page {
            margin: 15mm;
            size: A4 portrait;
          }

          body {
            font-family: 'Playfair Display', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, ${colors.bg} 0%, white 100%);
          }

          .qr-card {
            text-align: center;
            border: 3px solid ${colors.primary};
            border-radius: 20px;
            padding: 30px 40px;
            background: white;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            max-width: 450px;
            position: relative;
            overflow: hidden;
          }

          .qr-card::before {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 150px;
            height: 150px;
            background: ${colors.secondary};
            opacity: 0.1;
            border-radius: 50%;
          }

          .qr-card::after {
            content: '';
            position: absolute;
            bottom: -50px;
            left: -50px;
            width: 150px;
            height: 150px;
            background: ${colors.primary};
            opacity: 0.1;
            border-radius: 50%;
          }

          .couple-names {
            font-family: 'Great Vibes', cursive;
            font-size: 38px;
            color: ${colors.primary};
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
          }

          .guest-name {
            font-size: 26px;
            font-weight: 700;
            color: ${colors.primary};
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
          }

          .uploader-info {
            font-size: 20px;
            color: #333;
            margin-top: 8px;
            margin-bottom: 5px;
            font-weight: 700;
            position: relative;
            z-index: 1;
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .uploader-label {
            font-size: 12px;
            color: #666;
            font-weight: 500;
            margin-bottom: 4px;
          }

          .table {
            color: ${colors.secondary};
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
            position: relative;
            z-index: 1;
          }

          .divider {
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
            margin: 15px auto;
          }

          #qrcode {
            position: relative;
            z-index: 1;
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          #qrcode img {
            display: block;
            margin: 0 auto;
            width: 250px;
            height: 250px;
          }

          .instruction {
            margin-top: 20px;
            color: #555;
            font-size: 14px;
            line-height: 1.6;
            position: relative;
            z-index: 1;
          }

          .emoji {
            font-size: 20px;
            margin-bottom: 8px;
          }

          .footer {
            margin-top: 15px;
            font-size: 12px;
            color: #999;
            font-style: italic;
          }

          .qr-link {
            margin-top: 12px;
            margin-bottom: 8px;
            font-size: 11px;
            color: ${colors.primary};
            word-break: break-all;
            text-decoration: none;
            font-weight: 600;
            display: block;
          }

          .qr-link:hover {
            text-decoration: underline;
          }

          @media print {
            body {
              padding: 0;
            }
            .qr-card {
              box-shadow: none;
              border: 2px solid ${colors.primary};
            }
          }
        </style>
      </head>
      <body>
        <div class="qr-card">
          <div class="couple-names">${coupleNames}</div>
          <div class="divider"></div>
          ${qrCode.isTableQR ? `
            <div class="guest-name">🪑 Masa ${qrCode.tableNumber}</div>
            <div class="uploader-label">Herkes kendi ismini yazarak yükleyebilir</div>
          ` : `
            ${qrCode.tableNumber ? `<div class="guest-name">Masa ${qrCode.tableNumber}</div>` : ''}
            ${qrCode.name ? `
              <div class="uploader-label">Fotoğrafları Yükleyecek Kişi:</div>
              <div class="uploader-info">${qrCode.name}</div>
            ` : ''}
          `}
          <div id="qrcode">
            <img src="${qrDataUrl}" alt="QR Code" />
          </div>
          <a href="${qrUrl}" class="qr-link" target="_blank">${qrUrl}</a>
          <div class="divider"></div>
          <div class="instruction">
            <div class="emoji">📸</div>
            <strong>Anılarınızı Bizimle Paylaşın!</strong><br>
            QR kodu telefonunuzla tarayın<br>
            veya yukarıdaki linke tıklayın<br>
            ve düğün fotoğraflarınızı yükleyin
          </div>
          <div class="footer">Galeride görünmek üzere ♥</div>
        </div>
        <script>
          setTimeout(() => window.print(), 500);
        </script>
      </body>
      </html>
      `)
      printWindow.document.close()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="space-y-6">
      {/* Create QR */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yeni QR Kod Oluştur</h2>

        {/* Tip Seçimi */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setQRType('person')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              qrType === 'person'
                ? 'border-pink-500 bg-pink-50 text-pink-700'
                : 'border-gray-300 text-gray-600 hover:border-pink-300'
            }`}
          >
            <div className="text-lg font-semibold mb-1">👤 Kişiye Özel</div>
            <div className="text-sm">İsim belirtilmiş QR kod</div>
          </button>
          <button
            onClick={() => setQRType('table')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              qrType === 'table'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-600 hover:border-blue-300'
            }`}
          >
            <div className="text-lg font-semibold mb-1">🪑 Masa QR</div>
            <div className="text-sm">Herkes kendi ismini yazabilir</div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {qrType === 'person' && (
            <input
              type="text"
              value={newQR.name}
              onChange={(e) => setNewQR({ ...newQR, name: e.target.value })}
              placeholder="İsim (örn: Ali Veli)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          )}
          <input
            type="text"
            value={newQR.tableNumber}
            onChange={(e) => setNewQR({ ...newQR, tableNumber: e.target.value })}
            placeholder={qrType === 'table' ? 'Masa No (Zorunlu)' : 'Masa No (Opsiyonel)'}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            min="1"
            max="100"
            value={newQR.count}
            onChange={(e) => setNewQR({ ...newQR, count: parseInt(e.target.value) })}
            placeholder="Adet"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleCreateQR}
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Oluştur</span>
          </button>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          {qrType === 'person' ? (
            <>
              <p>💡 <strong>Kişiye Özel:</strong> İsim otomatik doldurulur, misafir sadece fotoğraf yükler</p>
              <p>📝 Adet belirterek birden fazla QR kod oluşturabilirsiniz</p>
            </>
          ) : (
            <>
              <p>🪑 <strong>Masa QR:</strong> Masaya koyulur, herkes kendi ismini yazarak yükleyebilir</p>
              <p>📸 Tüm masa misafirleri aynı QR'ı kullanır</p>
            </>
          )}
        </div>
      </div>

      {/* QR List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">QR Kodlar ({qrCodes.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qrCodes.map(qr => (
            <div key={qr._id} className="border border-gray-200 rounded-lg p-4">
              <div className="text-center mb-3">
                <QRCodeSVG
                  id={`qr-${qr._id}`}
                  value={`${window.location.origin}/upload/${qr.code}`}
                  size={150}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="text-center mb-3">
                {qr.isTableQR ? (
                  <>
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs mb-2">
                      🪑 Masa QR
                    </div>
                    <h3 className="font-bold text-gray-800">Masa {qr.tableNumber}</h3>
                    <p className="text-xs text-gray-500">Herkes kendi ismini yazar</p>
                  </>
                ) : (
                  <>
                    <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs mb-2">
                      👤 Kişiye Özel
                    </div>
                    <h3 className="font-bold text-gray-800">{qr.name}</h3>
                    {qr.tableNumber && (
                      <p className="text-sm text-gray-600">Masa {qr.tableNumber}</p>
                    )}
                  </>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Kullanım: {qr.usedCount} kez
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => downloadQR(qr)}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 flex items-center justify-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>İndir</span>
                  </button>
                  <button
                    onClick={() => printQR(qr)}
                    className="flex-1 bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 flex items-center justify-center space-x-1"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Yazdır</span>
                  </button>
                </div>
                <button
                  onClick={() => shareViaWhatsApp(qr)}
                  className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 flex items-center justify-center space-x-1"
                >
                  <Share2 className="w-4 h-4" />
                  <span>WhatsApp'tan Gönder</span>
                </button>
                <button
                  onClick={() => handleDelete(qr._id)}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Sil</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {qrCodes.length === 0 && (
          <p className="text-center text-gray-500 py-8">Henüz QR kod oluşturulmamış</p>
        )}
      </div>
    </div>
  )
}

export default QRManager
