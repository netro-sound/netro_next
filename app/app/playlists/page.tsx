import { Metadata } from "next"
import { PlaylistType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import fetchGraphQL from "@/lib/client"
import CommonSection from "@/components/common-section"
import GridPlaylists from "@/components/playlists/grid-playlists"

export const metadata: Metadata = {
  title: "Playlists",
  description: "Example app app using the components.",
}

const GET_PLAYLISTS = gql`
  query ListPlaylists($page: Int = 1, $limit: Int = 60) {
    playlists(limit: $limit, page: $page) {
      id
      name
      thumbnails {
        id
        height
        width
      }
    }
  }
`

export default async function Page() {
  const { playlists } = await fetchGraphQL<
    { playlists: PlaylistType[] },
    unknown
  >(GET_PLAYLISTS)

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <CommonSection title={"Playlists"}>
          <GridPlaylists playlists={playlists} gql={GET_PLAYLISTS} />
        </CommonSection>
      </div>
    </>
  )
}
