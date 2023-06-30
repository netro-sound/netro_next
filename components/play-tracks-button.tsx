"use client"

import usePlayerStore from "@/stores/usePlayerStore"
import { RiPlayFill } from "react-icons/ri"

import { Button, ButtonProps } from "@/components/ui/button"

interface PlayButtonProps extends ButtonProps {
  tracks: string[]
}

export default function PlayTracksButton({
  tracks,
  ...props
}: PlayButtonProps) {
  const { setQueue, changeTrack, queue } = usePlayerStore((state) => state)

  async function handlePlayTrack() {
    const isQueue = queue.every((track) => tracks.includes(track.id))

    if (isQueue) await setQueue(tracks)

    changeTrack(tracks[0], true)
  }

  return (
    <Button {...props} onClick={handlePlayTrack}>
      <RiPlayFill />
    </Button>
  )
}
