# 🚀 Hızlı Başlangıç Rehberi

## 📋 Ön Hazırlık

### 1. MongoDB Kurulumu

#### macOS (Homebrew ile)
```bash
# MongoDB'yi yükleyin
brew tap mongodb/brew
brew install mongodb-community

# MongoDB'yi başlatın
brew services start mongodb-community
```

#### Windows
1. https://www.mongodb.com/try/download/community adresine gidin
2. Windows için MongoDB'yi indirin ve kurun
3. MongoDB Compass (GUI) ile birlikte gelecektir

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### MongoDB Çalışıyor mu Kontrol Edin
```bash
# Bağlantıyı test edin
mongosh
# veya
mongo
```

## 🎯 Projeyi Çalıştırma

### Terminal 1: Backend Server
```bash
cd /Users/cemaldemirci/Desktop/wedding-website/server
npm start
```

✅ Backend hazır: http://localhost:5000

### Terminal 2: Frontend
```bash
cd /Users/cemaldemirci/Desktop/wedding-website/client
npm run dev
```

✅ Frontend hazır: http://localhost:5173

## 🔐 İlk Giriş

### Ana Sayfa
- URL: http://localhost:5173
- Henüz içerik yok, admin panelden ekleyeceksiniz

### Admin Panel
- URL: http://localhost:5173/admin
- Şifre: `admin123`

⚠️ **ÖNEMLİ**: İlk yapmanız gereken admin şifresini değiştirmek!

## 📝 İlk Adımlar

### 1. Admin Panele Giriş Yapın
- http://localhost:5173/admin
- Şifre: admin123

### 2. Genel Ayarları Yapın
- Çift isimlerini girin (Örn: "Ahmet & Ayşe")
- Hikaye başlığı ve metnini yazın
- İsterseniz müzik URL'si ekleyin
- Şifre koruması ayarlayın

### 3. Etkinlik Ekleyin
- "Etkinlikler" sekmesine gidin
- Nişan tarihi ve yeri ekleyin
- Düğün tarihi ve yeri ekleyin
- Diğer etkinlikler (kına gecesi vb.)

### 4. Fotoğraf Yükleyin
- "Fotoğraflar" sekmesine gidin
- Çift fotoğraflarınızı yükleyin
- Her fotoğrafa başlık ve açıklama ekleyin

### 5. Ana Sayfayı Kontrol Edin
- http://localhost:5173 adresine gidin
- Değişiklikleri görün!

## 🎨 Özelleştirme

### Renkleri Değiştirme
`client/tailwind.config.js` dosyasını düzenleyin:

```javascript
romantic: {
  500: '#ec4899', // Pembe -> İstediğiniz renge değiştirin
}
gold: {
  500: '#eab308', // Altın -> İstediğiniz renge değiştirin
}
```

### Admin Şifresini Değiştirme
`client/src/pages/Admin.jsx` dosyasında 16. satır:
```javascript
const ADMIN_PASSWORD = 'YeniGüçlüŞifreniz123!'
```

## 🌐 MongoDB Cloud Kullanımı (Opsiyonel)

Yerel MongoDB yerine cloud kullanmak isterseniz:

### 1. MongoDB Atlas Hesabı Açın
- https://www.mongodb.com/cloud/atlas
- Ücretsiz tier seçin (512MB yeterli)

### 2. Cluster Oluşturun
- "Create Cluster" butonuna tıklayın
- Free tier seçin
- Region seçin (AWS - Ireland önerilir)

### 3. Database User Oluşturun
- "Database Access" menüsünden user ekleyin
- Username ve şifre belirleyin
- "Built-in Role" olarak "Read and write to any database" seçin

### 4. IP Whitelist
- "Network Access" menüsünden
- "Add IP Address" butonuna tıklayın
- "Allow Access from Anywhere" seçin (0.0.0.0/0)

### 5. Connection String Alın
- "Clusters" sayfasında "Connect" butonuna tıklayın
- "Connect your application" seçin
- Connection string'i kopyalayın

### 6. .env Dosyasını Güncelleyin
`server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-website?retryWrites=true&w=majority
```

## 🐛 Sorun Giderme

### MongoDB bağlanamıyor
```bash
# MongoDB çalışıyor mu?
brew services list | grep mongodb

# Başlatmayı deneyin
brew services start mongodb-community

# veya manuel
mongod --dbpath=/usr/local/var/mongodb
```

### Port zaten kullanımda
```bash
# 5000 portunu kullanan process'i bulun
lsof -i :5000

# Kill edin
kill -9 PID_NUMBER
```

### Frontend değişiklikleri görünmüyor
```bash
# Cache temizle ve yeniden başlat
cd client
rm -rf node_modules/.vite
npm run dev
```

### Fotoğraflar yüklenmiyor
```bash
# uploads klasörü var mı ve yazılabilir mi?
cd server
ls -la uploads/
chmod 755 uploads/
```

## 📱 Test Etme

### Farklı Cihazlarda Test
1. Bilgisayarınızın IP adresini bulun:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Aynı WiFi'ye bağlı telefon/tabletten:
```
http://YOUR_IP:5173
```

### Tarayıcı Geliştirici Araçları
- Chrome DevTools açın (F12)
- Toggle Device Toolbar (Ctrl+Shift+M)
- Farklı cihaz boyutlarında test edin

## 🚀 Production'a Alma

Hazır olduğunuzda [README.md](README.md) dosyasındaki "Deployment" bölümünü okuyun.

## 💡 İpuçları

1. **Fotoğrafları sıkıştırın**: https://tinypng.com
2. **Müzik dosyası küçük olsun**: MP3, max 5MB
3. **Test edin**: Farklı tarayıcılarda deneyin
4. **Yedek alın**: MongoDB'yi düzenli yedekleyin
5. **Mobil test**: Gerçek cihazda test edin

## 📞 Yardım

Sorun yaşarsanız:
1. Console'da hata mesajlarını kontrol edin
2. MongoDB bağlantısını test edin
3. Port'ların açık olduğundan emin olun
4. README.md dosyasını okuyun

---

**İyi Eğlenceler! 💑**
