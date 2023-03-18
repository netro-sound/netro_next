import BaseService from '@/services/BaseService';
import { IArtist } from '@/interfaces/ArtistInteface';

export default new BaseService<IArtist>('/artists');
