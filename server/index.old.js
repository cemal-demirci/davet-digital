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

// Models
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  category: String,
  uploadDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [String], // IP veya session ID'leri
  comments: [{
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

const settingsSchema = new mongoose.Schema({
  coupleNames: { type: String, default: 'Cemal & [Partner Name]' },
  mainDate: Date,
  engagementDate: Date,
  storyTitle: String,
  storyText: String,
  musicUrl: String,
  password: String,
  isPasswordProtected: { type: Boolean, default: false },
  theme: { type: String, default: 'romantic-rose' },
  guestUploadEnabled: { type: Boolean, default: true },
  giftListEnabled: { type: Boolean, default: false },
  rsvpEnabled: { type: Boolean, default: true },
  guestMessagesEnabled: { type: Boolean, default: true },
  liveWallEnabled: { type: Boolean, default: true },
  liveWallShowAdminPhotos: { type: Boolean, default: true },
  liveWallShowGuestPhotos: { type: Boolean, default: false },
  guestGalleryAccessCode: { type: String, default: '' }, // Misafir fotoğraflarını görmek için kod
  venueAddress: String,
  venueName: String,
  venueMapUrl: String,
  venueLatitude: Number,
  venueLongitude: Number
});

const guestPhotoSchema = new mongoose.Schema({
  url: String,
  guestName: String,
  uploadDate: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
  qrCodeId: String,
  likes: { type: Number, default: 0 },
  likedBy: [String],
  comments: [{
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

const qrCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  tableNumber: String,
  isTableQR: { type: Boolean, default: false }, // Masa QR ise true
  createdAt: { type: Date, default: Date.now },
  usedCount: { type: Number, default: 0 }
});

const rsvpSchema = new mongoose.Schema({
  guestName: String,
  email: String,
  phone: String,
  attendance: { type: String, enum: ['yes', 'no', 'maybe'], default: 'maybe' },
  guestCount: { type: Number, default: 1 },
  dietaryRestrictions: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const guestMessageSchema = new mongoose.Schema({
  guestName: String,
  message: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const giftSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  link: String,
  reserved: { type: Boolean, default: false },
  reservedBy: String,
  createdAt: { type: Date, default: Date.now }
});

const timelineSchema = new mongoose.Schema({
  title: String,
  time: String,
  description: String,
  icon: String,
  order: Number
});

const Event = mongoose.model('Event', eventSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Settings = mongoose.model('Settings', settingsSchema);
const GuestPhoto = mongoose.model('GuestPhoto', guestPhotoSchema);
const QRCode = mongoose.model('QRCode', qrCodeSchema);
const RSVP = mongoose.model('RSVP', rsvpSchema);
const GuestMessage = mongoose.model('GuestMessage', guestMessageSchema);
const Gift = mongoose.model('Gift', giftSchema);
const Timeline = mongoose.model('Timeline', timelineSchema);

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Routes

// Settings
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Photos
app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/photos/upload', upload.single('photo'), async (req, res) => {
  try {
    const photo = await Photo.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      url: `/uploads/${req.file.filename}`
    });
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password verification
app.post('/api/verify-password', async (req, res) => {
  try {
    const settings = await Settings.findOne();
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

// QR Code routes
app.post('/api/qrcodes', async (req, res) => {
  try {
    const { name, tableNumber, count } = req.body;
    const codes = [];

    for (let i = 0; i < (count || 1); i++) {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const qrCode = await QRCode.create({
        code,
        name: `${name}${count > 1 ? ` - ${i + 1}` : ''}`,
        tableNumber
      });
      codes.push(qrCode);
    }

    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/qrcodes', async (req, res) => {
  try {
    const codes = await QRCode.find().sort({ createdAt: -1 });
    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/qrcodes/:id', async (req, res) => {
  try {
    await QRCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'QR code deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guest photo routes
app.post('/api/guest-photos/upload', upload.single('photo'), async (req, res) => {
  try {
    const { guestName, qrCodeId } = req.body;

    // Update QR code usage count
    if (qrCodeId) {
      await QRCode.findByIdAndUpdate(qrCodeId, { $inc: { usedCount: 1 } });
    }

    const guestPhoto = await GuestPhoto.create({
      url: `/uploads/${req.file.filename}`,
      guestName,
      qrCodeId
    });

    res.json(guestPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/guest-photos', async (req, res) => {
  try {
    const photos = await GuestPhoto.find().sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/guest-photos/:id/approve', async (req, res) => {
  try {
    const photo = await GuestPhoto.findByIdAndUpdate(
      req.params.id,
      { approved: req.body.approved },
      { new: true }
    );
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/guest-photos/:id', async (req, res) => {
  try {
    await GuestPhoto.findByIdAndDelete(req.params.id);
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
app.get('/api/rsvps', async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rsvps', async (req, res) => {
  try {
    const rsvp = await RSVP.create(req.body);
    res.json(rsvp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/rsvps/:id', async (req, res) => {
  try {
    await RSVP.findByIdAndDelete(req.params.id);
    res.json({ message: 'RSVP deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guest Messages Routes
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await GuestMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = await GuestMessage.create(req.body);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/messages/:id/approve', async (req, res) => {
  try {
    const message = await GuestMessage.findByIdAndUpdate(
      req.params.id,
      { approved: req.body.approved },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    await GuestMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gifts Routes
app.get('/api/gifts', async (req, res) => {
  try {
    const gifts = await Gift.find().sort({ createdAt: -1 });
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gifts', async (req, res) => {
  try {
    const gift = await Gift.create(req.body);
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/gifts/:id/reserve', async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      { reserved: req.body.reserved, reservedBy: req.body.reservedBy },
      { new: true }
    );
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gifts/:id', async (req, res) => {
  try {
    await Gift.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gift deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Timeline Routes
app.get('/api/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ order: 1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/timeline', async (req, res) => {
  try {
    const item = await Timeline.create(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/timeline/:id', async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timeline item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download all photos as zip
app.get('/api/photos/download-all', async (req, res) => {
  try {
    const [adminPhotos, guestPhotos] = await Promise.all([
      Photo.find(),
      GuestPhoto.find({ approved: true })
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
app.post('/api/photos/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const photo = await Photo.findById(req.params.id);

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
app.post('/api/guest-photos/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const photo = await GuestPhoto.findById(req.params.id);

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
app.post('/api/photos/:id/comment', async (req, res) => {
  try {
    const { name, message } = req.body;
    const photo = await Photo.findById(req.params.id);

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
app.post('/api/guest-photos/:id/comment', async (req, res) => {
  try {
    const { name, message } = req.body;
    const photo = await GuestPhoto.findById(req.params.id);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
