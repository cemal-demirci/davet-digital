import { Link } from 'react-router-dom'
import { FileText, Shield, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'
import { formatDate } from '../utils/dateFormatter'

const EULA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Kullanıcı Sözleşmesi - Davet Digital | Şartlar ve Koşullar"
        description="Davet Digital kullanıcı sözleşmesi, hizmet şartları ve koşulları. Kullanıcı hakları, gizlilik politikası ve hizmet kullanım kuralları."
        keywords="kullanıcı sözleşmesi, hizmet şartları, EULA, gizlilik, şartlar ve koşullar"
        url="https://davet.digital/eula"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="flex justify-center mb-6">
            <FileText className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6">
            Kullanıcı Sözleşmesi
          </h1>
          <p className="text-xl text-gray-600">
            Davet Digital Hizmet Şartları ve Koşulları
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Son güncelleme: {formatDate(new Date())}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Önemli Uyarı</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Bu hizmeti kullanarak aşağıdaki şartları ve koşulları kabul etmiş sayılırsınız.
                    Lütfen dikkatle okuyunuz.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-purple-600 mr-2" />
                1. Hizmet Tanımı
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Davet Digital, çiftlerin düğün günleri için online web siteleri oluşturmalarına,
                misafir yönetimi yapmalarına, fotoğraf paylaşımı ve RSVP sistemi kullanmalarına
                olanak tanıyan bir SaaS (Software as a Service) platformudur.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Platform, kullanıcılarına tema seçimi, içerik yönetimi, misafir davetleri,
                QR kod sistemli fotoğraf paylaşımı ve canlı fotoğraf duvarı gibi özellikler sunar.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Hesap ve Üyelik
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>2.1.</strong> Davet Digital'e kayıt olurken verdiğiniz tüm bilgilerin doğru, güncel ve eksiksiz olması gerekmektedir.</p>
                <p><strong>2.2.</strong> Hesap güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmamanız önerilir.</p>
                <p><strong>2.3.</strong> Her kullanıcı yalnızca bir hesap oluşturabilir. Çoklu hesap tespit edilirse hesaplarınız askıya alınabilir.</p>
                <p><strong>2.4.</strong> 18 yaşından küçük kişiler, veli onayı olmadan kayıt olamaz.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Paketler ve Ücretlendirme
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>3.1.</strong> Tüm paketler tek seferlik ödemedir. Aylık veya yıllık abonelik yoktur.</p>
                <p><strong>3.2.</strong> Paket seçiminiz, belirlenen süre boyunca (365 gün) geçerlidir.</p>
                <p><strong>3.3.</strong> İlk 30 gün deneme süresi olarak kabul edilir ve tüm özellikler aktiftir.</p>
                <p><strong>3.4.</strong> 30 gün sonunda, seçtiğiniz pakete özel özellikler devam eder.</p>
                <p><strong>3.5.</strong> 14 gün içinde hizmetten memnun kalmazsanız, para iade garantisi kapsamında tam iade alabilirsiniz.</p>
                <p><strong>3.6.</strong> Paket yükseltmeleri her zaman yapılabilir. Sadece fark ücreti ödenir.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. İçerik ve Telif Hakları
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>4.1.</strong> Platforma yüklediğiniz tüm içeriklerin (fotoğraf, video, metin) telif hakkı size aittir.</p>
                <p><strong>4.2.</strong> İçeriklerinizin yasalara uygun olmasından siz sorumlusunuz.</p>
                <p><strong>4.3.</strong> Davet Digital, platformun işleyişi için içeriklerinizi kullanma hakkına sahiptir ancak üçüncü taraflarla paylaşmaz.</p>
                <p><strong>4.4.</strong> Uygunsuz içerik (müstehcen, şiddet içeren, nefret söylemi vb.) yüklemek yasaktır ve hesap kapatma sebebidir.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Gizlilik ve Veri Güvenliği
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>5.1.</strong> Kişisel verileriniz KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında korunur.</p>
                <p><strong>5.2.</strong> Verileriniz, yalnızca hizmetin sağlanması için kullanılır ve üçüncü taraflarla paylaşılmaz.</p>
                <p><strong>5.3.</strong> Ödeme bilgileriniz güvenli ödeme sağlayıcıları üzerinden işlenir ve Davet Digital tarafından saklanmaz.</p>
                <p><strong>5.4.</strong> Hesabınızı sildiğinizde, tüm verileriniz 30 gün içinde kalıcı olarak silinir.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Hizmet Kullanım Kuralları
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>6.1.</strong> Platformu yalnızca yasal amaçlarla kullanmalısınız.</p>
                <p><strong>6.2.</strong> Sistem güvenliğini tehdit edecek davranışlarda (hacking, spam, DDoS vb.) bulunmak yasaktır.</p>
                <p><strong>6.3.</strong> Başkalarının hesaplarına izinsiz erişim yasaktır.</p>
                <p><strong>6.4.</strong> Sahte veya yanıltıcı bilgi vermek yasaktır.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Hizmet Sürekliliği ve Sorumluluk
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>7.1.</strong> Davet Digital, %99.9 uptime hedefler ancak garanti vermez.</p>
                <p><strong>7.2.</strong> Planlı bakımlar için kullanıcılar önceden bilgilendirilir.</p>
                <p><strong>7.3.</strong> Teknik arızalar, hizmet kesintileri veya veri kayıplarından dolayı Davet Digital sorumlu tutulamaz.</p>
                <p><strong>7.4.</strong> Düzenli yedekleme yapılır ancak veri kaybı riskine karşı kullanıcıların da kendi yedeklerini alması önerilir.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. İptal ve İade Politikası
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>8.1.</strong> 14 günlük para iade garantisi: Satın alma tarihinden itibaren 14 gün içinde tam iade alabilirsiniz.</p>
                <p><strong>8.2.</strong> İade talebi için destek ekibine email göndermeniz yeterlidir.</p>
                <p><strong>8.3.</strong> İade işlemi 5-7 iş günü içinde tamamlanır.</p>
                <p><strong>8.4.</strong> 14 gün sonrası iadeler, yalnızca Davet Digital'in hizmet sağlayamaması durumunda kabul edilir.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Hesap Askıya Alma ve Kapatma
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>9.1.</strong> Davet Digital, kullanım şartlarını ihlal eden hesapları uyarı vermeden askıya alma veya kapatma hakkına sahiptir.</p>
                <p><strong>9.2.</strong> Hesap askıya alınırsa, kalan süre için ücret iadesi yapılmaz.</p>
                <p><strong>9.3.</strong> Kullanıcılar istedikleri zaman hesaplarını kapatabilir ancak ücret iadesi yapılmaz.</p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Değişiklikler ve Güncellemeler
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>10.1.</strong> Davet Digital, bu sözleşmeyi dilediği zaman güncelleme hakkına sahiptir.</p>
                <p><strong>10.2.</strong> Önemli değişiklikler email ile bildirilir.</p>
                <p><strong>10.3.</strong> Değişiklikleri kabul etmiyorsanız, hizmeti kullanmayı bırakmalısınız.</p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. İletişim ve Destek
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:destek@davet.digital" className="text-purple-600 hover:underline">destek@davet.digital</a></p>
                <p><strong>Telefon:</strong> +90 555 123 45 67</p>
                <p><strong>Adres:</strong> İstanbul, Türkiye</p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Yürürlük ve Uygulanacak Hukuk
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>12.1.</strong> Bu sözleşme, kayıt olduğunuz andan itibaren yürürlüğe girer.</p>
                <p><strong>12.2.</strong> Türkiye Cumhuriyeti yasaları uygulanır.</p>
                <p><strong>12.3.</strong> Uyuşmazlıklar İstanbul mahkemelerinde çözülür.</p>
              </div>
            </section>

            {/* Acceptance */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-8 rounded-2xl mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Sözleşme Kabulü
              </h3>
              <p className="text-gray-700 leading-relaxed text-center mb-6">
                Davet Digital'e kayıt olarak yukarıdaki tüm şartları ve koşulları okuduğunuzu,
                anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
              </p>
              <div className="text-center">
                <Link
                  to="/signup"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Kabul Ediyorum & Kayıt Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default EULA
