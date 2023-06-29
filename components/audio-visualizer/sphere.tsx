import { forwardRef } from "react"
import { shaderMaterial } from "@react-three/drei"
import { MeshProps, extend, useFrame } from "@react-three/fiber"
import { Color } from "three"

interface SphereProps extends MeshProps {
  colors?: string[] | number[]
  size?: [number, number]
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
        `,
  (self) => {
    self!.wireframe = true
  }
)

extend({
  ColorMaterial,
})

const Sphere = forwardRef(function (
  { colors, size = [10, 4], ...props }: SphereProps,
  ref: any
) {
  useFrame(() => {
    // @ts-ignore
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })

  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry args={size} />
      {/*<meshLambertMaterial color={color} wireframe={true}/>*/}
      <colorMaterial color1={colors[0]} color2={colors[1]} />
    </mesh>
  )
})

export default Sphere
