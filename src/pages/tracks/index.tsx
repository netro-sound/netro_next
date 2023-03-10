import TrackService from '@/services/TrackService';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import { classNames, formatTime } from '@/utils';
import { RiLoaderFill, RiPlayFill } from 'react-icons/ri';
import usePlayerStore from '@/stores/usePlayerStore';
import React, { useEffect, useState } from 'react';
import useContextMenu from '@/hooks/useContextMenu';
import MenuContext from '@/components/tracks/MenuContextTrack';
import Skeleton from '@/components/skeletons/Skeleton';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

type Props = {};

export default function Page({}: Props) {
  const [changeTrack, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.setQueue,
  ]);
  const [checkedTracks, setCheckedTracks] = useState<ITrack[]>([]);
  const [pagination, setPagination] = useState<IPagination<ITrack>>(
    {} as IPagination<ITrack>
  );
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { handleContextMenu, points, show, item } = useContextMenu<ITrack[]>();

  async function fetchTracks() {
    const data = await new TrackService().fetchTracks();
    setPagination(data);
    setTracks(data.results);
  }

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await new TrackService().fetchTracks(nextPage);
    setPagination(data);
    setTracks((prevState) => [...prevState, ...data.results]);
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
      const index = tracks.indexOf(track);
      const lastIndex = tracks.indexOf(checkedTracks[checkedTracks.length - 1]);
      const start = Math.min(index, lastIndex);
      const end = Math.max(index, lastIndex);
      const newCheckedTracks = tracks.slice(start, end + 1);
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

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <>
      <Hero />
      <MenuContext points={points} show={show} tracks={item} />
      <ContentWrapper>
        <div className="">
          <h1 className="text-xl">
            <Skeleton as="span" className="h-8 w-32 bg-base-200 rounded-box">
              {pagination.count ? `${pagination.count} tracks` : null}
            </Skeleton>
          </h1>
        </div>
        <div aria-label="row" className="grid md:grid-cols-2 gap-2 w-full">
          {tracks.length
            ? tracks.map((track) => {
                return (
                  <div
                    onClick={(ev) => handleTrackClick(ev, track)}
                    key={track.id}
                    aria-label="column"
                    className={classNames(
                      'flex justify-start items-center group cursor-pointer hover:bg-base-200 rounded-box w-full gap-4',
                      checkedTracks.includes(track) && 'bg-base-200'
                    )}
                    onContextMenu={(ev) => handleContext(ev, track)}
                  >
                    <div className="flex-none">
                      <div className="mask mask-squircle relative">
                        <div
                          className={classNames(
                            'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                          )}
                        >
                          <RiPlayFill className="text-primary" />
                        </div>
                        {
                          <ImageSkeleton
                            checker={!!track}
                            src={track.thumbnails[0].image}
                            width={track.thumbnails[0].width}
                            height={track.thumbnails[0].height}
                            alt={track.name}
                            className="w-12"
                          />
                        }
                      </div>
                    </div>

                    <div className="overflow-x-clip w-56 md:w-full">
                      <p className="truncate" title={track.name}>
                        {track.name}
                      </p>
                      <p
                        className="text-sm font-light truncate"
                        title={track.artists.map((i) => i.name).join(', ')}
                      >
                        {track.artists.map((i) => i.name).join(', ')}
                      </p>
                    </div>
                    <p className="text-sm font-light ml-auto mr-2">
                      {formatTime(track.duration_ms / 1000)}
                    </p>
                  </div>
                );
              })
            : Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  aria-label="column"
                  className={classNames(
                    'flex justify-start items-center group cursor-pointer rounded-box w-full gap-4 bg-base-200 animate-pulse inline-block h-12'
                  )}
                />
              ))}
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
