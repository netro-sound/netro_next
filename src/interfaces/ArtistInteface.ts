import { IAlbum } from '@/interfaces/AlbumInterface';
import { IThumbnail } from '@/interfaces/ThumbnailInterface';
import { ITrack } from '@/interfaces/TrackInterface';

export interface IArtist {
  id: number;
  name: string;
  spotify_id: string;
  spotify_href: string;
  albums: IAlbum[];
  thumbnails: IThumbnail[];
  tracks: ITrack[];
}
