'use client';

import withLayout from "../hocs/withLayout";
import styles from "../styles/Home.module.scss";
import { useIsMobile } from '../hooks/use-is-mobile';
import { useEffect, useState } from 'react';

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
      </div>
    </div>
  );
};
export default withLayout(Home);
