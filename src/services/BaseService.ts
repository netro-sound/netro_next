import { Axios } from 'axios';
import { apiAxios } from '@/lib/axios';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';

class BaseService<T> {
  client: Axios;
  path: string;

  constructor(path = '', client = apiAxios) {
    this.client = client;
    this.path = path;
  }

  async fetch(id: number | string): Promise<T> {
    try {
      const { data } = await this.client.get(`${this.path}/${id}`);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchAll(query = '', page = 1): Promise<IPagination<T>> {
    try {
      const { data } = await this.client.get(this.path, {
        params: {
          search: query,
          page,
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchTracks(
    spotifyID: string | number,
    page: number = 1
  ): Promise<IPagination<ITrack>> {
    try {
      const { data } = await this.client.get(
        `${this.path}/${spotifyID}/tracks`,
        {
          params: {
            page,
          },
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default BaseService;
