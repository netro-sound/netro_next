"use client"

import { useState } from "react"
import { TrackType } from "@/__generated__/graphql"
import { DocumentNode } from "graphql/language"
import { Loader } from "lucide-react"

import fetchGraphQL from "@/lib/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CardTrack from "@/components/tracks/card-track"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tracks: TrackType[]
  gql: DocumentNode
  limit?: number
}

export default function GridTracks({
  tracks,
  gql,
  limit = 60,
  className,
}: Props) {
  const [currentItems, setCurrentItems] = useState<TrackType[]>(tracks)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  async function fetchMore() {
    if (isLoading) return

    try {
      const { tracks } = await fetchGraphQL<{ tracks: TrackType[] }, unknown>(
        gql,
        {
          page: currentPage + 1,
        }
      )

      if (tracks.length < limit) setHasMore(false)
      setIsLoading(false)
      setCurrentPage((page) => page + 1)
      setCurrentItems((prev) => [...prev, ...tracks])
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
      })
    }
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 pb-4 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
        {currentItems.map((track) => (
          <CardTrack
            key={track.id}
            track={track}
            className=""
            aspectRatio="square"
            width={160}
            height={160}
          />
        ))}
      </div>
      {hasMore ? (
        <Button
          disabled={isLoading}
          onClick={fetchMore}
          className="mx-auto block"
        >
          {isLoading ? <Loader className={cn("h-6 w-6 animate-spin")} /> : null}
          <span className="ml-2">Load More</span>
        </Button>
      ) : null}
    </div>
  )
}
