const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  name: String,
  date: Date,
  location: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

eventSchema.index({ tenantId: 1, date: 1 });

module.exports = mongoose.model('Event', eventSchema);
