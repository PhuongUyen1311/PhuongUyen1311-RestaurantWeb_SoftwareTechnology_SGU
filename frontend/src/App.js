// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import BankingQRCodePage from './pages/BankingQRCode/BankingQRCode';
import Main from './pages/Main/Main';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/return" element={<Payment />} />
      <Route path="/bank-transfer" element={<BankingQRCodePage />} />
      <Route path="/main" element={<Main />}  />
    </Routes>
  );
};

export default App;