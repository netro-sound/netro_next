import BaseService from '@/services/BaseService';
import {
  IExperimentQuery,
  IExperimentQueryCreate,
} from '@/interfaces/ExperimentInterface';
import { mlAxios } from '@/lib/axios';
import { ITrack } from '@/interfaces/TrackInterface';

class ExperimentQueryService extends BaseService<IExperimentQuery> {
  constructor() {
    super('/queries', mlAxios);
  }

  async fetchPredictions(id: string): Promise<ITrack[]> {
    try {
      const response = await this.client.get(
        this.path + '/' + id + '/predictions'
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async queryTrack() {
    try {
      const response = await this.client.get(this.path + '/query_track');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(
    data: IExperimentQueryCreate | FormData
  ): Promise<IExperimentQuery> {
    try {
      if (data instanceof FormData) {
        const response = await this.client.post(this.path, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }

      const response = await this.client.post(this.path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ExperimentQueryService();
