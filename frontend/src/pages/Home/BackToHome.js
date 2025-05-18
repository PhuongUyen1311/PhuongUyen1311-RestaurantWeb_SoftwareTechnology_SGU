import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/BackToHome.css';

const BackToHome = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      sessionStorage.setItem('redirectedFromExit', 'true');
      navigate('/');
    }
  };

  return (
    <div className="back-to-home-container">
      <button className="back-to-home-button" onClick={handleClick}>
        <span className="back-to-home-text">
          {isLoggedIn ? 'Back To Home' : 'Exit'}
        </span>
        <span
          className="back-to-home-icon"
          style={{
            backgroundImage: isLoggedIn
              ? "url('/images/house.svg')"
              : "url('/images/exit.svg')", 
          }}
        ></span>
      </button>
    </div>
  );
};

export default BackToHome;
