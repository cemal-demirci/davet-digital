const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const InvitationTemplate = require('../models/InvitationTemplate');
const InvitationPricing = require('../models/InvitationPricing');
const { tenantResolver, requireTenant } = require('../middleware/tenantResolver');
const QRCode = require('qrcode');
// TEMPORARILY DISABLED: Puppeteer dependency removed for Vercel deployment
// const { generateDigitalPDF, generatePrintPDF } = require('../services/pdfGenerator');

// Apply tenant resolver to all routes
router.use(tenantResolver);

// Get all templates (public)
router.get('/templates', async (req, res) => {
  try {
    const { category, isPremium } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;
    if (isPremium !== undefined) query.isPremium = isPremium === 'true';

    const templates = await InvitationTemplate.find(query)
      .select('-design.textSections.content -design.imageSections.url') // Don't send full design data
      .sort({ usageCount: -1, createdAt: -1 });

    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single template details
router.get('/templates/:id', async (req, res) => {
  try {
    const template = await InvitationTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Increment usage count (for analytics)
    template.usageCount += 1;
    await template.save();

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new invitation from template
router.post('/', requireTenant, async (req, res) => {
  try {
    const { templateId, eventInfo, customDesign } = req.body;

    // Get template
    const template = await InvitationTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check if premium template and tenant has access
    if (template.isPremium && req.tenant.plan === 'temel') {
      return res.status(403).json({
        error: 'Bu şablon Premium ve Platinum paketlere özeldir.'
      });
    }

    // Create invitation
    const invitation = new Invitation({
      tenantId: req.tenantId,
      templateId,
      customDesign: customDesign || template.design, // Use custom or default
      eventInfo: eventInfo || {
        eventType: req.tenant.eventType,
        names: req.tenant.coupleNames || req.tenant.eventName,
        date: req.tenant.weddingDate || req.tenant.eventDate
      },
      status: 'draft'
    });

    // Generate slug and URL
    await invitation.generateSlug();

    // Generate QR code for digital invitation
    const qrCodeData = await QRCode.toDataURL(invitation.digital.url);
    invitation.digital.qrCode = qrCodeData;

    await invitation.save();

    res.json({
      message: 'Davetiye oluşturuldu!',
      invitation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tenant's invitations
router.get('/my-invitations', requireTenant, async (req, res) => {
  try {
    const invitations = await Invitation.find({ tenantId: req.tenantId })
      .populate('templateId', 'name thumbnail category')
      .sort({ updatedAt: -1 });

    res.json(invitations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single invitation
router.get('/:id', requireTenant, async (req, res) => {
  try {
    const invitation = await Invitation.findOne({
      _id: req.params.id,
      tenantId: req.tenantId
    }).populate('templateId');

    if (!invitation) {
      return res.status(404).json({ error: 'Davetiye bulunamadı' });
    }

    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update invitation design
router.put('/:id', requireTenant, async (req, res) => {
  try {
    const { customDesign, eventInfo, status } = req.body;

    const invitation = await Invitation.findOne({
      _id: req.params.id,
      tenantId: req.tenantId
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Davetiye bulunamadı' });
    }

    // Update fields
    if (customDesign) invitation.customDesign = customDesign;
    if (eventInfo) invitation.eventInfo = eventInfo;
    if (status) invitation.status = status;

    invitation.version += 1;
    await invitation.save();

    res.json({
      message: 'Davetiye güncellendi',
      invitation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete invitation
router.delete('/:id', requireTenant, async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Davetiye bulunamadı' });
    }

    res.json({ message: 'Davetiye silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active pricing
router.get('/pricing', async (req, res) => {
  try {
    let pricing = await InvitationPricing.findOne({ isActive: true });

    if (!pricing) {
      // Create default pricing if none exists
      pricing = await InvitationPricing.create({
        name: 'Default Pricing',
        isActive: true,
        quantityDiscounts: [
          { minQuantity: 500, discountPercentage: 30 },
          { minQuantity: 200, discountPercentage: 20 },
          { minQuantity: 100, discountPercentage: 10 },
          { minQuantity: 50, discountPercentage: 5 }
        ],
        shippingCosts: [
          { minQuantity: 1, maxQuantity: 100, cost: 30 },
          { minQuantity: 101, maxQuantity: 300, cost: 50 },
          { minQuantity: 301, cost: 75 }
        ]
      });
    }

    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update pricing (Admin only)
router.put('/pricing', async (req, res) => {
  try {
    let pricing = await InvitationPricing.findOne({ isActive: true });

    if (!pricing) {
      // Create new pricing
      pricing = await InvitationPricing.create({
        ...req.body,
        isActive: true
      });
    } else {
      // Update existing pricing
      Object.assign(pricing, req.body);
      pricing.isActive = true;
      await pricing.save();
    }

    res.json({
      message: 'Fiyatlandırma güncellendi',
      pricing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate price preview
router.post('/pricing/calculate', async (req, res) => {
  try {
    const pricing = await InvitationPricing.findOne({ isActive: true });

    if (!pricing) {
      return res.status(404).json({ error: 'Fiyatlandırma bulunamadı' });
    }

    const calculatedPrice = pricing.calculatePrice(req.body);
    res.json(calculatedPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create print order
router.post('/:id/print-order', requireTenant, async (req, res) => {
  try {
    const {
      paperType,
      finish,
      quantity,
      size,
      customSize,
      envelope,
      shippingAddress
    } = req.body;

    const invitation = await Invitation.findOne({
      _id: req.params.id,
      tenantId: req.tenantId
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Davetiye bulunamadı' });
    }

    // Get active pricing
    const pricingModel = await InvitationPricing.findOne({ isActive: true });

    if (!pricingModel) {
      return res.status(500).json({ error: 'Fiyatlandırma ayarları bulunamadı' });
    }

    // Validate minimum quantity
    if (!quantity || quantity < pricingModel.minimumOrderQuantity) {
      return res.status(400).json({
        error: `Minimum sipariş adedi ${pricingModel.minimumOrderQuantity}'dur.`
      });
    }

    // Calculate pricing using the model
    const pricing = pricingModel.calculatePrice({
      paperType,
      finish,
      quantity,
      size,
      envelope
    });

    // Update print order
    invitation.print = {
      isOrdered: true,
      paperType,
      finish,
      quantity,
      size,
      customSize,
      envelope,
      orderStatus: 'pending',
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      pricing,
      shippingAddress,
      paymentStatus: 'pending'
    };

    await invitation.save();

    res.json({
      message: 'Baskı siparişi oluşturuldu',
      invitation,
      pricing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get public invitation (for viewing)
router.get('/view/:slug', async (req, res) => {
  try {
    const invitation = await Invitation.findOne({
      'digital.slug': req.params.slug,
      'digital.isEnabled': true,
      status: 'active'
    }).populate('templateId');

    if (!invitation) {
      return res.status(404).json({ error: 'Davetiye bulunamadı' });
    }

    // Increment view count
    invitation.digital.viewCount += 1;
    await invitation.save();

    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download digital PDF
// TEMPORARILY DISABLED: PDF generation requires Puppeteer
router.get('/:id/download-pdf', requireTenant, async (req, res) => {
  return res.status(503).json({
    error: 'PDF indirme özelliği geçici olarak devre dışı. Lütfen daha sonra tekrar deneyin.'
  });
});

// Download print-ready PDF
// TEMPORARILY DISABLED: PDF generation requires Puppeteer
router.get('/:id/download-print-pdf', requireTenant, async (req, res) => {
  return res.status(503).json({
    error: 'PDF indirme özelliği geçici olarak devre dışı. Lütfen daha sonra tekrar deneyin.'
  });
});

// Preview PDF in browser (no download)
// TEMPORARILY DISABLED: PDF generation requires Puppeteer
router.get('/:id/preview-pdf', requireTenant, async (req, res) => {
  return res.status(503).json({
    error: 'PDF önizleme özelliği geçici olarak devre dışı. Lütfen daha sonra tekrar deneyin.'
  });
});

module.exports = router;
