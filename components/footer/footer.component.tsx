import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

import EmailForm from '../email-form/email-form.component';

import { INTERNAL_LINKS } from '../../constants/internal-links';
import { INSTAGRAM_LINK } from '../../constants/external-links';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTable}>
        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>Semi Aquatics</div>
          <div className={styles.columnContent}>
            <img
              src="https://cdn.shopify.com/s/files/1/0276/3305/7867/files/big3_1410x.png?v=1575617303"
              alt="Main Logo"
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>Newsletter</div>
          <div className={styles.columnContent}>
            <p>Sign up for our newsletter to receive updates on new releases, restocks and more.</p>
            <EmailForm />
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>Customer Service</div>
          <div className={styles.columnContent}>
            <p>For questions about orders, you can email <span className={styles.emailLink}>info@semiaquatics.com</span>.</p>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>Links</div>
          <div className={styles.columnContent}>
            <ul className={styles.linksList}>
              <li><a href={INSTAGRAM_LINK}>Instagram</a></li>
              <li className={styles.divider}></li>
              <li><Link href={INTERNAL_LINKS.TERMS.url}>Terms & Conditions</Link></li>
              <li><Link href={INTERNAL_LINKS.SHIPPING.url}>Shipping</Link></li>
              <li><Link href={INTERNAL_LINKS.FAQ.url}>FAQ</Link></li>
              <li className={styles.divider}></li>
              <li><Link href={INTERNAL_LINKS.PRIVACY_POLICY.url}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.countrySelector}>USA / USD $</div>
        <div className={styles.copyright}>© {new Date().getFullYear()} Semi Aquatics All rights reserved</div>
        <div className={styles.shopPowered}></div>
      </div>
    </footer>
  );
};

export default Footer;
