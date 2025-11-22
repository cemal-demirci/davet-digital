const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  title: String,
  description: String,
  url: String,
  category: String,
  uploadDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [String], // IP veya session ID'leri
  comments: [{
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

photoSchema.index({ tenantId: 1, uploadDate: -1 });

module.exports = mongoose.model('Photo', photoSchema);
