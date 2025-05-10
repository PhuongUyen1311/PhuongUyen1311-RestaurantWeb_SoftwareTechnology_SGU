import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm import useNavigate

const Menu = ({ scrollToContact, scrollToMenu, scrollToAboutUs, scrollToHome }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();  // Khởi tạo navigate

  const menuItems = ['Home', 'Menu', 'About us', 'Order', 'Contact'];

  const scrollTo = {
    'Menu': scrollToMenu,
    'About us': scrollToAboutUs,
    'Contact': scrollToContact,
    'Home': scrollToHome,
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    const item = menuItems[index];

    if (item === 'Order') {
      navigate('/home');
    } else {
      scrollTo[item]();  // Gọi hàm tương ứng với mục menu khác
    }
  };

  return (
    <div className="menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-items ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Menu;
