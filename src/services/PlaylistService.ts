import BaseService from '@/services/BaseService';
import { IPlaylist } from '@/interfaces/PlaylistInterface';

export default new BaseService<IPlaylist>('/playlists');
