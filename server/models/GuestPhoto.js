const mongoose = require('mongoose');

const guestPhotoSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  url: String,
  guestName: String,
  uploadDate: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
  qrCodeId: String,
  likes: { type: Number, default: 0 },
  likedBy: [String],
  comments: [{
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

guestPhotoSchema.index({ tenantId: 1, uploadDate: -1 });
guestPhotoSchema.index({ tenantId: 1, approved: 1 });

module.exports = mongoose.model('GuestPhoto', guestPhotoSchema);
