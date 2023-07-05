"use client"

import { HTMLAttributes, useRef } from "react"
import usePlayerStore from "@/stores/usePlayerStore"
import { RiPauseFill, RiPlayFill } from "react-icons/ri"

import useAudio from "@/hooks/useAudio"
import { Button } from "@/components/ui/button"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  trackURL: string
}

export default function PlayQueryTrack({ trackURL, ...props }: Props) {
  const { pause } = usePlayerStore((state) => state)
  const ref = useRef<HTMLAudioElement>(null)

  const { playPause, isPlaying, duration, currentTime } = useAudio(ref)

  return (
    <>
      <audio
        ref={ref}
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}${trackURL}`}
      />
      <Button
        {...props}
        onClick={() => {
          pause()
          playPause()
        }}
      >
        {isPlaying ? <RiPauseFill /> : <RiPlayFill />}
      </Button>
    </>
  )
}
