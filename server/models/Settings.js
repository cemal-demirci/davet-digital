const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

  coupleNames: { type: String, default: 'Cemal & [Partner Name]' },
  mainDate: Date,
  engagementDate: Date,
  storyTitle: String,
  storyText: String,
  musicUrl: String,
  password: String,
  isPasswordProtected: { type: Boolean, default: false },
  theme: { type: String, default: 'romantic-rose' },

  guestUploadEnabled: { type: Boolean, default: true },
  giftListEnabled: { type: Boolean, default: false },
  rsvpEnabled: { type: Boolean, default: true },
  guestMessagesEnabled: { type: Boolean, default: true },
  liveWallEnabled: { type: Boolean, default: true },
  liveWallShowAdminPhotos: { type: Boolean, default: true },
  liveWallShowGuestPhotos: { type: Boolean, default: false },
  guestGalleryAccessCode: { type: String, default: '' },

  venueAddress: String,
  venueName: String,
  venueMapUrl: String,
  venueLatitude: Number,
  venueLongitude: Number,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for tenant-based queries
settingsSchema.index({ tenantId: 1 });

module.exports = mongoose.model('Settings', settingsSchema);
