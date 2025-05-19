import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentHeader.css';

const BankingtHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <header className="payment-header">
      <button className="back-btn" onClick={handleBackClick}>
        <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M11 2L3 8l8 6V2z" />
        </svg>
        <span className="back-text">Back</span>
      </button>

      <h1>Payment</h1>
      <nav>
        <a href="/">Home</a>
        {/* <span>•</span> */}
      </nav>
    </header>
  );
};

export default BankingtHeader;
