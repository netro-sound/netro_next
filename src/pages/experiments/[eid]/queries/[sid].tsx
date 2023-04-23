import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from '@/components/skeletons/Skeleton';
import { useAuthStore } from '@/stores/useAuthStore';
import { GridTracks } from '@/components/tracks/GridTracks';
import { useRouter } from 'next/router';
import DatasetService from '@/services/DatasetService';
import {
  IExperiment,
  IExperimentQuery,
} from '@/interfaces/ExperimentInterface';
import ExperimentQuery from '@/services/ExperimentQuery';
import Experiment from '@/services/Experiment';
import { IDataset } from '@/interfaces/DatasetInterface';
import { concatAPIUrl } from '@/utils';
import { RiLoaderFill, RiPauseFill, RiPlayFill } from 'react-icons/ri';
import InfiniteScroller from '@/components/InfiniteScroller';

type Props = {};

export default function Page({}: Props) {
  const [pagination, setPagination] = useState<IPagination<ITrack>>(
    {} as IPagination<ITrack>
  );
  const [query, setQuery] = useState<IExperimentQuery>();
  const [experiment, setExperiment] = useState<IExperiment>();
  const [dataset, setDataset] = useState<IDataset>();
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [session] = useAuthStore((state) => [state.session]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [datasetID, setDatasetID] = useState(0);
  const [predictedTracks, setPredictedTracks] = useState<ITrack[]>([]);

  // const { execute: executeRefresh, isLoading: isRefreshing } = useExecuteAsync(
  //   async () => fetchTracks(datasetID)
  // );

  const route = useRouter();
  const eid = route.query.eid as string;
  const sid = route.query.sid as string;

  async function fetchTracks(datasetID: number) {
    const data = await DatasetService.fetchTracks(datasetID);
    setPagination(data);
    setTracks(data.results);
  }

  async function fetchPredictedTracks(queryID: string) {
    const data = await ExperimentQuery.fetchPredictions(queryID);
    setPredictedTracks(data);
  }

  async function fetchExperiment() {
    const data = await Experiment.fetch(eid);
    setExperiment(data);
    setDataset(data.dataset);
    fetchTracks(data.dataset.id);
    setDatasetID(data.dataset.id);
  }

  async function fetchExperimentQuery() {
    const data = await ExperimentQuery.fetch(sid);
    setQuery(data);
    fetchPredictedTracks(data.id);
  }

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await DatasetService.fetchTracks(datasetID, nextPage);
    setPagination(data);
    setTracks((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

  useEffect(() => {
    !!session && !!eid && fetchExperiment();
  }, [session, eid]);

  useEffect(() => {
    !!sid && fetchExperimentQuery();
  }, [session, sid]);

  useEffect(() => {
    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleEnded() {
      setIsPlaying(false);
    }

    audioElement.current?.addEventListener('play', handlePlay);
    audioElement.current?.addEventListener('pause', handlePause);
    audioElement.current?.addEventListener('ended', handleEnded);

    return () => {
      audioElement.current?.removeEventListener('play', handlePlay);
      audioElement.current?.removeEventListener('pause', handlePause);
      audioElement.current?.removeEventListener('ended', handleEnded);
    };
  }, [audioElement.current]);

  return (
    <>
      <Hero />
      <ContentWrapper>
        {query && sid && (
          <div>
            <div className="stats w-full">
              <div className="stat">
                <div className="stat-title">Queried Track</div>
                <div className="stat-value">
                  {isPlaying ? (
                    <button
                      className="btn btn-ghost w-full h-full"
                      onClick={() => audioElement.current?.pause()}
                    >
                      <RiPauseFill className="text-6xl" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost w-full h-full"
                      onClick={() => audioElement.current?.play()}
                    >
                      <RiPlayFill className="text-6xl" />
                    </button>
                  )}

                  <audio
                    src={concatAPIUrl(`/ml/queries/${sid}/query_track/`)}
                    ref={audioElement}
                  />
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary"></div>
                <div className="stat-title">Loading Time</div>
                <div className="stat-value text-primary">
                  {query.execution_json?.load_time.toFixed(2)} s
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Preprocessing Time</div>
                <div className="stat-value text-secondary">
                  {query.execution_json?.preprocess_time.toFixed(2)} s
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Prediction Time</div>
                <div className="stat-value">
                  {query.execution_json?.predict_time.toFixed(2)} s
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Supports</div>
                <div className="stat-value">
                  {query.execution_json?.supports}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Unique Predictions</div>
                <div className="stat-value">
                  {query.execution_json?.predictions}
                </div>
              </div>
            </div>
          </div>
        )}
        <GridTracks tracks={predictedTracks} />

        <div className="flex w-full pt-20">
          <h1 className="text-xl">
            <Skeleton as="span" className="h-8 w-32 bg-base-200 rounded-box">
              {pagination.count
                ? `${pagination.count} tracks in dataset`
                : null}
            </Skeleton>
          </h1>
        </div>

        <GridTracks tracks={tracks} />
        <InfiniteScroller callback={loadMore}>
          <RiLoaderFill className="animate-spin text-lg mx-auto" />
        </InfiniteScroller>
      </ContentWrapper>
    </>
  );
}
