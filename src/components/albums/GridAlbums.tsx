import { classNames } from '@/utils';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import React, { useState } from 'react';
import usePlayerStore from '@/stores/usePlayerStore';
import useContextMenu from '@/hooks/useContextMenu';
import GridWrapper from '@/components/GridWrapper';
import { IAlbum } from '@/interfaces/AlbumInterface';
import Link from 'next/link';

type Props = {
  albums: IAlbum[];
};

export function GridAlbums({ albums }: Props) {
  const [changeTrack, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.setQueue,
  ]);
  const [checkedTracks, setCheckedTracks] = useState<IAlbum[]>([]);
  const { handleContextMenu, points, show, item } = useContextMenu<IAlbum[]>();

  // function handleTrackClick(
  //   ev: React.MouseEvent<HTMLDivElement>,
  //   track: IArtist
  // ) {
  //   if (ev.ctrlKey) {
  //     if (checkedTracks.includes(track)) {
  //       setCheckedTracks((prevState) => prevState.filter((i) => i !== track));
  //     } else {
  //       setCheckedTracks((prevState) => [...prevState, track]);
  //     }
  //   } else if (ev.shiftKey) {
  //     const index = tracks.indexOf(track);
  //     const lastIndex = tracks.indexOf(checkedTracks[checkedTracks.length - 1]);
  //     const start = Math.min(index, lastIndex);
  //     const end = Math.max(index, lastIndex);
  //     const newCheckedTracks = tracks.slice(start, end + 1);
  //     setCheckedTracks(newCheckedTracks);
  //   } else {
  //     setCheckedTracks([]);
  //     setQueue([track]);
  //     // changeTrack(track, true);
  //   }
  // }

  // function handleContext(ev: React.MouseEvent<HTMLDivElement>, track?: IArtist) {
  //   ev.preventDefault();
  //
  //   if (track && checkedTracks.includes(track))
  //     handleContextMenu(ev, checkedTracks);
  //   else if (track) {
  //     handleContextMenu(ev, [track]);
  //     setCheckedTracks([]);
  //   }
  // }

  if (!albums.length) {
    return (
      <>
        <GridWrapper smColumns={2} mdColumns={8} className="gap-x-4 gap-y-8">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              aria-label="column"
              className={classNames(
                'flex justify-start items-center group cursor-pointer rounded-box w-full gap-4 bg-base-200 animate-pulse inline-block aspect-square'
              )}
            />
          ))}
        </GridWrapper>
      </>
    );
  }

  return (
    <>
      {/*<MenuContext points={points} show={show} tracks={item} />*/}
      <GridWrapper smColumns={2} mdColumns={8} className="gap-x-4 gap-y-8">
        {albums.map((album, index) => {
          return (
            <Link href={`/albums/${album.spotify_id}`} key={index}>
              <div
                // onClick={(ev) => handleTrackClick(ev, track)}
                key={album.id}
                aria-label="column"
                className={classNames(
                  'group cursor-pointer w-full gap-4 px-2',
                  checkedTracks.includes(album) && 'bg-base-200'
                )}
                // onContextMenu={(ev) => handleContext(ev, track)}
              >
                {/*<div className="flex-none">*/}
                {/*<div className="overflow-hidden relative">*/}
                {/*<div*/}
                {/*  className={classNames(*/}
                {/*    'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'*/}
                {/*  )}*/}
                {/*>*/}
                {/*  <RiPlayFill className="text-primary" />*/}
                {/*</div>*/}
                <ImageSkeleton
                  thumbnails={album.thumbnails}
                  index={2}
                  alt={album.name}
                  className="w-full rounded-lg aspect-square"
                />
                {/*</div>*/}
                {/*</div>*/}

                <div className="overflow-x-clip w-full">
                  <p className="truncate" title={album.name}>
                    {album.name}
                  </p>

                  <p
                    className="text-sm font-light truncate"
                    title={album.artists.map((i) => i.name).join(', ')}
                  >
                    {album.artists.map((i) => i.name).join(', ')}
                  </p>
                </div>
                {/*<p className="text-sm font-light ml-auto mr-2">*/}
                {/*  {formatTime(artist.duration_ms / 1000)}*/}
                {/*</p>*/}
              </div>
            </Link>
          );
        })}
      </GridWrapper>
    </>
  );
}
