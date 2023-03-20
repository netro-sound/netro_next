import { classNames } from '@/utils';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import React, { useState } from 'react';
import usePlayerStore from '@/stores/usePlayerStore';
import useContextMenu from '@/hooks/useContextMenu';
import GridWrapper from '@/components/GridWrapper';
import { IDataset } from '@/interfaces/DatasetInterface';
import Link from 'next/link';
import {
  IExperiment,
  IExperimentQuery,
} from '@/interfaces/ExperimentInterface';

type Props = {
  experiments: IExperiment[];
};

export function GridExperiments({ experiments }: Props) {
  if (!experiments.length) {
    return (
      <>
        <GridWrapper smColumns={2} mdColumns={8} className="gap-x-4 gap-y-8">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              aria-label="column"
              className={classNames(
                'flex justify-start items-center group cursor-pointer rounded-box w-full gap-4 bg-base-200 animate-pulse inline-block h-40'
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
        {experiments.map((experiment, index) => {
          return (
            <Link href={`/experiments/${experiment.id}`} key={index}>
              <div
                aria-label="column"
                className={classNames('group cursor-pointer w-full gap-4 px-2')}
              >
                <ImageSkeleton
                  alt={experiment.id}
                  className="w-full rounded-lg aspect-square"
                />

                <div className="overflow-x-clip w-full">
                  <p className="truncate" title={experiment.id}>
                    {experiment.name}
                  </p>
                  <p className="text-sm font-light truncate">
                    {experiment.dataset.total_tracks} tracks
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
