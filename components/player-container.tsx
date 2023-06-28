"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import usePlayerStore from "@/stores/usePlayerStore"
import { ChevronsDownUp, Volume, Volume1, Volume2, VolumeX } from "lucide-react"
import {
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "react-icons/ri"

import { cn, formatTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommonSection from "@/components/common-section"
import ThumbnailImage from "@/components/thumbnail-image"
import TableTracks from "@/components/tracks/table-tracks"

export default function PlayerContainer() {
  const [
    currentTrack,
    audioTag,
    setAudioTag,
    nextTrack,
    previousTrack,
    queue,
    changeTrack,
  ] = usePlayerStore((state) => [
    state.currentTrack,
    state.audioTag,
    state.setAudioTag,
    state.nextTrack,
    state.previousTrack,
    state.queue,
    state.changeTrack,
  ])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState(100)

  function handleEventIsPlaying(isPlaying: boolean) {
    setIsPlaying(isPlaying)
  }

  function handlePlayPause() {
    if (audioTag) {
      if (isPlaying) {
        audioTag.pause()
      } else {
        audioTag.play()
      }
    }
  }

  function eventListenerCurrentTime() {
    if (audioTag) {
      setCurrentTime(audioTag.currentTime)
    }
  }

  function eventListenerVolumeChange() {
    if (audioTag) {
      setVolume(audioTag.volume * 100)
    }
  }

  function handleVolumeChange(volume: number) {
    if (audioTag) {
      audioTag.volume = volume / 100
    }
  }

  function eventListenerEnded() {
    nextTrack(true)
  }

  function eventListenerLoadedMetadata() {
    if (audioTag) {
      setDuration(audioTag.duration)
    }
  }

  useEffect(() => {
    audioTag?.addEventListener("ended", eventListenerEnded)

    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack?.name || "",
        artist: currentTrack?.artists?.map((i) => i.name).join(", "),
        album: currentTrack?.albums?.[0].name || "",
        artwork: currentTrack?.thumbnails?.map((i) => ({
          src: i.image,
          sizes: `${i.width}x${i.height}`,
          type: "image/jpeg",
        })) as MediaImage[],
      })

      navigator.mediaSession.setActionHandler("play", () => {
        audioTag?.play()
      })
      navigator.mediaSession.setActionHandler("pause", () => {
        audioTag?.pause()
      })
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        previousTrack()
      })
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextTrack()
      })
    }

    return () => {
      audioTag?.removeEventListener("ended", eventListenerEnded)
    }
  }, [currentTrack, queue])

  useEffect(() => {
    if (audioTag) {
      audioTag?.addEventListener("loadeddata", eventListenerLoadedMetadata)
      audioTag.addEventListener("timeupdate", eventListenerCurrentTime)
      audioTag.addEventListener("play", () => handleEventIsPlaying(true))
      audioTag.addEventListener("pause", () => handleEventIsPlaying(false))
      audioTag.addEventListener("volumechange", eventListenerVolumeChange)
    }
    return () => {
      if (audioTag) {
        audioTag.removeEventListener("play", () => handleEventIsPlaying(true))
        audioTag.removeEventListener("pause", () => handleEventIsPlaying(false))
        audioTag.removeEventListener("volumechange", eventListenerVolumeChange)
        audioTag.removeEventListener("timeupdate", eventListenerCurrentTime)
        audioTag?.removeEventListener("loadeddata", eventListenerLoadedMetadata)
      }
    }
  }, [audioTag])

  useEffect(() => {
    if (queue.length === 1) {
      changeTrack(0, true)
    }
  }, [queue])

  useEffect(() => {
    const audioElement = new Audio("")
    audioElement.volume = volume / 100
    audioElement.crossOrigin = "anonymous"
    audioElement.preload = "metadata"
    setAudioTag(audioElement)
  }, [])

  function lyricsToHtml(lyrics: string) {
    const lines = lyrics.split("\n")
    const linesMap = lines.map((line, index) => {
      return <p key={index}>{line}</p>
    })

    return linesMap
  }

  return (
    <>
      <div
        className={cn(
          !currentTrack && "hidden",
          "fixed bottom-0 right-0 z-20 w-full bg-background px-2 pb-1 lg:w-3/4"
        )}
      >
        <Slider
          defaultValue={[0]}
          value={[currentTime]}
          max={duration ?? 1}
          onValueChange={(value) => {
            if (audioTag) {
              audioTag.currentTime = value[0]
            }
          }}
          step={1}
          className="mb-1"
        />
        <Collapsible>
          <div className="m-0 flex h-16 w-full p-0 px-2 shadow-lg lg:h-20">
            <div className="flex flex-1 items-center space-x-4">
              <div className="h-14 w-14 overflow-hidden rounded-md">
                <ThumbnailImage
                  thumbnails={currentTrack?.albums?.[0].thumbnails}
                  alt={currentTrack?.name ?? "Album Artwork"}
                  width={56}
                  height={56}
                  className={"aspect-square h-auto w-auto object-cover"}
                />
              </div>
              <div className="hidden overflow-x-clip md:block">
                <Link
                  href={`/app/tracks/${currentTrack?.id}`}
                  className="block w-48 truncate 2xl:w-96"
                >
                  {currentTrack?.name}
                </Link>
                <span className="block w-48 truncate text-sm font-light 2xl:w-96">
                  {currentTrack?.artists
                    ?.map((artist) => artist.name)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center  space-x-1 text-xs lg:space-x-4 lg:text-base">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentTrack == queue[0]}
                onClick={() => previousTrack()}
                aria-label="Backward"
              >
                <RiSkipBackFill className="text-2xl" />
              </Button>
              <Button
                onClick={handlePlayPause}
                aria-label="play pause"
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <RiPauseFill className="text-3xl" />
                ) : (
                  <RiPlayFill className="text-3xl" />
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => nextTrack()}
                disabled={currentTrack == queue.at(-1)}
                aria-label="Forward"
                size="sm"
              >
                <RiSkipForwardFill className="text-2xl" />
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-1  lg:space-x-4">
              <div className="hidden md:block">
                <span>{formatTime(currentTime)}</span>/
                <span>{formatTime(duration)}</span>
              </div>
              <div className="hidden md:block">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="ghost">
                      {volume > 66 ? (
                        <Volume2 />
                      ) : volume > 33 ? (
                        <Volume1 />
                      ) : volume > 0 ? (
                        <Volume />
                      ) : (
                        <VolumeX />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Slider
                      value={[volume]}
                      max={100}
                      onValueChange={(vol) => {
                        handleVolumeChange(vol[0])
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <CollapsibleTrigger asChild>
                <Button size="sm" title="Show more" variant="ghost">
                  <ChevronsDownUp />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent>
            <Separator />
            <Tabs defaultValue={currentTrack?.lyrics ? "lyrics" : "queue"}>
              <TabsList className="mt-2 px-2">
                {currentTrack?.lyrics && (
                  <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
                )}
                <TabsTrigger value="queue">Queue</TabsTrigger>
              </TabsList>
              <TabsContent
                value="queue"
                className="border-none p-0 outline-none"
              >
                <CommonSection title={"Queue"} className="mt-6 space-y-1">
                  <ScrollArea className="h-64">
                    <TableTracks tracks={queue} />
                    <ScrollBar />
                  </ScrollArea>
                </CommonSection>
              </TabsContent>
              <TabsContent
                value="lyrics"
                className="border-none p-0 outline-none"
              >
                <CommonSection title={"Lyrics"} className="mt-6 space-y-1">
                  <ScrollArea className="h-64">
                    <div className="prose">
                      {lyricsToHtml(currentTrack?.lyrics ?? "")}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </CommonSection>
              </TabsContent>
            </Tabs>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
