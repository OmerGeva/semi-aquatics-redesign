import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import styles from './Layout.module.scss'
import Navbar from '../navbar/navbar.component'
import Sidebar from '../sidebar/sidebar.component';
import SpinningLogo from '../spinning-logo/spinning-logo.component';
import CountdownTimer from '../countdown-timer/countdown-timer.component';
import ThirdPartyScripts from './third-party-scripts.component';
import MainHead from './main-head.component';

// Hooks
import { useIsTimeLeft } from '../../hooks/use-is-time-left'
import Footer from '../footer/footer.component';
import CartSidebar from '../cart-sidebar/cart-sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const typeOfPage = pathname.substring(1);

    return (
      <div className={styles.layoutContainer}>
        <MainHead />
        
        <Navbar title={typeOfPage} setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} setSidebarOpen={setSidebarOpen} />

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <CartSidebar />

        {children}
        { pathname !== '/' && <Footer /> }
        <ThirdPartyScripts />
        </div>
    );
};

export default Layout;
