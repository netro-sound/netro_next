import { forwardRef } from "react"
import { Icosahedron, shaderMaterial } from "@react-three/drei"
import { MeshProps, extend, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Color } from "three"

interface SphereProps extends MeshProps {
  colors: string[] | number[]
  size: [number, number]
}

const ColorMaterial = shaderMaterial(
  {
    color1: new Color("#fff1eb"),
    color2: new Color("#3d3d3d"),
  },
  `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
  `
          uniform vec3 color1;
          uniform vec3 color2;

          varying vec2 vUv;

          void main() {
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }
        `
  // (self) => {
  //   self!.wireframe = true
  // }
)

extend({
  ColorMaterial,
})

const Sphere = forwardRef(function (
  { colors, size = [10, 4], ...props }: SphereProps,
  ref: any
) {
  const { theme } = useTheme()

  useFrame(() => {
    // @ts-ignore
    ref.current.rotation.x += 0.001
    ref.current.rotation.y += 0.005
    ref.current.rotation.z += 0.002
  })

  return (
    <Icosahedron scale={1} args={size} ref={ref}>
      {/* @ts-ignore */}
      <colorMaterial
        color1={colors[0]}
        color2={colors[1]}
        wireframe={true}
        toneMapped={false}
      />
    </Icosahedron>
  )
})

Sphere.displayName = "Sphere"

export default Sphere
