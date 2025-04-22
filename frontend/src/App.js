import React from 'react';
import BackToHome from './pages/BackToHome';
import Menu from './pages/Menu';

const App = () => {
  const containerStyle = {
    backgroundColor: '#1A1A1A',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  const backToHomeWrapperStyle = {
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={backToHomeWrapperStyle}>
        <BackToHome />
      </div>
      <div style={{ color: '#FFFFFF' }}><Menu /></div>
    </div>
  );
};

export default App;