import { useState, useEffect } from 'react';



export default function Treasurer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Rajesh');
  
  // The coordinators who might share expenses
  const members = ['Rajesh', 'Ushaswini', 'Prasanna', 'Navadeep'];

  useEffect(() => {
    const token = localStorage.getItem('treasurer_token');
    if (token) setIsAuthenticated(true);
    
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    try {
      const token = localStorage.getItem('treasurer_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/treasurer/ledger`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setExpenses(data);
        } else {
          setExpenses(data.transactions || []);
          setTotalIncome(data.totalIncome || 0);
        }
      }
    } catch (err) {
      console.error('Failed to fetch ledger:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/treasurer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        localStorage.setItem('treasurer_token', data.token);
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
    localStorage.removeItem('treasurer_token');
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    
    const newExp = {
      description: desc,
      amount: parseFloat(amount),
      type: 'EXPENSE',
      paidBy: paidBy,
      splitDetails: {}
    };
    
    try {
      const token = localStorage.getItem('treasurer_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/treasurer/transaction`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newExp)
      });
      if (res.ok) {
        fetchLedger();
        setDesc('');
        setAmount('');
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('treasurer_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/treasurer/transaction/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchLedger();
      }
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  let totalExpenses = 0;
  expenses.forEach(exp => {
    totalExpenses += exp.amount;
  });

  if (!isAuthenticated) {
    return (
      <div className="treasurer-container">
        <div className="login-box">
          <div className="terminal-header">
            <span className="dot red-dot"></span>
            <span className="dot yellow-dot"></span>
            <span className="dot green-dot"></span>
            <span>SECURE_LOGIN.sh</span>
          </div>
          <div className="login-body">
            <h2 className="red blink-text">RESTRICTED ACCESS</h2>
            <p>TREASURER PORTAL</p>
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
    <div className="treasurer-container">
      <div className="t-nav">
        <div className="t-logo">QUANTUM <span className="red">VAULT</span></div>
        <button onClick={handleLogout} className="btn-ghost" style={{padding: '5px 15px'}}>LOGOUT</button>
      </div>

      <div className="t-grid">
        <div className="t-panel">
          <div className="panel-title">// ADD EXPENSE</div>
          <form onSubmit={addExpense} className="exp-form">
            <div className="form-group">
              <label>DESCRIPTION</label>
              <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="E.g. Domain Name, Snacks" className="t-input" required />
            </div>
            <div className="form-group">
              <label>AMOUNT (₹)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="t-input" required min="1" />
            </div>
            <div className="form-group">
              <label>PAID BY</label>
              <select value={paidBy} onChange={e => setPaidBy(e.target.value)} className="t-input">
                {members.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-primary">RECORD EXPENSE</button>
          </form>
        </div>

        <div className="t-panel">
          <div className="panel-title">// LEDGER SUMMARY</div>
          <div className="ledger-stat" style={{borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '15px'}}>
            <span>REGISTRATIONS COLLECTION:</span>
            <span className="green">₹{totalIncome.toFixed(2)}</span>
          </div>
          <div className="ledger-stat" style={{borderBottom: 'none', marginBottom: '0'}}>
            <span>TOTAL EXPENDITURE:</span>
            <span className="red">₹{totalExpenses.toFixed(2)}</span>
          </div>
          <p style={{marginTop: '20px', color: '#888', fontStyle: 'italic', fontSize: '14px'}}>
            This panel strictly tracks all outbound expenses executed by coordinators for the event.
          </p>
        </div>
      </div>

      <div className="t-panel" style={{marginTop: '20px'}}>
        <div className="panel-title">// TRANSACTION HISTORY</div>
        {expenses.length === 0 ? (
          <div style={{color: '#555', fontStyle:'italic'}}>No expenses recorded yet.</div>
        ) : (
          <table className="t-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>DESC</th>
                <th>PAID BY</th>
                <th>AMOUNT</th>
                <th>ACT</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e._id}>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>{e.description}</td>
                  <td className="green">{e.paidBy || 'Treasury'}</td>
                  <td className="red">₹{e.amount}</td>
                  <td><button onClick={() => deleteExpense(e._id)} className="del-btn">X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
