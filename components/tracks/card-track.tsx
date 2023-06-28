"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { TrackType } from "@/__generated__/graphql"
import usePlayerStore from "@/stores/usePlayerStore"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import ThumbnailImage from "@/components/thumbnail-image"

interface TrackArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  track: TrackType
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export default function CardTrack({
  track,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: TrackArtworkProps) {
  const [setQueue, addTracksToQueue] = usePlayerStore((state) => [
    state.setQueue,
    state.addTracksToQueue,
  ])

  const router = useRouter()

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <button
            onClick={() => setQueue([track.id])}
            className="relative overflow-hidden rounded-md"
          >
            <ThumbnailImage
              thumbnails={track.albums?.[0]?.thumbnails}
              alt={track.name ?? "Track Artwork"}
              width={width ?? 640}
              height={height ?? 640}
              className={cn(
                "h-auto w-full object-cover transition-all hover:scale-105  hover:brightness-75",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          {/*<ContextMenuItem>Add to Library</ContextMenuItem>*/}
          {/*<ContextMenuSub>*/}
          {/*  <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>*/}
          {/*  <ContextMenuSubContent className="w-48">*/}
          {/*    <ContextMenuItem>*/}
          {/*      <PlusCircle className="mr-2 h-4 w-4" />*/}
          {/*      New Playlist*/}
          {/*    </ContextMenuItem>*/}
          {/*    /!*<ContextMenuSeparator />*!/*/}
          {/*    /!*{playlists.map((playlist) => (*!/*/}
          {/*    /!*  <ContextMenuItem key={playlist}>*!/*/}
          {/*    /!*    <ListMusic className="mr-2 h-4 w-4" /> {playlist}*!/*/}
          {/*    /!*  </ContextMenuItem>*!/*/}
          {/*    /!*))}*!/*/}
          {/*  </ContextMenuSubContent>*/}
          {/*</ContextMenuSub>*/}
          {/*<ContextMenuSeparator />*/}
          <ContextMenuItem
            onClick={() => {
              setQueue([track.id])
            }}
          >
            Play Now
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              addTracksToQueue([track.id], true)
            }}
          >
            Play Next
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              addTracksToQueue([track.id])
            }}
          >
            Play Later
          </ContextMenuItem>
          {/*<ContextMenuItem>Create Station</ContextMenuItem>*/}
          {/*<ContextMenuSeparator />*/}
          {/*<ContextMenuItem>Like</ContextMenuItem>*/}
          {/*<ContextMenuItem>Share</ContextMenuItem>*/}
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <Link
          href={`/app/tracks/${track.id}`}
          title={track.name ?? "Track Name"}
          className="block w-full truncate font-medium leading-none"
        >
          {track.name}
        </Link>
        <p
          title={track.artists?.map((i) => i.name).join(", ")}
          className="line-clamp-2 text-xs text-muted-foreground"
        >
          {track.artists?.map((i) => i.name).join(", ")}
        </p>
      </div>
    </div>
  )
}
