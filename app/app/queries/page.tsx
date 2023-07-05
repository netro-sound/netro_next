import { Metadata } from "next"
import { ExperimentQueryType, TrackType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import fetchGraphQL from "@/lib/client"
import { Separator } from "@/components/ui/separator"
import GridQueries from "@/components/queries/grid-queries"
import GridTracks from "@/components/tracks/grid-tracks"

export const metadata: Metadata = {
  title: "Tracks",
}

const GET_QUERIES = gql`
  query ListExperimentQueries($page: Int = 1, $limit: Int = 60) {
    experimentQueries(limit: $limit, page: $page) {
      id
      model {
        type
        id
      }
    }
  }
`

export default async function Page() {
  const { experimentQueries } = await fetchGraphQL<
    { experimentQueries: ExperimentQueryType[] },
    unknown
  >(GET_QUERIES)

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Queries</h2>
          </div>
        </div>
        <Separator className="my-4" />
        <GridQueries queries={experimentQueries} gql={GET_QUERIES} />
      </div>
    </>
  )
}
