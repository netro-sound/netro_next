"use client"

import { HTMLAttributes, useState } from "react"
import Link from "next/link"
import { AlbumType, ArtistType, TrackType } from "@/__generated__/graphql"
import usePlayerStore from "@/stores/usePlayerStore"
import { RiPlayFill, RiTimeFill } from "react-icons/ri"

import { cn, formatTime } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TableTracksProps extends HTMLAttributes<HTMLDivElement> {
  tracks: TrackType[]
  queueAll?: boolean
}

export default function TableTracks({
  tracks,
  className,
  queueAll,
  ...props
}: TableTracksProps) {
  const queue = usePlayerStore((state) => state.queue)
  const setQueue = usePlayerStore((state) => state.setQueue)
  const changeTrack = usePlayerStore((state) => state.changeTrack)
  const [search, setSearch] = useState("")

  async function handlePlayTrack(track: TrackType) {
    const tracksIds = tracks.map((track) => track.id)
    const queueIds = queue.map((track) => track.id)
    const isQueue = tracks.every((track) => queueIds.includes(track.id))

    if (queueAll && !isQueue) {
      await setQueue(tracksIds)
    }

    changeTrack(track.id, true)
  }

  function renderArtistLink(objects: ArtistType[] | AlbumType[], href: string) {
    // Separate each tag with a comma

    return objects.map((object, index) => {
      const tag = <Link href={`${href}/${object.id}`}>{object.name}</Link>

      // Add comma if it's not the last object
      if (index < objects.length - 1) {
        return [tag, ", "]
      }

      return tag
    })
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table className="table">
        <TableCaption>Queued tracks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Album</TableHead>
            <TableHead className="text-center text-xl">
              <RiTimeFill />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track, index) => (
            <TableRow
              key={track.id}
              onDoubleClick={() => handlePlayTrack(track)}
            >
              <TableCell className="group w-20 text-center">
                <span className="group-hover:hidden">{index + 1}</span>
                <button onClick={() => handlePlayTrack(track)}>
                  <RiPlayFill className="mx-auto hidden text-2xl hover:text-yellow-500 group-hover:block" />
                </button>
              </TableCell>
              <TableCell className="font-medium">
                <span className="block w-48 truncate 2xl:w-96">
                  {track.name ?? "Unknown"}
                </span>
                <span className="block w-48 truncate text-xs 2xl:w-96">
                  {renderArtistLink(track.artists ?? [], "/app/artists")}
                </span>
              </TableCell>
              <TableCell className="hidden w-48 truncate text-xs sm:table-cell 2xl:w-96">
                {renderArtistLink(track.albums ?? [], "/app/albums")}
              </TableCell>
              {/*<TableCell>{invoice.paymentStatus}</TableCell>*/}
              {/*<TableCell>{invoice.paymentMethod}</TableCell>*/}
              <TableCell>
                {formatTime((track.durationMs ?? 0) / 1000)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
