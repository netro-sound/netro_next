import { IPagination } from '@/interfaces/PaginationInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import { classNames } from '@/utils';
import { RiLoaderFill, RiRefreshLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import Skeleton from '@/components/skeletons/Skeleton';
import { useAuthStore } from '@/stores/useAuthStore';
import useExecuteAsync from '@/hooks/useExecuteAsync';
import InfiniteScroller from '@/components/InfiniteScroller';
import ArtistService from '@/services/ArtistService';
import { IArtist } from '@/interfaces/ArtistInteface';
import { GridArtists } from '@/components/artists/GridArtists';

type Props = {};

export default function Page({}: Props) {
  const [pagination, setPagination] = useState<IPagination<IArtist>>(
    {} as IPagination<IArtist>
  );
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [session] = useAuthStore((state) => [state.session]);
  const { execute: executeRefresh, isLoading: isRefreshing } =
    useExecuteAsync(fetchArtists);

  async function fetchArtists() {
    const data = await ArtistService.fetch();
    setPagination(data);
    setArtists(data.results);
  }

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await ArtistService.fetch('', nextPage);
    setPagination(data);
    setArtists((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

  useEffect(() => {
    if (session) fetchArtists();
  }, [session]);

  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="flex w-full">
          <h1 className="text-xl">
            <Skeleton as="span" className="h-8 w-32 bg-base-200 rounded-box">
              {pagination.count ? `${pagination.count} artists` : null}
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
        <GridArtists artists={artists} />
        <InfiniteScroller callback={loadMore}>
          <RiLoaderFill className="animate-spin text-lg mx-auto" />
        </InfiniteScroller>
      </ContentWrapper>
    </>
  );
}
