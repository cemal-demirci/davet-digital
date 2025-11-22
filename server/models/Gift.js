const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  name: String,
  description: String,
  price: Number,
  link: String,
  reserved: { type: Boolean, default: false },
  reservedBy: String,
  createdAt: { type: Date, default: Date.now }
});

giftSchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model('Gift', giftSchema);
