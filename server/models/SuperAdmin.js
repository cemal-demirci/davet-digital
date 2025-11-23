const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const superAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'super-admin'
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: [{
    timestamp: Date,
    success: Boolean,
    ip: String
  }]
}, {
  timestamps: true
});

// Method to compare passwords (synchronous version)
superAdminSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
