const mongoose = require('mongoose');

const invitationTemplateSchema = new mongoose.Schema({
  // Template metadata
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['wedding', 'engagement', 'corporate', 'circumcision', 'birthday', 'graduation', 'baby-shower', 'general'],
    default: 'general'
  },
  isPremium: {
    type: Boolean,
    default: false
  },

  // Template design configuration
  layout: {
    type: String,
    enum: ['classic', 'modern', 'elegant', 'minimal', 'floral', 'geometric', 'vintage'],
    default: 'classic'
  },
  orientation: {
    type: String,
    enum: ['portrait', 'landscape', 'square'],
    default: 'portrait'
  },
  size: {
    width: { type: Number, default: 1080 }, // px for digital
    height: { type: Number, default: 1920 }
  },

  // Design elements
  design: {
    // Background
    background: {
      type: {
        type: String,
        enum: ['solid', 'gradient', 'image', 'pattern'],
        default: 'gradient'
      },
      color: String, // Single color or gradient colors
      gradient: {
        from: String,
        via: String,
        to: String,
        direction: { type: String, default: 'to bottom' }
      },
      image: String, // URL to background image
      opacity: { type: Number, default: 1, min: 0, max: 1 }
    },

    // Text sections
    textSections: [{
      id: String,
      type: {
        type: String,
        enum: ['title', 'subtitle', 'names', 'date', 'time', 'location', 'message', 'custom']
      },
      content: String, // Default content
      position: {
        x: mongoose.Schema.Types.Mixed, // % or px (string or number)
        y: mongoose.Schema.Types.Mixed,
        align: { type: String, enum: ['left', 'center', 'right'], default: 'center' }
      },
      style: {
        fontFamily: { type: String, default: 'Great Vibes' },
        fontSize: { type: Number, default: 24 },
        fontWeight: { type: String, default: 'normal' },
        color: { type: String, default: '#ffffff' },
        textShadow: String,
        letterSpacing: Number,
        lineHeight: Number
      },
      editable: { type: Boolean, default: true }
    }],

    // Image sections
    imageSections: [{
      id: String,
      type: { type: String, enum: ['photo', 'logo', 'decoration', 'divider'] },
      url: String, // Default image URL
      position: {
        x: mongoose.Schema.Types.Mixed,
        y: mongoose.Schema.Types.Mixed,
        width: mongoose.Schema.Types.Mixed,
        height: mongoose.Schema.Types.Mixed
      },
      style: {
        borderRadius: Number,
        border: String,
        opacity: { type: Number, default: 1 },
        filter: String // CSS filter
      },
      editable: { type: Boolean, default: true }
    }],

    // Decorative elements
    decorations: [{
      id: String,
      type: { type: String, enum: ['shape', 'icon', 'border', 'frame'] },
      element: String, // SVG path or icon name
      position: {
        x: mongoose.Schema.Types.Mixed,
        y: mongoose.Schema.Types.Mixed,
        width: mongoose.Schema.Types.Mixed,
        height: mongoose.Schema.Types.Mixed,
        rotation: { type: Number, default: 0 }
      },
      style: {
        color: String,
        opacity: { type: Number, default: 1 }
      }
    }]
  },

  // Customization options available
  customizableFields: [{
    field: String, // Which field can be customized
    label: String, // Display label
    type: { type: String, enum: ['text', 'color', 'image', 'font', 'number'] },
    defaultValue: mongoose.Schema.Types.Mixed,
    options: [mongoose.Schema.Types.Mixed] // Available options (for select fields)
  }],

  // Preview and thumbnail
  thumbnail: String, // URL to template preview image
  previewImages: [String], // Multiple preview angles

  // Metadata
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
invitationTemplateSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('InvitationTemplate', invitationTemplateSchema);
