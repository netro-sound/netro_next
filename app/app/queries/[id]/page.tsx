import React from "react"
import { ExperimentQueryType, TrackType } from "@/__generated__/graphql"
import { FETCH_LIST_TRACKS } from "@/stores/usePlayerStore"
import { gql } from "graphql-tag"

import { PageParams } from "@/types/PageParams"
import fetchGraphQL from "@/lib/client"
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
      resultJson
      executionJson
      queryTrack
      streamUrl
    }
  }
`

const GET_RESULT_TRACKS = gql`
  query QueryResultTracks($ids: [String], $page: Int = 1, $limit: Int = 100) {
    tracks(tracksId: $ids, page: $page, limit: $limit) {
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

  const results = query.resultJson?.map(
    (item: string) =>
      JSON.parse(item) as { track: string; accuracy: number; support: number }
  )

  let { tracks } = await fetchGraphQL<{ tracks: TrackType[] }, unknown>(
    FETCH_LIST_TRACKS,
    {
      ids: results?.map((item) => item.track),
    }
  )

  tracks = tracks.map((track) => {
    const result = results?.find((item) => item.track === track.id)
    return {
      ...track,
      accuracy: result?.accuracy,
      support: result?.support,
    }
  })

  tracks = tracks.sort((a, b) => {
    if (a.accuracy && b.accuracy) {
      return b.accuracy - a.accuracy
    }
    return 0
  })

  const execution = JSON.parse(query.executionJson || "{}")
  const totalExecutionTime =
    execution.load_time + execution.predict_time + execution.preprocess_time
  const executionTime = {
    load_time: {
      label: "Load Time",
      value: execution.load_time,
      percentage: (execution.load_time / totalExecutionTime) * 100,
      color: "bg-green-500",
    },
    predict_time: {
      label: "Predict Time",
      value: execution.predict_time,
      percentage: (execution.predict_time / totalExecutionTime) * 100,
      color: "bg-blue-500",
    },
    preprocess_time: {
      label: "Preprocess Time",
      value: execution.preprocess_time,
      percentage: (execution.preprocess_time / totalExecutionTime) * 100,
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
      </div>
      <CommonSection className="px-4" title={"Tracks"}>
        <TableTracks tracks={tracks} queueAll={true} queryResult={true} />
      </CommonSection>
    </>
  )
}
