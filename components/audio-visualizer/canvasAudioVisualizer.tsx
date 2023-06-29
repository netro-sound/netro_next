"use client"

import { useEffect, useState } from "react"
import usePlayerStore from "@/stores/usePlayerStore"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { FastAverageColor } from "fast-average-color"
import { useTheme } from "next-themes"

import { thumbnailURL } from "@/lib/utils"
import { Visualizer } from "@/components/audio-visualizer/visualizer"
import { getClosestThumbnail } from "@/components/thumbnail-image"

type Props = {
  style?: React.CSSProperties
}
export default function CanvasAudioVisualizer({ style }: Props) {
  const analyzer = usePlayerStore((state) => state.analyzer)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const [colors, setColors] = useState<string[] | number[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    if (!currentTrack) return

    const thumbnail = getClosestThumbnail(
      currentTrack?.albums?.[0].thumbnails || [],
      192,
      192
    )
    const thumbnailUrl = thumbnailURL(thumbnail.id)

    const fac = new FastAverageColor()
    fac.getColorAsync(thumbnailUrl).then((color) => {
      console.log(color)

      setColors([color.hex, theme == "light" ? "#000000" : "#ffffff"])
    })
  }, [currentTrack, theme])

  return (
    <>
      <Canvas
        style={{
          ...style,
        }}
        camera={{
          fov: 90,
          near: 0.1,
          far: 1000,
          position: [0, 0, 100],
        }}
      >
        <OrbitControls />
        <ambientLight color={0xaaaaaa} intensity={1} />
        {/*<spotLight intensity={0.5} position={[-10, 40, 20]}/>*/}
        <pointLight position={[0, 100, 100]} />
        <Visualizer colors={colors} analyzer={analyzer} />
      </Canvas>
    </>
  )
}
