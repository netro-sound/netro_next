import Link from 'next/link';
import {
  RiPauseFill,
  RiPlayFill,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
} from 'react-icons/ri';
import VolumeBtn from '@/components/player/VolumeBtn';
import QueueList from '@/components/player/QueueList';
import ProgressSlider from '@/components/player/ProgressSlider';
import usePlayerStore from '@/stores/usePlayerStore';
import { classNames, formatTime } from '@/utils';
import React, { useEffect, useState } from 'react';
import useSeoStore from '@/stores/useSeoStore';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import siteConfig from '@/site.config';

type Props = {};

export default function PlayerContainer({}: Props) {
  const [
    currentTrack,
    audioTag,
    setAudioTag,
    nextTrack,
    previousTrack,
    queue,
    changeTrack,
  ] = usePlayerStore((state) => [
    state.currentTrack,
    state.audioTag,
    state.setAudioTag,
    state.nextTrack,
    state.previousTrack,
    state.queue,
    state.changeTrack,
  ]);
  const [setSeo] = useSeoStore((state) => [state.setSeo]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(30);

  function handleEventIsPlaying(isPlaying: boolean) {
    setIsPlaying(isPlaying);
  }

  function handlePlayPause() {
    if (audioTag) {
      if (isPlaying) {
        audioTag.pause();
      } else {
        audioTag.play();
      }
    }
  }

  function eventListenerCurrentTime() {
    if (audioTag) {
      setCurrentTime(audioTag.currentTime);
    }
  }

  function eventListenerBuffer() {
    if (audioTag) {
      setBuffer(audioTag.buffered.end(0));
    }
  }

  function eventListenerVolumeChange() {
    if (audioTag) {
      setVolume(audioTag.volume * 100);
    }
  }

  function handleVolumeChange(volume: number) {
    if (audioTag) {
      audioTag.volume = volume / 100;
    }
  }

  function eventListenerEnded() {
    nextTrack(true);
  }

  function eventListenerLoadedMetadata() {
    if (audioTag) {
      setDuration(audioTag.duration);
    }
  }

  useEffect(() => {
    audioTag?.addEventListener('ended', eventListenerEnded);

    if (!currentTrack) {
      setSeo({ title: siteConfig.title });
      return;
    }

    setSeo({
      title:
        'Netro Sound | ' +
        currentTrack?.name +
        ' - ' +
        currentTrack?.artists.map((i) => i.name).join(', '),
    });

    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack?.name,
        artist: currentTrack?.artists.map((i) => i.name).join(', '),
        album: currentTrack?.albums[0].name,
        artwork: currentTrack?.thumbnails.map((i) => ({
          src: i.image,
          sizes: `${i.width}x${i.height}`,
          type: 'image/jpeg',
        })) as MediaImage[],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioTag?.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioTag?.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        previousTrack();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        nextTrack();
      });
    }

    return () => {
      audioTag?.removeEventListener('ended', eventListenerEnded);
    };
  }, [currentTrack, queue]);

  useEffect(() => {
    if (audioTag) {
      audioTag?.addEventListener('loadeddata', eventListenerLoadedMetadata);
      audioTag.addEventListener('timeupdate', eventListenerCurrentTime);
      audioTag.addEventListener('progress', eventListenerBuffer);
      audioTag.addEventListener('play', () => handleEventIsPlaying(true));
      audioTag.addEventListener('pause', () => handleEventIsPlaying(false));
      audioTag.addEventListener('volumechange', eventListenerVolumeChange);
    }
    return () => {
      if (audioTag) {
        audioTag.removeEventListener('play', () => handleEventIsPlaying(true));
        audioTag.removeEventListener('pause', () =>
          handleEventIsPlaying(false)
        );
        audioTag.removeEventListener('volumechange', eventListenerVolumeChange);
        audioTag.removeEventListener('timeupdate', eventListenerCurrentTime);
        audioTag.removeEventListener('progress', eventListenerBuffer);
        audioTag?.removeEventListener(
          'loadeddata',
          eventListenerLoadedMetadata
        );
      }
    };
  }, [audioTag]);

  useEffect(() => {
    if (queue.length === 1) {
      changeTrack(queue[0], true);
    }
  }, [queue]);

  useEffect(() => {
    const audioElement = new Audio(currentTrack?.audio);
    audioElement.volume = volume / 100;
    setAudioTag(audioElement);
  }, []);

  return (
    <>
      {currentTrack ? (
        <div
          className={classNames(
            currentTrack ? 'bottom-4' : '-bottom-20',
            'fixed right-0 z-20 md:pl-72 md:pr-12 px-2 rounded-box w-screen'
          )}
        >
          <ProgressSlider
            buffer={buffer}
            currentTime={currentTime}
            duration={duration}
          />

          <div className="navbar w-full p-0 m-0 shadow-lg px-2 bg-base-100">
            <div className="navbar-start items-center space-x-4">
              <div className="avatar h-14 w-14 flex-none">
                {
                  <ImageSkeleton
                    checker={!!currentTrack}
                    src={currentTrack.thumbnails[5].image}
                    width={currentTrack.thumbnails[5].width}
                    height={currentTrack.thumbnails[5].height}
                    alt={currentTrack.name}
                    className="w-14"
                  />
                }
              </div>
              <div className="hidden md:block overflow-x-clip">
                <Link href="" className="block truncate">
                  {currentTrack?.name}
                </Link>
                <Link href="" className="block truncate text-sm font-light">
                  {currentTrack?.artists
                    .map((artist) => artist.name)
                    .join(', ')}
                </Link>
              </div>
            </div>
            <div className="navbar-center space-x-4 text-xl">
              <button
                onClick={() => previousTrack(false)}
                aria-label="Backward"
              >
                <RiSkipBackMiniFill />
              </button>
              <button
                onClick={handlePlayPause}
                aria-label="play pause"
                className="btn btn-sm rounded-full w-12 h-12"
              >
                {isPlaying ? (
                  <RiPauseFill className="text-2xl" />
                ) : (
                  <RiPlayFill className="text-2xl" />
                )}
              </button>
              <button onClick={() => nextTrack(false)} aria-label="Forward">
                <RiSkipForwardMiniFill />
              </button>
            </div>
            <div className="navbar-end space-x-4">
              <div className="hidden md:block">
                <span>{formatTime(currentTime)}</span>/
                <span>{formatTime(duration)}</span>
              </div>
              <VolumeBtn volume={volume} setVolume={handleVolumeChange} />
              <QueueList />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
