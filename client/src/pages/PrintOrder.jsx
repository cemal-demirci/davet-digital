import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import {
  Package,
  Truck,
  CreditCard,
  Check,
  ChevronLeft,
  Loader,
  AlertCircle,
  Download
} from 'lucide-react';
import InvitationTemplate from '../components/InvitationTemplate';

const PrintOrder = () => {
  const { invitationId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [invitation, setInvitation] = useState(null);
  const [template, setTemplate] = useState(null);

  // Order configuration
  const [orderConfig, setOrderConfig] = useState({
    paperType: 'standard',
    finish: 'matte',
    quantity: 50,
    size: 'A6',
    envelope: {
      included: false,
      type: 'standard',
      color: 'white'
    }
  });

  // Shipping address
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'TR'
  });

  // Pricing
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    fetchInvitation();
  }, [invitationId]);

  useEffect(() => {
    fetchPricingSettings();
  }, []);

  useEffect(() => {
    if (invitation && orderConfig) {
      calculatePricing();
    }
  }, [orderConfig, invitation]);

  const fetchInvitation = async () => {
    try {
      setLoading(true);
      const tenantId = localStorage.getItem('tenantId');

      const response = await axios.get(`${API_URL}/api/invitations/${invitationId}`, {
        headers: { 'x-tenant-id': tenantId }
      });

      setInvitation(response.data);
      setTemplate(response.data.templateId);
    } catch (error) {
      setError('Davetiye bulunamadı: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPricingSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/invitations/pricing`);
      // Pricing settings are fetched, will be used in calculatePricing
    } catch (error) {
      console.error('Fiyatlandırma ayarları yüklenemedi:', error);
    }
  };

  const calculatePricing = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/invitations/pricing/calculate`, orderConfig);
      setPricing(response.data);
    } catch (error) {
      console.error('Fiyat hesaplanamadı:', error);
      setError('Fiyat hesaplanamadı');
    }
  };

  const handleDownloadPrintPDF = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_URL}/api/invitations/${invitationId}/download-print-pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `davetiye-baski-${invitationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Print PDF download error:', error);
      alert('Baskı PDF\'i indirilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate shipping address
      if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city) {
        setError('Lütfen tüm gerekli alanları doldurun');
        return;
      }

      const tenantId = localStorage.getItem('tenantId');

      const response = await axios.post(
        `${API_URL}/api/invitations/${invitationId}/print-order`,
        {
          ...orderConfig,
          shippingAddress
        },
        {
          headers: { 'x-tenant-id': tenantId }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Sipariş oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Baskı Siparişi
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            <span>Siparişiniz başarıyla oluşturuldu! Yönlendiriliyorsunuz...</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paper Type */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">Kağıt Seçimi</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'standard', label: 'Standart', price: '1x' },
                  { value: 'premium', label: 'Premium', price: '1.5x' },
                  { value: 'luxury', label: 'Lüks', price: '2x' },
                  { value: 'eco', label: 'Eko', price: '1.2x' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOrderConfig({ ...orderConfig, paperType: option.value })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      orderConfig.paperType === option.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Yüzey İşlemi</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'matte', label: 'Mat' },
                  { value: 'glossy', label: 'Parlak' },
                  { value: 'silk', label: 'İpek' },
                  { value: 'textured', label: 'Dokulu' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOrderConfig({ ...orderConfig, finish: option.value })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      orderConfig.finish === option.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Size */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Adet ve Boyut</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adet (Min: 10)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={orderConfig.quantity}
                    onChange={(e) =>
                      setOrderConfig({ ...orderConfig, quantity: parseInt(e.target.value) || 10 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {orderConfig.quantity >= 500 && '🎉 %30 İndirim!'}
                    {orderConfig.quantity >= 200 && orderConfig.quantity < 500 && '🎉 %20 İndirim!'}
                    {orderConfig.quantity >= 100 && orderConfig.quantity < 200 && '🎉 %10 İndirim!'}
                    {orderConfig.quantity >= 50 && orderConfig.quantity < 100 && '🎉 %5 İndirim!'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boyut
                  </label>
                  <select
                    value={orderConfig.size}
                    onChange={(e) => setOrderConfig({ ...orderConfig, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="A6">A6 (105 × 148 mm)</option>
                    <option value="A5">A5 (148 × 210 mm)</option>
                    <option value="A4">A4 (210 × 297 mm)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Envelope */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Zarf</h2>

              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={orderConfig.envelope.included}
                  onChange={(e) =>
                    setOrderConfig({
                      ...orderConfig,
                      envelope: { ...orderConfig.envelope, included: e.target.checked }
                    })
                  }
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span>Zarf dahil (+2₺/adet)</span>
              </label>

              {orderConfig.envelope.included && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zarf Rengi
                    </label>
                    <select
                      value={orderConfig.envelope.color}
                      onChange={(e) =>
                        setOrderConfig({
                          ...orderConfig,
                          envelope: { ...orderConfig.envelope, color: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="white">Beyaz</option>
                      <option value="cream">Krem</option>
                      <option value="ivory">Fildişi</option>
                      <option value="gold">Altın</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">Teslimat Adresi</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres 1 *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine1}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres 2
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine2}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İl *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posta Kodu
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Preview */}
            {invitation && template && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Önizleme</h3>
                <div className="scale-[0.2] origin-top-left">
                  <InvitationTemplate
                    template={template}
                    customDesign={invitation.customDesign}
                    eventInfo={invitation.eventInfo}
                  />
                </div>
              </div>
            )}

            {/* Pricing */}
            {pricing && (
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-semibold">Sipariş Özeti</h2>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Birim Fiyat:</span>
                    <span>{pricing.basePrice} {pricing.currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ara Toplam ({pricing.quantity} adet):</span>
                    <span>{pricing.subtotal} {pricing.currency}</span>
                  </div>
                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>İndirim ({pricing.discountPercentage}%):</span>
                      <span>-{pricing.discount} {pricing.currency}</span>
                    </div>
                  )}
                  {pricing.envelopeCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Zarf:</span>
                      <span>{pricing.envelopeCost} {pricing.currency}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Kargo:</span>
                    <span>{pricing.shippingCost} {pricing.currency}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Ara Toplam:</span>
                      <span>{pricing.totalBeforeVAT} {pricing.currency}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>KDV ({pricing.vatPercentage}%):</span>
                      <span>{pricing.vat} {pricing.currency}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Toplam:</span>
                      <span className="text-purple-600">{pricing.total} {pricing.currency}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownloadPrintPDF}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Baskı Kalitesinde PDF İndir
                </button>

                <button
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      İşleniyor...
                    </span>
                  ) : (
                    'Sipariş Ver'
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Tahmini teslimat: 7-10 iş günü
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintOrder;
