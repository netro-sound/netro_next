import BaseService from '@/services/BaseService';
import { IAlbum } from '@/interfaces/AlbumInterface';

export default new BaseService<IAlbum>('/albums');
