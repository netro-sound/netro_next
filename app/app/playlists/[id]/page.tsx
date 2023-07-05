import React from "react"
import { PlaylistType, TrackType } from "@/__generated__/graphql"
import { FETCH_LIST_TRACKS } from "@/stores/usePlayerStore"
import { getAverageColor } from "fast-average-color-node"
import { gql } from "graphql-tag"

import { PageParams } from "@/types/PageParams"
import fetchGraphQL from "@/lib/client"
import { thumbnailURL } from "@/lib/utils"
import CommonSection from "@/components/common-section"
import PlayTracksButton from "@/components/play-tracks-button"
import ThumbnailImage, {
  getClosestThumbnail,
} from "@/components/thumbnail-image"
import TableTracks from "@/components/tracks/table-tracks"

export async function generateMetadata({ params }: PageParams) {
  const { playlistById: playlist } = await fetchGraphQL<
    { playlistById: PlaylistType },
    unknown
  >(
    gql`
      query PlaylistMetadata($id: String!) {
        playlistById(id: $id) {
          name
        }
      }
    `,
    {
      id: params.id,
    }
  )

  return {
    title: playlist.name || "",
  }
}

export default async function Page({ params }: PageParams) {
  let flagTracks = false
  let page = 1
  let limit = 100
  let pTracks: TrackType[] = []

  const { playlistById: playlist } = await fetchGraphQL<
    { playlistById: PlaylistType },
    unknown
  >(
    gql`
      query PlaylistPage($id: String!) {
        playlistById(id: $id) {
          id
          name
          thumbnails {
            id
            height
            width
          }
          tracks {
            id
            name
          }
        }
      }
    `,
    {
      id: params.id,
    }
  )

  const playlistTracks = playlist.tracks?.map((track) => track.id) || []

  if (playlistTracks.length > 0) {
    do {
      const { tracks } = await fetchGraphQL<{ tracks: TrackType[] }, unknown>(
        FETCH_LIST_TRACKS,
        {
          ids: playlistTracks,
          page: page++,
          limit,
        }
      )

      pTracks.push(...tracks)
      flagTracks = tracks.length < limit
    } while (!flagTracks)
  }

  const thumbnail = getClosestThumbnail(playlist.thumbnails || [], 192, 192)
  const thumbnailUrl = thumbnailURL(thumbnail.id)
  const color = await getAverageColor(thumbnailUrl)

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, ${color.rgba}, hsl(var(--background)))`,
        }}
        className="flex w-full flex-col gap-4 px-4 py-12 md:h-60 md:flex-row md:items-center"
      >
        <ThumbnailImage
          alt={playlist.name || ""}
          thumbnails={playlist.thumbnails || []}
          width={192}
          height={192}
          className="aspect-square w-full rounded-md object-cover md:w-48"
        />
        <div className="flex w-full flex-row-reverse items-center justify-end gap-4 md:block md:space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {playlist.name}
            </h1>
          </div>
          <PlayTracksButton
            className="aspect-square h-14 rounded-full p-4 text-2xl"
            tracks={playlistTracks}
          />
        </div>
      </div>
      <CommonSection className="px-4" title={"Tracks"}>
        <TableTracks tracks={pTracks} queueAll={true} />
      </CommonSection>
    </>
  )
}
