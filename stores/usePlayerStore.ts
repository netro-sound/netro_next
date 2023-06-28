import { TrackType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"
import { create } from "zustand"

import fetchGraphQL from "@/lib/client"
import { apiURL } from "@/lib/utils"

type TrackData = {
  blobParts: Blob[]
  nextRange: number
  maxRange: number
  contentType: string
}

export const FETCH_LIST_TRACKS = gql`
  query fetchListTracks($ids: [String], $page: Int = 1, $limit: Int = 100) {
    tracks(tracksId: $ids, page: $page, limit: $limit) {
      id
      name
      durationMs
      albums {
        id
        name
      }
      artists {
        id
        name
      }
    }
  }
`

const FETCH_TRACK = gql`
  query FetchTrack($id: String!) {
    trackById(id: $id) {
      id
      name
      durationMs
      streamUrl
      lyrics
      albums {
        id
        name
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
    }
  }
`

interface PlayerState {
  currentTrack: TrackType | null
  changeTrack: (index: number | string, play?: boolean) => void
  nextTrack: (play?: boolean) => void | TrackType
  previousTrack: (play?: boolean) => void | TrackType
  queue: TrackType[]
  setQueue: (tracks: string[]) => Promise<void>
  addTracksToQueue: (track: string[], afterCurrent?: boolean) => Promise<void>
  removeTracksFromQueue: (track: string[]) => void
  audioTag: HTMLAudioElement | null
  play: () => void
  pause: () => void
  setAudioTag: (audioTag: HTMLAudioElement) => void
  trackData: TrackData
}

const usePlayerStore = create<PlayerState>()((set, get) => ({
  audioTag: null,
  setAudioTag: (audioTag: HTMLAudioElement) => set({ audioTag }),
  currentTrack: null,
  queue: [],
  trackData: {} as TrackData,
  play: () => {
    const { audioTag } = get()
    audioTag?.play()
  },
  pause: () => {
    const { audioTag } = get()
    audioTag?.pause()
  },
  setQueue: async (queue: string[]) => {
    const isEmpty = get().queue.length === 0
    const tracksQueue = []
    const limit = 100
    let page = 1
    let flag = false

    do {
      const { tracks } = await fetchGraphQL<{ tracks: TrackType[] }, unknown>(
        FETCH_LIST_TRACKS,
        {
          ids: queue,
          page: page++,
          limit,
        }
      )
      tracksQueue.push(...tracks)
      flag = tracks.length < limit
    } while (!flag)

    set({ queue: tracksQueue })

    if (isEmpty) {
      get().changeTrack(0, true)
    }
  },
  addTracksToQueue: async (queue: string[], afterCurrent: boolean = false) => {
    const { tracks: tracksFetched } = await fetchGraphQL<
      { tracks: TrackType[] },
      unknown
    >(FETCH_LIST_TRACKS, {
      ids: queue,
    })

    set((state) => {
      if (afterCurrent) {
        const index = state.queue.findIndex(
          (i) => i.id === state.currentTrack?.id
        )
        return {
          queue: [
            ...state.queue.slice(0, index + 1),
            ...tracksFetched.filter((i) => !get().queue.includes(i)),
            ...state.queue.slice(index + 1),
          ],
        }
      }
      return {
        queue: [
          ...state.queue,
          ...tracksFetched.filter((i) => !get().queue.includes(i)),
        ],
      }
    })
  },
  removeTracksFromQueue: (tracks: string[]) =>
    set((state) => ({
      queue: state.queue.filter((i) => !tracks.includes(i.id)),
    })),
  changeTrack: async (trackIndex, play = false) => {
    const { audioTag } = get()
    audioTag?.pause()

    if (typeof trackIndex === "string") {
      trackIndex = get().queue.findIndex((i) => i.id === trackIndex)
    }

    const track = get().queue[trackIndex]

    const { trackById } = await fetchGraphQL<{ trackById: TrackType }, unknown>(
      FETCH_TRACK,
      {
        id: track.id,
      }
    )

    set({ currentTrack: trackById })

    audioTag?.setAttribute("src", apiURL(trackById.streamUrl))
    if (play) {
      audioTag?.addEventListener("loadeddata", audioTag?.play)
    }
  },
  nextTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get()
    const index = queue.findIndex((i) => i.id === currentTrack?.id)
    if (index + 1 < queue.length) {
      changeTrack(index + 1, play)
      return queue[index + 1]
    }
  },
  previousTrack: (play = false) => {
    const { queue, currentTrack, changeTrack } = get()
    const index = queue.findIndex((i) => i.id === currentTrack?.id)
    if (index - 1 >= 0) {
      changeTrack(index - 1, play)
      return queue[index - 1]
    }
  },
}))

export default usePlayerStore
