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
  const setQueue = usePlayerStore((state) => state.setQueue)

  return (
    <Button
      {...props}
      onClick={() => {
        setQueue(tracks)
      }}
    >
      <RiPlayFill />
    </Button>
  )
}
