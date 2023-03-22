import { ITrack } from '@/interfaces/TrackInterface';
import { classNames, formatTime } from '@/utils';
import { RiPlayFill } from 'react-icons/ri';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import React, { useState } from 'react';
import usePlayerStore from '@/stores/usePlayerStore';
import useContextMenu from '@/hooks/useContextMenu';
import MenuContext from '@/components/tracks/MenuContextTrack';
import GridWrapper from '@/components/GridWrapper';
import Link from 'next/link';
import { IResultQuery } from '@/interfaces/ExperimentInterface';

type Props = {
  tracks: ITrack[];
  predictions?: IResultQuery;
};

export function GridTracks({ tracks, predictions }: Props) {
  const [changeTrack, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.setQueue,
  ]);
  const [checkedTracks, setCheckedTracks] = useState<ITrack[]>([]);
  const { handleContextMenu, points, show, item } = useContextMenu<ITrack[]>();

  function handleTrackClick(
    ev: React.MouseEvent<HTMLDivElement>,
    track: ITrack
  ) {
    if (ev.ctrlKey) {
      if (checkedTracks.includes(track)) {
        setCheckedTracks((prevState) => prevState.filter((i) => i !== track));
      } else {
        setCheckedTracks((prevState) => [...prevState, track]);
      }
    } else if (ev.shiftKey) {
      const index = tracks.indexOf(track);
      const lastIndex = tracks.indexOf(checkedTracks[checkedTracks.length - 1]);
      const start = Math.min(index, lastIndex);
      const end = Math.max(index, lastIndex);
      const newCheckedTracks = tracks.slice(start, end + 1);
      setCheckedTracks(newCheckedTracks);
    } else {
      setCheckedTracks([]);
      setQueue([track]);
      // changeTrack(track, true);
    }
  }

  function handleContext(ev: React.MouseEvent<HTMLDivElement>, track?: ITrack) {
    ev.preventDefault();

    if (track && checkedTracks.includes(track))
      handleContextMenu(ev, checkedTracks);
    else if (track) {
      handleContextMenu(ev, [track]);
      setCheckedTracks([]);
    }
  }

  if (!tracks.length) {
    return (
      <>
        <GridWrapper>
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              aria-label="column"
              className={classNames(
                'flex justify-start items-center group cursor-pointer rounded-box w-full gap-4 bg-base-200 animate-pulse inline-block h-12'
              )}
            />
          ))}
        </GridWrapper>
      </>
    );
  }

  return (
    <>
      <MenuContext points={points} show={show} tracks={item} />
      <GridWrapper>
        {tracks.map((track, index) => {
          return (
            <div
              key={track.id}
              aria-label="column"
              className={classNames(
                'flex justify-start items-center group w-full gap-4 px-2 rounded-box',
                checkedTracks.includes(track) && 'bg-base-200'
              )}
              onContextMenu={(ev) => handleContext(ev, track)}
            >
              <div className="text-right w-4">
                <p className="text-sm font-light">{index + 1}</p>
              </div>
              <div
                className="flex-none cursor-pointer"
                onClick={(ev) => handleTrackClick(ev, track)}
              >
                <div className="mask mask-squircle relative">
                  <div
                    className={classNames(
                      'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                    )}
                  >
                    <RiPlayFill className="text-primary text-4xl" />
                  </div>
                  {
                    <ImageSkeleton
                      thumbnails={track.thumbnails}
                      index={0}
                      alt={track.name}
                      className="w-12"
                    />
                  }
                </div>
              </div>

              <div className="overflow-x-clip w-full">
                <Link
                  href={`/tracks/${track.spotify_id}`}
                  className="truncate hover:text-primary transition duration-300"
                  title={track.name}
                >
                  {track.name}
                </Link>
                <p
                  className="text-sm font-light truncate"
                  title={track.artists.map((i) => i.name).join(', ')}
                >
                  {track.artists.map((i, index) => (
                    <React.Fragment key={i.id}>
                      {index !== 0 && ', '}
                      <Link
                        href={`/artists/${i.spotify_id}`}
                        title={i.name}
                        className="hover:text-primary transition duration-300"
                      >
                        {i.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </p>
              </div>
              {track.confidence ? (
                <>
                  <p
                    className="text-sm font-bold whitespace-nowrap mr-2"
                    title="Support"
                  >
                    {track.support}
                  </p>
                  <p
                    className="text-sm font-bold whitespace-nowrap mr-2"
                    title="Confidence"
                  >
                    {(track.confidence * 100).toFixed(2)} %
                  </p>
                </>
              ) : null}
              <p className="text-sm font-light ml-auto mr-2">
                {formatTime(track.duration_ms / 1000)}
              </p>
            </div>
          );
        })}
      </GridWrapper>
    </>
  );
}
