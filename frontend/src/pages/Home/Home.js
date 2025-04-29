import React, { useState } from 'react';
import BackToHome from './BackToHome';
import Menu from '../Menu/Menu';
import Filter from './Filter';
import Cart from '../Cart/YourCart';
import '../../styles/Home.css';

const Home = ({ goToPayment }) => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app-container">
    <div className="back-to-home-wrapper">
      <BackToHome />
    </div>
    <div className="main-content">
      <div className="left-section">
        <div className="filter-products">
          <Filter onCategoryChange={setSelectedCategory} />
        </div>
        <div className="menu-products">
          <Menu category={selectedCategory} />
        </div>
      </div>
        <div className="your-cart">
          <Cart onCheckout={goToPayment} /> 
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react';
// import BackToHome from './BackToHome';
// import Menu from '../Menu/Menu';
// import Filter from './Filter';
// import YourCart from './Cart/YourCart';
// import axios from 'axios';
// import '../../styles/Home.css';

// const Home = () => {
//   const [cartItems, setCartItems] = useState([]);

//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/cart");

//       const cartItems = response.data|| [];
//       setCartItems(cartItems);
//       console.log("Giỏ hàng:", response.data.cartItems);
//     } catch (err) {
//       console.error("Lỗi khi tải giỏ hàng:", err);
//     }
//   };

//   const handleIncrease = async (id) => {
//     try {
//       await axios.post("http://localhost:5000/cart/increase", { id });
//       fetchCartItems();
//     } catch (err) {
//       console.error("Lỗi khi tăng số lượng:", err);
//     }
//   };

//   const handleDecrease = async (id) => {
//     try {
//       await axios.post("http://localhost:5000/cart/decrease", { id });
//       fetchCartItems();
//     } catch (err) {
//       console.error("Lỗi khi giảm số lượng:", err);
//     }
//   };
// console.log("Giỏ hàng:", cartItems);
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   return (
//     <div className="app-container">
//       <div className="back-to-home-wrapper">
//         <BackToHome />
//       </div>
//       <div className="main-content">
//         <div className="left-section">
//           <div className="filter-products">
//             <Filter />
//           </div>
//           <div className="menu-products">
//             <Menu fetchCartItems={fetchCartItems} />
//           </div>
//         </div>
//         <div className="your-cart">
//           <YourCart/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;