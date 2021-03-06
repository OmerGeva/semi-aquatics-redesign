import styles from './Sidebar.module.scss'

// Packages
import { GrClose } from 'react-icons/gr'
import { FaInstagram } from 'react-icons/fa'
import { Dispatch, SetStateAction, } from 'react';
import Link from 'next/link';
import { useRef } from 'react'


// Hooks
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

interface SidebarProps {
  sidebarOpen: boolean,
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC <SidebarProps> = ({sidebarOpen, setSidebarOpen}) =>  {
    const ref = useRef();
    useOnClickOutside(ref, () => setSidebarOpen(false));
    return (
      // @ts-ignore
    <div className={`${styles.sidebarContainer} ${!sidebarOpen ? styles.sidebarContainerClosed : ''}`} ref={ref}>
            <button className={styles.closeMenuToggle} onClick={() => setSidebarOpen(false)}>
                <GrClose />
            </button>
        <div className={styles.sidebarWrapper}>
            <div className={styles.innerContainer}>
                <Link href="/">
                    <p onClick={() => setSidebarOpen(false)}>Home</p>
                </Link>
                <Link href="/drop">
                    <p onClick={() => setSidebarOpen(false)}>Drop</p>
                </Link>
                {/* <Link href="/artists">
                    <p onClick={() => setSidebarOpen(false)}>Art</p>
                </Link> */}
                <Link href="/story">
                    <p onClick={() => setSidebarOpen(false)}>Story</p>
                </Link>
                <Link href="/archive">
                    <p onClick={() => setSidebarOpen(false)}>Archive</p>
                </Link>
                <div className={styles.flexGrow}></div>
                <div className={styles.bottomNavbar}>
                  <a>
                    <FaInstagram />
                  </a>
                  <h6 className="footer-item">info@semiaquatics.com</h6>
                  <h6 className="footer-item">© 2022 Semi Aquatics</h6>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Sidebar;
