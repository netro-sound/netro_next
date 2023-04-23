import { IArtist } from '@/interfaces/ArtistInteface';
import { IAlbum } from '@/interfaces/AlbumInterface';
import { IThumbnail } from '@/interfaces/ThumbnailInterface';

export interface ITrack {
  spotify_id: string;
  audio: string;
  id: number;
  name: string;
  artists: IArtist[];
  albums: IAlbum[];
  duration_ms: number;
  thumbnails: IThumbnail[];
  accuracy?: number;
  support?: number;
}
