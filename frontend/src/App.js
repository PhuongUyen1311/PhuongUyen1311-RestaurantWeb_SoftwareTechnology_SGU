// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import BankingQRCodePage from './pages/BankingQRCode/BankingQRCode';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/return" element={<Payment />} />
      <Route path="/bank-transfer" element={<BankingQRCodePage />} /> {/* Thêm tuyến đường mới */}
    </Routes>
  );
};

export default App;