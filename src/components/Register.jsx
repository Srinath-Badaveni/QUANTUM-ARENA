import { useState } from 'react';
import { EVENT } from '../data/event.js';

export default function Register() {
  const [status, setStatus] = useState(null);

  const getRegistrations = () => {
    const data = localStorage.getItem("quantum_arena_regs");
    return data ? JSON.parse(data) : [];
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData(e.target);
    const teamName = formData.get('teamName');
    const leaderName = formData.get('leaderName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const college = formData.get('college');
    const track = formData.get('track');
    const size = formData.get('size');
    
    if (!teamName || !leaderName || !email || !phone || !college || !track || !size) {
      setStatus({ type: "error", msg: "Please fill all required fields." });
      return;
    }

    const regs = getRegistrations();
    const isDuplicate = regs.some(
      (r) => r.email === email || r.phone === phone || r.teamName === teamName
    );

    if (isDuplicate) {
      setStatus({ type: "error", msg: "User/Team with this email, phone, or name is already registered." });
      return;
    }

    regs.push({ teamName, leaderName, email, phone, college, track, size, timestamp: new Date().toISOString() });
    localStorage.setItem("quantum_arena_regs", JSON.stringify(regs));
    
    setStatus({ type: "success", msg: "Registration successful! You are in the Arena." });
  };

  return (
    <section className="register" id="register">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// ENTER_THE_ARENA</span>
          <h2 className="section-title">REGISTER <span className="red">NOW</span></h2>
        </div>
        <div className="register-grid">
          <div className="register-info">
            <div className="reg-fee">
              <span className="fee-label">REGISTRATION FEE</span>
              <span className="fee-amt">{EVENT.registration.currency}{EVENT.registration.fee} <span className="per">/ {EVENT.registration.per}</span></span>
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
            {!status || status.type !== 'success' ? (
              <form className="reg-form" id="regForm" onSubmit={handleRegister}>
                <div className="form-group">
                  <label>TEAM NAME</label>
                  <input type="text" name="teamName" placeholder="Enter your team name" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>TEAM LEADER NAME</label>
                    <input type="text" name="leaderName" placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>EMAIL</label>
                    <input type="email" name="email" placeholder="leader@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>PHONE NUMBER</label>
                  <input type="tel" name="phone" placeholder="10-digit mobile number" required />
                </div>
                <div className="form-group">
                  <label>COLLEGE NAME</label>
                  <input type="text" name="college" placeholder="Your institution" required />
                </div>
                <div className="form-group">
                  <label>TECH TRACK</label>
                  <select name="track" required>
                    <option value="">— SELECT TRACK —</option>
                    {EVENT.formSelects.tracks.map((track, i) => (
                      <option key={i} value={track}>{track}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>NUMBER OF TEAM MEMBERS</label>
                  <select name="size" required>
                    <option value="">— SELECT SIZE —</option>
                    {EVENT.formSelects.sizes.map((size, i) => (
                      <option key={i} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary full-width">ENTER THE ARENA →</button>
                <div className="form-note">* Registration fee {EVENT.registration.currency}{EVENT.registration.fee}/{EVENT.registration.per} collected at venue on check-in.</div>
              </form>
            ) : null}
            {status && status.type === 'success' && (
              <div className="reg-success" id="regSuccess">
                <div className="success-icon">✓</div>
                <div className="success-title">REGISTRATION RECEIVED</div>
                <div className="success-msg">{status.msg}</div>
              </div>
            )}
            {status && status.type === 'error' && (
              <div className="reg-success" style={{borderColor: 'red', color: 'red', marginTop: '10px'}}>
                <div className="success-icon" style={{color: 'red'}}>X</div>
                <div className="success-title" style={{color: 'red'}}>ERROR</div>
                <div className="success-msg">{status.msg}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
