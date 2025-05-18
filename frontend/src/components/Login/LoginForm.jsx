// src/components/Login/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('* Please enter full your email and password!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });


      const result = await response.json();

      if (result.success) {
        toast.success('Successful Login!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', result.user.name); 
        setTimeout(() => navigate('/main'), 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error connection:', error);
      setMessage('Can not connect to server!');
    }
  };

  return (
    <div className="login-container" id="login-container">
      <h2>LOG IN</h2>
      <div className="Info">
        Your Email : 
        <input
        className="login-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="Info">
        Password  : 
        <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {message && <p className="login-message">{message}</p>}
      <button className="login-button" onClick={handleLogin}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
