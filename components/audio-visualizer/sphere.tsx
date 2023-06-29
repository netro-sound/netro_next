import { forwardRef } from "react"
import { MeshProps, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"

interface SphereProps extends MeshProps {
  size?: [number, number]
}

//
// const ColorMaterial = shaderMaterial(
//   {
//     color1: new Color("#fff1eb"),
//     color2: new Color("#3d3d3d"),
//   },
//   `
//           varying vec2 vUv;
//
//           void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//           }
//         `,
//   `
//           uniform vec3 color1;
//           uniform vec3 color2;
//
//           varying vec2 vUv;
//
//           void main() {
//             gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
//           }
//         `,
//   (self) => {
//     self!.wireframe = true
//   }
// )
//
// extend({
//   ColorMaterial,
// })

const Sphere = forwardRef(function (
  { size = [10, 4], ...props }: SphereProps,
  ref: any
) {
  const { theme } = useTheme()

  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })

  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry args={size} />
      <meshLambertMaterial
        color={theme == "light" ? "#3d3d3d" : "#fff1eb"}
        wireframe={true}
      />
    </mesh>
  )
})

Sphere.displayName = "Sphere"

export default Sphere
