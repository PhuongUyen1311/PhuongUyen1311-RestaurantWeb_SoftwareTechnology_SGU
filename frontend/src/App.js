// src/App.js
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/YourCart';
import Payment from './pages/Payment/Payment';
import BankingQRCodePage from './pages/BankingQRCode/BankingQRCode';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';

const App = () => {
 
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/return" element={<Payment />} />
        <Route path="/bank-transfer" element={<BankingQRCodePage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
