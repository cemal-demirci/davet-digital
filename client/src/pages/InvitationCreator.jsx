import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import {
  FileText,
  Image,
  Palette,
  Type,
  Download,
  Share2,
  ShoppingCart,
  Eye,
  Save,
  ChevronLeft,
  Loader,
  AlertCircle
} from 'lucide-react';
import InvitationTemplate from '../components/InvitationTemplate';

const InvitationCreator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('select'); // select, edit, preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Templates
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filter, setFilter] = useState('all');

  // Invitation data
  const [invitation, setInvitation] = useState(null);
  const [customDesign, setCustomDesign] = useState(null);
  const [eventInfo, setEventInfo] = useState({
    names: '',
    date: '',
    time: '',
    location: { name: '', address: '' }
  });

  // Editor state
  const [activeTab, setActiveTab] = useState('content'); // content, design, preview

  useEffect(() => {
    fetchTemplates();
    loadTenantInfo();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/invitations/templates`, {
        params: filter !== 'all' ? { category: filter } : {}
      });
      setTemplates(response.data);
    } catch (error) {
      setError('Şablonlar yüklenemedi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTenantInfo = async () => {
    try {
      const tenantId = localStorage.getItem('tenantId');
      if (!tenantId) return;

      const response = await axios.get(`${API_URL}/api/settings`, {
        headers: { 'x-tenant-id': tenantId }
      });

      // Auto-fill event info from tenant
      setEventInfo({
        names: response.data.coupleNames || '',
        date: response.data.weddingDate || '',
        time: '',
        location: { name: '', address: '' }
      });
    } catch (error) {
      console.error('Tenant bilgileri yüklenemedi:', error);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomDesign(template.design);
    setStep('edit');
  };

  // Selected element for editing
  const [selectedElement, setSelectedElement] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingColor, setEditingColor] = useState('#ffffff');
  const [editingFontSize, setEditingFontSize] = useState(24);
  const [editingFontFamily, setEditingFontFamily] = useState('Great Vibes');

  const handleCustomize = (type, sectionId, currentValue) => {
    const section = customDesign.textSections.find(s => s.id === sectionId);
    if (section) {
      setSelectedElement({ type, id: sectionId });
      setEditingText(section.content || '');
      setEditingColor(section.style?.color || '#ffffff');
      setEditingFontSize(section.style?.fontSize || 24);
      setEditingFontFamily(section.style?.fontFamily || 'Great Vibes');
      setActiveTab('design');
    }
  };

  const handleUpdateElement = () => {
    if (!selectedElement) return;

    const updatedSections = customDesign.textSections.map(section => {
      if (section.id === selectedElement.id) {
        return {
          ...section,
          content: editingText,
          style: {
            ...section.style,
            color: editingColor,
            fontSize: editingFontSize,
            fontFamily: editingFontFamily
          }
        };
      }
      return section;
    });

    setCustomDesign({
      ...customDesign,
      textSections: updatedSections
    });

    setSelectedElement(null);
  };

  const handleBackgroundColorChange = (color) => {
    setCustomDesign({
      ...customDesign,
      background: {
        ...customDesign.background,
        type: 'solid',
        color: color
      }
    });
  };

  const handleGradientChange = (from, via, to) => {
    setCustomDesign({
      ...customDesign,
      background: {
        ...customDesign.background,
        type: 'gradient',
        gradient: {
          from,
          via,
          to,
          direction: customDesign.background?.gradient?.direction || 'to bottom'
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const tenantId = localStorage.getItem('tenantId');
      if (!tenantId) {
        setError('Lütfen giriş yapın');
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/invitations`,
        {
          templateId: selectedTemplate._id,
          customDesign,
          eventInfo
        },
        {
          headers: { 'x-tenant-id': tenantId }
        }
      );

      setInvitation(response.data.invitation);
      alert('Davetiye kaydedildi!');
    } catch (error) {
      setError('Davetiye kaydedilemedi: ' + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invitation) {
      alert('Önce davetiyeyi kaydedin');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Download PDF as file
      const response = await axios.get(
        `${API_URL}/api/invitations/${invitation._id}/download-pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob' // Important for file download
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `davetiye-${invitation._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('PDF download error:', error);
      alert('PDF indirilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPDF = () => {
    if (!invitation) {
      alert('Önce davetiyeyi kaydedin');
      return;
    }

    const token = localStorage.getItem('token');
    const url = `${API_URL}/api/invitations/${invitation._id}/preview-pdf`;

    // Open PDF in new tab
    window.open(
      `${url}?token=${encodeURIComponent(token)}`,
      '_blank',
      'width=800,height=1000'
    );
  };

  const handleShare = () => {
    if (invitation?.digital?.url) {
      navigator.clipboard.writeText(invitation.digital.url);
      alert('Davetiye linki panoya kopyalandı!');
    } else {
      alert('Önce davetiyeyi kaydedin');
    }
  };

  const handlePrintOrder = () => {
    if (!invitation) {
      alert('Önce davetiyeyi kaydedin');
      return;
    }
    navigate(`/print-order/${invitation._id}`);
  };

  // Template selection view
  const renderTemplateSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Davetiye Şablonu Seçin
        </h2>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            fetchTemplates();
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Tüm Şablonlar</option>
          <option value="wedding">Düğün</option>
          <option value="engagement">Nişan</option>
          <option value="corporate">Kurumsal Etkinlik</option>
          <option value="birthday">Doğum Günü</option>
          <option value="circumcision">Sünnet</option>
          <option value="graduation">Mezuniyet</option>
          <option value="baby-shower">Baby Shower</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template._id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="aspect-[9/16] bg-gray-100 relative overflow-hidden">
                {template.thumbnail ? (
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {template.isPremium && (
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Premium
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="capitalize">{template.layout}</span>
                  <span>{template.usageCount || 0} kez kullanıldı</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Editor view
  const renderEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setStep('select');
            setSelectedTemplate(null);
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Şablon Seç</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'content'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Type className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'design'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'preview'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>Kaydet</span>
          </button>
          <button
            onClick={handlePreviewPDF}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FileText className="w-5 h-5" />
            <span>PDF Önizle</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-5 h-5" />
            <span>PDF İndir</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Share2 className="w-5 h-5" />
            <span>Paylaş</span>
          </button>
          <button
            onClick={handlePrintOrder}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Baskı Siparişi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar for editing */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          {activeTab === 'content' && (
            <>
              <h3 className="font-semibold text-lg mb-4">İçerik Düzenle</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İsimler
                </label>
                <input
                  type="text"
                  value={eventInfo.names}
                  onChange={(e) => setEventInfo({ ...eventInfo, names: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ayşe & Mehmet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarih
                </label>
                <input
                  type="date"
                  value={eventInfo.date}
                  onChange={(e) => setEventInfo({ ...eventInfo, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Saat
                </label>
                <input
                  type="time"
                  value={eventInfo.time}
                  onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mekan
                </label>
                <input
                  type="text"
                  value={eventInfo.location.name}
                  onChange={(e) =>
                    setEventInfo({
                      ...eventInfo,
                      location: { ...eventInfo.location, name: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Düğün Salonu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres
                </label>
                <textarea
                  value={eventInfo.location.address}
                  onChange={(e) =>
                    setEventInfo({
                      ...eventInfo,
                      location: { ...eventInfo.location, address: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Adres bilgisi"
                />
              </div>
            </>
          )}

          {activeTab === 'design' && (
            <>
              <h3 className="font-semibold text-lg mb-4">Tasarım Düzenle</h3>

              {selectedElement ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Metin Düzenle</h4>
                    <button
                      onClick={() => setSelectedElement(null)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      İptal
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metin
                    </label>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font
                    </label>
                    <select
                      value={editingFontFamily}
                      onChange={(e) => setEditingFontFamily(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Great Vibes">Great Vibes</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Boyut: {editingFontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="120"
                      value={editingFontSize}
                      onChange={(e) => setEditingFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Renk
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={editingColor}
                        onChange={(e) => setEditingColor(e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={editingColor}
                        onChange={(e) => setEditingColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateElement}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700"
                  >
                    Uygula
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Arka Plan</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tip
                        </label>
                        <select
                          value={customDesign.background?.type || 'gradient'}
                          onChange={(e) => {
                            if (e.target.value === 'solid') {
                              handleBackgroundColorChange('#8B5CF6');
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="solid">Düz Renk</option>
                          <option value="gradient">Gradient</option>
                        </select>
                      </div>

                      {customDesign.background?.type === 'solid' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Renk
                          </label>
                          <input
                            type="color"
                            value={customDesign.background?.color || '#8B5CF6'}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                            className="h-10 w-full border border-gray-300 rounded"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Başlangıç</label>
                            <input
                              type="color"
                              value={customDesign.background?.gradient?.from || '#8B5CF6'}
                              onChange={(e) =>
                                handleGradientChange(
                                  e.target.value,
                                  customDesign.background?.gradient?.via,
                                  customDesign.background?.gradient?.to
                                )
                              }
                              className="h-10 w-full border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Orta (İsteğe Bağlı)</label>
                            <input
                              type="color"
                              value={customDesign.background?.gradient?.via || '#EC4899'}
                              onChange={(e) =>
                                handleGradientChange(
                                  customDesign.background?.gradient?.from,
                                  e.target.value,
                                  customDesign.background?.gradient?.to
                                )
                              }
                              className="h-10 w-full border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Bitiş</label>
                            <input
                              type="color"
                              value={customDesign.background?.gradient?.to || '#EF4444'}
                              onChange={(e) =>
                                handleGradientChange(
                                  customDesign.background?.gradient?.from,
                                  customDesign.background?.gradient?.via,
                                  e.target.value
                                )
                              }
                              className="h-10 w-full border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 italic">
                      💡 Önizlemedeki metinlere tıklayarak düzenleyebilirsiniz
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'preview' && (
            <>
              <h3 className="font-semibold text-lg mb-4">Önizleme Ayarları</h3>
              <p className="text-sm text-gray-600">
                Farklı cihazlarda nasıl görüneceğini test edin
              </p>
            </>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[800px]">
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Önizleme Ölçeği:</label>
            <input
              type="range"
              min="20"
              max="100"
              defaultValue="50"
              onChange={(e) => {
                const scale = parseInt(e.target.value) / 100;
                document.getElementById('preview-container').style.transform = `scale(${scale})`;
              }}
              className="w-48"
            />
          </div>
          <div
            id="preview-container"
            className="transform transition-transform duration-300"
            style={{ transformOrigin: 'top center', transform: 'scale(0.5)' }}
          >
            <InvitationTemplate
              template={selectedTemplate}
              customDesign={customDesign}
              eventInfo={eventInfo}
              onCustomize={handleCustomize}
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 italic">
              💡 Metinlere tıklayarak düzenleyebilirsiniz
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {step === 'select' ? renderTemplateSelection() : renderEditor()}
      </div>
    </div>
  );
};

export default InvitationCreator;
