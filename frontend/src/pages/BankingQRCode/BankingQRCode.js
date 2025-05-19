import { useLocation, useNavigate } from 'react-router-dom';
import BankingQRCode from '../../components/BankingQRCode/BankingQRCode';
import PaymentHeader from '../../components/Payment/PaymentHeader';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';


const BankingQRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentInfo, orderId } = location.state || {};
  const cost = paymentInfo.cost.toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  // Thông tin tài khoản ngân hàng 
  const bankInfo = {
    bankName: 'ACB',
    accountNumber: '28256177',
    accountHolder: 'Tran Ngo Nhat Nam',
    amount: paymentInfo ? cost : 0,
    orderId: orderId || `${Date.now()}`,
  };

  const vietQRString = `00020101021138520010VN0708${bankInfo.accountNumber}5204000053037045408${bankInfo.amount}5802VN5912${bankInfo.accountHolder}62070803QRIBFTTA6304`;

  const confirmBankTransfer = async () => {
    try {
      const updateResponse = await axios.post('http://localhost:5000/food/update');
      console.log('Cập nhật lại số lượng sản phẩm thành công:', updateResponse.data);

      await axios.delete('http://localhost:5000/cart/clear');
      console.log('Giỏ hàng đã được làm mới.');

      toast.success('Xác nhận chuyển khoản thành công!');
      navigate('/home');

    } catch (err) {
      console.error('Lỗi xác nhận chuyển khoản:', err);
      toast.error('Xác nhận chuyển khoản thất bại, vui lòng thử lại!');
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
