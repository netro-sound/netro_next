import { ITrack } from '@/interfaces/TrackInterface';
import { IThumbnail } from '@/interfaces/ThumbnailInterface';

export interface IAlbum {
  id: number;
  album_type: string;
  label: string;
  total_tracks: number;
  popularity: number;
  spotify_id: string;
  spotify_href: string;
  tracks: ITrack[];
  thumbnails: IThumbnail[];
}
