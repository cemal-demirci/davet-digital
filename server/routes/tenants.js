const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');

// Easter egg: Reserved name for special someone :)
const RESERVED_EASTER_EGG_NAME = 'pervin';

// Create new tenant (sign up)
router.post('/register', async (req, res) => {
  try {
    const { ownerName, ownerEmail, ownerPhone, coupleNames, weddingDate, slug, plan } = req.body;

    // Check if email already exists
    const existingTenant = await Tenant.findOne({ ownerEmail });
    if (existingTenant) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor.' });
    }

    // Check if slug already exists
    const existingSlug = await Tenant.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ error: 'Bu site adresi zaten kullanılıyor. Lütfen başka bir adres seçin.' });
    }

    // Easter egg: Block anything containing "pervin"
    if (slug.includes(RESERVED_EASTER_EGG_NAME)) {
      return res.status(400).json({
        error: 'Bu alan sonsuza kadar rezerve edilmiştir. 💕'
      });
    }

    // Create tenant
    const tenant = await Tenant.create({
      ownerName,
      ownerEmail,
      ownerPhone,
      coupleNames,
      weddingDate,
      slug,
      plan: plan || 'temel',
      subscriptionStatus: 'trial',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days trial
    });

    res.json({
      message: 'Düğün siteniz oluşturuldu!',
      tenant: {
        id: tenant._id,
        slug: tenant.slug,
        coupleNames: tenant.coupleNames,
        plan: tenant.plan,
        trialEndDate: tenant.subscriptionEndDate
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tenant by slug
router.get('/:slug', async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug, isActive: true });

    if (!tenant) {
      return res.status(404).json({ error: 'Düğün sitesi bulunamadı.' });
    }

    res.json({
      id: tenant._id,
      coupleNames: tenant.coupleNames,
      weddingDate: tenant.weddingDate,
      slug: tenant.slug,
      customDomain: tenant.customDomain,
      plan: tenant.plan,
      features: tenant.features,
      language: tenant.language
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tenant
router.put('/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upgrade plan
router.post('/:id/upgrade', async (req, res) => {
  try {
    const { plan } = req.body;
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    tenant.plan = plan;
    tenant.subscriptionStatus = 'active';
    await tenant.save();

    res.json({
      message: 'Paketiniz güncellendi!',
      tenant: {
        plan: tenant.plan,
        features: tenant.features,
        limits: tenant.limits
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check slug availability
router.get('/check-slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    // Check if slug already exists
    const existing = await Tenant.findOne({ slug });
    if (existing) {
      return res.json({ available: false, reason: 'Bu site adresi zaten kullanılıyor.' });
    }

    // Easter egg: Block anything containing "pervin"
    if (slug.includes(RESERVED_EASTER_EGG_NAME)) {
      return res.json({
        available: false,
        reason: 'Bu alan sonsuza kadar rezerve edilmiştir. 💕'
      });
    }

    res.json({ available: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
