// src/components/Login/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Vui lòng nhập đầy đủ email và mật khẩu');
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
        setMessage(`Xin chào, ${result.user.name}!`);
        setTimeout(() => navigate('/main'), 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setMessage('Không thể kết nối đến máy chủ');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>

      <div className="Info">
        Your Email : 
        <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="Info">
        Password : 
        <input
        className="login-input"
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login-button" onClick={handleLogin}>
        Đăng nhập
      </button>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default LoginForm;
