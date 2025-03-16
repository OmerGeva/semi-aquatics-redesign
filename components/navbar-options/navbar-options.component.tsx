import { Dispatch, SetStateAction, useRef } from "react";

import { capitalize } from "../../helpers/formatters";
import styles from './NavbarOptions.module.scss'
import Link from 'next/link'

import { IconContext } from "react-icons";
import { SiInstagram } from 'react-icons/si';

// Hooks
import { useOnClickOutside } from "../../hooks/use-on-click-outside";

const ROUTES = ['drop', 'lookbook', 'archive', 'story', 'artists', 'faq']
const CURRENT_ROUTES = ['drop', 'archive', 'faq']

interface NavbarOptionsProps {
    setNavbarOpen: Dispatch<SetStateAction<boolean>>
}

const NavbarOptions:React.FC<NavbarOptionsProps> = ({ setNavbarOpen }) => {
    const ref: any = useRef(null);

    useOnClickOutside(ref, () => setNavbarOpen(false));

    return (
        <div className={styles.navbarOptionsContainer} >
            <div className={styles.menuItemsContainer} ref={ref}>

                {
                    ROUTES.map(route => 
                        <Link href={`\\${route}`} key={route}>
                            <a>{capitalize(route)}</a>
                        </Link>
                    )
                }
                <a href="https://www.instagram.com/semiaquatics" target='_blank'>
                    <IconContext.Provider value={{ className: "arrow-right-email" }}>
                        <SiInstagram />
                    </IconContext.Provider>
                </a>
            </div>

        </div>
    );
};

export default NavbarOptions;
