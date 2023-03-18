import { IThumbnail } from '@/interfaces/ThumbnailInterface';

export interface IArtist {
  id: number;
  name: string;
  spotify_id: string;
  // spotify_href: string;
  // albums: IAlbum[];
  thumbnails: IThumbnail[];
  // tracks: ITrack[];
}
