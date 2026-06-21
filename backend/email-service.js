require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Registration = require("./models/Registration");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/quantum-arena")
  .then(() => console.log("MongoDB Connected for Email Service"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Configure Nodemailer
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

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
    process.exit(1);
  } else {
    console.log("SMTP Server Ready. Listening for approved registrations...");
  }
});

const sendConfirmationEmail = async (registration) => {
  const mailOptions = {
    from: `"Quantum Arena 2026" <${process.env.EMAIL_USER}>`,
    to: registration.email,
    subject: "Registration Confirmed: Quantum Arena Hackathon 2026 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #e63946;">Congratulations, ${registration.leaderName}!</h2>
        <p>Your team <strong>${registration.teamName}</strong> has been successfully verified and approved for <strong>Quantum Arena 2026</strong>.</p>
        
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
    console.log(`[SUCCESS] Confirmation email sent to ${registration.email} (Team: ${registration.teamName})`);
    
    // Mark as sent in DB
    registration.emailSent = true;
    await registration.save();
  } catch (error) {
    console.error(`[ERROR] Failed to send email to ${registration.email}:`, error);
  }
};

const pollRegistrations = async () => {
  try {
    // Find registrations that are APPROVED but haven't received an email yet
    const pendingEmails = await Registration.find({
      status: 'APPROVED',
      emailSent: false
    });

    if (pendingEmails.length > 0) {
      console.log(`Found ${pendingEmails.length} approved registrations needing emails.`);
      for (const reg of pendingEmails) {
        await sendConfirmationEmail(reg);
        // Add a small delay between emails to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  } catch (error) {
    console.error("Error polling registrations:", error);
  }
};

// Poll every 10 seconds
setInterval(pollRegistrations, 10000);

// Initial check
pollRegistrations();
