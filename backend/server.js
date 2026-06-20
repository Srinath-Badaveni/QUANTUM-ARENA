require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Registration = require("./models/Registration");
const Transaction = require("./models/Transaction");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/quantum-arena")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "quantum-arena/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});
const upload = multer({ storage: storage });

// API Routes

// 1. Register Team (Uploads 2 files: payment and ID)
app.post(
  "/api/register",
  upload.fields([
    { name: "paymentScreenshot", maxCount: 1 },
    { name: "idPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        teamName,
        leaderName,
        email,
        phone,
        college,
        branch,
        year,
        track,
        size,
        paymentId,
      } = req.body;

      // Check if files were uploaded
      if (
        !req.files ||
        !req.files["paymentScreenshot"] ||
        !req.files["idPhoto"]
      ) {
        return res
          .status(400)
          .json({
            error: "Both payment screenshot and ID photo are required.",
          });
      }

      // Fraud Detection: Check for duplicate Payment ID
      const existingPayment = await Registration.findOne({ paymentId });
      if (existingPayment) {
        return res
          .status(400)
          .json({
            error:
              "FRAUD ALERT: A registration with this Payment ID already exists.",
          });
      }

      // Check for duplicate Email or Phone
      const existingUser = await Registration.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({
            error: "A user with this Email or Phone is already registered.",
          });
      }

      const paymentScreenshotUrl = req.files["paymentScreenshot"][0].path;
      const idPhotoUrl = req.files["idPhoto"][0].path;

      const newRegistration = new Registration({
        teamName,
        leaderName,
        email,
        phone,
        college,
        branch,
        year,
        track,
        size,
        paymentId,
        paymentScreenshotUrl,
        idPhotoUrl,
      });

      await newRegistration.save();
      res
        .status(201)
        .json({
          message: "Registration successful!",
          registration: newRegistration,
        });
    } catch (error) {
      console.error("Registration Error:", error);
      res
        .status(500)
        .json({ error: "Failed to register team. Please try again later." });
    }
  },
);

// Middleware: Treasurer Auth
const verifyTreasurerToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === 'treasurer') {
        req.user = decoded;
        return next();
      }
    } catch (err) {
      // invalid token
    }
  }
  res.status(401).json({ error: "Unauthorized access" });
};

// Middleware: Admin Auth
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === 'admin') {
        req.user = decoded;
        return next();
      }
    } catch (err) {
      // invalid token
    }
  }
  res.status(401).json({ error: "Unauthorized access" });
};

// 2. Money Management: Treasurer Login
app.post("/api/treasurer/login", (req, res) => {
  const { username, password } = req.body;
  const validUser = process.env.TREASURER_USERNAME || "rajesh";
  const validPass = process.env.TREASURER_PASSWORD || "123";

  if (
    username.toLowerCase() === validUser.toLowerCase() &&
    password === validPass
  ) {
    const token = jwt.sign({ role: 'treasurer' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// 3. Money Management: Get Ledger
app.get("/api/treasurer/ledger", verifyTreasurerToken, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ledger" });
  }
});

// 3. Money Management: Add Transaction
app.post(
  "/api/treasurer/transaction",
  verifyTreasurerToken,
  async (req, res) => {
    try {
      const { description, amount, type, paidBy, splitDetails } = req.body;
      const newTransaction = new Transaction({
        description,
        amount,
        type,
        paidBy,
        splitDetails,
      });
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: "Failed to add transaction" });
    }
  },
);

// 4. Money Management: Delete Transaction
app.delete(
  "/api/treasurer/transaction/:id",
  verifyTreasurerToken,
  async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete transaction" });
    }
  },
);

// 5. Verification Portal: Admin Login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (username === validUser && password === validPass) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// 6. Verification Portal: Get all registrations
app.get("/api/admin/registrations", verifyAdminToken, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ timestamp: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// 7. Verification Portal: Update registration status
// Configure Nodemailer to force IPv4 to avoid Render's IPv6 connectivity issues with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4, // Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

app.put("/api/admin/registrations/:id", verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );

    // Send confirmation email if approved
    if (
      status === "APPROVED" &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    ) {
      const mailOptions = {
        from: `"Quantum Arena 2026" <${process.env.EMAIL_USER}>`,
        to: updated.email,
        subject: "Registration Confirmed: Quantum Arena Hackathon 2026 🚀",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #e63946;">Congratulations, ${updated.leaderName}!</h2>
            <p>Your team <strong>${updated.teamName}</strong> has been successfully verified and approved for <strong>Quantum Arena 2026</strong>.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #e63946; margin: 20px 0;">
              <h3 style="margin-top: 0;">Event Details</h3>
              <ul style="list-style-type: none; padding-left: 0;">
                <li>📅 <strong>Date:</strong> 06th - 08th August 2026</li>
                <li>⏱ <strong>Duration:</strong> 36 Hours (Non-stop)</li>
                <li>📍 <strong>Venue:</strong> TKR College of Engineering & Technology, Dept. of CSE</li>
              </ul>
            </div>

            <h3>Important Instructions</h3>
            <ul>
              <li>Please carry your original College ID cards.</li>
              <li>Bring your laptops, chargers, and any required hardware/extensions.</li>
              <li>Food and accommodation will be provided at the venue.</li>
              <li>Ensure your team reports to the registration desk by 9:00 AM on 06th August.</li>
            </ul>

            <p>If you have any queries, please reply to this email or contact the coordinators listed on the website.</p>
            
            <p>See you in the Arena!<br><strong>- Team Quantum Arena</strong></p>
          </div>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent:", info.response);
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update registration status" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Node.js Version: ${process.version}`);
});
