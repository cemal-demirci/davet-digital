# 💍 Düğün & Nişan Davetiye Sitesi

Modern, responsive ve tam kapsamlı düğün/nişan davetiye web uygulaması.

## ✨ Özellikler

### 🎨 Ana Sayfa
- **6 Farklı Tema**: Romantic Rose, Elegant Black, Garden Green, Ocean Blue, Sunset Orange, Purple Dream
- **Geri Sayım Sayacı**: Düğün, nişan ve diğer etkinlikler için canlı geri sayım
- **Fotoğraf Galerisi**: Çift fotoğrafları + Misafir fotoğrafları (onaylanmış)
- **Hikaye Bölümü**: Çiftin hikayesini anlatma
- **Müzik Çalma**: Arka planda müzik çalabilme
- **Şifre Koruması**: İsteğe bağlı şifre ile erişim kontrolü
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **Dinamik Tema Sistemi**: Tüm sayfalar seçili temaya göre otomatik renklenir

### 🔧 Admin Panel
- **Genel Ayarlar**: Çift isimleri, tarihler, hikaye, tema seçimi
- **Etkinlik Yönetimi**: Düğün, nişan gibi etkinlikleri ekleme/silme
- **Fotoğraf Yönetimi**: Drag & drop ile fotoğraf yükleme
- **QR Kod Yönetimi**: Misafirler için özel QR kodlar oluşturma, yazdırma
- **Misafir Galerisi**: Misafir fotoğraflarını onaylama/reddetme
- **Şifre Ayarları**: Ziyaretçi şifresi belirleme
- **Güvenli Giriş**: Admin paneli şifre korumalı

### 📱 QR Kod Sistemi
- **Toplu Oluşturma**: Masa numarası ve misafir bilgileriyle QR kod oluşturma
- **Temaya Uygun Yazdırma**: Her QR kod seçili temaya göre güzel şekilde yazdırılabilir
- **Benzersiz Kodlar**: Her QR kod benzersiz ve takip edilebilir
- **Kullanım İstatistikleri**: Her QR kodun kaç kez kullanıldığını görme
- **Fotoğraf Yükleme**: QR kodu taratan misafirler doğrudan fotoğraf yükleyebilir

### 👥 Misafir Fotoğraf Sistemi
- **Kolay Yükleme**: QR kod ile direkt erişim, basit arayüz
- **Otomatik Moderasyon**: Tüm fotoğraflar admin onayından sonra yayınlanır
- **Filtreleme**: Bekleyen, onaylanmış veya tüm fotoğrafları görüntüleme
- **İstatistikler**: Toplam, bekleyen ve onaylanan fotoğraf sayısı
- **Silme/Onay**: Admin her fotoğrafı tek tek kontrol edebilir

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- MongoDB (yerel veya cloud)
- npm veya yarn

### 1. Projeyi Klonlayın
```bash
cd Desktop
cd wedding-website
```

### 2. MongoDB'yi Başlatın
```bash
# macOS (Homebrew ile)
brew services start mongodb-community

# veya manuel
mongod --dbpath=/path/to/data
```

### 3. Backend Kurulumu
```bash
cd server
npm install
npm start
```

Backend http://localhost:5001 adresinde çalışacak.

### 4. Frontend Kurulumu
Yeni bir terminal açın:
```bash
cd client
npm install
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacak.

## 📖 Kullanım

### Admin Panel Erişimi
1. Tarayıcıda `http://localhost:5173/admin` adresine gidin
2. Varsayılan şifre: `admin123` (Mutlaka değiştirin!)
3. Admin panelinden tüm içerikleri yönetin

### Ayarlar

#### Genel Ayarlar
- **Çift İsimleri**: Ana sayfada görünecek isimler
- **Tarihler**: Nişan ve düğün tarihleri
- **Hikaye**: Çiftin hikayesi
- **Tema Seçimi**: 6 farklı tema arasından seçim yapın
- **Müzik**: Arka plan müziği URL'si
- **Şifre Koruması**: Ziyaretçi şifresi belirleme

#### Tema Seçenekleri
1. **Romantic Rose** 🌹 - Pembe ve altın tonları
2. **Elegant Black** 🖤 - Siyah, beyaz ve altın
3. **Garden Green** 🌿 - Yeşil doğa teması
4. **Ocean Blue** 🌊 - Mavi okyanus teması
5. **Sunset Orange** 🌅 - Turuncu gün batımı
6. **Purple Dream** 💜 - Mor rüya teması

#### Etkinlik Ekleme
1. Admin panelde "Etkinlikler" sekmesine gidin
2. Etkinlik adı, tarih, konum ve açıklama girin
3. "Etkinlik Ekle" butonuna tıklayın

#### Fotoğraf Yükleme
1. Admin panelde "Fotoğraflar" sekmesine gidin
2. Dosya seçme alanına tıklayın
3. Fotoğraf seçin ve başlık/açıklama girin
4. Otomatik yüklenecektir

#### QR Kod Oluşturma
1. Admin panelde "QR Kodlar" sekmesine gidin
2. Masa numarası girin (örn: "1", "2", "VIP")
3. Adet belirleyin (toplu oluşturma için)
4. "Oluştur" butonuna tıklayın
5. QR kodları yazdırmak için "Yazdır" butonunu kullanın

#### Misafir Fotoğraflarını Yönetme
1. Admin panelde "Misafir Galerisi" sekmesine gidin
2. "Bekleyenler" sekmesinden onay bekleyen fotoğrafları görün
3. Fotoğrafı onayla veya sil
4. Onaylanan fotoğraflar ana sayfada görünecektir

## 🛠️ Teknolojiler

### Frontend
- React 18
- Vite
- Tailwind CSS 3.4.17
- React Router
- Axios
- Lucide Icons
- QRCode.react (QR kod oluşturma)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Multer (dosya yükleme)
- CORS
- UUID (benzersiz QR kodlar için)

## 📱 Responsive Tasarım
- Mobil cihazlar için optimize edilmiş
- Tablet ve desktop uyumlu
- Touch gesture desteği

## 🔒 Güvenlik

### Admin Şifresini Değiştirme
`client/src/pages/Admin.jsx` dosyasında:
```javascript
const ADMIN_PASSWORD = 'admin123' // Buraya güçlü bir şifre koyun
```

### Ziyaretçi Şifresi
Admin panelden "Genel Ayarlar" > "Şifre Koruması" bölümünden ayarlayın.

## 🌐 Deployment

### Vercel (Frontend)
```bash
cd client
npm run build
vercel --prod
```

### Heroku (Backend)
```bash
cd server
heroku create
git push heroku main
```

### MongoDB Atlas
1. https://www.mongodb.com/cloud/atlas adresinden ücretsiz hesap açın
2. Cluster oluşturun
3. Connection string'i kopyalayın
4. `server/.env` dosyasına ekleyin:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding
```

### Ücretsiz Hosting Seçenekleri
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku (Free tier), Railway, Render
- **Database**: MongoDB Atlas (Free tier)
- **Fotoğraflar**: Cloudinary (Free tier)

## 📝 Yapılacaklar

- [x] 6 farklı tema sistemi
- [x] QR kod oluşturma ve yönetimi
- [x] Misafir fotoğraf yükleme
- [x] Fotoğraf moderasyon sistemi
- [x] Temaya uygun QR yazdırma
- [ ] Misafir listesi yönetimi
- [ ] RSVP (Katılım onayı) sistemi
- [ ] Hediye listesi
- [ ] Harita entegrasyonu
- [ ] Email bildirimleri
- [ ] Canlı yayın entegrasyonu

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

MIT License - İstediğiniz gibi kullanabilirsiniz!

## 💡 İpuçları

- **Fotoğrafları optimize edin**: Yüklemeden önce fotoğrafları sıkıştırın
- **Yedek alın**: Düzenli olarak MongoDB'yi yedekleyin
- **Test edin**: Canlıya almadan önce farklı cihazlarda test edin
- **QR Kodları**: Düğün öncesi yazdırıp masalara koyabilirsiniz
- **Tema Seçimi**: Düğün konseptinize uygun temayı seçin
- **Moderasyon**: Düğün sonrası fotoğrafları hızlıca onaylamayı unutmayın

## 🎨 Tema Sistemi

6 farklı hazır tema mevcuttur. Admin panelden "Genel Ayarlar" > "Tema" seçeneğinden değiştirebilirsiniz.

### Tema Renkleri
Her tema kendi renk paletine sahiptir ve tüm sayfalarda (ana sayfa, admin panel, QR yazdırma) otomatik uygulanır:

- **Romantic Rose**: Pembe (#ec4899) ve altın tonları
- **Elegant Black**: Siyah (#1f2937) ve altın (#d4af37)
- **Garden Green**: Doğa yeşili (#059669)
- **Ocean Blue**: Okyanus mavisi (#0891b2)
- **Sunset Orange**: Gün batımı turuncusu (#ea580c)
- **Purple Dream**: Mor (#9333ea)

### Özel Tema Oluşturma
`client/src/themes/themes.js` dosyasına yeni tema ekleyebilirsiniz:
```javascript
'yeni-tema': {
  primary: '#renk1',
  secondary: '#renk2',
  accent: '#renk3',
  light: '#renk4'
}
```

## 📞 Destek

Sorularınız için issue açabilirsiniz.

---

**💖 Mutlu Evlilikler Dileriz! 💖**

Developed by Cemal Demirci | www.cemal.online
