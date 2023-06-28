import { Metadata } from "next"
import { TrackType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import fetchGraphQL from "@/lib/client"
import { Separator } from "@/components/ui/separator"
import GridTracks from "@/components/tracks/grid-tracks"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example app app using the components.",
}

const GET_TRACKS = gql`
  query ListTracks($page: Int = 1, $limit: Int = 60) {
    tracks(limit: $limit, page: $page) {
      id
      name
      artists {
        id
        name
      }
      albums {
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
`

export default async function Page() {
  const { tracks } = await fetchGraphQL<{ tracks: TrackType[] }, unknown>(
    GET_TRACKS
  )

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Tracks</h2>
          </div>
        </div>
        <Separator className="my-4" />
        <GridTracks tracks={tracks} gql={GET_TRACKS} />
      </div>
    </>
  )
}
