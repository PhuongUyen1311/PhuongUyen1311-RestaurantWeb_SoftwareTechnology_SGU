import React from 'react';

const MenuItem = ({ item, onAddToCart }) => {
  const itemStyle = {
    backgroundColor: '#2D2D2D', // Màu nền xám đậm
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative', // Thêm để nút absolute nằm trong phạm vi div
    minHeight: '250px', // Đảm bảo div có chiều cao đủ để nút hiển thị đúng
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '8px',
  };

  const nameStyle = {
    color: '#FFFFFF', // Màu chữ trắng
    fontSize: '18px',
    margin: '0 0 4px 0',
  };

  const priceStyle = {
    color: '#A0A0A0', // Màu chữ xám nhạt cho giá
    fontSize: '16px',
    margin: '0 0 8px 0',
  };

  const buttonStyle = {
    backgroundColor: '#FF6200', // Màu cam
    color: '#FFFFFF',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    position: 'absolute', // Đặt nút ở vị trí tuyệt đối
    bottom: '16px', // Cách đáy 16px
    right: '16px', // Cách phải 16px
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#E05700', // Màu cam đậm hơn khi hover
  };

  return (
    <div
      style={itemStyle}
      onMouseEnter={(e) =>
        (e.currentTarget.querySelector('button').style.backgroundColor =
          buttonHoverStyle.backgroundColor)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.querySelector('button').style.backgroundColor =
          buttonStyle.backgroundColor)
      }
    >
      <img
        src={`/images/${item.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
        alt={item.name}
        style={imageStyle}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />
      <h3 style={nameStyle}>{item.id}. {item.name}</h3>
      <p style={priceStyle}>Kr {item.price.toFixed(2)}</p>
      <button style={buttonStyle} onClick={() => onAddToCart(item)}>
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;