import { GetServerSidePropsContext } from 'next';
import TrackService from '@/services/TrackService';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import Image from 'next/image';
import { classNames, concatSSRUrl, formatTime } from '@/utils';
import { RiLoaderFill, RiPlayFill } from 'react-icons/ri';
import usePlayerStore from '@/stores/usePlayerStore';
import React, { useState } from 'react';
import useContextMenu from '@/hooks/useContextMenu';
import MenuContext from '@/components/MenuContextTrack';
import Skeleton from '@/components/skeletons/Skeleton';

type Props = {
  tracks: IPagination<ITrack>;
};

export default function Page({ tracks }: Props) {
  const [changeTrack, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.setQueue,
  ]);
  const [checkedTracks, setCheckedTracks] = useState<ITrack[]>([]);
  const [pagination, setPagination] = useState<IPagination<ITrack>>(tracks);
  const [listTracks, setListTracks] = useState<ITrack[]>(tracks.results);
  const [isFetching, setIsFetching] = useState(false);
  const { handleContextMenu, points, show, item } = useContextMenu<ITrack[]>();

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await new TrackService(true).fetchTracks(nextPage);
    setPagination(data);
    setListTracks((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

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
      const index = listTracks.indexOf(track);
      const lastIndex = listTracks.indexOf(
        checkedTracks[checkedTracks.length - 1]
      );
      const start = Math.min(index, lastIndex);
      const end = Math.max(index, lastIndex);
      const newCheckedTracks = listTracks.slice(start, end + 1);
      setCheckedTracks(newCheckedTracks);
    } else {
      setCheckedTracks([]);
      setQueue([track]);
      changeTrack(track, true);
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

  return (
    <>
      <Hero />
      <MenuContext points={points} show={show} tracks={item} />
      <ContentWrapper>
        <div className="">
          <h1 className="text-xl">{tracks.count} tracks</h1>
        </div>
        <div aria-label="row" className="grid md:grid-cols-2 gap-2">
          {listTracks.map((track) => {
            return (
              <div
                onClick={(ev) => handleTrackClick(ev, track)}
                key={track.id}
                aria-label="column"
                className={classNames(
                  'flex justify-between group cursor-pointer hover:bg-base-200 rounded-box',
                  checkedTracks.includes(track) && 'bg-base-200'
                )}
                onContextMenu={(ev) => handleContext(ev, track)}
              >
                <div className="flex items-center space-x-4">
                  <div className="mask mask-squircle relative">
                    <div
                      className={classNames(
                        'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                      )}
                    >
                      <RiPlayFill className="text-primary" />
                    </div>
                    {track.thumbnails.length ? (
                      <Image
                        src={concatSSRUrl(track.thumbnails[0].image)}
                        height={track.thumbnails[0].height}
                        width={track.thumbnails[0].width}
                        alt={track.name}
                        className="w-12"
                      />
                    ) : (
                      <Image
                        src={'/istockphoto-1147544807-612x612.jpg'}
                        height={612}
                        width={612}
                        alt={track.name}
                        className="w-12"
                      />
                    )}
                  </div>
                  <div>
                    <h2>{track.name}</h2>
                    <p className="text-sm font-light">
                      {track.artists.map((i) => i.name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mr-2">
                  <p className="text-sm font-light">
                    {formatTime(track.duration_ms / 1000)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {!!pagination.next && (
          <div className="flex justify-center items-center">
            <button
              onClick={loadMore}
              className="btn btn-sm space-x-2"
              disabled={isFetching}
            >
              {isFetching && <RiLoaderFill className="animate-spin text-lg" />}
              <span>Load More</span>
            </button>
          </div>
        )}
      </ContentWrapper>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tracks = await new TrackService(false).fetchTracks();

  return {
    props: {
      tracks: tracks,
    },
  };
}
