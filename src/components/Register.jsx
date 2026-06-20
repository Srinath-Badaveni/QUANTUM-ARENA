import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { EVENT } from "../data/event.js";

export default function Register() {
  const [status, setStatus] = useState(null);
  const [posterOpen, setPosterOpen] = useState(false);
  const [teamSize, setTeamSize] = useState("1 Member");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRegistrations = () => {
    const data = localStorage.getItem("quantum_arena_regs");
    return data ? JSON.parse(data) : [];
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        body: formData, // FormData automatically sets the correct multipart/form-data headers
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to register");
      }

      setStatus({
        type: "success",
        msg: "Registration successful! You are in the Arena.",
      });
      e.target.reset();
      setTeamSize("1 Member");
    } catch (error) {
      setStatus({ type: "error", msg: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiId = import.meta.env.VITE_UPI_ID || "srinath123@ybl";
  const name = import.meta.env.VITE_UPI_NAME || "Srinath Badaveni";
  const note = import.meta.env.VITE_UPI_NOTE || "Registration Fee";

  const sizeNumber = parseInt(teamSize) || 1;
  const amount = (EVENT.registration.fee * sizeNumber).toString();
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  return (
    <section className="register" id="register">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// ENTER_THE_ARENA</span>
          <h2 className="section-title">
            REGISTER <span className="red">NOW</span>
          </h2>
        </div>
        <div className="register-grid">
          <div className="register-info">
            <div className="reg-fee">
              <span className="fee-label">REGISTRATION FEE</span>
              <span className="fee-amt">
                {EVENT.registration.currency}
                {EVENT.registration.fee}{" "}
                <span className="per">/ {EVENT.registration.per}</span>
              </span>
            </div>

            <div
              className="reg-poster-thumbnail"
              style={{
                margin: "1.5rem 0",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => setPosterOpen(true)}
            >
              <img
                src="/image.png"
                alt="Event Poster"
                style={{
                  width: "100%",
                  maxWidth: "240px",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto",
                  border: "2px solid transparent",
                  transition: "border-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = "var(--red)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = "transparent")
                }
              />
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "0.8rem",
                  color: "var(--text-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                CLICK TO VIEW POSTER
              </div>
            </div>

            <div className="reg-contacts">
              <div className="contact-title">{EVENT.queries.title}</div>
              {EVENT.queries.contacts.map((contact, i) => (
                <div key={i} className="contact-item">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-num">{contact.phone}</span>
                </div>
              ))}
            </div>
            <div className="reg-college">
              <div className="college-name">{EVENT.college.name}</div>
              <div className="college-sub">{EVENT.college.sub}</div>
              <div className="college-sub">{EVENT.college.sponsored}</div>
              <div className="college-sub">{EVENT.college.approved}</div>
              <div className="college-sub">{EVENT.college.accredited}</div>
            </div>
          </div>
          <div className="register-form">
            {!status || status.type !== "success" ? (
              <form className="reg-form" id="regForm" onSubmit={handleRegister}>
                <div className="form-group">
                  <label>TEAM NAME *</label>
                  <input
                    type="text"
                    name="teamName"
                    placeholder="Enter your team name"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>NAME (TEAM LEAD / MEMBER 1) *</label>
                    <input
                      type="text"
                      name="leaderName"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>EMAIL ID *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="leader@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>COLLEGE</label>
                  <input
                    type="text"
                    name="college"
                    placeholder="Your institution"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>BRANCH *</label>
                    <select name="branch" required>
                      <option value="">— SELECT BRANCH —</option>
                      {EVENT.formSelects.branches.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>YEAR *</label>
                    <select name="year" required>
                      <option value="">— SELECT YEAR —</option>
                      {EVENT.formSelects.years.map((y, i) => (
                        <option key={i} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>TECH TRACK *</label>
                  <select name="track" required>
                    <option value="">— SELECT TRACK —</option>
                    {EVENT.formSelects.tracks.map((track, i) => (
                      <option key={i} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>NO OF TEAM MEMBERS *</label>
                  <select
                    name="size"
                    required
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                  >
                    <option value="">— SELECT SIZE —</option>
                    {EVENT.formSelects.sizes.map((size, i) => (
                      <option key={i} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    padding: "20px",
                    borderRadius: "4px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "15px",
                      color: "var(--red)",
                      fontWeight: "bold",
                    }}
                  >
                    SCAN TO PAY ({EVENT.registration.currency}
                    {amount})
                  </label>
                  <div
                    style={{
                      background: "#fff",
                      padding: "10px",
                      display: "inline-block",
                      borderRadius: "8px",
                      border: "2px solid var(--border-red)",
                    }}
                  >
                    <QRCodeCanvas
                      value={upiUrl}
                      size={160}
                      fgColor="#000000"
                      bgColor="#ffffff"
                      level="H"
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <a
                      href={upiUrl}
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "8px 16px" }}
                    >
                      PAY DIRECTLY VIA UPI APP
                    </a>
                  </div>
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.75rem",
                      color: "var(--text-dim)",
                    }}
                  >
                    Or scan using GPay / PhonePe / Paytm
                  </div>
                </div>
                <div className="form-group">
                  <label>UPI TRANSACTION / PAYMENT ID *</label>
                  <input
                    type="text"
                    name="paymentId"
                    placeholder="e.g. 123456789012"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>PAYMENT SCREENSHOT *</label>
                    <input
                      type="file"
                      name="paymentScreenshot"
                      accept="image/*,.pdf"
                      required
                      style={{ padding: "9px 14px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label>STUDENT ID (LEAD) *</label>
                    <input
                      type="file"
                      name="idPhoto"
                      accept="image/*,.pdf"
                      required
                      style={{ padding: "9px 14px" }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary full-width"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting
                    ? "PROCESSING REGISTRATION..."
                    : "ENTER THE ARENA →"}
                </button>
                <div className="form-note">
                  * Registration fee {EVENT.registration.currency}
                  {EVENT.registration.fee}/{EVENT.registration.per} collected at
                  venue on check-in.
                </div>
              </form>
            ) : null}
            {status && status.type === "success" && (
              <div className="reg-success" id="regSuccess">
                <div className="success-icon">✓</div>
                <div className="success-title">REGISTRATION RECEIVED</div>
                <div className="success-msg">{status.msg}</div>
              </div>
            )}
            {status && status.type === "error" && (
              <div
                className="reg-success"
                style={{ borderColor: "red", color: "red", marginTop: "10px" }}
              >
                <div className="success-icon" style={{ color: "red" }}>
                  X
                </div>
                <div className="success-title" style={{ color: "red" }}>
                  ERROR
                </div>
                <div className="success-msg">{status.msg}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {posterOpen && (
        <div
          className="poster-modal"
          onClick={() => setPosterOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <div
            style={{ position: "relative", maxWidth: "90%", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPosterOpen(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <img
              src="/image.png"
              alt="Squid Game Poster"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                border: "2px solid var(--border-red)",
                boxShadow: "0 0 30px rgba(232,0,15,0.4)",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
