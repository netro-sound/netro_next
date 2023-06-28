"use client"

import { useState } from "react"
import { PlaylistType } from "@/__generated__/graphql"
import { DocumentNode } from "graphql/language"
import { Loader } from "lucide-react"

import fetchGraphQL from "@/lib/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CardPlaylist from "@/components/playlists/card-playlist"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  playlists: PlaylistType[]
  gql: DocumentNode
  limit?: number
}

export default function GridPlaylists({
  playlists,
  gql,
  limit = 60,
  className,
}: Props) {
  const [currentItems, setCurrentItems] = useState<PlaylistType[]>(playlists)
  const [hasMore, setHasMore] = useState(playlists.length >= limit)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  async function fetchMore() {
    if (isLoading) return

    try {
      const { playlists } = await fetchGraphQL<
        { playlists: PlaylistType[] },
        unknown
      >(gql, {
        page: currentPage + 1,
      })

      if (playlists.length < limit) setHasMore(false)
      setIsLoading(false)
      setCurrentPage((page) => page + 1)
      setCurrentItems((prev) => [...prev, ...playlists])
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
        {currentItems.map((playlist) => (
          <CardPlaylist
            key={playlist.id}
            playlist={playlist}
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
