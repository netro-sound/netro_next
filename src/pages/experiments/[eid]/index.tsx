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
import { IExperimentQuery } from '@/interfaces/ExperimentInterface';
import Experiment from '@/services/Experiment';
import { useRouter } from 'next/router';
import { GridQueries } from '@/components/experiments/queries/GridQueries';

type Props = {};

export default function Page({}: Props) {
  const [pagination, setPagination] = useState<IPagination<IExperimentQuery>>(
    {} as IPagination<IExperimentQuery>
  );
  const [queries, setQueries] = useState<IExperimentQuery[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [session] = useAuthStore((state) => [state.session]);
  const { execute: executeRefresh, isLoading: isRefreshing } =
    useExecuteAsync(fetchQueries);

  const router = useRouter();
  const pid = router.query.eid as string;

  async function fetchQueries() {
    const data = await Experiment.fetchQueries(pid);
    setPagination(data);
    setQueries(data.results);
  }

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await Experiment.fetchQueries(pid, nextPage);
    setPagination(data);
    setQueries((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

  useEffect(() => {
    if (session && pid) fetchQueries();
  }, [session, pid]);

  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="flex w-full">
          <h1 className="text-xl">
            <Skeleton as="span" className="h-8 w-32 bg-base-200 rounded-box">
              {pagination.count ? `${pagination.count} queries` : null}
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
        <GridQueries queries={queries} experimentID={pid} />
        <InfiniteScroller callback={loadMore}>
          <RiLoaderFill className="animate-spin text-lg mx-auto" />
        </InfiniteScroller>
      </ContentWrapper>
    </>
  );
}
