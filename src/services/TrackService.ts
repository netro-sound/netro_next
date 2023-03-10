import { apiAxios } from '@/lib/axios';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import { Axios } from 'axios';

class TrackService {
  client: Axios;

  constructor() {
    this.client = apiAxios;
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

export default TrackService;
