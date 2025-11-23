const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  // Tenant/Owner
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },

  // Template reference
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvitationTemplate',
    required: true
  },

  // Customized design (merged with template)
  customDesign: {
    // All the same fields as template.design
    // This allows complete customization while preserving template
    background: {
      type: { type: String },
      color: String,
      gradient: {
        from: String,
        via: String,
        to: String,
        direction: String
      },
      image: String,
      opacity: Number
    },

    textSections: [{
      id: String,
      type: String,
      content: String, // Actual user content
      position: {
        x: Number,
        y: Number,
        align: String
      },
      style: {
        fontFamily: String,
        fontSize: Number,
        fontWeight: String,
        color: String,
        textShadow: String,
        letterSpacing: Number,
        lineHeight: Number
      }
    }],

    imageSections: [{
      id: String,
      type: String,
      url: String, // User's uploaded image
      position: {
        x: Number,
        y: Number,
        width: Number,
        height: Number
      },
      style: {
        borderRadius: Number,
        border: String,
        opacity: Number,
        filter: String
      }
    }],

    decorations: [{
      id: String,
      type: String,
      element: String,
      position: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        rotation: Number
      },
      style: {
        color: String,
        opacity: Number
      }
    }]
  },

  // Event information (auto-populated from tenant)
  eventInfo: {
    eventType: String,
    names: String, // Couple names, child name, etc.
    date: Date,
    time: String,
    location: {
      name: String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    additionalInfo: String
  },

  // Digital invitation settings
  digital: {
    isEnabled: { type: Boolean, default: true },
    url: String, // Unique URL for this invitation
    slug: String, // URL-friendly identifier
    qrCode: String, // QR code data URL
    shareLinks: {
      whatsapp: String,
      email: String,
      sms: String
    },
    viewCount: { type: Number, default: 0 },
    rsvpEnabled: { type: Boolean, default: true }
  },

  // Print order settings
  print: {
    isOrdered: { type: Boolean, default: false },
    paperType: {
      type: String,
      enum: ['standard', 'premium', 'luxury', 'eco'],
      default: 'standard'
    },
    finish: {
      type: String,
      enum: ['matte', 'glossy', 'silk', 'textured'],
      default: 'matte'
    },
    quantity: { type: Number, default: 0 },
    size: {
      type: String,
      enum: ['A6', 'A5', 'A4', 'custom'],
      default: 'A6'
    },
    customSize: {
      width: Number, // mm
      height: Number
    },
    envelope: {
      included: { type: Boolean, default: false },
      type: String,
      color: String
    },

    // Order details
    orderStatus: {
      type: String,
      enum: ['draft', 'pending', 'confirmed', 'printing', 'shipped', 'delivered', 'cancelled'],
      default: 'draft'
    },
    orderDate: Date,
    estimatedDelivery: Date,
    actualDelivery: Date,
    trackingNumber: String,

    // Pricing
    pricing: {
      basePrice: Number,
      paperUpgrade: Number,
      envelopePrice: Number,
      shippingPrice: Number,
      total: Number,
      currency: { type: String, default: 'TRY' }
    },

    // Shipping address
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: 'TR' }
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending'
    },
    paymentMethod: String,
    paymentDate: Date,
    transactionId: String
  },

  // Generated files
  files: {
    digitalPdf: String, // URL to digital version PDF
    printPdf: String, // URL to print-ready PDF (high-res)
    preview: String, // URL to preview image
    thumbnail: String
  },

  // Status and metadata
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'draft'
  },
  version: { type: Number, default: 1 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
invitationSchema.index({ tenantId: 1, status: 1 });
invitationSchema.index({ 'digital.slug': 1 }, { unique: true, sparse: true });

// Update timestamp on save
invitationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Generate unique slug for digital invitation
invitationSchema.methods.generateSlug = function() {
  const crypto = require('crypto');
  const randomStr = crypto.randomBytes(4).toString('hex');
  this.digital.slug = `${this.tenantId.toString().slice(-6)}-${randomStr}`;
  this.digital.url = `${process.env.CLIENT_URL}/invitation/${this.digital.slug}`;
};

module.exports = mongoose.model('Invitation', invitationSchema);
