import { useState, useEffect } from 'react';

export default function ApprovedList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      const verifyHash = import.meta.env.VITE_VERIFY_HASH || '#verify';
      window.location.hash = verifyHash;
    } else {
      fetchApprovedRegistrations();
    }
  }, []);

  const fetchApprovedRegistrations = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/admin/registrations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Filter only approved registrations
        const approved = data.filter(reg => reg.status === 'APPROVED');
        setRegistrations(approved);
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone.includes(searchTerm)
  );

  return (
    <div className="treasurer-container" style={{maxWidth: '1000px', background: '#fff', color: '#000', minHeight: '100vh', padding: '20px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#000' }}>QUANTUM ARENA</h1>
          <h3 style={{ margin: 0, color: '#555' }}>Approved Teams Check-in List</h3>
        </div>
        <div className="no-print" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search Team, Name, Phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', flex: '1', minWidth: '200px' }}
          />
          <button onClick={() => window.print()} style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}>
            PRINT LIST
          </button>
          <button onClick={() => {
            const verifyHash = import.meta.env.VITE_VERIFY_HASH || '#verify';
            window.location.hash = verifyHash;
          }} style={{ padding: '8px 16px', background: '#ddd', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}>
            BACK
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{color: '#555'}}>Loading approved list...</div>
      ) : (
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#eee', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>S.NO</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>TEAM NAME</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>LEADER / CONTACT</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>COLLEGE / BRANCH</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>SIZE</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>CHECK-IN SGN</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg, index) => (
                <tr key={reg._id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc', fontWeight: 'bold' }}>{reg.teamName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <div>{reg.leaderName}</div>
                    <div style={{ fontSize: '0.85em', color: '#555' }}>{reg.phone}</div>
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <div>{reg.college || 'N/A'}</div>
                    <div style={{ fontSize: '0.85em', color: '#555' }}>{reg.branch} - {reg.year}</div>
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{reg.size}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc', width: '120px' }}></td>
                </tr>
              ))}
              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#888', border: '1px solid #ccc' }}>No approved teams found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* CSS for printing */}
      <style>{`
        @media print {
          body { background: #fff !important; }
          .scanlines, .t-nav, .no-print { display: none !important; }
          .treasurer-container { box-shadow: none !important; padding: 0 !important; }
          table { width: 100% !important; border: 1px solid #000; }
          th, td { border: 1px solid #000 !important; padding: 8px !important; color: #000 !important; }
        }
      `}</style>
    </div>
  );
}
