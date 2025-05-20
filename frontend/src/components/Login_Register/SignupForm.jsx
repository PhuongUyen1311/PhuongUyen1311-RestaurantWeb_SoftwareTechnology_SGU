import { useState } from 'react';
import '../../styles/signupForm.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const SignupForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // NEW

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.name.trim()) {
    newErrors.name = '* Vui lòng nhập tên người dùng';
  }

  if (!formData.email.trim()) {
    newErrors.email = '* Vui lòng nhập email';
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = '* Email không hợp lệ';
  } else if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
    newErrors.email = '* Email không hợp lệ';
  } else {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = storedUsers.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (emailExists) {
      newErrors.email = '* Email đã tồn tại!';
    }
  }

  if (!formData.password.trim()) {
    newErrors.password = '* Vui lòng nhập mật khẩu';
  } else if (formData.password.length < 6) {
    newErrors.password = '* Mật khẩu phải có ít nhất 6 ký tự';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        onSuccess?.(); // Ẩn form trước
        setTimeout(() => {
          toast.success('Đăng ký thành công!');
        }, 100);
        setFormData({ name: '', email: '', password: '' });
        setErrors({});
      } else {
        toast.error(`${result.message}`);
      }
    } catch (err) {
      console.error('Lỗi signup:', err);
      toast.error('Đã xảy ra lỗi khi đăng ký.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>SIGN UP</h2>

      <div className="form-group">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error-text">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <div className="error-text">{errors.password}</div>}
      </div>

      <button type="submit" className="signupButton">Submit</button>
    </form>
  );
};

export default SignupForm;
