const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  guestName: String,
  email: String,
  phone: String,
  attendance: { type: String, enum: ['yes', 'no', 'maybe'], default: 'maybe' },
  guestCount: { type: Number, default: 1 },
  dietaryRestrictions: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

rsvpSchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model('RSVP', rsvpSchema);
