import { IThumbnail } from '@/interfaces/ThumbnailInterface';
import { IArtist } from '@/interfaces/ArtistInteface';

export interface IAlbum {
  id: number;
  name: string;
  album_type: string;
  // label: string;
  // total_tracks: number;
  // popularity: number;
  spotify_id: string;
  artists: IArtist[];
  // spotify_href: string;
  // tracks: ITrack[];
  thumbnails: IThumbnail[];
}
