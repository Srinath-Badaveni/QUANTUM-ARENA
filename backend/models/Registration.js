const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  track: { type: String, required: true },
  size: { type: String, required: true },
  paymentScreenshotUrl: { type: String, required: true },
  paymentId: { type: String, required: true },
  idPhotoUrl: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
