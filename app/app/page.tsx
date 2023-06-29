import { Metadata } from "next"
import { AlbumType, ArtistType, TrackType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"
// import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import { PlusCircle } from "lucide-react"

import fetchGraphQL from "@/lib/client"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardAlbum from "@/components/albums/card-album"
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
  }
`

export default async function MusicPage() {
  const { albums, tracks } = await fetchGraphQL<
    { albums: AlbumType[]; tracks: TrackType[] },
    unknown
  >(GET_ALBUMS)

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="music" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="music" className="relative">
                Music
              </TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="live" disabled>
                Live
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </div>
          </div>
          <TabsContent value="music" className="border-none p-0 outline-none">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Tracks
                </h2>
                {/*<p className='text-sm text-muted-foreground'>*/}
                {/*  Top picks for you. Updated daily.*/}
                {/*</p>*/}
              </div>
            </div>
            <Separator className="my-4" />
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
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Albums</h2>
              {/*<p className='text-sm text-muted-foreground'>*/}
              {/*  Your personal playlists. Updated daily.*/}
              {/*</p>*/}
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {albums.map((album) => (
                    <CardAlbum
                      key={album.id}
                      album={album}
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
          </TabsContent>
          <TabsContent
            value="podcasts"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            {/*<PodcastEmptyPlaceholder />*/}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
