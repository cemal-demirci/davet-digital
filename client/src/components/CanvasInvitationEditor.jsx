import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import {
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Trash2,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Copy,
  Layers,
  Move
} from 'lucide-react';

const CanvasInvitationEditor = ({ initialDesign, onSave, size = 'A6' }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Canvas dimensions based on size (in pixels at 72 DPI for screen)
  const canvasSizes = {
    A6: { width: 420, height: 595 },
    A5: { width: 595, height: 842 },
    A4: { width: 842, height: 1191 }
  };

  const currentSize = canvasSizes[size] || canvasSizes.A6;

  useEffect(() => {
    // Initialize Fabric canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: currentSize.width,
      height: currentSize.height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true
    });

    // Load initial design if provided
    if (initialDesign) {
      loadDesign(fabricCanvas, initialDesign);
    }

    // Selection events
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected[0]);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected[0]);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // History tracking
    fabricCanvas.on('object:modified', () => {
      saveHistory(fabricCanvas);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [size]);

  const loadDesign = (fabricCanvas, design) => {
    if (design.background) {
      if (design.background.type === 'solid') {
        fabricCanvas.backgroundColor = design.background.color;
      } else if (design.background.type === 'gradient') {
        const gradient = new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'pixels',
          coords: { x1: 0, y1: 0, x2: 0, y2: fabricCanvas.height },
          colorStops: [
            { offset: 0, color: design.background.gradient.from },
            { offset: 0.5, color: design.background.gradient.via },
            { offset: 1, color: design.background.gradient.to }
          ]
        });
        fabricCanvas.backgroundColor = gradient;
      }
    }

    fabricCanvas.renderAll();
  };

  const saveHistory = (fabricCanvas) => {
    const json = fabricCanvas.toJSON();
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(json);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const previousState = history[historyStep - 1];
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryStep(historyStep - 1);
      });
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const nextState = history[historyStep + 1];
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryStep(historyStep + 1);
      });
    }
  };

  const addText = () => {
    const text = new fabric.IText('Metni düzenlemek için tıklayın', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#000000',
      editable: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveHistory(canvas);
  };

  const addShape = (type) => {
    let shape;

    if (type === 'rectangle') {
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        fill: '#ff6b6b',
        stroke: '#000000',
        strokeWidth: 0
      });
    } else if (type === 'circle') {
      shape = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: '#4ecdc4',
        stroke: '#000000',
        strokeWidth: 0
      });
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
    saveHistory(canvas);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.scale(0.5);
        img.set({
          left: 100,
          top: 100
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        saveHistory(canvas);
      });
    };
    reader.readAsDataURL(file);
  };

  const deleteSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const duplicateSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned) => {
        cloned.set({
          left: activeObject.left + 20,
          top: activeObject.top + 20
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
        saveHistory(canvas);
      });
    }
  };

  const bringToFront = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
      canvas.renderAll();
    }
  };

  const sendToBack = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
      canvas.renderAll();
    }
  };

  const changeTextAlignment = (alignment) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ textAlign: alignment });
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const changeTextStyle = (style) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      if (style === 'bold') {
        activeObject.set({ fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold' });
      } else if (style === 'italic') {
        activeObject.set({ fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic' });
      } else if (style === 'underline') {
        activeObject.set({ underline: !activeObject.underline });
      }
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const changeFontSize = (size) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontSize: parseInt(size) });
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const changeFontFamily = (family) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontFamily: family });
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const changeColor = (color) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      if (activeObject.type === 'i-text') {
        activeObject.set({ fill: color });
      } else {
        activeObject.set({ fill: color });
      }
      canvas.renderAll();
      saveHistory(canvas);
    }
  };

  const changeBackgroundColor = (color) => {
    canvas.backgroundColor = color;
    canvas.renderAll();
    saveHistory(canvas);
  };

  const exportDesign = () => {
    const json = canvas.toJSON();
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3 // 3x resolution for better quality
    });

    if (onSave) {
      onSave({ json, dataURL });
    }

    return { json, dataURL };
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3
    });

    const link = document.createElement('a');
    link.download = 'davetiye.png';
    link.href = dataURL;
    link.click();
  };

  const zoomIn = () => {
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom * 1.1);
  };

  const zoomOut = () => {
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom / 1.1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-md p-4 lg:w-64 space-y-4">
        <h3 className="font-bold text-lg mb-4">Araçlar</h3>

        {/* Add Elements */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600">Ekle</p>
          <button
            onClick={addText}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Type className="w-4 h-4" />
            Metin
          </button>
          <label className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
            <ImageIcon className="w-4 h-4" />
            Resim
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            />
          </label>
          <button
            onClick={() => addShape('rectangle')}
            className="w-full flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            <Square className="w-4 h-4" />
            Dikdörtgen
          </button>
          <button
            onClick={() => addShape('circle')}
            className="w-full flex items-center gap-2 px-3 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            <Circle className="w-4 h-4" />
            Daire
          </button>
        </div>

        {/* History */}
        <div className="space-y-2 pt-4 border-t">
          <p className="text-sm font-semibold text-gray-600">Geçmiş</p>
          <div className="flex gap-2">
            <button
              onClick={undo}
              disabled={historyStep <= 0}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyStep >= history.length - 1}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Object Actions */}
        {selectedObject && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-semibold text-gray-600">Seçili Nesne</p>
            <button
              onClick={duplicateSelected}
              className="w-full flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              <Copy className="w-4 h-4" />
              Kopyala
            </button>
            <button
              onClick={deleteSelected}
              className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Sil
            </button>

            {/* Layers */}
            <div className="flex gap-2">
              <button
                onClick={bringToFront}
                className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-xs"
              >
                Öne Al
              </button>
              <button
                onClick={sendToBack}
                className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-xs"
              >
                Arkaya Al
              </button>
            </div>

            {/* Text Styles */}
            {selectedObject.type === 'i-text' && (
              <>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeTextAlignment('left')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => changeTextAlignment('center')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => changeTextAlignment('right')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => changeTextStyle('bold')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => changeTextStyle('italic')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => changeTextStyle('underline')}
                    className="flex-1 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                </div>

                <select
                  onChange={(e) => changeFontFamily(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  defaultValue={selectedObject.fontFamily}
                >
                  <option value="Arial">Arial</option>
                  <option value="Great Vibes">Great Vibes</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Dancing Script">Dancing Script</option>
                </select>

                <input
                  type="number"
                  value={selectedObject.fontSize}
                  onChange={(e) => changeFontSize(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Font boyutu"
                />
              </>
            )}

            {/* Color Picker */}
            <div>
              <label className="text-sm font-semibold text-gray-600">Renk</label>
              <input
                type="color"
                value={selectedObject.fill || '#000000'}
                onChange={(e) => changeColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Background */}
        <div className="space-y-2 pt-4 border-t">
          <p className="text-sm font-semibold text-gray-600">Arka Plan</p>
          <input
            type="color"
            value={canvas?.backgroundColor || '#ffffff'}
            onChange={(e) => changeBackgroundColor(e.target.value)}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        {/* Export */}
        <div className="space-y-2 pt-4 border-t">
          <button
            onClick={downloadImage}
            className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            PNG İndir
          </button>
          <button
            onClick={exportDesign}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            Tasarımı Kaydet
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gray-100 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Tasarım Alanı ({size})</h3>
          <div className="flex gap-2">
            <button
              onClick={zoomOut}
              className="p-2 bg-white rounded hover:bg-gray-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2 bg-white rounded hover:bg-gray-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-auto">
          <div className="shadow-2xl">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasInvitationEditor;
