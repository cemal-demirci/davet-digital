const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  // Owner information
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  ownerPhone: String,

  // Authentication
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: {
    type: String,
    enum: ['user', 'corporate_admin', 'super_admin'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,

  // Subscription information
  plan: {
    type: String,
    enum: ['temel', 'premium', 'platinum'],
    default: 'temel'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'trial', 'expired'],
    default: 'trial'
  },
  subscriptionStartDate: { type: Date, default: Date.now },
  subscriptionEndDate: Date,

  // Event Type
  eventType: {
    type: String,
    enum: ['wedding', 'engagement', 'corporate', 'circumcision', 'birthday', 'graduation', 'baby-shower'],
    default: 'wedding',
    required: true
  },

  // Wedding information
  coupleNames: String,
  weddingDate: Date,

  // Corporate Event information
  companyName: String,
  eventName: String, // e.g., "Annual Gala 2024", "Product Launch"
  eventDate: Date,
  eventType_detail: String, // e.g., "Conference", "Gala", "Product Launch", "Team Building"
  organizerName: String,
  organizerTitle: String,
  companyLogo: String, // URL to logo

  // Circumcision Event information
  childName: String,
  circumcisionDate: Date,
  parentNames: String,

  // Engagement Event information
  partnerNames: String, // For engagement
  engagementDate: Date,

  // Birthday Event information
  celebrantName: String,
  birthDate: Date,
  age: Number,

  // Graduation Event information
  graduateName: String,
  graduationDate: Date,
  school: String,
  degree: String,

  // Baby Shower information
  parentNames_baby: String,
  expectedDate: Date,
  babyGender: String, // 'boy', 'girl', 'surprise'

  // Common fields
  slug: { type: String, unique: true, required: true }, // URL slug (e.g., ayse-mehmet-2024 or abc-corp-gala-2024)
  customDomain: String, // For premium/platinum plans

  // Plan limits
  limits: {
    maxGuests: { type: Number, default: 50 }, // Based on plan
    maxPhotos: { type: Number, default: 100 }, // Based on plan
    maxStorage: { type: Number, default: 500 }, // MB
    accessDays: { type: Number, default: 30 } // How long they have access
  },

  // Usage tracking
  usage: {
    totalGuests: { type: Number, default: 0 },
    totalPhotos: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 } // MB
  },

  // Features enabled (based on plan)
  features: {
    qrCodeUpload: { type: Boolean, default: false },
    livePhotoWall: { type: Boolean, default: false },
    customDomain: { type: Boolean, default: false },
    multiLanguage: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    prioritySupport: { type: Boolean, default: false },
    videoIntegration: { type: Boolean, default: false },
    seoOptimization: { type: Boolean, default: false },
    whiteLabel: { type: Boolean, default: false }
  },

  // Settings
  isActive: { type: Boolean, default: true },
  language: { type: String, default: 'tr' },

  // Google Drive Integration
  googleDrive: {
    enabled: { type: Boolean, default: false },
    refreshToken: String,
    folderName: String,
    lastBackupDate: Date,
    autoBackup: { type: Boolean, default: false }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update plan limits when plan changes
tenantSchema.pre('save', async function() {
  if (this.isModified('plan')) {
    switch(this.plan) {
      case 'temel':
        this.limits.maxGuests = 50;
        this.limits.maxPhotos = 100;
        this.limits.maxStorage = 500;
        this.limits.accessDays = 30;
        this.features = {
          qrCodeUpload: false,
          livePhotoWall: false,
          customDomain: false,
          multiLanguage: false,
          analytics: false,
          prioritySupport: false,
          videoIntegration: false,
          seoOptimization: false,
          whiteLabel: false
        };
        break;
      case 'premium':
        this.limits.maxGuests = 200;
        this.limits.maxPhotos = -1; // unlimited
        this.limits.maxStorage = 2000;
        this.limits.accessDays = 90;
        this.features = {
          qrCodeUpload: true,
          livePhotoWall: true,
          customDomain: true,
          multiLanguage: false,
          analytics: true,
          prioritySupport: true,
          videoIntegration: false,
          seoOptimization: false,
          whiteLabel: false
        };
        break;
      case 'platinum':
        this.limits.maxGuests = -1; // unlimited
        this.limits.maxPhotos = -1; // unlimited
        this.limits.maxStorage = -1; // unlimited
        this.limits.accessDays = -1; // lifetime
        this.features = {
          qrCodeUpload: true,
          livePhotoWall: true,
          customDomain: true,
          multiLanguage: true,
          analytics: true,
          prioritySupport: true,
          videoIntegration: true,
          seoOptimization: true,
          whiteLabel: true
        };
        break;
    }
  }
  this.updatedAt = Date.now();
});

// Index for faster lookups
tenantSchema.index({ slug: 1 });
tenantSchema.index({ customDomain: 1 });
tenantSchema.index({ ownerEmail: 1 });
tenantSchema.index({ username: 1 });

module.exports = mongoose.model('Tenant', tenantSchema);
