// src/pages/BankTransfer/BankTransferPage.jsx
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../../styles/BankingQRCode.css';

const BankingQRCode = ({ bankInfo, vietQRString, onConfirm }) => {
  return (
    <div className="bank-transfer-page">
      <h2>Thanh toán qua chuyển khoản ngân hàng</h2>
      <div className="qr-code-section">
        <h3>Quét mã QR để thanh toán</h3>
        <div className="qr-code">
          <QRCodeCanvas value={vietQRString} size={200} />
        </div>
        <p>Ngân hàng: {bankInfo.bankName}</p>
        <p>Số tài khoản: {bankInfo.accountNumber}</p>
        <p>Chủ tài khoản: {bankInfo.accountHolder}</p>
        <p>Số tiền: {bankInfo.amount} VNĐ</p>
        <p>Mã đơn hàng: {bankInfo.orderId}</p>
        <button className="btn btn-confirm" onClick={onConfirm}>
          Xác nhận đã chuyển khoản
        </button>
      </div>
    </div>
  );
};

export default BankingQRCode;
