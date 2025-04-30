import { useNavigate } from 'react-router-dom';
import '../../styles/BackToHome.css';

const BackToHome = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/main');
  };

  return (
    <div className="back-to-home-container">
      <button className="back-to-home-button" onClick={handleBackToHome}>
        <span className="back-to-home-icon"></span>
        <span className="back-to-home-text">Back To Home</span>
      </button>
    </div>
  );
};

export default BackToHome;
