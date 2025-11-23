import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { ChevronLeft, Save, FileText, Download } from 'lucide-react';
import CanvasInvitationEditor from '../components/CanvasInvitationEditor';

const CanvasInvitationCreator = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState('A6');
  const [saving, setSaving] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    names: '',
    date: '',
    time: '',
    location: { name: '', address: '' }
  });

  const handleSave = async (designData) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const tenantId = localStorage.getItem('tenantId');

      const response = await axios.post(
        `${API_URL}/api/invitations`,
        {
          templateId: null, // Custom canvas design
          customDesign: {
            canvasData: designData.json,
            previewImage: designData.dataURL,
            background: { type: 'canvas' }
          },
          eventInfo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': tenantId
          }
        }
      );

      alert('Davetiye başarıyla kaydedildi!');
      navigate('/admin');
    } catch (error) {
      console.error('Save error:', error);
      alert('Kaydederken hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Geri
        </button>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Canvas Davetiye Tasarımcısı
          </h1>
          <p className="text-gray-600">
            Profesyonel davetiyenizi sürükle-bırak ile tasarlayın
          </p>
        </div>
      </div>

      {/* Event Info Form */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Etkinlik Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsimler
              </label>
              <input
                type="text"
                value={eventInfo.names}
                onChange={(e) => setEventInfo({ ...eventInfo, names: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Ahmet & Ayşe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarih
              </label>
              <input
                type="date"
                value={eventInfo.date}
                onChange={(e) => setEventInfo({ ...eventInfo, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saat
              </label>
              <input
                type="time"
                value={eventInfo.time}
                onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Düğün Salonu"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <input
                type="text"
                value={eventInfo.location.address}
                onChange={(e) =>
                  setEventInfo({
                    ...eventInfo,
                    location: { ...eventInfo.location, address: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Tam adres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Davetiye Boyutu
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="A6">A6 (105 x 148 mm)</option>
                <option value="A5">A5 (148 x 210 mm)</option>
                <option value="A4">A4 (210 x 297 mm)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Editor */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <CanvasInvitationEditor
            size={size}
            onSave={handleSave}
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">💡 İpucu</h3>
          <p className="text-sm text-blue-800">
            Metinleri çift tıklayarak düzenleyebilirsiniz. Nesneleri sürükleyerek taşıyın.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-bold text-green-900 mb-2">🎨 Tasarım</h3>
          <p className="text-sm text-green-800">
            Sol panelden metin, şekil ve resim ekleyin. Seçili nesneleri düzenleyin.
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="font-bold text-purple-900 mb-2">💾 Kaydet</h3>
          <p className="text-sm text-purple-800">
            Tasarımınızı tamamladıktan sonra "Tasarımı Kaydet" butonuna tıklayın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CanvasInvitationCreator;
