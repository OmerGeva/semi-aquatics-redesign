'use client';

import withLayout from "../hocs/withLayout";
import styles from "../styles/Home.module.scss";
import { useIsMobile } from '../hooks/use-is-mobile';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const Home: React.FC = ({ }) => {
  const isMobile = useIsMobile();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  const videoSrc = useMemo(() => {
    if (!mounted) return '';
    return isMobile ? '/video-mobile.mp4' : '/video-home.mp4';
  }, [mounted, isMobile]);

  const handleClick = () => {
    router.push('/shop');
  };

  return (
    <div className={styles.homeContainer} onClick={handleClick}>
      <div className={styles.videoContainer}>
        {mounted && (
          <video autoPlay muted playsInline loop className={styles.mainVideo} key={isMobile ? 'mobile' : 'desktop'}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};
export default withLayout(Home);
