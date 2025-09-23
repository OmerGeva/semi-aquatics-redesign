import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../contexts/cart-context';
import styles from './Navbar.module.scss';
import { VscMenu } from 'react-icons/vsc';
import { useIsMobile } from '../../hooks/use-is-mobile';
import { IoBagSharp } from 'react-icons/io5';
import React, { useState } from 'react';
import NewsletterModal from '../newsletter-modal/newsletter-modal.component';
import WaveToggle from '../wave-toggle/wave-toggle.component';

interface NavbarProps {
  title?: string;
  setNavbarOpen?: (open: boolean) => void;
  navbarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, setNavbarOpen, navbarOpen, setSidebarOpen }) => {
    const router = useRouter();
    const { openCart } = useCart();
    const { cartItemCount } = useCart();
    const isMobile = useIsMobile();
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

    const isActive = (path: string) => router.pathname === path;

    return (
    <>
      {isMobile && (
        <div className={`${styles.announcementBanner} ${router.pathname === '/' ? styles.homepageBanner : ''}`}>
            <div className={styles.scrollingText} onClick={() => setIsNewsletterModalOpen(true)}>
              A new wave of Semi Aquatics surfaces October 6. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sign up for our email list and unlock 15% off your first order.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      )}
      <div className={styles.navbarContainer}>
        {isMobile ? (
          <div className={styles.navLink} onClick={() => setSidebarOpen(true)}>
            Menu
          </div>
        ) : (
          <div className={styles.navLinksPill}>
          <Link href="/shop" className={`${styles.navLink} ${isActive('/shop') ? styles.active : ''}`}>
            Shop
          </Link>
          <Link href="/story" className={`${styles.navLink} ${isActive('/story') ? styles.active : ''}`}>
            Story
          </Link>
          <Link href="/artists" className={`${styles.navLink} ${isActive('/artists') ? styles.active : ''}`}>
            Artists
          </Link>
        </div>
        )}

        <Link href="/" className={styles.logoLink}>
          <img
            src={'/top-nav-logo.png'}
            alt="Top Logo"
            className={styles.topLogo}
          />
        </Link>

        <div className={styles.rightContainer}>
          {isMobile ? null : (
            <>
              <WaveToggle className={styles.waveToggleDesktop} />
              <div className={styles.signUpNewsletter} onClick={() => setIsNewsletterModalOpen(true)}>
                <div className={styles.scrollingText}>
                    A new wave of Semi Aquatics surfaces October 6. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sign up for our email list and unlock 15% off your first order.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </>
          )}
        <div className={styles.bagContainer} onClick={openCart}>
          {isMobile ? (
              <IoBagSharp />
          ) : (
          <>Bag<span className={styles.cartCount}>{cartItemCount}</span></>
          )}
        </div>
        </div>
      </div>
      <NewsletterModal isOpen={isNewsletterModalOpen} onClose={() => setIsNewsletterModalOpen(false)} />
    </>
  );
}

export default Navbar;
