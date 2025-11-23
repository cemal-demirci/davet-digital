const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
const Tenant = require('../models/Tenant');
const Settings = require('../models/Settings');

// Middleware to verify super admin
const verifySuperAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await SuperAdmin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ error: 'Geçersiz token' });
    }

    req.superAdmin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Kimlik doğrulama hatası' });
  }
};

// Super Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find super admin
    const admin = await SuperAdmin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      // Log failed attempt
      admin.loginAttempts.push({
        timestamp: new Date(),
        success: false,
        ip: req.ip
      });
      await admin.save();

      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    // Update last login and log successful attempt
    admin.lastLogin = new Date();
    admin.loginAttempts.push({
      timestamp: new Date(),
      success: true,
      ip: req.ip
    });
    await admin.save();

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'super-admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Super admin login error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Get platform stats
router.get('/stats', verifySuperAdmin, async (req, res) => {
  try {
    const totalUsers = await Tenant.countDocuments();
    const totalInvitations = await Settings.countDocuments();

    // Calculate total revenue (örnek - gerçek değerler DB'den gelmeli)
    const totalRevenue = 45000;

    // Active events (son 30 gün)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeEvents = await Tenant.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Recent activity
    const recentUsers = await Tenant.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username createdAt eventType');

    const recentActivity = recentUsers.map(user => ({
      description: `${user.username} yeni bir ${user.eventType || 'wedding'} sitesi oluşturdu`,
      time: formatTimeAgo(user.createdAt)
    }));

    res.json({
      totalUsers,
      totalInvitations,
      totalRevenue,
      activeEvents,
      recentActivity
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'İstatistikler yüklenemedi' });
  }
});

// Get all users
router.get('/users', verifySuperAdmin, async (req, res) => {
  try {
    const users = await Tenant.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Kullanıcılar yüklenemedi' });
  }
});

// Get all invitations
router.get('/invitations', verifySuperAdmin, async (req, res) => {
  try {
    const invitations = await Settings.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(invitations);
  } catch (error) {
    console.error('Get invitations error:', error);
    res.status(500).json({ error: 'Davetiyeler yüklenemedi' });
  }
});

// Delete user
router.delete('/users/:userId', verifySuperAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete user and all related data
    await Tenant.findByIdAndDelete(userId);
    await Settings.deleteMany({ tenantId: userId });

    res.json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Kullanıcı silinemedi' });
  }
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'Az önce';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika önce`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} gün önce`;
  return date.toLocaleDateString('tr-TR');
}

module.exports = router;
