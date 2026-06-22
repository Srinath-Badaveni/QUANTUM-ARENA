require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
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
        member2Name,
        member2Phone,
        member2College,
        member3Name,
        member3Phone,
        member3College,
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
        member2Name,
        member2Phone,
        member2College,
        member3Name,
        member3Phone,
        member3College,
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

    // Email sending is now handled by a separate local service


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
