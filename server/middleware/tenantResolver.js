const Tenant = require('../models/Tenant');

/**
 * Middleware to resolve tenant from subdomain, custom domain, or slug
 * Tenant can be identified by:
 * 1. Custom domain (premium/platinum feature)
 * 2. Subdomain (e.g., ayse-mehmet.dugunsitesipro.com)
 * 3. Slug in URL path (e.g., /site/ayse-mehmet-2024)
 * 4. tenantId header (for testing/admin purposes)
 */
const tenantResolver = async (req, res, next) => {
  try {
    let tenant = null;

    // 1. Check for tenant ID in header (for testing)
    if (req.headers['x-tenant-id']) {
      tenant = await Tenant.findById(req.headers['x-tenant-id']);
    }

    // 2. Check for custom domain
    if (!tenant) {
      const host = req.get('host');
      if (host && !host.includes('localhost')) {
        tenant = await Tenant.findOne({ customDomain: host, isActive: true });
      }
    }

    // 3. Check for subdomain (e.g., ayse-mehmet.dugunsitesipro.com)
    if (!tenant) {
      const host = req.get('host');
      const subdomain = host?.split('.')[0];
      if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
        tenant = await Tenant.findOne({ slug: subdomain, isActive: true });
      }
    }

    // 4. Check for slug in URL path
    if (!tenant && req.params.slug) {
      tenant = await Tenant.findOne({ slug: req.params.slug, isActive: true });
    }

    // 5. Check for slug in query parameter
    if (!tenant && req.query.slug) {
      tenant = await Tenant.findOne({ slug: req.query.slug, isActive: true });
    }

    // If tenant found, attach to request
    if (tenant) {
      // Check if subscription is active
      if (tenant.subscriptionStatus === 'expired') {
        return res.status(403).json({
          error: 'Subscription expired',
          message: 'Bu düğün sitesinin aboneliği sona ermiştir.'
        });
      }

      req.tenant = tenant;
      req.tenantId = tenant._id;
    }

    // For development on localhost: create/use demo tenant if none found
    if (!tenant && req.get('host')?.includes('localhost')) {
      try {
        let demoTenant = await Tenant.findOne({ slug: 'demo' });
        if (!demoTenant) {
          // Create default demo tenant with all features
          demoTenant = await Tenant.create({
            slug: 'demo',
            ownerEmail: 'demo@davet.digital',
            package: 'platinum',
            subscriptionStatus: 'active',
            features: {
              customDomain: true,
              rsvpManagement: true,
              photoGallery: true,
              livePhotoWall: true,
              guestMessages: true,
              eventTimeline: true,
              giftRegistry: true,
              qrCodeUpload: true,
              emailNotifications: true,
              analytics: true,
              customThemes: true
            },
            limits: {
              maxGuests: -1,
              maxPhotos: -1,
              maxStorage: -1
            }
          });
        }
        req.tenant = demoTenant;
        req.tenantId = demoTenant._id;
      } catch (error) {
        console.error('Error creating/finding demo tenant:', error);
      }
    }

    next();
  } catch (error) {
    console.error('Tenant resolution error:', error);
    next(error);
  }
};

/**
 * Middleware to require tenant (fails if no tenant found)
 */
const requireTenant = (req, res, next) => {
  if (!req.tenant) {
    return res.status(400).json({
      error: 'Tenant not found',
      message: 'Düğün sitesi bulunamadı. Lütfen geçerli bir bağlantı kullanın.'
    });
  }
  next();
};

/**
 * Middleware to check if tenant has a specific feature enabled
 */
const requireFeature = (featureName) => {
  return (req, res, next) => {
    if (!req.tenant) {
      return res.status(400).json({
        error: 'Tenant not found'
      });
    }

    if (!req.tenant.features[featureName]) {
      return res.status(403).json({
        error: 'Feature not available',
        message: `Bu özellik mevcut paketinizde bulunmamaktadır. Lütfen paketinizi yükseltin.`,
        requiredFeature: featureName
      });
    }

    next();
  };
};

/**
 * Middleware to check tenant limits
 */
const checkLimit = (limitType) => {
  return async (req, res, next) => {
    if (!req.tenant) {
      return res.status(400).json({ error: 'Tenant not found' });
    }

    const limit = req.tenant.limits[limitType];
    const usage = req.tenant.usage[limitType.replace('max', 'total')];

    // -1 means unlimited
    if (limit !== -1 && usage >= limit) {
      return res.status(403).json({
        error: 'Limit exceeded',
        message: `${limitType} limitine ulaştınız. Lütfen paketinizi yükseltin.`,
        limit,
        usage
      });
    }

    next();
  };
};

module.exports = {
  tenantResolver,
  requireTenant,
  requireFeature,
  checkLimit
};
