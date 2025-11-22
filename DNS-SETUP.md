# DNS Setup Instructions for davet.digital

## Vercel'e Domain Bağlama - DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, Google Domains, vb.) aşağıdaki DNS kayıtlarını eklemeniz gerekiyor:

### Option 1: A Records (Önerilen)

Domain sağlayıcınızın DNS yönetim paneline girin ve şu kayıtları ekleyin:

```
Type: A
Host: @
Value: 76.76.21.21
TTL: 3600 (veya Auto)

Type: A
Host: www
Value: 76.76.21.21
TTL: 3600 (veya Auto)
```

### Option 2: Nameservers (Alternatif)

Eğer Vercel'in nameserver'larını kullanmak istiyorsanız, domain sağlayıcınızda nameserver'ları şunlarla değiştirin:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## Doğrulama

DNS değişikliklerinin yayılması 24-48 saat sürebilir (genellikle birkaç dakika içinde aktif olur).

### Kontrol Etmek İçin:

```bash
# Terminal'de test et
dig davet.digital
dig www.davet.digital

# veya
nslookup davet.digital
nslookup www.davet.digital
```

## Vercel Domain Durumu Kontrolü

```bash
npx vercel domains ls
```

Domain'ler "Ready" durumuna geldiğinde kullanıma hazır olacak.

## Şu An Aktif Olan Geçici URL'ler:

- Frontend: https://client-9r5t3xxyy-cemal-demircis-projects.vercel.app
- Backend: https://davet-digital-backend.onrender.com (doğrulanması gerekiyor)

DNS ayarları tamamlandıktan sonra:
- https://davet.digital
- https://www.davet.digital

adreslerinden sitenize erişebilirsiniz.
