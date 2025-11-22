const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  title: String,
  time: String,
  description: String,
  icon: String,
  order: Number
});

timelineSchema.index({ tenantId: 1, order: 1 });

module.exports = mongoose.model('Timeline', timelineSchema);
