const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  code: { type: String, unique: true },
  name: String,
  tableNumber: String,
  isTableQR: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  usedCount: { type: Number, default: 0 }
});

qrCodeSchema.index({ tenantId: 1, createdAt: -1 });
qrCodeSchema.index({ code: 1 }, { unique: true });

module.exports = mongoose.model('QRCode', qrCodeSchema);
