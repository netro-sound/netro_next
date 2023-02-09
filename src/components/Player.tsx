import Image from "next/image";
import { concatAPIUrl, concatSSRUrl } from "@/utils";
import usePlayerStore from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";
import useSeoStore from "@/stores/useSeoStore";
import { ITrack } from "@/interfaces/TrackInterface";
import Skeleton from "@/components/skeletons/Skeleton";

type Props = { defaultAudio: ITrack };
export default function Player({ defaultAudio }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [
    currentTrack,
    audioTag,
    setAudioTag,
    play,
    pause,
    nextTrack,
    previousTrack
  ] = usePlayerStore((state) => [
    state.currentTrack,
    state.audioTag,
    state.setAudioTag,
    state.play,
    state.pause,
    state.nextTrack,
    state.previousTrack
  ]);

  const [setSeo] = useSeoStore((state) => [state.setSeo]);

  function getElementByTrack() {
    return document.querySelector(`[data-track-spotify_id="${currentTrack?.spotify_id}"]`);
  }

  function endedEvent() {
    nextTrack(true);
    const el = getElementByTrack();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    audioRef.current?.addEventListener("ended", endedEvent);

    setSeo({
      title:
        "Netro Sound | " +
        currentTrack?.name +
        " - " +
        currentTrack?.artists.map((i) => i.name).join(", ")
    });

    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack?.name,
        artist: currentTrack?.artists.map((i) => i.name).join(", "),
        album: currentTrack?.albums[0].name,
        artwork: currentTrack?.thumbnails.map((i) => ({
          src: i.image,
          sizes: `${i.width}x${i.height}`,
          type: "image/jpeg"
        })) as MediaImage[]
      });

      navigator.mediaSession.setActionHandler("play", () => {
        play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        pause();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        previousTrack();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextTrack();
      });
    }

    return () => {
      audioRef.current?.removeEventListener("ended", endedEvent);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      setAudioTag(audioRef.current);
    }
  }, [audioRef.current]);

  return (
    <>
      {currentTrack ? (
        <Image
          src={concatSSRUrl(currentTrack?.thumbnails[5].image)}
          width={currentTrack?.thumbnails[5].width}
          height={currentTrack?.thumbnails[5].height}
          alt="album cover"
          className="w-full"
        />
      ) : (
        <Image
          src={concatSSRUrl(defaultAudio?.thumbnails[5].image)}
          width={defaultAudio?.thumbnails[5].width}
          height={defaultAudio?.thumbnails[5].height}
          alt="album cover"
          className="w-full"
        />
      )}

      <div className="p-4 text-center">
        <h1 className="text-lg">
          <Skeleton as="div" className="w-32 h-5 bg-neutral-700">
            {currentTrack?.name}
          </Skeleton>
        </h1>
        <h2 className="text-sm">
          <Skeleton as="div" className="w-20 h-4 bg-neutral-700">
            {currentTrack?.artists?.map((i) => i.name).join(", ")}
          </Skeleton>
        </h2>
      </div>

      <audio
        controls
        src={concatAPIUrl(currentTrack?.audio)}
        ref={audioRef}
        className="mx-auto my-4"
      />
    </>
  );
}
