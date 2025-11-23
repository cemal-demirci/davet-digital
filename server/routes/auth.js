const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Tenant = require('../models/Tenant');
const SuperAdmin = require('../models/SuperAdmin');
const { JWT_SECRET, verifyToken } = require('../middleware/auth');
const { sendPasswordResetEmail } = require('../utils/emailService');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username
    const tenant = await Tenant.findOne({ username: username.toLowerCase() });
    if (!tenant) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, tenant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if account is active
    if (!tenant.isActive) {
      return res.status(403).json({ error: 'Account is inactive. Please contact support.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: tenant._id,
        username: tenant.username,
        role: tenant.role,
        slug: tenant.slug
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Return user data and token
    res.json({
      success: true,
      token,
      user: {
        id: tenant._id,
        username: tenant.username,
        email: tenant.ownerEmail,
        name: tenant.ownerName,
        role: tenant.role,
        slug: tenant.slug,
        eventType: tenant.eventType,
        plan: tenant.plan
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user info (protected route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.ownerEmail,
        name: req.user.ownerName,
        role: req.user.role,
        slug: req.user.slug,
        eventType: req.user.eventType,
        plan: req.user.plan,
        features: req.user.features
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token endpoint
router.post('/verify', verifyToken, async (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Logout endpoint (client-side will remove token, this is just for logging)
router.post('/logout', verifyToken, async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email adresi gereklidir.' });
    }

    const tenant = await Tenant.findOne({ ownerEmail: email });

    // Don't reveal if email exists or not (security best practice)
    if (!tenant) {
      return res.json({ message: 'Eğer email kayıtlıysa, şifre sıfırlama linki gönderildi.' });
    }

    // Generate reset token (random 32 char string)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    tenant.resetPasswordToken = resetToken;
    tenant.resetPasswordExpiry = resetTokenExpiry;
    await tenant.save();

    // Send email
    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'Şifre sıfırlama linki email adresinize gönderildi.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' });
  }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token ve yeni şifre gereklidir.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır.' });
    }

    const tenant = await Tenant.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!tenant) {
      return res.status(400).json({ error: 'Geçersiz veya süresi dolmuş token.' });
    }

    // Hash new password
    tenant.password = await bcrypt.hash(newPassword, 10);
    tenant.resetPasswordToken = undefined;
    tenant.resetPasswordExpiry = undefined;
    await tenant.save();

    res.json({ message: 'Şifreniz başarıyla güncellendi.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' });
  }
});

// Super Admin Login endpoint
router.post('/super-admin-login', async (req, res) => {
  try {
    // Ensure database connection
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-website', {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }

    const { username, password } = req.body;

    // Find super admin
    const admin = await SuperAdmin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    // Check password (synchronous)
    const isMatch = admin.comparePassword(password);
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
      JWT_SECRET,
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

module.exports = router;
