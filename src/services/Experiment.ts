import BaseService from '@/services/BaseService';
import {
  IExperiment,
  IExperimentQuery,
} from '@/interfaces/ExperimentInterface';
import { mlAxios } from '@/lib/axios';
import { IPagination } from '@/interfaces/PaginationInterface';

class ExperimentService extends BaseService<IExperiment> {
  constructor() {
    super('/experiments', mlAxios);
  }

  async fetchQueries(
    id: string,
    page: number = 1
  ): Promise<IPagination<IExperimentQuery>> {
    try {
      const { data } = await this.client.get(`${this.path}/${id}/queries`, {
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

export default new ExperimentService();
