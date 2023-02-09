import { ITrack } from "@/interfaces/TrackInterface";
import { FormEvent, useEffect, useRef, useState } from "react";
import { apiAxios, ssrAxios } from "@/libs/axios";
import { useRouter } from "next/router";
import { IPagination } from "@/interfaces/PaginationInterface";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { toastSuccess } from "@/libs/toasts";
import * as process from "process";
import { GetServerSidePropsContext } from "next";
import TableTracks from "@/components/tracks/TableTracks";
import usePlayerStore from "@/stores/usePlayerStore";
import Player from "@/components/Player";
import Image from "next/image";
import { classNames } from "@/utils";

interface Props {
  pagination: IPagination<ITrack>;
  tracks: ITrack[];
  track: ITrack;
}

export default function Index({ tracks, track, pagination }: Props) {
  const [changeTrack, queue, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.queue,
    state.setQueue
  ]);

  const tableRef = useRef<HTMLTableSectionElement>(null);
  const [cPagination, setCPagination] =
    useState<IPagination<ITrack>>(pagination);

  const [search, setSearch] = useState("");
  const router = useRouter();

  async function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await searchTracks();
  }

  async function searchTracks() {
    if (!search) {
      const { data } = await apiAxios.get(`/tracks/`);
      setCPagination(data);
      setQueue(data.results);
      return router.push(
        {
          pathname: router.pathname
        },
        undefined,
        { shallow: true }
      );
    }
    const { data } = await apiAxios.get(`/tracks/search/?q=${search}`);
    setCPagination(data);
    setQueue(data.results);
    router.push(
      {
        pathname: router.pathname,
        query: { q: search }
      },
      undefined,
      { shallow: true }
    );
  }

  function handleChangeTrack(
    obj: ITrack,
    play = true,
    scrollToElement: Element | null = null
  ) {
    changeTrack(obj, play);
    if (scrollToElement) {
      scrollToElement?.scrollIntoView({ behavior: "smooth" });
    }
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, track: obj.id }
      },
      undefined,
      { shallow: true }
    );
    toastSuccess(
      `Now playing ${obj.name} - ${obj.artists.map((i) => i.name).join(", ")}`
    );
  }

  async function fetchNewPage(
    nextPage: string | null = null
  ): Promise<IPagination<ITrack> | undefined> {
    console.log("fetching", cPagination?.next, isFetching);
    if (cPagination?.next && !isFetching) {
      const { data } = await apiAxios.get(
        nextPage ||
        cPagination.next.replace(
          process.env.NEXT_PUBLIC_SSR_API_URL || "",
          process.env.NEXT_PUBLIC_API_URL || ""
        )
      );
      await setCPagination(data);
      setQueue([...queue, ...data.results]);
      setFetchingFalse();
      return data as IPagination<ITrack>;
    }
  }

  const [isFetching, setFetchingFalse] = useInfiniteScroll(
    async () => {
      await fetchNewPage();
    },
    tableRef.current?.lastChild as HTMLElement,
    null,
    10
  );

  useEffect(() => {
    if (router.query.q) setSearch(router.query.q as string);
  }, [router.query.q]);

  useEffect(() => {
    setQueue(tracks);
    if (track) {
      changeTrack(track, false);
    }
  }, []);

  function header(className?: string) {
    return <div className={classNames("w-full bg-neutral z-20 flex-col md:flex-row items-center justify-between", className)}>
      <div className="relative w-36 h-16 mx-auto md:ml-2 md:mr-4">
        <Image src="/netrosound_jacke.svg" alt="Netro Sound logo" fill />
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="mx-auto col-span-2 w-full"
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm caret-primary rounded-box bg-neutral outline-none"
            placeholder="Search for tracks, artists, albums..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-sm btn-primary absolute right-2.5 bottom-2.5"
          >
            Search
          </button>
        </div>
      </form>
    </div>;
  }

  return (
    <>
      <div
        className="w-screen md:max-w-6xl grid md:grid-cols-2 bg-neutral mx-auto divide-y md:divide-x divide-neutral-700 min-h-screen z-0">
        {/*{header("fixed md:hidden")}*/}
        <div className="sticky top-0 mb-8 h-screen">
          {header("flex")}
          <Player defaultAudio={track} />
        </div>
        <div className="z-10 bg-neutral">
          <h3 className="text-center w-full text-lg my-2">
            Total of {cPagination.count || queue.length} tracks
          </h3>
          <TableTracks
            tracks={queue}
            changeTrack={handleChangeTrack}
            ref={tableRef}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { track, artist, album, dataset, playlist, q } = context.query;

  let listInfo: IPagination<ITrack> | null = null;
  let currentPlaylist = null;
  let currentAlbum = null;
  let currentArtist = null;
  let currentDataset = null;
  let currentTrack: ITrack = {} as ITrack;
  let tracks: ITrack[];

  if (!playlist && !artist && !album && !dataset && !q) {
    listInfo = (await ssrAxios.get(`/tracks`)).data;
  }

  if (!!playlist) {
    currentPlaylist = (await ssrAxios.get(`/playlists/${playlist}`)).data;
    listInfo = (await ssrAxios.get(`/playlists/${playlist}/tracks`)).data;
  }

  if (!!artist) {
    currentArtist = (await ssrAxios.get(`/artists/${artist}`)).data;
    listInfo = (await ssrAxios.get(`/artists/${artist}/tracks`)).data;
  }

  if (!!album) {
    currentAlbum = (await ssrAxios.get(`/albums/${album}`)).data;
    listInfo = (await ssrAxios.get(`/albums/${album}/tracks`)).data;
  }

  if (!!dataset) {
    currentDataset = (await ssrAxios.get(`/datasets/${dataset}`)).data;
    listInfo = (await ssrAxios.get(`/datasets/${dataset}/tracks`)).data;
  }

  if (!!q) {
    listInfo = (await ssrAxios.get(`/tracks/search`, { params: { q } })).data;
  }

  tracks = !!listInfo ? listInfo?.results : [];

  if (!!track) {
    currentTrack = (await ssrAxios.get(`/tracks/${track}`)).data;
  } else if (!!tracks.length) {
    currentTrack = tracks[0];
  }

  if (!tracks.length && !!currentTrack) {
    tracks = [currentTrack];
  }

  return {
    props: {
      tracks,
      pagination: listInfo,
      // playlist: currentPlaylist,
      // album: currentAlbum,
      // artist: currentArtist,
      // dataset: currentDataset,
      track: currentTrack
    }
  };
}
