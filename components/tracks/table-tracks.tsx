"use client"

import { HTMLAttributes } from "react"
import Link from "next/link"
import { TrackType } from "@/__generated__/graphql"
import usePlayerStore from "@/stores/usePlayerStore"
import { RiPlayFill, RiTimeFill } from "react-icons/ri"

import { cn, formatTime } from "@/lib/utils"
import { renderArtistLink } from "@/lib/utils-tsx"
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
  queryResult?: boolean
}

export default function TableTracks({
  queryResult = false,
  tracks,
  className,
  queueAll,
  ...props
}: TableTracksProps) {
  const { queue, setQueue, changeTrack, currentTrack } = usePlayerStore(
    (state) => state
  )

  async function handlePlayTrack(track: TrackType) {
    const tracksIds = tracks.map((track) => track.id)
    const queueIds = queue.map((track) => track.id)
    const isQueue = tracks.every((track) => queueIds.includes(track.id))

    if (queueAll && !isQueue) {
      await setQueue(tracksIds)
    }

    changeTrack(track.id, true)
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table className="table">
        <TableCaption>Queued tracks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Title</TableHead>
            {!queryResult ? (
              <TableHead className="hidden sm:table-cell">Album</TableHead>
            ) : (
              <>
                <TableHead className="hidden sm:table-cell">Support</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Accuracy (%)
                </TableHead>
              </>
            )}

            <TableHead className="text-center text-xl">
              <RiTimeFill />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track, index) => (
            <TableRow
              className={cn(
                track.id == currentTrack?.id && "bg-secondary",
                track.fingerprint && "bg-orange-500"
              )}
              title={track.fingerprint ? "Fingerprinted by Panako" : undefined}
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
                  <Link href={`/app/tracks/${track.id}`}>
                    {track.name ?? "Unknown"}
                  </Link>
                </span>
                <span className="block w-48 truncate text-xs 2xl:w-96">
                  {renderArtistLink(track.artists ?? [], "/app/artists")}
                </span>
              </TableCell>
              {!queryResult ? (
                <TableCell className="hidden w-48 truncate text-xs sm:table-cell 2xl:w-96">
                  {renderArtistLink(track.albums ?? [], "/app/albums")}
                </TableCell>
              ) : (
                <>
                  <TableCell className="hidden w-48 truncate text-xs sm:table-cell 2xl:w-96">
                    {track.support ?? "-"}
                  </TableCell>
                  <TableCell className="hidden w-48 truncate text-xs sm:table-cell 2xl:w-96">
                    {track.support ?? "-"}
                  </TableCell>
                  <TableCell className="hidden w-48 truncate text-xs sm:table-cell 2xl:w-96">
                    {track.accuracy
                      ? ((track.accuracy ?? 0) * 100).toFixed(2)
                      : "-"}
                  </TableCell>
                </>
              )}

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
