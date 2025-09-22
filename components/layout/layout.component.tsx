import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router';
import Lenis from '@studio-freight/lenis';

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
import { useIsMobile } from '../../hooks/use-is-mobile';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const isMobile = useIsMobile();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const typeOfPage = pathname.substring(1);

    // Lenis setup
    useEffect(() => {
        const lenis = new Lenis(
            isMobile
                ? {
                    // Easier, lower-resistance touch scrolling on mobile
                    duration: 0.9,
                    touchMultiplier: 2.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  }
                : {
                    // Desktop keeps smooth, controlled feel
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  }
        );

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            lenis.destroy();
        };
    }, [isMobile]); // Re-init if device context changes

    return (
      <div className={styles.layoutContainer}>
        <MainHead />

        <Navbar title={typeOfPage} setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} setSidebarOpen={setSidebarOpen} />

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <CartSidebar />
        <div className={styles.contentContainer}>
          {children}
        </div>
        { pathname !== '/' && <Footer /> }
        <ThirdPartyScripts />
        </div>
    );
};

export default Layout;
