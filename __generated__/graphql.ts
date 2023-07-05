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
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: { input: any; output: any }
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: { input: any; output: any }
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
  albums: Array<AlbumType>
  id: Scalars["String"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
  spotifyHref?: Maybe<Scalars["String"]["output"]>
  thumbnails: Array<ThumbnailType>
  tracks: Array<TrackType>
}

export type DatasetType = {
  __typename?: "DatasetType"
  description?: Maybe<Scalars["String"]["output"]>
  experiments: Array<ExperimentType>
  id: Scalars["ID"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
  tracks: Array<TrackType>
}

export type ExperimentQueryType = {
  __typename?: "ExperimentQueryType"
  executionJson?: Maybe<Scalars["JSONString"]["output"]>
  experiment: ExperimentType
  id: Scalars["UUID"]["output"]
  model: ModelType
  queryTrack?: Maybe<Scalars["String"]["output"]>
  resultJson?: Maybe<Array<Scalars["JSONString"]["output"]>>
  streamUrl?: Maybe<Scalars["String"]["output"]>
}

export type ExperimentType = {
  __typename?: "ExperimentType"
  dataset: DatasetType
  description?: Maybe<Scalars["String"]["output"]>
  encoderFile?: Maybe<Scalars["String"]["output"]>
  id: Scalars["UUID"]["output"]
  models: Array<ModelType>
  name?: Maybe<Scalars["String"]["output"]>
  preprocessJson?: Maybe<Scalars["JSONString"]["output"]>
  queries: Array<ExperimentQueryType>
  representationFile?: Maybe<Scalars["String"]["output"]>
  representationJson?: Maybe<Scalars["JSONString"]["output"]>
  scalerFile?: Maybe<Scalars["String"]["output"]>
}

export type MetricType = {
  __typename?: "MetricType"
  accuracy?: Maybe<Scalars["Float"]["output"]>
  classesReport?: Maybe<Scalars["JSONString"]["output"]>
  experimentsTest: Array<ModelType>
  experimentsTrain: Array<ModelType>
  experimentsValidation: Array<ModelType>
  f1Score?: Maybe<Scalars["Float"]["output"]>
  id: Scalars["ID"]["output"]
  loss?: Maybe<Scalars["Float"]["output"]>
  precision?: Maybe<Scalars["Float"]["output"]>
  recall?: Maybe<Scalars["Float"]["output"]>
  support?: Maybe<Scalars["Float"]["output"]>
}

/** An enumeration. */
export enum MlModelTypeChoices {
  /** Aebilstm */
  AeBilstm = "AE_BILSTM",
  /** Aecnn */
  AeCnn = "AE_CNN",
  /** Aelstm */
  AeLstm = "AE_LSTM",
  /** Aemlp */
  AeMlp = "AE_MLP",
  /** Knn */
  Knn = "KNN",
  /** Mlp */
  Mlp = "MLP",
}

export type ModelType = {
  __typename?: "ModelType"
  dependsOn?: Maybe<ModelType>
  experiments: Array<ExperimentType>
  hyperParameters?: Maybe<Scalars["JSONString"]["output"]>
  id: Scalars["ID"]["output"]
  isAutoencoder: Scalars["Boolean"]["output"]
  isNeuralNetwork: Scalars["Boolean"]["output"]
  modelFile?: Maybe<Scalars["String"]["output"]>
  modelSet: Array<ModelType>
  queries: Array<ExperimentQueryType>
  scalerFile?: Maybe<Scalars["String"]["output"]>
  testMetrics: MetricType
  trainMetrics: MetricType
  type?: Maybe<MlModelTypeChoices>
  validationMetrics: MetricType
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
  albumById?: Maybe<AlbumType>
  albums?: Maybe<Array<AlbumType>>
  artistById?: Maybe<ArtistType>
  artists?: Maybe<Array<ArtistType>>
  datasetById?: Maybe<DatasetType>
  datasets?: Maybe<Array<DatasetType>>
  experimentById?: Maybe<ExperimentType>
  experimentQueries?: Maybe<Array<ExperimentQueryType>>
  experimentQueryById?: Maybe<ExperimentQueryType>
  experiments?: Maybe<Array<ExperimentType>>
  metricById?: Maybe<MetricType>
  metrics?: Maybe<Array<MetricType>>
  modelById?: Maybe<ModelType>
  models?: Maybe<Array<ModelType>>
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

export type QueryExperimentByIdArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryExperimentQueriesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  page?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryExperimentQueryByIdArgs = {
  id?: InputMaybe<Scalars["UUID"]["input"]>
}

export type QueryMetricByIdArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryModelByIdArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>
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
  tracksId?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
}

export type ThumbnailType = {
  __typename?: "ThumbnailType"
  albums: Array<AlbumType>
  artists: Array<ArtistType>
  height: Scalars["Int"]["output"]
  id: Scalars["ID"]["output"]
  image: Scalars["String"]["output"]
  playlists: Array<PlaylistType>
  width: Scalars["Int"]["output"]
}

export type TrackType = {
  support?: number
  accuracy?: number
  __typename?: "TrackType"
  albums?: Maybe<Array<AlbumType>>
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

export type AlbumPageMetadataQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type AlbumPageMetadataQuery = {
  __typename?: "Query"
  albumById?: { __typename?: "AlbumType"; name?: string | null } | null
}

export type AlbumPageQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type AlbumPageQuery = {
  __typename?: "Query"
  albumById?: {
    __typename?: "AlbumType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
    tracks: Array<{
      __typename?: "TrackType"
      id: string
      name?: string | null
    }>
  } | null
}

export type ListAlbumsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListAlbumsQuery = {
  __typename?: "Query"
  albums?: Array<{
    __typename?: "AlbumType"
    id: string
    name?: string | null
    artists: Array<{
      __typename?: "ArtistType"
      id: string
      name?: string | null
    }>
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
}

export type ArtistPageMetadataQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type ArtistPageMetadataQuery = {
  __typename?: "Query"
  artistById?: { __typename?: "ArtistType"; name?: string | null } | null
}

export type ArtistPageQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type ArtistPageQuery = {
  __typename?: "Query"
  artistById?: {
    __typename?: "ArtistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
    tracks: Array<{
      __typename?: "TrackType"
      id: string
      name?: string | null
    }>
  } | null
}

export type ListArtistsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListArtistsQuery = {
  __typename?: "Query"
  artists?: Array<{
    __typename?: "ArtistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
}

export type ListDatasetsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListDatasetsQuery = {
  __typename?: "Query"
  datasets?: Array<{
    __typename?: "DatasetType"
    id: string
    name?: string | null
  }> | null
}

export type ListTracksQueryVariables = Exact<{ [key: string]: never }>

export type ListTracksQuery = {
  __typename?: "Query"
  tracks?: Array<{
    __typename?: "TrackType"
    id: string
    name?: string | null
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
  albums?: Array<{
    __typename?: "AlbumType"
    id: string
    name?: string | null
    artists: Array<{
      __typename?: "ArtistType"
      id: string
      name?: string | null
    }>
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
  artists?: Array<{
    __typename?: "ArtistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
  playlists?: Array<{
    __typename?: "PlaylistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
}

export type PlaylistMetadataQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type PlaylistMetadataQuery = {
  __typename?: "Query"
  playlistById?: { __typename?: "PlaylistType"; name?: string | null } | null
}

export type PlaylistPageQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type PlaylistPageQuery = {
  __typename?: "Query"
  playlistById?: {
    __typename?: "PlaylistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
    tracks: Array<{
      __typename?: "TrackType"
      id: string
      name?: string | null
    }>
  } | null
}

export type ListPlaylistsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListPlaylistsQuery = {
  __typename?: "Query"
  playlists?: Array<{
    __typename?: "PlaylistType"
    id: string
    name?: string | null
    thumbnails: Array<{
      __typename?: "ThumbnailType"
      id: string
      height: number
      width: number
    }>
  }> | null
}

export type QueryMetadataQueryVariables = Exact<{
  id: Scalars["UUID"]["input"]
}>

export type QueryMetadataQuery = {
  __typename?: "Query"
  experimentQueryById?: { __typename?: "ExperimentQueryType"; id: any } | null
}

export type QueryDataQueryVariables = Exact<{
  id: Scalars["UUID"]["input"]
}>

export type QueryDataQuery = {
  __typename?: "Query"
  experimentQueryById?: {
    __typename?: "ExperimentQueryType"
    id: any
    resultJson?: Array<any> | null
    executionJson?: any | null
    queryTrack?: string | null
  } | null
}

export type QueryResultTracksQueryVariables = Exact<{
  ids?: InputMaybe<
    | Array<InputMaybe<Scalars["String"]["input"]>>
    | InputMaybe<Scalars["String"]["input"]>
  >
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type QueryResultTracksQuery = {
  __typename?: "Query"
  tracks?: Array<{
    __typename?: "TrackType"
    id: string
    name?: string | null
    durationMs?: number | null
    albums?: Array<{
      __typename?: "AlbumType"
      id: string
      name?: string | null
    }> | null
    artists?: Array<{
      __typename?: "ArtistType"
      id: string
      name?: string | null
    }> | null
  }> | null
}

export type ListExperimentQueriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListExperimentQueriesQuery = {
  __typename?: "Query"
  experimentQueries?: Array<{
    __typename?: "ExperimentQueryType"
    id: any
    model: {
      __typename?: "ModelType"
      type?: MlModelTypeChoices | null
      id: string
    }
  }> | null
}

export type TrackPageQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type TrackPageQuery = {
  __typename?: "Query"
  trackById?: {
    __typename?: "TrackType"
    id: string
    name?: string | null
    durationMs?: number | null
    lyrics?: string | null
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
    artists?: Array<{
      __typename?: "ArtistType"
      id: string
      name?: string | null
      thumbnails: Array<{
        __typename?: "ThumbnailType"
        id: string
        height: number
        width: number
      }>
    }> | null
  } | null
}

export type ListTracksHomeQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ListTracksHomeQuery = {
  __typename?: "Query"
  tracks?: Array<{
    __typename?: "TrackType"
    id: string
    name?: string | null
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

export type GetExperimentsQueryVariables = Exact<{ [key: string]: never }>

export type GetExperimentsQuery = {
  __typename?: "Query"
  experiments?: Array<{
    __typename?: "ExperimentType"
    id: any
    description?: string | null
    name?: string | null
    models: Array<{
      __typename?: "ModelType"
      id: string
      type?: MlModelTypeChoices | null
    }>
  }> | null
}

export const AlbumPageMetadataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AlbumPageMetadata" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "albumById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AlbumPageMetadataQuery,
  AlbumPageMetadataQueryVariables
>
export const AlbumPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AlbumPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "albumById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tracks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<AlbumPageQuery, AlbumPageQueryVariables>
export const ListAlbumsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListAlbums" },
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
            name: { kind: "Name", value: "albums" },
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
                  name: { kind: "Name", value: "thumbnails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
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
} as unknown as DocumentNode<ListAlbumsQuery, ListAlbumsQueryVariables>
export const ArtistPageMetadataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ArtistPageMetadata" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "artistById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ArtistPageMetadataQuery,
  ArtistPageMetadataQueryVariables
>
export const ArtistPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ArtistPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "artistById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tracks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<ArtistPageQuery, ArtistPageQueryVariables>
export const ListArtistsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListArtists" },
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
            name: { kind: "Name", value: "artists" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
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
} as unknown as DocumentNode<ListArtistsQuery, ListArtistsQueryVariables>
export const ListDatasetsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListDatasets" },
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
            name: { kind: "Name", value: "datasets" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListDatasetsQuery, ListDatasetsQueryVariables>
export const ListTracksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListTracks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tracks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
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
                  name: { kind: "Name", value: "thumbnails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "artists" },
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "playlists" },
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
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
export const PlaylistMetadataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PlaylistMetadata" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "playlistById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PlaylistMetadataQuery,
  PlaylistMetadataQueryVariables
>
export const PlaylistPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PlaylistPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "playlistById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tracks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<PlaylistPageQuery, PlaylistPageQueryVariables>
export const ListPlaylistsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListPlaylists" },
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
            name: { kind: "Name", value: "playlists" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
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
} as unknown as DocumentNode<ListPlaylistsQuery, ListPlaylistsQueryVariables>
export const QueryMetadataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QueryMetadata" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "experimentQueryById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryMetadataQuery, QueryMetadataQueryVariables>
export const QueryDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QueryData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "experimentQueryById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "resultJson" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "executionJson" },
                },
                { kind: "Field", name: { kind: "Name", value: "queryTrack" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryDataQuery, QueryDataQueryVariables>
export const QueryResultTracksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QueryResultTracks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
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
          defaultValue: { kind: "IntValue", value: "100" },
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
                name: { kind: "Name", value: "tracksId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ids" },
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
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "durationMs" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "albums" },
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
                  name: { kind: "Name", value: "artists" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<
  QueryResultTracksQuery,
  QueryResultTracksQueryVariables
>
export const ListExperimentQueriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListExperimentQueries" },
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
            name: { kind: "Name", value: "experimentQueries" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "model" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
} as unknown as DocumentNode<
  ListExperimentQueriesQuery,
  ListExperimentQueriesQueryVariables
>
export const TrackPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TrackPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "trackById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "durationMs" } },
                { kind: "Field", name: { kind: "Name", value: "lyrics" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artists" },
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
} as unknown as DocumentNode<TrackPageQuery, TrackPageQueryVariables>
export const ListTracksHomeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListTracksHome" },
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
} as unknown as DocumentNode<ListTracksHomeQuery, ListTracksHomeQueryVariables>
export const GetExperimentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getExperiments" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "experiments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "models" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetExperimentsQuery, GetExperimentsQueryVariables>
