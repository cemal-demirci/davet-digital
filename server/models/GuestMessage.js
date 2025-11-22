const mongoose = require('mongoose');

const guestMessageSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  guestName: String,
  message: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

guestMessageSchema.index({ tenantId: 1, createdAt: -1 });
guestMessageSchema.index({ tenantId: 1, approved: 1 });

module.exports = mongoose.model('GuestMessage', guestMessageSchema);
