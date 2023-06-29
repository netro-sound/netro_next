import { Metadata } from "next"
import { ArtistType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import fetchGraphQL from "@/lib/client"
import { Separator } from "@/components/ui/separator"
import GridArtists from "@/components/artists/grid-artists"
import CommonSection from "@/components/common-section"

export const metadata: Metadata = {
  title: "Artists",
  description: "Example app app using the components.",
}

const GET_ARTISTS = gql`
  query ListArtists($page: Int = 1, $limit: Int = 60) {
    artists(limit: $limit, page: $page) {
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
  const { artists } = await fetchGraphQL<{ artists: ArtistType[] }, unknown>(
    GET_ARTISTS
  )

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <CommonSection title={"Artists"}>
          <GridArtists artists={artists} gql={GET_ARTISTS} />
        </CommonSection>
      </div>
    </>
  )
}
