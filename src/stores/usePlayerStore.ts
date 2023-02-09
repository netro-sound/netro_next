import { create } from "zustand";
import { ITrack } from "@/interfaces/TrackInterface";
import { concatAPIUrl } from "@/utils";

interface PlayerState {
  currentTrack: ITrack | null;
  changeTrack: (track: ITrack, play?: boolean) => void;
  nextTrack: (play?: boolean) => void | ITrack;
  previousTrack: (play?: boolean) => void | ITrack;
  queue: ITrack[];
  setQueue: (tracks: ITrack[]) => void;
  audioTag: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  setAudioTag: (audioTag: HTMLAudioElement) => void;
}

const usePlayerStore = create<PlayerState>()((set, get) => ({
  audioTag: null,
  setAudioTag: (audioTag: HTMLAudioElement) => set({ audioTag }),
  currentTrack: null,
  queue: [],
  play: () => {
    const { audioTag } = get();
    audioTag?.play();
  },
  pause: () => {
    const { audioTag } = get();
    audioTag?.pause();
  },
  setQueue: (queue: ITrack[]) => set({ queue }),
  changeTrack: async (track, play = false) => {
    const { audioTag } = get();
    audioTag?.pause();
    set({ currentTrack: track });
    audioTag?.setAttribute("src", concatAPIUrl(track.audio));
    if (play) {
      audioTag?.addEventListener("loadeddata", audioTag?.play);
    }
  },
  nextTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get();
    const index = queue.findIndex((i) => i.id === currentTrack?.id);
    if (index + 1 < queue.length) {
      changeTrack(queue[index + 1], play);
      return queue[index + 1];
    }
  },
  previousTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get();
    const index = queue.findIndex((i) => i.id === currentTrack?.id);
    if (index - 1 >= 0) {
      changeTrack(queue[index - 1], play);
      return queue[index - 1];
    }
  }
}));

export default usePlayerStore;
