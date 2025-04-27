import { useLocation, useNavigate } from 'react-router-dom';
import BankingQRCode from '../../components/BankingQRCode/BankingQRCode';
import PaymentHeader from '../../components/Payment/PaymentHeader';

const BankingQRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin từ state được truyền từ trang trước
  const { paymentInfo, orderId } = location.state || {};

  // Thông tin tài khoản ngân hàng (giả lập, bạn có thể thay đổi)
  const bankInfo = {
    bankName: 'ACB',
    accountNumber: '28256177',
    accountHolder: 'Tran Ngo Nhat Nam',
    amount: paymentInfo ? (paymentInfo.cost + paymentInfo.tax).toFixed(3) : 0,
    orderId: orderId || `${Date.now()}`,
  };

  // Tạo chuỗi VietQR
  const vietQRString = `00020101021138520010VN0708${bankInfo.accountNumber}5204000053037045408${bankInfo.amount}5802VN5912${bankInfo.accountHolder}62070803QRIBFTTA6304`;

  const confirmBankTransfer = async () => {
    // Giả lập xác nhận chuyển khoản thành công
    try {
      // Bạn có thể gọi API để lưu đơn hàng nếu cần
      alert('Xác nhận chuyển khoản thành công!');
      navigate('/'); // Chuyển hướng về trang chủ
    } catch (err) {
      console.error('Lỗi xác nhận chuyển khoản:', err);
      alert('Xác nhận chuyển khoản thất bại, vui lòng thử lại!');
    }
  };
  return (
    <div className="container-payment">
      <PaymentHeader />
      <div className="content-wrapper">
        <BankingQRCode
          bankInfo={bankInfo}
          vietQRString={vietQRString}
          onConfirm={confirmBankTransfer}
        />
      </div>
    </div>

  );
};

export default BankingQRCodePage;
