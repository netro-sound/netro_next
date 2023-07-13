import React from "react"
import { ExperimentQueryType, TrackType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import { PageParams } from "@/types/PageParams"
import fetchGraphQL from "@/lib/client"
import { Separator } from "@/components/ui/separator"
import CommonSection from "@/components/common-section"
import PlayQueryTrack from "@/components/queries/play-query-track"
import TimeQuery from "@/components/queries/time-query"
import ThumbnailImage from "@/components/thumbnail-image"
import TableTracks from "@/components/tracks/table-tracks"

const GET_QUERY_METADATA = gql`
  query QueryMetadata($id: UUID!) {
    experimentQueryById(id: $id) {
      id
    }
  }
`

const GET_QUERY_DATA = gql`
  query QueryData($id: UUID!) {
    experimentQueryById(id: $id) {
      id
      predictTime
      preprocessTime
      loadTime
      trackQuery {
        accuracy
        support
        fingerprint
        track {
          id
          name
          durationMs
          albums {
            id
            name
          }
          artists {
            id
            name
          }
        }
      }
      queryTrack
      streamUrl
    }
  }
`

export async function generateMetadata({ params }: PageParams) {
  const { experimentQueryById } = await fetchGraphQL<
    { experimentQueryById: ExperimentQueryType },
    unknown
  >(GET_QUERY_METADATA, {
    id: params.id,
  })
  return {
    title: experimentQueryById.id || "",
  }
}

export default async function Page({ params }: PageParams) {
  const { experimentQueryById: query } = await fetchGraphQL<
    { experimentQueryById: ExperimentQueryType },
    unknown
  >(GET_QUERY_DATA, {
    id: params.id,
  })

  let totalSupports = 0
  let totalPredictions = 0

  let tracks = query.trackQuery.map((item) => {
    totalSupports += item.support || 0
    totalPredictions += 1

    return {
      ...item.track,
      accuracy: item.accuracy,
      support: item.support,
      fingerprint: item.fingerprint,
    } as TrackType
  })

  tracks = tracks.sort((a, b) => {
    if (a.accuracy && b.accuracy) {
      return b.accuracy - a.accuracy
    }
    return 0
  })

  const totalExecutionTime =
    query.loadTime! + query.predictTime! + query.preprocessTime!
  const executionTime = {
    load_time: {
      label: "Load Time",
      value: query.loadTime!,
      percentage: (query.loadTime! / totalExecutionTime) * 100,
      color: "bg-green-500",
    },
    predict_time: {
      label: "Predict Time",
      value: query.predictTime!,
      percentage: (query.predictTime! / totalExecutionTime) * 100,
      color: "bg-blue-500",
    },
    preprocess_time: {
      label: "Preprocess Time",
      value: query.preprocessTime!,
      percentage: (query.preprocessTime! / totalExecutionTime) * 100,
      color: "bg-yellow-500",
    },
  }

  return (
    <>
      <div
        // style={{
        //   backgroundImage: `linear-gradient(to bottom, ${color.rgba}, hsl(var(--background)))`,
        // }}
        className="flex w-full flex-col gap-4 px-4 py-12 md:h-60 md:flex-row md:items-center"
      >
        <ThumbnailImage
          alt={query.id || ""}
          width={192}
          height={192}
          className="aspect-square w-full rounded-md object-cover md:w-48"
        />
        <div className="flex w-full flex-row-reverse items-center justify-end gap-4 md:block md:space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {query.id}
            </h1>
            {/*<h2 className="text-lg text-muted-foreground">*/}
            {/*  {track.artists?.map((artist) => artist.name).join(", ")}*/}
            {/*</h2>*/}
          </div>
          <PlayQueryTrack
            trackURL={query.streamUrl || ""}
            className="aspect-square h-14 rounded-full p-4 text-2xl"
          />
        </div>
      </div>
      <div>
        <TimeQuery
          loadTime={executionTime.load_time}
          predictTime={executionTime.predict_time}
          preprocessTime={executionTime.preprocess_time}
        />

        <div className="px-4">
          <p>Total supports: {totalSupports}</p>
          <p>Total predictions: {totalPredictions}</p>
          <Separator className="my-4" />
        </div>
      </div>
      <CommonSection className="px-4" title={"Tracks"}>
        <TableTracks tracks={tracks} queueAll={true} queryResult={true} />
      </CommonSection>
    </>
  )
}
