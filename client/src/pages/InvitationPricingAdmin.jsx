import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import {
  DollarSign,
  Save,
  Plus,
  Trash2,
  Loader,
  AlertCircle,
  Check
} from 'lucide-react';

const InvitationPricingAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [pricing, setPricing] = useState({
    name: 'Default Pricing',
    basePrices: {
      A6: 5,
      A5: 8,
      A4: 12,
      custom: 15
    },
    paperTypePrices: {
      standard: 0,
      premium: 2.5,
      luxury: 5,
      eco: 1
    },
    finishPrices: {
      matte: 0,
      glossy: 1,
      silk: 1.5,
      textured: 2.5
    },
    envelopePricing: {
      standard: 2,
      premium: 3,
      luxury: 4
    },
    quantityDiscounts: [
      { minQuantity: 500, discountPercentage: 30 },
      { minQuantity: 200, discountPercentage: 20 },
      { minQuantity: 100, discountPercentage: 10 },
      { minQuantity: 50, discountPercentage: 5 }
    ],
    shippingCosts: [
      { minQuantity: 1, maxQuantity: 100, cost: 30 },
      { minQuantity: 101, maxQuantity: 300, cost: 50 },
      { minQuantity: 301, cost: 75 }
    ],
    minimumOrderQuantity: 10,
    vatPercentage: 20,
    currency: 'TRY'
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/invitations/pricing`);
      setPricing(response.data);
    } catch (error) {
      setError('Fiyatlandırma yüklenemedi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await axios.put(`${API_URL}/api/invitations/pricing`, pricing);

      setSuccess('Fiyatlandırma başarıyla kaydedildi!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Kaydetme hatası: ' + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addQuantityDiscount = () => {
    setPricing({
      ...pricing,
      quantityDiscounts: [
        ...pricing.quantityDiscounts,
        { minQuantity: 0, discountPercentage: 0 }
      ]
    });
  };

  const removeQuantityDiscount = (index) => {
    setPricing({
      ...pricing,
      quantityDiscounts: pricing.quantityDiscounts.filter((_, i) => i !== index)
    });
  };

  const addShippingCost = () => {
    setPricing({
      ...pricing,
      shippingCosts: [
        ...pricing.shippingCosts,
        { minQuantity: 0, cost: 0 }
      ]
    });
  };

  const removeShippingCost = (index) => {
    setPricing({
      ...pricing,
      shippingCosts: pricing.shippingCosts.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Davetiye Fiyatlandırma Ayarları
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Kaydediliyor...' : 'Kaydet'}</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
              <Check className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Base Prices */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Baz Fiyatlar (TRY)</h3>
              <div className="space-y-3">
                {Object.entries(pricing.basePrices).map(([size, price]) => (
                  <div key={size} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium text-gray-700">{size}:</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={price}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          basePrices: {
                            ...pricing.basePrices,
                            [size]: parseFloat(e.target.value) || 0
                          }
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">₺</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper Type Prices */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Kağıt Tipi Ek Fiyatları (TRY)
              </h3>
              <div className="space-y-3">
                {Object.entries(pricing.paperTypePrices).map(([type, price]) => (
                  <div key={type} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium text-gray-700 capitalize">
                      {type}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={price}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          paperTypePrices: {
                            ...pricing.paperTypePrices,
                            [type]: parseFloat(e.target.value) || 0
                          }
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">₺</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Prices */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Yüzey İşlemi Ek Fiyatları (TRY)
              </h3>
              <div className="space-y-3">
                {Object.entries(pricing.finishPrices).map(([finish, price]) => (
                  <div key={finish} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium text-gray-700 capitalize">
                      {finish}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={price}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          finishPrices: {
                            ...pricing.finishPrices,
                            [finish]: parseFloat(e.target.value) || 0
                          }
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">₺</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Envelope Pricing */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Zarf Fiyatları (TRY)</h3>
              <div className="space-y-3">
                {Object.entries(pricing.envelopePricing).map(([type, price]) => (
                  <div key={type} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium text-gray-700 capitalize">
                      {type}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={price}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          envelopePricing: {
                            ...pricing.envelopePricing,
                            [type]: parseFloat(e.target.value) || 0
                          }
                        })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">₺</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity Discounts */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Miktar İndirimleri</h3>
              <button
                onClick={addQuantityDiscount}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ekle</span>
              </button>
            </div>
            <div className="space-y-3">
              {pricing.quantityDiscounts.map((discount, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Min. Adet:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={discount.minQuantity}
                      onChange={(e) => {
                        const updated = [...pricing.quantityDiscounts];
                        updated[index].minQuantity = parseInt(e.target.value) || 0;
                        setPricing({ ...pricing, quantityDiscounts: updated });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      İndirim %:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount.discountPercentage}
                      onChange={(e) => {
                        const updated = [...pricing.quantityDiscounts];
                        updated[index].discountPercentage = parseInt(e.target.value) || 0;
                        setPricing({ ...pricing, quantityDiscounts: updated });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    onClick={() => removeQuantityDiscount(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Costs */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Kargo Ücretleri</h3>
              <button
                onClick={addShippingCost}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                <span>Ekle</span>
              </button>
            </div>
            <div className="space-y-3">
              {pricing.shippingCosts.map((shipping, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Min:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={shipping.minQuantity}
                      onChange={(e) => {
                        const updated = [...pricing.shippingCosts];
                        updated[index].minQuantity = parseInt(e.target.value) || 0;
                        setPricing({ ...pricing, shippingCosts: updated });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Max:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={shipping.maxQuantity || ''}
                      onChange={(e) => {
                        const updated = [...pricing.shippingCosts];
                        updated[index].maxQuantity = e.target.value
                          ? parseInt(e.target.value)
                          : undefined;
                        setPricing({ ...pricing, shippingCosts: updated });
                      }}
                      placeholder="Sınırsız"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Ücret:
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={shipping.cost}
                      onChange={(e) => {
                        const updated = [...pricing.shippingCosts];
                        updated[index].cost = parseFloat(e.target.value) || 0;
                        setPricing({ ...pricing, shippingCosts: updated });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-500">₺</span>
                  </div>
                  <button
                    onClick={() => removeShippingCost(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Other Settings */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Sipariş Adedi
              </label>
              <input
                type="number"
                min="1"
                value={pricing.minimumOrderQuantity}
                onChange={(e) =>
                  setPricing({
                    ...pricing,
                    minimumOrderQuantity: parseInt(e.target.value) || 1
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">KDV %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={pricing.vatPercentage}
                onChange={(e) =>
                  setPricing({
                    ...pricing,
                    vatPercentage: parseInt(e.target.value) || 0
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
              <select
                value={pricing.currency}
                onChange={(e) => setPricing({ ...pricing, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="TRY">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPricingAdmin;
