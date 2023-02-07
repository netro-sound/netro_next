import { ITrack } from '@/interfaces/TrackInterface';
import { classNames, concatAPIUrl } from '@/utils';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { apiAxios, ssrAxios } from '@/libs/axios';
import { IPlaylist } from '@/interfaces/PlaylistInterface';
import { useRouter } from 'next/router';
import { IPagination } from '@/interfaces/PaginationInterface';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useEffectTimeout from '@/hooks/useEffectTimeout';
import { NextSeo, NextSeoProps } from 'next-seo';
import { toastSuccess } from '@/libs/toasts';
import { GetServerSidePropsContext } from 'next';

interface Props {
  pagination: IPagination<ITrack>;
  tracks: ITrack[];
  track: ITrack;
  playlist: IPlaylist;
}

export default function Index({ tracks, track, playlist, pagination }: Props) {
  const [currentTrack, setCurrentTrack] = useState(track);
  const [queue, setQueue] = useState<ITrack[]>(tracks);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const [targetInfiniteScroll, setTargetInfiniteScroll] =
    useState<HTMLElement | null>(null);
  const [cPagination, setCPagination] =
    useState<IPagination<ITrack>>(pagination);
  const [seo, setSeo] = useState<NextSeoProps>({} as NextSeoProps);

  const [search, setSearch] = useState('');
  const router = useRouter();

  async function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearTimeout();
    await searchTracks();
  }

  async function searchTracks() {
    const { data } = await apiAxios.get(`/tracks/search/?q=${search}`);
    setCPagination(data);
    setQueue(data.results);
    router.push(
      {
        pathname: router.pathname,
        query: { q: search },
      },
      undefined,
      { shallow: true }
    );
  }

  function getElementCurrentTrack(tracks = queue) {
    return tableRef.current?.children[
      tracks.findIndex((i) => i.id === currentTrack.id)
    ];
  }

  function handleChangeTrack(
    obj: ITrack,
    play = true,
    scrollToElement: Element | null = null
  ) {
    setCurrentTrack(obj);
    audioRef.current?.pause();
    audioRef.current?.load();
    if (play) audioRef.current?.play();
    if (scrollToElement) {
      scrollToElement?.scrollTo({ behavior: 'smooth', top: 0 });
    }
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, track: obj.id },
      },
      undefined,
      { shallow: true }
    );
    toastSuccess(
      `Now playing ${obj.name} - ${obj.artists.map((i) => i.name).join(', ')}`
    );
  }

  function skipTrack(scrollTo = true) {
    const index = tracks.findIndex((i) => i.id === currentTrack.id);
    if (index + 1 < tracks.length) {
      handleChangeTrack(
        tracks[index + 1],
        true,
        scrollTo ? tableRef.current?.children[index + 1] : null
      );
    }
  }

  function prevTrack(scrollTo = true) {
    const index = tracks.findIndex((i) => i.id === currentTrack.id);
    if (index - 1 >= 0) {
      handleChangeTrack(
        tracks[index - 1],
        true,
        scrollTo ? tableRef.current?.children[index - 1] : null
      );
    }
  }

  function eventEnded() {
    skipTrack(true);
  }

  async function fetchNewPage(
    nextPage: string | null = null
  ): Promise<IPagination<ITrack> | undefined> {
    if (cPagination?.next && !isFetching) {
      const { data } = await apiAxios.get(nextPage || cPagination.next);
      await setCPagination(data);
      await setQueue((prev) => [...prev, ...data.results]);
      setFetchingFalse();
      return data as IPagination<ITrack>;
    }
  }

  const [isFetching, setFetchingFalse] = useInfiniteScroll(
    async () => {
      await fetchNewPage();
    },
    targetInfiniteScroll,
    null,
    10
  );

  const { clearTimeout } = useEffectTimeout(
    async () => {
      await searchTracks();
    },
    1000,
    [search],
    false
  );

  useEffect(() => {
    setTargetInfiniteScroll(tableRef.current?.lastChild as HTMLElement);
  }, [tableRef.current?.lastChild]);

  useEffect(() => {
    audioRef.current?.addEventListener('ended', eventEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', eventEnded);
    };
  }, [currentTrack, tracks]);

  useEffect(() => {
    setSeo({
      title:
        'Netro Sound | ' +
        currentTrack.name +
        ' - ' +
        currentTrack.artists.map((i) => i.name).join(', '),
    });

    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.name,
        artist: currentTrack.artists.map((i) => i.name).join(', '),
        album: currentTrack.albums[0].name,
        artwork: currentTrack.thumbnails.map((i) => ({
          src: i.image,
          sizes: `${i.width}x${i.height}`,
          type: 'image/jpeg',
        })) as MediaImage[],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        prevTrack(true);
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        skipTrack(true);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    (async () => {
      if (pagination.results.length === 0) return;
      let paginationResult = pagination?.results;
      let element = getElementCurrentTrack(paginationResult);

      while (!element) {
        const data = await fetchNewPage();
        if (!data) return;

        paginationResult = [...paginationResult, ...data?.results];
        element = getElementCurrentTrack(paginationResult);
      }

      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })();
  }, []);

  return (
    <>
      <NextSeo {...seo} />
      <div className="w-screen md:max-w-6xl grid md:grid-cols-2 bg-neutral mx-auto divide-y md:divide-x divide-neutral-700 min-h-screen">
        <div>
          <div className="sticky top-0 mb-8">
            <div className="p-4 grid md:grid-cols-2 gap-4 w-full items-center bg-neutral">
              <form
                onSubmit={handleSearchSubmit}
                method="get"
                className="mx-auto"
              >
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  id="search"
                  name="search"
                  enterKeyHint="enter"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={'Search'}
                  className="py-1 px-4 rounded-box"
                />
              </form>
              <h3 className="text-gray-100 text-center">
                {playlist?.name} - {tracks.length} tracks
              </h3>
            </div>

            {currentTrack?.thumbnails ? (
              <Image
                src={concatAPIUrl(currentTrack?.thumbnails[5].image)}
                width={currentTrack?.thumbnails[5].width}
                height={currentTrack?.thumbnails[5].height}
                alt="album cover"
                className="w-full"
              />
            ) : (
              <Image
                src={''}
                width={0}
                height={0}
                alt="album cover"
                className="w-full"
              />
            )}

            <div className="p-4 text-center">
              <h1 className="text-lg">{currentTrack?.name}</h1>
              <h2 className="text-sm">
                {currentTrack?.artists?.map((i) => i.name).join(', ')}
              </h2>
            </div>
            <audio controls className="mx-auto mt-4 mb-8" ref={audioRef}>
              <source src={concatAPIUrl(currentTrack?.audio)} />
            </audio>
          </div>
        </div>
        <div className="">
          <table className="table table-fixed w-full text-sm active">
            <thead>
              <tr>
                <th className="w-16 text-center">#</th>
                <th>Track</th>
                <th>Artists</th>
              </tr>
            </thead>
            <tbody ref={tableRef}>
              {queue.map((ltrack) => (
                <tr
                  key={ltrack.spotify_id}
                  id={ltrack.spotify_id}
                  className={classNames(
                    ltrack.id == currentTrack.id && 'active',
                    'rounded cursor-pointer [&>td]:py-2 [&>td:not(:first-child)]:px-2'
                  )}
                  onClick={function (ev) {
                    const el = ev.target as Element;
                    handleChangeTrack(ltrack, true, el);
                  }}
                >
                  <td>
                    <div className="avatar w-8 h-8">
                      <div className="mask mask-squircle ">
                        <Image
                          loading="lazy"
                          src={concatAPIUrl(ltrack.thumbnails[0].image)}
                          width={ltrack.thumbnails[0].width}
                          height={ltrack.thumbnails[0].height}
                          alt="album cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="truncate" title={ltrack.name}>
                    {ltrack.name}
                  </td>
                  <td
                    className="text-xs truncate"
                    title={ltrack.artists.map((i) => i.name).join(', ')}
                  >
                    {ltrack.artists.map((i) => i.name).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      playlist: currentPlaylist,
      album: currentAlbum,
      artist: currentArtist,
      dataset: currentDataset,
      track: currentTrack,
    },
  };
}
