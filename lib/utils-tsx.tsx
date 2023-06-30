import Link from "next/link"
import { AlbumType, ArtistType } from "@/__generated__/graphql"

export function renderArtistLink(
  objects: ArtistType[] | AlbumType[],
  href: string
) {
  // Separate each tag with a comma

  return objects.map((object, index) => {
    const tag = (
      <Link key={object.id} href={`${href}/${object.id}`}>
        {object.name}
      </Link>
    )

    // Add comma if it's not the last object
    if (index < objects.length - 1) {
      return [tag, ", "]
    }

    return tag
  })
}
