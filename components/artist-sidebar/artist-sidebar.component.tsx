import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineArrowRight } from 'react-icons/hi';
import styles from './ArtistSidebar.module.scss';
import { ArtistsT } from '../../types';
import { Dispatch, SetStateAction } from 'react';

interface ArtistSidebarProps {
  artists: ArtistsT;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const ArtistSidebar: React.FC<ArtistSidebarProps> = ({ artists, setIsSidebarOpen }) => {
  const handleClick = () => {
    setIsSidebarOpen(false);
  };

  const router = useRouter();
  const currentSlug = router.query.slug;

  return (
    <div className={styles.artistSidebar}>
      <h2>Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li
            key={artist.slug}
            className={`${styles.artistItem} ${
              currentSlug === artist.slug ? styles.selected : ''
            }`}
            onClick={handleClick}
          >
            <Link href={`/artists/${artist.slug}`}>
                <HiOutlineArrowRight className={styles.arrowIcon} />
                <span>{artist.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistSidebar;
