import { create } from 'zustand';
import { ITrack } from '@/interfaces/TrackInterface';
import { COOKIE_NAME } from '@/lib/session.config';
import { concatAPIUrl } from '@/utils';
import TrackService from '@/services/TrackService';

type TrackData = {
  blobParts: Blob[];
  nextRange: number;
  maxRange: number;
  contentType: string;
};

interface PlayerState {
  currentTrack: ITrack | null;
  changeTrack: (track: ITrack, play?: boolean) => void;
  nextTrack: (play?: boolean) => void | ITrack;
  previousTrack: (play?: boolean) => void | ITrack;
  queue: ITrack[];
  setQueue: (tracks: ITrack[]) => void;
  addTracksToQueue: (track: ITrack[]) => void;
  removeTracksFromQueue: (track: ITrack[]) => void;
  audioTag: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  setAudioTag: (audioTag: HTMLAudioElement) => void;
  trackData: TrackData;
}

const usePlayerStore = create<PlayerState>()((set, get) => ({
  audioTag: null,
  setAudioTag: (audioTag: HTMLAudioElement) => set({ audioTag }),
  currentTrack: null,
  queue: [],
  trackData: {} as TrackData,
  play: () => {
    const { audioTag } = get();
    audioTag?.play();
  },
  pause: () => {
    const { audioTag } = get();
    audioTag?.pause();
  },
  setQueue: (queue: ITrack[]) => set({ queue }),
  addTracksToQueue: (tracks: ITrack[]) =>
    set((state) => ({
      queue: [
        ...state.queue,
        ...tracks.filter((i) => !get().queue.includes(i)),
      ],
    })),
  removeTracksFromQueue: (tracks: ITrack[]) =>
    set((state) => ({
      queue: state.queue.filter((i) => !tracks.includes(i)),
    })),
  changeTrack: async (track, play = false) => {
    const { audioTag } = get();
    audioTag?.pause();
    set({ currentTrack: track });

    const { token } = await TrackService.fetchTokenAccess(track.spotify_id);

    audioTag?.setAttribute(
      'src',
      concatAPIUrl(`/v1/tracks/${track.spotify_id}/stream?token=${token}`)
    );
    if (play) {
      audioTag?.addEventListener('loadeddata', audioTag?.play);
    }
  },
  nextTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get();
    const index = queue.findIndex(
      (i) => i.spotify_id === currentTrack?.spotify_id
    );
    if (index + 1 < queue.length) {
      changeTrack(queue[index + 1], play);
      return queue[index + 1];
    }
  },
  previousTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get();
    const index = queue.findIndex(
      (i) => i.spotify_id === currentTrack?.spotify_id
    );
    if (index - 1 >= 0) {
      changeTrack(queue[index - 1], play);
      return queue[index - 1];
    }
  },
}));

export default usePlayerStore;
