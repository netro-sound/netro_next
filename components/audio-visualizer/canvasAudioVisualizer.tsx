"use client"

import { useState } from "react"
import usePlayerStore from "@/stores/usePlayerStore"
import { Canvas } from "@react-three/fiber"

import { Visualizer } from "@/components/audio-visualizer/visualizer"

type Props = {
  style?: React.CSSProperties
}
export default function CanvasAudioVisualizer({ style }: Props) {
  const analyzer = usePlayerStore((state) => state.analyzer)

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
        <ambientLight color={0xaaaaaa} intensity={1} />
        {/*<spotLight intensity={0.5} position={[-10, 40, 20]}/>*/}
        <pointLight position={[0, 100, 100]} />
        <Visualizer analyzer={analyzer} />
      </Canvas>
    </>
  )
}
