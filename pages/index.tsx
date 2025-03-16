'use client';

import withLayout from "../hocs/withLayout";
import styles from "../styles/Home.module.scss";
import { useIsMobile } from '../hooks/use-is-mobile';
import { useEffect, useState } from 'react';
import Link from "next/link";

const Home: React.FC = ({ }) => {
  const isMobile = useIsMobile();

  const [video, setVideo] = useState(isMobile ? require('../public/video-mobile.mp4') : require('../public/video-home.mp4'));
  useEffect(() => setVideo(isMobile ? require('../public/video-mobile.mp4') : require('../public/video-home.mp4')), [isMobile])

  return (
    <div className={styles.homeContainer}>
      <div className={styles.videoContainer}>
        <video autoPlay muted playsInline loop className={styles.mainVideo} key={`${isMobile}`}>
          <source
            src={video}
            type="video/mp4"
          />
        </video>
        <Link href="/shop">
          <button
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)', // Center horizontally
              padding: '12px 24px',
              backgroundColor: '#000', // Black background
              color: '#fff', // White text
              border: 'none',
              cursor: 'pointer',
              zIndex: 10, // Ensure it’s above the video
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};
export default withLayout(Home);
