import { gql } from "graphql-tag"

import PlayerContainer from "@/components/player-container"
import Sidebar from "@/components/sidebar"

interface RootLayoutProps {
  children: React.ReactNode
}

const GET_DATASETS = gql`
  query ListDatasets($page: Int = 1, $limit: Int = 60) {
    datasets(limit: $limit, page: $page) {
      id
      name
    }
  }
`

export default function Layout({ children }: RootLayoutProps) {
  return (
    <div>
      <div className="border-t">
        <div className="bg-background">
          <div className="lg:grid lg:grid-cols-4 ">
            <div>
              <Sidebar className="top-0 lg:sticky" />
            </div>
            <div className="mb-20 lg:col-span-3 lg:border-x">
              {children}
              <PlayerContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
