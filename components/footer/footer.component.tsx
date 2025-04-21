import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

import EmailForm from '../email-form/email-form.component';

import { INTERNAL_LINKS } from '../../constants/internal-links';
import { INSTAGRAM_LINK } from '../../constants/external-links';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topSection}>
        <div className={styles.formSection}>
        <p>Join our newsletter to receive updates</p>
        <p className={styles.lastP}>on new releases, restocks and more.</p>
        <EmailForm />
        </div>
        <div className={styles.linksSection}>
          <div className={styles.individualSection}>
            <p>Brand</p>
            <div className={styles.links}>
              <Link href={INTERNAL_LINKS.STORY.url}>
                { INTERNAL_LINKS.STORY.text }
              </Link>
              <Link href={INTERNAL_LINKS.ARTISTS.url}>
                { INTERNAL_LINKS.ARTISTS.text }
              </Link>
            </div>
          </div>
          <div className={styles.individualSection}>
            <p>Legal</p>
            <div className={styles.links}>
              <Link href={INTERNAL_LINKS.PRIVACY_POLICY.url}>
                  { INTERNAL_LINKS.PRIVACY_POLICY.text }
                </Link>
                <Link href={INTERNAL_LINKS.TERMS.url}>
                  { INTERNAL_LINKS.TERMS.text }
                </Link>
            </div>
          </div>
          <div className={styles.individualSection}>
            <p>Service</p>
            <div className={styles.links}>
            <Link href={INTERNAL_LINKS.SHIPPING.url}>
                  { INTERNAL_LINKS.SHIPPING.text }
                </Link>
                <Link href={INTERNAL_LINKS.SUPPORT.url}>
                  { INTERNAL_LINKS.SUPPORT.text }
                </Link>
            </div>
          </div>
          <div className={styles.individualSection}>
            <p>Socials</p>
            <div className={styles.links}>
              <a href={INSTAGRAM_LINK}>Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <img
          src="https://cdn.shopify.com/s/files/1/0276/3305/7867/files/big3_1410x.png?v=1575617303"
          alt="Main Logo"
          className={styles.logo}
        />
        <div className={styles.copyright}>
        © {new Date().getFullYear()} Semi Aquatics
        </div>
      </div>
    </footer>
  );
};

export default Footer;
