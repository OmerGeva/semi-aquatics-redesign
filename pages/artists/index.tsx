import Cms from '../../cms';
import ArtistsPage from '../../components/artists-page/artists-page.component';
import withLayout from '../../hocs/withLayout';
import { generateSlug } from '../../utils/generate-slug';
import { ArtistsT } from '../../types';
import type { GetStaticProps } from 'next';

interface PropsT {
  sidebarArtists: ArtistsT;
}

// @ts-ignore
const Artists: React.FC = ({ sidebarArtists }: PropsT) => {
  return <ArtistsPage artists={sidebarArtists} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const cms = new Cms();

  const artists: ArtistsT = await cms.getArtists();

  const artistsWithSlugs = artists.map((artist) => ({
    ...artist,
    slug: generateSlug(artist.name),
  }));

  return {
    props: {
      sidebarArtists: artistsWithSlugs,
    },
    revalidate: 300,
  };
}

export default withLayout(Artists);
