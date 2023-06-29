import { useRef } from "react"
import usePlayerStore from "@/stores/usePlayerStore"
import { ThreeElements, useFrame } from "@react-three/fiber"
import { createNoise3D } from "simplex-noise"
import { Vector3 } from "three"

import { AudioAnalyzer } from "@/lib/audio-analyzer"
import { avg, max, modulate } from "@/lib/math"
import Sphere from "@/components/audio-visualizer/sphere"

export function Visualizer({ analyzer }: { analyzer: AudioAnalyzer | null }) {
  const sphereRef = useRef<ThreeElements["mesh"]>()
  const audioTag = usePlayerStore((state) => state.audioTag)

  function makeRoughBall(bassFr: number, treFr: number) {
    const mesh = sphereRef.current

    if (!mesh) return

    const noise3D = createNoise3D()

    const positionAttribute = mesh.geometry?.attributes.position
    const positions = positionAttribute?.array

    if (!positionAttribute) return

    const amp = 7
    const time = window.performance.now()
    const rf = 0.00001

    for (let i = 0; i < positionAttribute.count; i++) {
      const offset = mesh.geometry?.boundingSphere?.radius

      if (!offset) return

      const currentVertex = new Vector3()
      currentVertex.fromBufferAttribute(positionAttribute, i)

      const vertex = new Vector3()
      vertex.fromBufferAttribute(positionAttribute, i)

      vertex.normalize()

      const noiseValue = noise3D(
        vertex.x + time * rf * 7,
        vertex.y + time * rf * 8,
        vertex.z + time * rf * 9
      )
      const distance = offset + bassFr + noiseValue * amp * treFr

      vertex.multiplyScalar(distance)

      const lerpVectors = vertex.lerpVectors(vertex, currentVertex, 0.4)

      positionAttribute.setXYZ(i, lerpVectors.x, lerpVectors.y, lerpVectors.z)
    }

    positionAttribute.needsUpdate = true

    mesh.geometry?.computeVertexNormals()

    // mesh compute face normals
  }

  function render(fft: Uint8Array) {
    const halfArray = fft.length / 2 - 1
    const lowerHalfArray = fft.slice(0, halfArray)
    const upperHalfArray = fft.slice(halfArray)

    const lowerMax = max(lowerHalfArray)
    const upperAvg = avg(upperHalfArray)

    const lowerMaxFr = lowerMax / lowerHalfArray.length
    const upperAvgFr = upperAvg / upperHalfArray.length

    makeRoughBall(
      modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
      modulate(upperAvgFr, 0, 1, 0, 4)
    )
  }

  useFrame(() => {
    if (!analyzer) return
    if (!sphereRef.current) return
    if (audioTag?.paused) return

    const fft = analyzer.getFFT()

    render(fft)
  })

  return <Sphere scale={1} size={[40, 4]} ref={sphereRef} />
}
