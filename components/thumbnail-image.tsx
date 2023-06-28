import Image, { type ImageProps } from "next/image"
import { ThumbnailType } from "@/__generated__/graphql"

import { thumbnailURL } from "@/lib/utils"

interface ThumbnailImageProps extends Omit<ImageProps, "src"> {
  thumbnails?: ThumbnailType[] | null | undefined
  height: number
  width: number
}

export function getClosestThumbnail(
  thumbnails: ThumbnailType[],
  width: number,
  height: number
) {
  const mean = (width + height) / 2
  const overallDiff = Infinity
  let closest = {} as ThumbnailType

  for (let thumbnail of thumbnails) {
    const curMean = (thumbnail.width + thumbnail.height) / 2
    const diff = Math.abs(curMean - mean)

    if (diff < overallDiff) {
      closest = thumbnail
    }
  }

  return closest
}

export default function ThumbnailImage({
  thumbnails,
  width,
  height,
  ...props
}: ThumbnailImageProps) {
  if (!thumbnails)
    return (
      <Image
        {...props}
        width="300"
        height="300"
        src="/images/placeholder.png"
      />
    )

  const closest = getClosestThumbnail(thumbnails, width, height)

  const src = thumbnailURL(closest.id)

  return <Image {...props} src={src} width={width} height={height} />
}
