import Link from "next/link"
import { ArtistType } from "@/__generated__/graphql"
import { PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import ThumbnailImage from "@/components/thumbnail-image"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  artist: ArtistType
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export default function CardArtist({
  artist,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            href={`/app/artists/${artist.id}`}
            className="block overflow-hidden rounded-md"
          >
            <ThumbnailImage
              thumbnails={artist.thumbnails}
              alt={artist.name ?? "Artist Artwork"}
              width={width ?? 640}
              height={height ?? 640}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 hover:brightness-75",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              {/*<ContextMenuSeparator />*/}
              {/*{playlists.map((playlist) => (*/}
              {/*  <ContextMenuItem key={playlist}>*/}
              {/*    <ListMusic className="mr-2 h-4 w-4" /> {playlist}*/}
              {/*  </ContextMenuItem>*/}
              {/*))}*/}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <Link
          href={`/app/artists/${artist.id}`}
          title={artist.name ?? "Track Name"}
          className="block w-full truncate font-medium leading-none"
        >
          {artist.name}
        </Link>
      </div>
    </div>
  )
}
