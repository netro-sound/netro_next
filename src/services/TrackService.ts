import { ITrack } from '@/interfaces/TrackInterface';
import BaseService from '@/services/BaseService';

class TrackService extends BaseService<ITrack> {
  constructor() {
    super('/tracks');
  }

  async fetchSimilarTracks(spotify_id: string): Promise<ITrack[]> {
    try {
      const { data } = await this.client.get(`/tracks/${spotify_id}/similar`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchTokenAccess(spotify_id: string): Promise<{ token: string }> {
    try {
      const { data } = await this.client.get(`/tracks/${spotify_id}/token`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new TrackService();
