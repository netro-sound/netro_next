/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AlbumType = {
  __typename?: "AlbumType"
  albumType?: Maybe<Scalars["String"]["output"]>
  artists: Array<ArtistType>
  id: Scalars["String"]["output"]
  label?: Maybe<Scalars["String"]["output"]>
  name?: Maybe<Scalars["String"]["output"]>
  popularity?: Maybe<Scalars["Int"]["output"]>
  spotifyHref?: Maybe<Scalars["String"]["output"]>
  thumbnails: Array<ThumbnailType>
  totalTracks?: Maybe<Scalars["Int"]["output"]>
  tracks: Array<TrackType>
}

/** An enumeration. */
export enum ApiTrackStatusChoices {
  /** Downloaded */
  Downloaded = "DOWNLOADED",
  /** Downloading */
  Downloading = "DOWNLOADING",
  /** Failed */
  Failed = "FAILED",
  /** Failed Mismatch */
  FailedMismatch = "FAILED_MISMATCH",
  /** Failed Not Found */
  FailedNotFound = "FAILED_NOT_FOUND",
  /** Failed Spotify */
  FailedSpotify = "FAILED_SPOTIFY",
  /** Pending */
  Pending = "PENDING",
}

export type ArtistType = {
  __typename?: "ArtistType"
  albums: Array<ArtistType>
  id: Scalars["String"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
  spotifyHref?: Maybe<Scalars["String"]["output"]>
  thumbnails: Array<ThumbnailType>
  tracks: Array<TrackType>
}

export type DatasetType = {
  __typename?: "DatasetType"
  description?: Maybe<Scalars["String"]["output"]>
  id: Scalars["ID"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
  tracks: Array<TrackType>
}

export type PlaylistType = {
  __typename?: "PlaylistType"
  description?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
  protected?: Maybe<Scalars["Boolean"]["output"]>
  public?: Maybe<Scalars["Boolean"]["output"]>
  spotifyHref?: Maybe<Scalars["String"]["output"]>
  thumbnails: Array<ThumbnailType>
  tracks: Array<TrackType>
}

export type Query = {
  __typename?: "Query"
  albumById?: Maybe<ArtistType>
  albums?: Maybe<Array<ArtistType>>
  artistById?: Maybe<ArtistType>
  artists?: Maybe<Array<ArtistType>>
  datasetById?: Maybe<DatasetType>
  datasets?: Maybe<Array<DatasetType>>
  playlistById?: Maybe<PlaylistType>
  playlists?: Maybe<Array<PlaylistType>>
  trackById?: Maybe<TrackType>
  tracks?: Maybe<Array<TrackType>>
}

export type QueryAlbumByIdArgs = {
  id: Scalars["String"]["input"]
}

export type QueryAlbumsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryArtistByIdArgs = {
  id: Scalars["String"]["input"]
}

export type QueryArtistsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryDatasetByIdArgs = {
  id: Scalars["String"]["input"]
}

export type QueryDatasetsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryPlaylistByIdArgs = {
  id: Scalars["String"]["input"]
}

export type QueryPlaylistsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryTrackByIdArgs = {
  id: Scalars["String"]["input"]
}

export type QueryTracksArgs = {
  albumId?: InputMaybe<Scalars["String"]["input"]>
  artistId?: InputMaybe<Scalars["String"]["input"]>
  datasetId?: InputMaybe<Scalars["ID"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
  playlistId?: InputMaybe<Scalars["String"]["input"]>
}

export type ThumbnailType = {
  __typename?: "ThumbnailType"
  albums: Array<ArtistType>
  artists: Array<ArtistType>
  height: Scalars["Int"]["output"]
  id: Scalars["ID"]["output"]
  image: Scalars["String"]["output"]
  playlists: Array<PlaylistType>
  width: Scalars["Int"]["output"]
}

export type TrackType = {
  __typename?: "TrackType"
  albums?: Maybe<Array<ArtistType>>
  artists?: Maybe<Array<ArtistType>>
  audio?: Maybe<Scalars["String"]["output"]>
  bitrate?: Maybe<Scalars["Int"]["output"]>
  channels?: Maybe<Scalars["Int"]["output"]>
  datasets: Array<DatasetType>
  durationMs?: Maybe<Scalars["Int"]["output"]>
  explicit?: Maybe<Scalars["Boolean"]["output"]>
  id: Scalars["String"]["output"]
  lyrics?: Maybe<Scalars["String"]["output"]>
  name?: Maybe<Scalars["String"]["output"]>
  playlists: Array<PlaylistType>
  popularity?: Maybe<Scalars["Int"]["output"]>
  sampleRate?: Maybe<Scalars["Int"]["output"]>
  spotifyHref?: Maybe<Scalars["String"]["output"]>
  status?: Maybe<ApiTrackStatusChoices>
  streamUrl?: Maybe<Scalars["String"]["output"]>
  thumbnails?: Maybe<Array<ThumbnailType>>
  trackNumber?: Maybe<Scalars["Int"]["output"]>
  youtubeHref?: Maybe<Scalars["String"]["output"]>
}

export type ListTracksQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListTracksQuery = {
  __typename?: "Query"
  tracks?: Array<{
    __typename?: "TrackType"
    id: string
    name?: string | null
    streamUrl?: string | null
    artists?: Array<{
      __typename?: "ArtistType"
      id: string
      name?: string | null
    }> | null
    albums?: Array<{
      __typename?: "AlbumType"
      id: string
      name?: string | null
      thumbnails: Array<{
        __typename?: "ThumbnailType"
        id: string
        height: number
        width: number
      }>
    }> | null
  }> | null
}

export const ListTracksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListTracks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "1" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "60" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tracks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "streamUrl" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artists" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "albums" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thumbnails" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "height" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "width" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListTracksQuery, ListTracksQueryVariables>
