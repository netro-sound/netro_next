import { apiAxios, ssrAxios } from '@/libs/axios';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import { Axios } from 'axios';

class TrackService {
  client: Axios;

  constructor(clientMode = false) {
    this.client = clientMode ? apiAxios : ssrAxios;
  }

  async fetchTracks(page = 1): Promise<IPagination<ITrack>> {
    const { data } = await this.client.get('/tracks', {
      params: {
        page,
      },
    });
    return data;
  }
}

export default TrackService;
