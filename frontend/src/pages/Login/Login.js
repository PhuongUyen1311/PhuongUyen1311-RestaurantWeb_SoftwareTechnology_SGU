import LoginForm from '../../components/Login/LoginForm';
import '../../styles/login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

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
