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
        <div className="background_loginPage"></div>
        <div className="login">
            <LoginForm />
            <button class="DineInOder-btn" onClick={handleClick}> Skip & Dine-in order</button>
          </div>
      </div>
    </div>
  );
};

export default Login;
