const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { sendWelcomeEmail } = require('../utils/emailService');

// Easter egg: Reserved name for special someone :)
const RESERVED_EASTER_EGG_NAME = 'pervin';

// Create new tenant (sign up)
router.post('/register', async (req, res) => {
  try {
    const {
      ownerName,
      ownerEmail,
      ownerPhone,
      username,
      password,
      eventType,
      // Wedding fields
      coupleNames,
      weddingDate,
      // Engagement fields
      partnerNames,
      engagementDate,
      // Corporate fields
      companyName,
      eventName,
      eventDate,
      eventType_detail,
      organizerName,
      organizerTitle,
      // Circumcision fields
      childName,
      circumcisionDate,
      parentNames,
      // Birthday fields
      celebrantName,
      birthDate,
      age,
      // Graduation fields
      graduateName,
      graduationDate,
      school,
      degree,
      // Baby Shower fields
      parentNames_baby,
      expectedDate,
      babyGender,
      // Common fields
      slug,
      plan
    } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır.' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Kullanıcı adı en az 3 karakter olmalıdır.' });
    }

    // Check if email already exists
    const existingTenant = await Tenant.findOne({ ownerEmail });
    if (existingTenant) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor.' });
    }

    // Check if username already exists
    const existingUsername = await Tenant.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanılıyor.' });
    }

    // Check if slug already exists
    const existingSlug = await Tenant.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ error: 'Bu site adresi zaten kullanılıyor. Lütfen başka bir adres seçin.' });
    }

    // Easter egg: Block anything containing "pervin" (case insensitive)
    if (slug.toLowerCase().includes(RESERVED_EASTER_EGG_NAME)) {
      return res.status(400).json({
        error: 'Bu alan sonsuza kadar rezerve edilmiştir. 💕'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine role based on event type and plan
    let role = 'user';
    if (eventType === 'corporate') {
      role = 'corporate_admin';
    }

    // Build tenant data based on event type
    const tenantData = {
      ownerName,
      ownerEmail,
      ownerPhone,
      username: username.toLowerCase(),
      password: hashedPassword,
      role,
      eventType: eventType || 'wedding',
      slug,
      plan: plan || 'temel',
      subscriptionStatus: 'trial',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days trial
    };

    // Add event-specific fields
    if (eventType === 'wedding') {
      tenantData.coupleNames = coupleNames;
      tenantData.weddingDate = weddingDate;
    } else if (eventType === 'engagement') {
      tenantData.partnerNames = partnerNames;
      tenantData.engagementDate = engagementDate;
    } else if (eventType === 'corporate') {
      tenantData.companyName = companyName;
      tenantData.eventName = eventName;
      tenantData.eventDate = eventDate;
      tenantData.eventType_detail = eventType_detail;
      tenantData.organizerName = organizerName;
      tenantData.organizerTitle = organizerTitle;
    } else if (eventType === 'circumcision') {
      tenantData.childName = childName;
      tenantData.circumcisionDate = circumcisionDate;
      tenantData.parentNames = parentNames;
    } else if (eventType === 'birthday') {
      tenantData.celebrantName = celebrantName;
      tenantData.birthDate = birthDate;
      tenantData.age = age;
    } else if (eventType === 'graduation') {
      tenantData.graduateName = graduateName;
      tenantData.graduationDate = graduationDate;
      tenantData.school = school;
      tenantData.degree = degree;
    } else if (eventType === 'baby-shower') {
      tenantData.parentNames_baby = parentNames_baby;
      tenantData.expectedDate = expectedDate;
      tenantData.babyGender = babyGender;
    }

    // Create tenant
    const tenant = await Tenant.create(tenantData);

    // Build success message based on event type
    const eventMessages = {
      wedding: 'Düğün siteniz oluşturuldu!',
      engagement: 'Nişan siteniz oluşturuldu!',
      corporate: 'Kurumsal etkinlik siteniz oluşturuldu!',
      circumcision: 'Sünnet siteniz oluşturuldu!',
      birthday: 'Doğum günü siteniz oluşturuldu!',
      graduation: 'Mezuniyet siteniz oluşturuldu!',
      'baby-shower': 'Baby shower siteniz oluşturuldu!'
    };
    const successMessage = eventMessages[eventType] || 'Hesabınız oluşturuldu!';

    // Send welcome email (async, don't wait for it)
    sendWelcomeEmail(ownerEmail, username, eventType).catch(err => {
      console.error('Failed to send welcome email:', err);
      // Don't fail the registration if email fails
    });

    res.json({
      message: successMessage,
      tenant: {
        id: tenant._id,
        slug: tenant.slug,
        username: tenant.username,
        eventType: tenant.eventType,
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

    // Easter egg: Block anything containing "pervin" (case insensitive)
    if (slug.toLowerCase().includes(RESERVED_EASTER_EGG_NAME)) {
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
