const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-website')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Import models
const Tenant = require('./models/Tenant');
const Settings = require('./models/Settings');
const Photo = require('./models/Photo');
const GuestPhoto = require('./models/GuestPhoto');
const QRCode = require('./models/QRCode');
const RSVP = require('./models/RSVP');
const GuestMessage = require('./models/GuestMessage');
const Gift = require('./models/Gift');
const Timeline = require('./models/Timeline');
const Event = require('./models/Event');

// Import middleware
const { tenantResolver, requireTenant, requireFeature, checkLimit } = require('./middleware/tenantResolver');

// Import routes
const tenantRoutes = require('./routes/tenants');

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory for tenant if it doesn't exist
    const tenantDir = `uploads/${req.tenantId || 'default'}`;
    if (!fs.existsSync(tenantDir)) {
      fs.mkdirSync(tenantDir, { recursive: true });
    }
    cb(null, tenantDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Apply tenant resolver to all routes (except landing/pricing)
app.use('/api', tenantResolver);

// Public routes (no tenant required)
app.use('/api/tenants', tenantRoutes);

// Settings Routes (require tenant)
app.get('/api/settings', requireTenant, async (req, res) => {
  try {
    let settings = await Settings.findOne({ tenantId: req.tenantId });
    if (!settings) {
      settings = await Settings.create({ tenantId: req.tenantId });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings', requireTenant, async (req, res) => {
  try {
    let settings = await Settings.findOne({ tenantId: req.tenantId });
    if (!settings) {
      settings = await Settings.create({ ...req.body, tenantId: req.tenantId });
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Event Routes
app.get('/api/events', requireTenant, async (req, res) => {
  try {
    const events = await Event.find({ tenantId: req.tenantId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', requireTenant, async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, tenantId: req.tenantId });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/events/:id', requireTenant, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      req.body,
      { new: true }
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', requireTenant, async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Photo Routes
app.get('/api/photos', requireTenant, async (req, res) => {
  try {
    const photos = await Photo.find({ tenantId: req.tenantId }).sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/photos/upload', requireTenant, checkLimit('maxPhotos'), upload.single('photo'), async (req, res) => {
  try {
    const photo = await Photo.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      url: `/uploads/${req.tenantId}/${req.file.filename}`,
      tenantId: req.tenantId
    });

    // Update usage
    await Tenant.findByIdAndUpdate(req.tenantId, {
      $inc: { 'usage.totalPhotos': 1 }
    });

    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/photos/:id', requireTenant, async (req, res) => {
  try {
    await Photo.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password verification
app.post('/api/verify-password', requireTenant, async (req, res) => {
  try {
    const settings = await Settings.findOne({ tenantId: req.tenantId });
    if (!settings || !settings.isPasswordProtected) {
      return res.json({ valid: true });
    }

    if (req.body.password === settings.password) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// QR Code Routes (Premium feature)
app.post('/api/qrcodes', requireTenant, requireFeature('qrCodeUpload'), async (req, res) => {
  try {
    const { name, tableNumber, count } = req.body;
    const codes = [];

    for (let i = 0; i < (count || 1); i++) {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const qrCode = await QRCode.create({
        code,
        name: `${name}${count > 1 ? ` - ${i + 1}` : ''}`,
        tableNumber,
        tenantId: req.tenantId
      });
      codes.push(qrCode);
    }

    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/qrcodes', requireTenant, async (req, res) => {
  try {
    const codes = await QRCode.find({ tenantId: req.tenantId }).sort({ createdAt: -1 });
    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/qrcodes/:id', requireTenant, async (req, res) => {
  try {
    await QRCode.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'QR code deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guest Photo Routes
app.post('/api/guest-photos/upload', requireTenant, requireFeature('qrCodeUpload'), upload.single('photo'), async (req, res) => {
  try {
    const { guestName, qrCodeId } = req.body;

    // Update QR code usage count
    if (qrCodeId) {
      await QRCode.findOneAndUpdate(
        { _id: qrCodeId, tenantId: req.tenantId },
        { $inc: { usedCount: 1 } }
      );
    }

    const guestPhoto = await GuestPhoto.create({
      url: `/uploads/${req.tenantId}/${req.file.filename}`,
      guestName,
      qrCodeId,
      tenantId: req.tenantId
    });

    res.json(guestPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/guest-photos', requireTenant, async (req, res) => {
  try {
    const photos = await GuestPhoto.find({ tenantId: req.tenantId }).sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/guest-photos/:id/approve', requireTenant, async (req, res) => {
  try {
    const photo = await GuestPhoto.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { approved: req.body.approved },
      { new: true }
    );
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/guest-photos/:id', requireTenant, async (req, res) => {
  try {
    await GuestPhoto.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Guest photo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get QR code info by code
app.get('/api/qr/:code', async (req, res) => {
  try {
    const qrCode = await QRCode.findOne({ code: req.params.code });
    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }
    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RSVP Routes
app.get('/api/rsvps', requireTenant, async (req, res) => {
  try {
    const rsvps = await RSVP.find({ tenantId: req.tenantId }).sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rsvps', requireTenant, checkLimit('maxGuests'), async (req, res) => {
  try {
    const rsvp = await RSVP.create({ ...req.body, tenantId: req.tenantId });

    // Update guest count if attending
    if (req.body.attendance === 'yes') {
      await Tenant.findByIdAndUpdate(req.tenantId, {
        $inc: { 'usage.totalGuests': req.body.guestCount || 1 }
      });
    }

    res.json(rsvp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/rsvps/:id', requireTenant, async (req, res) => {
  try {
    await RSVP.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'RSVP deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guest Messages Routes
app.get('/api/messages', requireTenant, async (req, res) => {
  try {
    const messages = await GuestMessage.find({ tenantId: req.tenantId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', requireTenant, async (req, res) => {
  try {
    const message = await GuestMessage.create({ ...req.body, tenantId: req.tenantId });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/messages/:id/approve', requireTenant, async (req, res) => {
  try {
    const message = await GuestMessage.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { approved: req.body.approved },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', requireTenant, async (req, res) => {
  try {
    await GuestMessage.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gifts Routes
app.get('/api/gifts', requireTenant, async (req, res) => {
  try {
    const gifts = await Gift.find({ tenantId: req.tenantId }).sort({ createdAt: -1 });
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gifts', requireTenant, async (req, res) => {
  try {
    const gift = await Gift.create({ ...req.body, tenantId: req.tenantId });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/gifts/:id/reserve', requireTenant, async (req, res) => {
  try {
    const gift = await Gift.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { reserved: req.body.reserved, reservedBy: req.body.reservedBy },
      { new: true }
    );
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gifts/:id', requireTenant, async (req, res) => {
  try {
    await Gift.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Gift deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Timeline Routes
app.get('/api/timeline', requireTenant, async (req, res) => {
  try {
    const timeline = await Timeline.find({ tenantId: req.tenantId }).sort({ order: 1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/timeline', requireTenant, async (req, res) => {
  try {
    const item = await Timeline.create({ ...req.body, tenantId: req.tenantId });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/timeline/:id', requireTenant, async (req, res) => {
  try {
    await Timeline.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    res.json({ message: 'Timeline item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download all photos as zip
app.get('/api/photos/download-all', requireTenant, async (req, res) => {
  try {
    const [adminPhotos, guestPhotos] = await Promise.all([
      Photo.find({ tenantId: req.tenantId }),
      GuestPhoto.find({ tenantId: req.tenantId, approved: true })
    ]);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    res.attachment('wedding-photos.zip');
    archive.pipe(res);

    // Add admin photos
    for (const photo of adminPhotos) {
      const photoPath = path.join(__dirname, photo.url);
      if (fs.existsSync(photoPath)) {
        archive.file(photoPath, { name: `admin/${path.basename(photo.url)}` });
      }
    }

    // Add guest photos
    for (const photo of guestPhotos) {
      const photoPath = path.join(__dirname, photo.url);
      if (fs.existsSync(photoPath)) {
        archive.file(photoPath, { name: `guest/${path.basename(photo.url)}` });
      }
    }

    archive.finalize();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike Photo
app.post('/api/photos/:id/like', requireTenant, async (req, res) => {
  try {
    const { userId } = req.body;
    const photo = await Photo.findOne({ _id: req.params.id, tenantId: req.tenantId });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const hasLiked = photo.likedBy.includes(userId);

    if (hasLiked) {
      photo.likes -= 1;
      photo.likedBy = photo.likedBy.filter(id => id !== userId);
    } else {
      photo.likes += 1;
      photo.likedBy.push(userId);
    }

    await photo.save();
    res.json({ likes: photo.likes, hasLiked: !hasLiked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike Guest Photo
app.post('/api/guest-photos/:id/like', requireTenant, async (req, res) => {
  try {
    const { userId } = req.body;
    const photo = await GuestPhoto.findOne({ _id: req.params.id, tenantId: req.tenantId });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const hasLiked = photo.likedBy.includes(userId);

    if (hasLiked) {
      photo.likes -= 1;
      photo.likedBy = photo.likedBy.filter(id => id !== userId);
    } else {
      photo.likes += 1;
      photo.likedBy.push(userId);
    }

    await photo.save();
    res.json({ likes: photo.likes, hasLiked: !hasLiked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Comment to Photo
app.post('/api/photos/:id/comment', requireTenant, async (req, res) => {
  try {
    const { name, message } = req.body;
    const photo = await Photo.findOne({ _id: req.params.id, tenantId: req.tenantId });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    photo.comments.push({ name, message });
    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Comment to Guest Photo
app.post('/api/guest-photos/:id/comment', requireTenant, async (req, res) => {
  try {
    const { name, message } = req.body;
    const photo = await GuestPhoto.findOne({ _id: req.params.id, tenantId: req.tenantId });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    photo.comments.push({ name, message });
    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Davet Digital API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
