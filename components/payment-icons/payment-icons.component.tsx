import React from 'react';
import styles from './PaymentIcons.module.scss';

// Import SVGs as React Components
import Visa from '../../public/svgs/payment-icons/visa.svg';
import MasterCard from '../../public/svgs/payment-icons/master-card.svg';
import PayPal from '../../public/svgs/payment-icons/paypal.svg';
import ApplePay from '../../public/svgs/payment-icons/apple-pay.svg';
import GooglePay from '../../public/svgs/payment-icons/google-pay.svg';
import Amex from '../../public/svgs/payment-icons/amex.svg';
import Maestro from '../../public/svgs/payment-icons/maestro.svg';
import ShopifyPay from '../../public/svgs/payment-icons/shopify-pay.svg';

const PaymentIcons = () => {
  return (
    <div className={styles.paymentIcons}>
      <Visa className={styles.icon} />
      <MasterCard className={styles.icon} />
      <PayPal className={styles.icon} />
      <ApplePay className={styles.icon} />
      <GooglePay className={styles.icon} />
      <Amex className={styles.icon} />
      <Maestro className={styles.icon} />
      <ShopifyPay className={styles.icon} />
    </div>
  );
};

export default PaymentIcons;
