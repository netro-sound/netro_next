import { Metadata } from "next"
import { AlbumType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import fetchGraphQL from "@/lib/client"
import GridAlbums from "@/components/albums/grid-albums"
import CommonSection from "@/components/common-section"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example app app using the components.",
}

const GET_ALBUMS = gql`
  query ListAlbums($page: Int = 1, $limit: Int = 60) {
    albums(limit: $limit, page: $page) {
      id
      name
      artists {
        id
        name
      }
      thumbnails {
        id
        height
        width
      }
    }
  }
`

export default async function Page() {
  const { albums } = await fetchGraphQL<{ albums: AlbumType[] }, unknown>(
    GET_ALBUMS
  )

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <CommonSection title={"Albums"}>
          <GridAlbums albums={albums} gql={GET_ALBUMS} />
        </CommonSection>
      </div>
    </>
  )
}
