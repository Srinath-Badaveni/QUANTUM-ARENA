const mongoose = require("mongoose");

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
  member2Name: { type: String },
  member2Phone: { type: String },
  member2College: { type: String },
  member3Name: { type: String },
  member3Phone: { type: String },
  member3College: { type: String },
  paymentScreenshotUrl: { type: String, required: true },
  paymentId: { type: String, required: true },
  idPhotoUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  emailSent: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", registrationSchema);
