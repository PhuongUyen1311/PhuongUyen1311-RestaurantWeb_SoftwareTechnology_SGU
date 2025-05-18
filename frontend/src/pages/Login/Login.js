import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import '../../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  // useEffect : clear login & cart
  useEffect(() => {
  const init = async () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cart');

    // Gọi API clear user session ở backend
    try {
      const resAuth = await fetch('http://localhost:5000/auth/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!resAuth.ok) {
        console.error('Không thể gọi API clearUser backend');
      }
    } catch (err) {
      console.error('Lỗi khi gọi clearUser API:', err);
    }
    // Gọi API xoá giỏ hàng ở backend
    try {
      const resCart = await fetch('http://localhost:5000/cart/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!resCart.ok) {
        console.error('Không thể gọi API clearCart backend');
      }
    } catch (err) {
      console.error('Lỗi khi gọi clearCart API:', err);
    }
  };

  init();

  document.body.classList.add('login-page');
  return () => {
    document.body.classList.remove('login-page');
  };
}, []);

  // Bỏ qua login và vào đặt món
  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="loginPageWrapper">
      <div className="loginContainer">
        <div className="background_loginPage">
          <div className="background-color-layer"></div>
          <img src="/images/bg.png" alt="background" className="bg-image" />
          <div className="overlay"></div>
        </div>

        <div className="login">
          <LoginForm />
          <button className="dinein-order-btn" onClick={handleClick}>
            <span className="text">Skip & Dine-in order</span>
            <div className="icon-wrapper">
              <img src="/images/next.svg" alt="Next Icon" className="icon" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
