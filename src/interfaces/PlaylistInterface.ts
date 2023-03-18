import { IThumbnail } from '@/interfaces/ThumbnailInterface';

export interface IPlaylist {
  id: number;
  name: string;
  description: string;
  spotify_id: string;
  thumbnails: IThumbnail[];
}
