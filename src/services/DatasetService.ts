import BaseService from '@/services/BaseService';
import { IDataset } from '@/interfaces/DatasetInterface';

export default new BaseService<IDataset>('/datasets');
