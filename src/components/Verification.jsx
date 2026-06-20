import { useState, useEffect } from 'react';



export default function Verification() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
    
    if (isAuthenticated || auth === 'true') {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/admin/registrations`, {
        headers: {
          'Authorization': 'Bearer admin-authorized-token'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        setError('');
      } else {
        const data = await res.json();
        setError(`ACCESS DENIED: ${data.error || 'Invalid credentials'}`);
      }
    } catch (err) {
      setError('ACCESS DENIED: Server unreachable');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/admin/registrations/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-authorized-token'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchRegistrations();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="treasurer-container">
        <div className="login-box">
          <div className="terminal-header">
            <span className="dot red-dot"></span>
            <span className="dot yellow-dot"></span>
            <span className="dot green-dot"></span>
            <span>ADMIN_LOGIN.sh</span>
          </div>
          <div className="login-body">
            <h2 className="red blink-text">RESTRICTED ACCESS</h2>
            <p>VERIFICATION PORTAL</p>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="USERNAME" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="t-input"
              />
              <input 
                type="password" 
                placeholder="PASSWORD" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="t-input"
              />
              <button type="submit" className="btn-primary full-width">AUTHENTICATE</button>
            </form>
            <div className="hint">Set your credentials securely in your backend .env file</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="treasurer-container" style={{maxWidth: '1200px'}}>
      <div className="t-nav">
        <div className="t-logo">VERIFICATION <span className="red">PORTAL</span></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.location.hash = '#approved'} className="btn-ghost" style={{padding: '5px 15px', borderColor: '#fff'}}>PRINT LIST</button>
          <button onClick={handleLogout} className="btn-ghost" style={{padding: '5px 15px'}}>LOGOUT</button>
        </div>
      </div>

      <div className="t-panel" style={{marginTop: '20px'}}>
        <div className="panel-title">// TEAM REGISTRATIONS</div>
        {loading ? (
          <div style={{color: '#555', fontStyle:'italic'}}>Loading records...</div>
        ) : registrations.length === 0 ? (
          <div style={{color: '#555', fontStyle:'italic'}}>No registrations received yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="t-table">
              <thead>
                <tr>
                  <th>TEAM NAME</th>
                  <th>LEADER</th>
                  <th>SIZE</th>
                  <th>PAYMENT ID</th>
                  <th>DOCS</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(reg => (
                  <tr key={reg._id} style={{ background: reg.status === 'APPROVED' ? 'rgba(0,255,0,0.05)' : reg.status === 'REJECTED' ? 'rgba(255,0,0,0.05)' : 'transparent' }}>
                    <td style={{ fontWeight: 'bold' }}>{reg.teamName}</td>
                    <td>
                      <div>{reg.leaderName}</div>
                      <div style={{ fontSize: '0.8em', color: '#888' }}>{reg.phone}</div>
                    </td>
                    <td>{reg.size}</td>
                    <td style={{ fontFamily: 'monospace', color: '#aaa' }}>{reg.paymentId}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                        <button onClick={() => setSelectedImage(reg.paymentScreenshotUrl)} className="btn-ghost" style={{ padding: '2px 5px', fontSize: '0.8em', borderColor: 'var(--red)', color: 'var(--red)' }}>View Receipt</button>
                        <button onClick={() => setSelectedImage(reg.idPhotoUrl)} className="btn-ghost" style={{ padding: '2px 5px', fontSize: '0.8em' }}>View ID</button>
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8em',
                        background: reg.status === 'APPROVED' ? 'rgba(0, 255, 0, 0.1)' : reg.status === 'REJECTED' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        color: reg.status === 'APPROVED' ? '#0f0' : reg.status === 'REJECTED' ? '#f00' : '#fff'
                      }}>
                        {reg.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {reg.status !== 'APPROVED' && (
                          <button onClick={() => updateStatus(reg._id, 'APPROVED')} className="btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8em', borderColor: '#0f0', color: '#0f0' }}>✔</button>
                        )}
                        {reg.status !== 'REJECTED' && (
                          <button onClick={() => updateStatus(reg._id, 'REJECTED')} className="btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8em', borderColor: '#f00', color: '#f00' }}>✖</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex',
          justifyContent: 'center', alignItems: 'center', padding: '20px'
        }} onClick={() => setSelectedImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}
            >×</button>
            <img src={selectedImage} alt="Verification Document" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', border: '2px solid var(--border-red)', borderRadius: '4px' }} />
          </div>
        </div>
      )}
    </div>
  );
}
