import React from 'react';
import styles from './PaymentIcons.module.scss';

// Import SVGs as React Components
import Visa from '../../public/svgs/payment-icons/Visa.png';
import MasterCard from '../../public/svgs/payment-icons/MasterCard.png';
import PayPal from '../../public/svgs/payment-icons/PayPal.png';
import ApplePay from '../../public/svgs/payment-icons/ApplePay.png';
import GooglePay from '../../public/svgs/payment-icons/GooglePay.png';
import Amex from '../../public/svgs/payment-icons/Amex.png';
import ShopifyPay from '../../public/svgs/payment-icons/ShopPay.png';

const PaymentIcons = () => {
  return (
    <div className={styles.paymentIcons}>
      <img src={'/svgs/payment-icons/Visa.png'} alt="Visa" className={styles.icon} />
      <img src={'/svgs/payment-icons/Mastercard.png'} alt="MasterCard" className={styles.icon} />
      <img src={'/svgs/payment-icons/PayPal.png'} alt="PayPal" className={styles.icon} />
      <img src={'/svgs/payment-icons/ApplePay.png'} alt="ApplePay" className={styles.icon} />
      <img src={'/svgs/payment-icons/GooglePay.png'} alt="GooglePay" className={styles.icon} />
      <img src={'/svgs/payment-icons/Amex.png'} alt="Amex" className={styles.icon} />
      <img src={'/svgs/payment-icons/ShopPay.png'} alt="ShopifyPay" className={styles.icon} />
    </div>
  );
};

export default PaymentIcons;
