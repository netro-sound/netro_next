/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query AlbumPageMetadata($id: String!) {\n        albumById(id: $id) {\n          name\n        }\n      }\n    ": types.AlbumPageMetadataDocument,
    "\n      query AlbumPage($id: String!) {\n        albumById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    ": types.AlbumPageDocument,
    "\n  query ListAlbums($page: Int = 1, $limit: Int = 60) {\n    albums(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n": types.ListAlbumsDocument,
    "\n      query ArtistPageMetadata($id: String!) {\n        artistById(id: $id) {\n          name\n        }\n      }\n    ": types.ArtistPageMetadataDocument,
    "\n      query ArtistPage($id: String!) {\n        artistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    ": types.ArtistPageDocument,
    "\n  query ListArtists($page: Int = 1, $limit: Int = 60) {\n    artists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n": types.ListArtistsDocument,
    "\n  query ListDatasets($page: Int = 1, $limit: Int = 60) {\n    datasets(limit: $limit, page: $page) {\n      id\n      name\n    }\n  }\n": types.ListDatasetsDocument,
    "\n  query ListTracks {\n    tracks {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n    albums {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    artists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    playlists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n": types.ListTracksDocument,
    "\n      query PlaylistMetadata($id: String!) {\n        playlistById(id: $id) {\n          name\n        }\n      }\n    ": types.PlaylistMetadataDocument,
    "\n      query PlaylistPage($id: String!) {\n        playlistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    ": types.PlaylistPageDocument,
    "\n  query ListPlaylists($page: Int = 1, $limit: Int = 60) {\n    playlists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n": types.ListPlaylistsDocument,
    "\n  query QueryMetadata($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n    }\n  }\n": types.QueryMetadataDocument,
    "\n  query QueryData($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n      predictTime\n      preprocessTime\n      loadTime\n      trackQuery {\n        accuracy\n        support\n        track {\n          id\n          name\n          durationMs\n          albums {\n            id\n            name\n          }\n          artists {\n            id\n            name\n          }\n        }\n      }\n      queryTrack\n      streamUrl\n    }\n  }\n": types.QueryDataDocument,
    "\n  query ListExperimentQueries($page: Int = 1, $limit: Int = 60) {\n    experimentQueries(limit: $limit, page: $page) {\n      id\n      model {\n        type\n        dependsOn {\n          type\n        }\n      }\n    }\n  }\n": types.ListExperimentQueriesDocument,
    "\n      query TrackPage($id: String!) {\n        trackById(id: $id) {\n          id\n          name\n          durationMs\n          lyrics\n          albums {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n          artists {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n        }\n      }\n    ": types.TrackPageDocument,
    "\n  query ListTracksHome($page: Int = 1, $limit: Int = 60) {\n    tracks(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n  }\n": types.ListTracksHomeDocument,
    "\n  query getExperiments {\n    experiments {\n      id\n      models {\n        id\n        type\n      }\n      description\n      name\n    }\n  }\n": types.GetExperimentsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query AlbumPageMetadata($id: String!) {\n        albumById(id: $id) {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query AlbumPageMetadata($id: String!) {\n        albumById(id: $id) {\n          name\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query AlbumPage($id: String!) {\n        albumById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query AlbumPage($id: String!) {\n        albumById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAlbums($page: Int = 1, $limit: Int = 60) {\n    albums(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListAlbums($page: Int = 1, $limit: Int = 60) {\n    albums(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query ArtistPageMetadata($id: String!) {\n        artistById(id: $id) {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query ArtistPageMetadata($id: String!) {\n        artistById(id: $id) {\n          name\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query ArtistPage($id: String!) {\n        artistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query ArtistPage($id: String!) {\n        artistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListArtists($page: Int = 1, $limit: Int = 60) {\n    artists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListArtists($page: Int = 1, $limit: Int = 60) {\n    artists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListDatasets($page: Int = 1, $limit: Int = 60) {\n    datasets(limit: $limit, page: $page) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query ListDatasets($page: Int = 1, $limit: Int = 60) {\n    datasets(limit: $limit, page: $page) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTracks {\n    tracks {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n    albums {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    artists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    playlists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListTracks {\n    tracks {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n    albums {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    artists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n    playlists {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query PlaylistMetadata($id: String!) {\n        playlistById(id: $id) {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query PlaylistMetadata($id: String!) {\n        playlistById(id: $id) {\n          name\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query PlaylistPage($id: String!) {\n        playlistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query PlaylistPage($id: String!) {\n        playlistById(id: $id) {\n          id\n          name\n          thumbnails {\n            id\n            height\n            width\n          }\n          tracks {\n            id\n            name\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListPlaylists($page: Int = 1, $limit: Int = 60) {\n    playlists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPlaylists($page: Int = 1, $limit: Int = 60) {\n    playlists(limit: $limit, page: $page) {\n      id\n      name\n      thumbnails {\n        id\n        height\n        width\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryMetadata($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query QueryMetadata($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryData($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n      predictTime\n      preprocessTime\n      loadTime\n      trackQuery {\n        accuracy\n        support\n        track {\n          id\n          name\n          durationMs\n          albums {\n            id\n            name\n          }\n          artists {\n            id\n            name\n          }\n        }\n      }\n      queryTrack\n      streamUrl\n    }\n  }\n"): (typeof documents)["\n  query QueryData($id: UUID!) {\n    experimentQueryById(id: $id) {\n      id\n      predictTime\n      preprocessTime\n      loadTime\n      trackQuery {\n        accuracy\n        support\n        track {\n          id\n          name\n          durationMs\n          albums {\n            id\n            name\n          }\n          artists {\n            id\n            name\n          }\n        }\n      }\n      queryTrack\n      streamUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListExperimentQueries($page: Int = 1, $limit: Int = 60) {\n    experimentQueries(limit: $limit, page: $page) {\n      id\n      model {\n        type\n        dependsOn {\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListExperimentQueries($page: Int = 1, $limit: Int = 60) {\n    experimentQueries(limit: $limit, page: $page) {\n      id\n      model {\n        type\n        dependsOn {\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query TrackPage($id: String!) {\n        trackById(id: $id) {\n          id\n          name\n          durationMs\n          lyrics\n          albums {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n          artists {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query TrackPage($id: String!) {\n        trackById(id: $id) {\n          id\n          name\n          durationMs\n          lyrics\n          albums {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n          artists {\n            id\n            name\n            thumbnails {\n              id\n              height\n              width\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListTracksHome($page: Int = 1, $limit: Int = 60) {\n    tracks(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListTracksHome($page: Int = 1, $limit: Int = 60) {\n    tracks(limit: $limit, page: $page) {\n      id\n      name\n      artists {\n        id\n        name\n      }\n      albums {\n        id\n        name\n        thumbnails {\n          id\n          height\n          width\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getExperiments {\n    experiments {\n      id\n      models {\n        id\n        type\n      }\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  query getExperiments {\n    experiments {\n      id\n      models {\n        id\n        type\n      }\n      description\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;