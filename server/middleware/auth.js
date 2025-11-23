const jwt = require('jsonwebtoken');
const Tenant = require('../models/Tenant');

// JWT Secret (production'da environment variable olmalı)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    const tenant = await Tenant.findById(decoded.id);
    if (!tenant) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    // Attach user to request
    req.user = tenant;
    req.userId = tenant._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Check if user is super admin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Access denied. Super admin only.' });
  }
  next();
};

// Check if user is corporate admin or super admin
const isCorporateAdminOrAbove = (req, res, next) => {
  if (req.user.role !== 'corporate_admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Access denied. Corporate admin access required.' });
  }
  next();
};

module.exports = {
  verifyToken,
  isSuperAdmin,
  isCorporateAdminOrAbove,
  JWT_SECRET
};
