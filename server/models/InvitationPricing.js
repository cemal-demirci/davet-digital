const mongoose = require('mongoose');

/**
 * Invitation Pricing Model
 * Allows super admin to set prices for different paper types, finishes, and sizes
 */
const invitationPricingSchema = new mongoose.Schema({
  // Pricing name/description
  name: {
    type: String,
    default: 'Default Pricing'
  },

  // Base prices per unit by size (TRY)
  basePrices: {
    A6: { type: Number, default: 5, min: 0 },
    A5: { type: Number, default: 8, min: 0 },
    A4: { type: Number, default: 12, min: 0 },
    custom: { type: Number, default: 15, min: 0 }
  },

  // Paper type additional costs (TRY per unit)
  paperTypePrices: {
    standard: { type: Number, default: 0, min: 0 },
    premium: { type: Number, default: 2.5, min: 0 },
    luxury: { type: Number, default: 5, min: 0 },
    eco: { type: Number, default: 1, min: 0 }
  },

  // Finish additional costs (TRY per unit)
  finishPrices: {
    matte: { type: Number, default: 0, min: 0 },
    glossy: { type: Number, default: 1, min: 0 },
    silk: { type: Number, default: 1.5, min: 0 },
    textured: { type: Number, default: 2.5, min: 0 }
  },

  // Envelope pricing
  envelopePricing: {
    standard: { type: Number, default: 2, min: 0 },
    premium: { type: Number, default: 3, min: 0 },
    luxury: { type: Number, default: 4, min: 0 }
  },

  // Quantity-based discounts (percentage off)
  quantityDiscounts: [
    {
      minQuantity: { type: Number, required: true },
      discountPercentage: { type: Number, required: true, min: 0, max: 100 }
    }
  ],

  // Shipping costs based on quantity
  shippingCosts: [
    {
      minQuantity: { type: Number, required: true },
      maxQuantity: { type: Number },
      cost: { type: Number, required: true, min: 0 }
    }
  ],

  // Minimum order quantity
  minimumOrderQuantity: {
    type: Number,
    default: 10,
    min: 1
  },

  // Active pricing (only one can be active at a time)
  isActive: {
    type: Boolean,
    default: false
  },

  // VAT percentage
  vatPercentage: {
    type: Number,
    default: 20,
    min: 0,
    max: 100
  },

  // Currency
  currency: {
    type: String,
    default: 'TRY',
    enum: ['TRY', 'USD', 'EUR']
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
invitationPricingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Ensure only one pricing can be active
invitationPricingSchema.pre('save', async function(next) {
  if (this.isActive) {
    await mongoose.model('InvitationPricing').updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

// Method to calculate price for an order
invitationPricingSchema.methods.calculatePrice = function(orderConfig) {
  const { paperType, finish, quantity, size, envelope } = orderConfig;

  // Get base price for size
  let basePrice = this.basePrices[size] || this.basePrices.A6;

  // Add paper type cost
  basePrice += this.paperTypePrices[paperType] || 0;

  // Add finish cost
  basePrice += this.finishPrices[finish] || 0;

  // Calculate subtotal before discount
  let subtotal = basePrice * quantity;

  // Apply quantity discount
  let discount = 0;
  const applicableDiscount = this.quantityDiscounts
    .filter(d => quantity >= d.minQuantity)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

  if (applicableDiscount) {
    discount = (subtotal * applicableDiscount.discountPercentage) / 100;
  }

  const discountedTotal = subtotal - discount;

  // Calculate envelope cost
  let envelopeCost = 0;
  if (envelope?.included) {
    const envelopeType = envelope.type || 'standard';
    envelopeCost = (this.envelopePricing[envelopeType] || this.envelopePricing.standard) * quantity;
  }

  // Calculate shipping cost
  let shippingCost = 0;
  const applicableShipping = this.shippingCosts
    .filter(s => {
      const meetsMin = quantity >= s.minQuantity;
      const meetsMax = !s.maxQuantity || quantity <= s.maxQuantity;
      return meetsMin && meetsMax;
    })
    .sort((a, b) => b.minQuantity - a.minQuantity)[0];

  if (applicableShipping) {
    shippingCost = applicableShipping.cost;
  }

  // Calculate total
  const totalBeforeVAT = discountedTotal + envelopeCost + shippingCost;
  const vat = (totalBeforeVAT * this.vatPercentage) / 100;
  const total = totalBeforeVAT + vat;

  return {
    basePrice: basePrice.toFixed(2),
    quantity,
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    discountPercentage: applicableDiscount?.discountPercentage || 0,
    discountedTotal: discountedTotal.toFixed(2),
    envelopeCost: envelopeCost.toFixed(2),
    shippingCost: shippingCost.toFixed(2),
    totalBeforeVAT: totalBeforeVAT.toFixed(2),
    vat: vat.toFixed(2),
    vatPercentage: this.vatPercentage,
    total: total.toFixed(2),
    currency: this.currency
  };
};

module.exports = mongoose.model('InvitationPricing', invitationPricingSchema);
