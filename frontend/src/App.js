import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import Home from './pages/Home/Home';
import Cart from './pages/Cart/YourCart';
import Payment from './pages/Payment/Payment';
import BankingQRCodePage from './pages/BankingQRCode/BankingQRCode';
import Main from './pages/Main/Main';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} /> {/* Thêm ToastContainer vào đây */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/return" element={<Payment />} />
        <Route path="/bank-transfer" element={<BankingQRCodePage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
