"use client"

import usePlayerStore from "@/stores/usePlayerStore"

interface Props {
  trackId: string
  inverted?: boolean
  children?: React.ReactNode
}

export default function ConditionalRender({
  trackId,
  children,
  inverted,
}: Props) {
  const { currentTrack } = usePlayerStore((state) => state)

  if (currentTrack?.id === trackId && inverted) return null
  if (currentTrack?.id !== trackId && !inverted) return null

  return <>{children}</>
}
