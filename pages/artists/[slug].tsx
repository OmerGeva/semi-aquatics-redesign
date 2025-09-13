import Cms from '../../cms';
import withLayout from '../../hocs/withLayout';
import { generateSlug } from '../../utils/generate-slug';
import { ArtistsT, ArtistT } from '../../types';
import ArtistsPage from '../../components/artists-page/artists-page.component';
import type { GetStaticPaths, GetStaticProps } from 'next';

interface PropsT {
  sidebarArtists: ArtistsT;
  selectedArtist: ArtistT;
}

// @ts-ignore
const Artist: React.FC<PropsT> = ({ selectedArtist, sidebarArtists }) => {
  return <ArtistsPage selectedArtist={selectedArtist} artists={sidebarArtists} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cms = new Cms();
  const slug = String((context.params as { slug: string }).slug);

  const artists: ArtistsT = await cms.getArtists();

  const artistsWithSlugs = artists.map((artist) => ({
    ...artist,
    slug: generateSlug(artist.name),
  }));

  const selectedArtist = artistsWithSlugs.find((artist) => artist.slug === slug.toLowerCase());

  if (!selectedArtist) {
    return {
      redirect: {
        destination: '/artists',
        permanent: false,
      },
      revalidate: 60, // short revalidate for redirect edge-case
    } as any;
  }

  return {
    props: {
      selectedArtist,
      sidebarArtists: artistsWithSlugs,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate no paths at build and use blocking fallback
  // so new artists are generated on first request.
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default withLayout(Artist);
