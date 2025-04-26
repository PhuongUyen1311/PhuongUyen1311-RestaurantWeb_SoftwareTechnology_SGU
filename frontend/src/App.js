import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Payment from './pages/Payment/Payment';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && <Home goToPayment={() => setCurrentPage('payment')} />}
      {currentPage === 'payment' && <Payment />}
    </>
  );
};

export default App;
