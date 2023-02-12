import { apiAxios } from '@/libs/axios';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';

class TrackService {
  async fetchTracks(page = 1): Promise<IPagination<ITrack>> {
    const { data } = await apiAxios.get('/tracks', {
      params: {
        page,
      },
    });
    return data;
  }
}

export default new TrackService();
