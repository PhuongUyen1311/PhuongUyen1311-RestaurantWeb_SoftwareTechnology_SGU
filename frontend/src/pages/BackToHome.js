const BackToHome = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: '10px 20px',
    borderRadius: '8px',
    width: 'fit-content',
    border: '2px solid red', // Thêm border đỏ để dễ thấy
    zIndex: 10, // Đảm bảo không bị che
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#FF0000', // Đổi thành đỏ để nổi bật
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const iconStyle = {
    marginRight: '8px',
    fontSize: '20px',
    color: '#FF0000', // Đổi thành đỏ
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle}>
        <span style={iconStyle}>🏠</span> {/* Thay "hihi" bằng biểu tượng nhà */}
        Back to home
      </button>
    </div>
  );
};

export default BackToHome;