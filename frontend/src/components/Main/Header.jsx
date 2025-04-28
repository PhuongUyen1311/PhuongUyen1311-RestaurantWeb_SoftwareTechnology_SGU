import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm import useNavigate
import Menu from './MenuBar';  

function Header({ scrollToContact, scrollToMenu, scrollToAboutUs, scrollToHome }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleOrderNow = () => {
    navigate('/'); 
  };

  return (
    <header>
      <div className="part1">
        <img src="/images/logo_shop.png" alt="Logo" className="logo-img" />
        <div className="logo-name">FastFood</div>
      </div>

      <div className="part2">
        <div className="opening">
          <div className="hello">Hey there, snack lover! Ready to treat yourself?</div>
          <br/> 
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
        <button className="order-button" onClick={handleOrderNow}>Order now!</button>
        <img src="/images/telephone.svg" alt="call" className="call-icon" />
        <div className="hotline">Hotline: 0907 7099</div>
      </div>
    </header>
  );
}

export default Header;
