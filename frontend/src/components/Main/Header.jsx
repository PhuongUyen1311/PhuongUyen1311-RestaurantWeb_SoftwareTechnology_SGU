import { useEffect, useState } from 'react';
import Menu from './MenuBar';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Header({ scrollToContact, scrollToMenu, scrollToAboutUs, scrollToHome }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    toast.info('Successful log out!');
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <header>
      <div className="part1">
        <img src="/images/logo_shop.png" alt="logo" />
      </div>

      <div className="part2">
        <div className="opening">
          <div className="hello">Hey there, snack lover! Ready to treat yourself?</div>
          <br />
          <div className="slogan">"Small Bites, Big Smiles!"</div>
        </div>
        <Menu
          scrollToContact={scrollToContact}
          scrollToMenu={scrollToMenu}
          scrollToAboutUs={scrollToAboutUs}
          scrollToHome={scrollToHome}
        />
      </div>

      <div className="part3">
        <p className="userName">Hello, {isLoggedIn ? username : 'customer'}!</p>
        
        {isLoggedIn ? (
          <>
            <div className="OrderHistory">
              <img src="/images/history.svg" alt="Order History Icon" className="iconHistory" />
              Order History
            </div>
            <div className="promotion">
              <img src="/images/cart.svg" alt="promotionIcon" className="promotionIcon" />
              Promotion
            </div>
            <div className="logout-bnt" onClick={handleLogout}>
              Log Out
              <img src="/images/exit.svg" alt="logout Icon" className="iconExit" />
            </div>
          </>
        ) : (
          <>
            <div className="login-bnt" onClick={handleLogin}>
              <img src="/images/login.svg" alt="login Icon" className="iconLogin" />
              Login
            </div>
            <div className="register-bnt" onClick={handleRegister}>
              <img src="/images/register.svg" alt="register Icon" className="iconRegister" />
              Register
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
