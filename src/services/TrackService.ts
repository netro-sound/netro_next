import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import { Axios } from 'axios';
import { apiAxios } from '@/lib/axios';

class TrackService {
  client: Axios;

  constructor() {
    this.client = apiAxios;
  }

  async fetchTokenAccess(spotify_id: string): Promise<{ token: string }> {
    try {
      const { data } = await this.client.post(`/tracks/${spotify_id}/token`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async searchTracks(query: string): Promise<IPagination<ITrack>> {
    try {
      const { data } = await this.client.get(`/tracks/search`, {
        params: {
          q: query,
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchTracks(page = 1): Promise<IPagination<ITrack>> {
    try {
      const { data } = await this.client.get('/tracks', {
        params: {
          page,
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new TrackService();
