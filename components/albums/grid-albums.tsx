"use client"

import { useState } from "react"
import { AlbumType } from "@/__generated__/graphql"
import { DocumentNode } from "graphql/language"
import { Loader } from "lucide-react"

import fetchGraphQL from "@/lib/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CardAlbum from "@/components/albums/card-album"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  albums: AlbumType[]
  gql: DocumentNode
  limit?: number
}

export default function GridAlbums({
  albums,
  gql,
  limit = 60,
  className,
}: Props) {
  const [currentItems, setCurrentItems] = useState<AlbumType[]>(albums)
  const [hasMore, setHasMore] = useState(albums.length >= limit)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  async function fetchMore() {
    if (isLoading) return

    try {
      const { albums } = await fetchGraphQL<{ albums: AlbumType[] }, unknown>(
        gql,
        {
          page: currentPage + 1,
        }
      )

      if (albums.length < limit) setHasMore(false)
      setIsLoading(false)
      setCurrentPage((page) => page + 1)
      setCurrentItems((prev) => [...prev, ...albums])
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
        {currentItems.map((album) => (
          <CardAlbum
            key={album.id}
            album={album}
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
