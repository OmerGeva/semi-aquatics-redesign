import axios from 'axios';
import { ArtistT, ArtistsT } from '../types';
import moment from 'moment-timezone';

const baseUri = process.env.NEXT_PUBLIC_DEV_CMS === 'development' ? 'http://localhost:4000' : 'https://semi-aquatics-cms.onrender.com';

class Cms {
  async getNextDrop() {
    try {
      const response = await axios.get(`${baseUri}/api/next-drop`);
      const drop = response.data;
  
      const estDateTime = moment.tz(drop.dateTime, 'America/New_York').format('YYYY-MM-DD HH:mm:ss');
      
      return { ...drop, dateTime: estDateTime };
    } catch (error) {
      console.error('Error fetching next drop:', error);
      throw error;
    }
  }
  
  async getArtistByArtwork(artworkId: string): Promise<ArtistT | null> {
    try {
      const response = await axios.get(`${baseUri}/api/artist?artworkId=${artworkId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist by artwork:', error);
      return null;
    }
  }

  async getNextDropPassword(): Promise<{ password: string }> {
    try {
      const response = await axios.get(`${baseUri}/api/nxt-drop-password`);
      return response.data;
    } catch (error) {
      console.error('Error fetching next drop:', error);
      throw error;
    }
  }

  async getArtists(): Promise<ArtistsT> {
    try {
      const response = await fetch(`${baseUri}/api/artists`);

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching artists:', error);
      throw error;
    }
  }
}

export default Cms;
