import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react';
import styles from './Navbar.module.scss'

import { VscMenu } from 'react-icons/vsc';

import { useCart } from '../../contexts/cart-context';
import Link from 'next/link';
import { useIsMobile } from '../../hooks/use-is-mobile';

interface NavbarProps {
    title: string,
    date?: string
    setNavbarOpen: Dispatch<SetStateAction<boolean>>,
    setSidebarOpen: Dispatch<SetStateAction<boolean>>,
    navbarOpen: boolean
}

const Navbar: React.FC<NavbarProps> = ({title, date, setNavbarOpen, navbarOpen, setSidebarOpen}) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { openCart } = useCart();
    const isHomePage = router.pathname === '/';
    const { cartItemCount } = useCart();

    return (
      <div className={isHomePage ? `${styles.navbarContainer} ${styles.navbarContainerHome}` : `${styles.navbarContainer}`}>
        <div className={styles.leftNavbar}>
            <div className={styles.menuIcon} onClick={() => setSidebarOpen(true)}>
                <VscMenu />
            </div>
            {isHomePage && !isMobile &&
            <>
          <Link href="/shop">
            <p>Shop</p>
          </Link>
          <Link href="/story">
            <p>Story</p>
          </Link>
          <Link href="/artists">
            <p>Artists</p>
          </Link>
          </>}
        </div>
        <div className={styles.rightNavbar}>
          <div className={styles.openCart} onClick={openCart}>
            <p>Bag ({cartItemCount || 0})</p>
          </div>
      </div>
    </div>
  )
}

export default Navbar;
