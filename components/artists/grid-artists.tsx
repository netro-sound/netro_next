"use client"

import { useState } from "react"
import { ArtistType } from "@/__generated__/graphql"
import { DocumentNode } from "graphql/language"
import { Loader } from "lucide-react"

import fetchGraphQL from "@/lib/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CardArtist from "@/components/artists/card-artist"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  artists: ArtistType[]
  gql: DocumentNode
  limit?: number
}

export default function GridArtists({
  artists,
  gql,
  limit = 60,
  className,
}: Props) {
  const [currentItems, setCurrentItems] = useState<ArtistType[]>(artists)
  const [hasMore, setHasMore] = useState(artists.length >= limit)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  async function fetchMore() {
    if (isLoading) return

    try {
      const { artists } = await fetchGraphQL<
        { artists: ArtistType[] },
        unknown
      >(gql, {
        page: currentPage + 1,
      })

      if (artists.length < limit) setHasMore(false)
      setIsLoading(false)
      setCurrentPage((page) => page + 1)
      setCurrentItems((prev) => [...prev, ...artists])
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
        {currentItems.map((artist) => (
          <CardArtist
            key={artist.id}
            artist={artist}
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
