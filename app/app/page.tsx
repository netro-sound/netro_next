import { Metadata } from "next"
import {
  AlbumType,
  ArtistType,
  PlaylistType,
  TrackType,
} from "@/__generated__/graphql"
import { gql } from "graphql-tag"

// import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import fetchGraphQL from "@/lib/client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import CardAlbum from "@/components/albums/card-album"
import CardArtist from "@/components/artists/card-artist"
import CommonSection from "@/components/common-section"
import CardPlaylist from "@/components/playlists/card-playlist"
import CardTrack from "@/components/tracks/card-track"

export const metadata: Metadata = {
  title: "App",
  description: "Listen to tracks",
}

const GET_ALBUMS = gql`
  query ListTracks {
    tracks {
      id
      name
      artists {
        id
        name
      }
      albums {
        id
        name
        thumbnails {
          id
          height
          width
        }
      }
    }
    albums {
      id
      name
      artists {
        id
        name
      }
      thumbnails {
        id
        height
        width
      }
    }
    artists {
      id
      name
      thumbnails {
        id
        height
        width
      }
    }
    playlists {
      id
      name
      thumbnails {
        id
        height
        width
      }
    }
  }
`

export default async function MusicPage() {
  const { albums, tracks, artists, playlists } = await fetchGraphQL<
    {
      albums: AlbumType[]
      tracks: TrackType[]
      artists: ArtistType[]
      playlists: PlaylistType[]
    },
    unknown
  >(GET_ALBUMS)

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <CommonSection title={"Tracks"}>
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {tracks.map((track) => (
                  <CardTrack
                    key={track.id}
                    track={track}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CommonSection>
        <CommonSection title="Artists">
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {artists.map((artist) => (
                  <CardArtist
                    key={artist.id}
                    artist={artist}
                    className="w-[150px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CommonSection>
        <Separator className="my-4" />

        <CommonSection title="Albums">
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {albums.map((album) => (
                  <CardAlbum
                    key={album.id}
                    query={album}
                    className="w-[150px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CommonSection>
        <Separator className="my-4" />

        <CommonSection title="Playlists">
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {playlists.map((playlist) => (
                  <CardPlaylist
                    key={playlist.id}
                    playlist={playlist}
                    className="w-[150px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CommonSection>
      </div>
    </>
  )
}
