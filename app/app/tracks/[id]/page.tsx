import React from "react"
import { TrackType } from "@/__generated__/graphql"
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

export function lyricsToHtml(lyrics: string) {
  const lines = lyrics.split("\n")
  const linesMap = lines.map((line, index) => {
    return <p key={index}>{line}</p>
  })

  return linesMap
}

export default async function Page({ params }: PageParams) {
  const { trackById: track } = await fetchGraphQL<
    { trackById: TrackType },
    unknown
  >(
    gql`
      query TrackById($id: String!) {
        trackById(id: $id) {
          id
          name
          durationMs
          lyrics
          albums {
            id
            name
            thumbnails {
              id
              height
              width
            }
          }
          artists {
            id
            name
            thumbnails {
              id
              height
              width
            }
          }
        }
      }
    `,
    {
      id: params.id,
    }
  )

  const thumbnail = getClosestThumbnail(
    track.albums?.[0]?.thumbnails || [],
    192,
    192
  )
  const thumbnailUrl = thumbnailURL(thumbnail.id)
  const color = await getAverageColor(thumbnailUrl)

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, ${color.rgba}, hsl(var(--background)))`,
        }}
        className="flex h-[30rem] w-full flex-col gap-4 px-4 py-12 md:h-60 md:flex-row md:items-center"
      >
        <ThumbnailImage
          alt={track.name || ""}
          thumbnails={track.albums?.[0]?.thumbnails || []}
          width={192}
          height={192}
          className="aspect-square w-full rounded-md object-cover md:w-48"
        />
        <div className="flex w-full flex-row-reverse items-center justify-end gap-4 md:block md:space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {track.name}
            </h1>
            <h2 className="text-lg text-muted-foreground">
              {track.artists?.map((artist) => artist.name).join(", ")}
            </h2>
          </div>
          <PlayTracksButton
            tracks={[track.id]}
            className="aspect-square h-14 rounded-full p-4 text-2xl"
          />
        </div>
      </div>
      <CommonSection title="Lyrics">
        <div className="prose">{lyricsToHtml(track?.lyrics ?? "")}</div>
      </CommonSection>
    </>
  )
}