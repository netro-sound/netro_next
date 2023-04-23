import { classNames } from '@/utils';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import React from 'react';
import GridWrapper from '@/components/GridWrapper';
import Link from 'next/link';
import { IExperimentQuery } from '@/interfaces/ExperimentInterface';

type Props = {
  queries: IExperimentQuery[];
  experimentID?: string;
};

export function GridQueries({ queries, experimentID }: Props) {
  if (!queries.length) {
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
      <GridWrapper smColumns={2} mdColumns={8} className="gap-x-4 gap-y-8">
        {queries.map((query, index) => {
          return (
            <Link
              href={
                experimentID
                  ? `/experiments/${experimentID}/queries/${query.id}`
                  : `/queries/${query.id}`
              }
              key={index}
            >
              <div
                aria-label="column"
                className={classNames('group cursor-pointer w-full gap-4 px-2')}
              >
                <ImageSkeleton
                  alt={query.id}
                  src={`/v1/tracks/${query.result_json[0].track}/thumbnail/?w=192`}
                  className="w-full rounded-lg aspect-square"
                />

                <div className="overflow-x-clip w-full">
                  <p className="truncate" title={query.id}>
                    {query.id}
                  </p>
                  {/*<p className="text-sm font-light truncate">*/}
                  {/*  {query.total_tracks} tracks*/}
                  {/*</p>*/}
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
