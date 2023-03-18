import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import { classNames } from '@/utils';
import { RiLoaderFill, RiRefreshLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import Skeleton from '@/components/skeletons/Skeleton';
import { useAuthStore } from '@/stores/useAuthStore';
import useExecuteAsync from '@/hooks/useExecuteAsync';
import { GridTracks } from '@/components/tracks/GridTracks';
import InfiniteScroller from '@/components/InfiniteScroller';
import PlaylistService from '@/services/PlaylistService';
import { useRouter } from 'next/router';
import ArtistService from '@/services/ArtistService';

type Props = {};

export default function Page({}: Props) {
  const [pagination, setPagination] = useState<IPagination<ITrack>>(
    {} as IPagination<ITrack>
  );
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [session] = useAuthStore((state) => [state.session]);
  const { execute: executeRefresh, isLoading: isRefreshing } =
    useExecuteAsync(fetchTracks);

  const route = useRouter();
  const spotifyID = route.query.sid as string;

  async function fetchTracks() {
    const data = await ArtistService.fetchTracks(spotifyID);
    setPagination(data);
    setTracks(data.results);
  }

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await ArtistService.fetchTracks(spotifyID, nextPage);
    setPagination(data);
    setTracks((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

  useEffect(() => {
    if (session && spotifyID) fetchTracks();
  }, [session, spotifyID]);

  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="flex w-full">
          <h1 className="text-xl">
            <Skeleton as="span" className="h-8 w-32 bg-base-200 rounded-box">
              {pagination.count ? `${pagination.count} tracks` : null}
            </Skeleton>
          </h1>
          <button className="ml-auto group" onClick={executeRefresh}>
            <RiRefreshLine
              className={classNames(
                'text-lg group-hover:text-primary transition duration-300',
                isRefreshing && 'animate-spin'
              )}
            />
          </button>
        </div>
        <GridTracks tracks={tracks} />
        <InfiniteScroller callback={loadMore}>
          <RiLoaderFill className="animate-spin text-lg mx-auto" />
        </InfiniteScroller>
      </ContentWrapper>
    </>
  );
}
