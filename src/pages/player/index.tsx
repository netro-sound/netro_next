import { GetServerSidePropsContext } from 'next';
import { ITrack } from '@/interfaces/TrackInterface';
import { classNames, concatAPIUrl } from '@/utils';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import apiAxios from '@/libs/axios';
import { IPlaylist } from '@/interfaces/PlaylistInterface';
import { useRouter } from 'next/router';
import { IPagination } from '@/interfaces/PaginationInterface';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useEffectTimeout from '@/hooks/useEffectTimeout';
import { NextSeo, NextSeoProps } from 'next-seo';
import { toastSuccess } from '@/libs/toasts';

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

  const [isFetching, setFetchingFalse] = useInfiniteScroll(
    async () => {
      if (cPagination?.next && !isFetching) {
        const { data } = await apiAxios.get(cPagination.next);
        setCPagination(data);
        setQueue((prev) => [...prev, ...data.results]);
        setFetchingFalse();
      }
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

  const router = useRouter();

  useEffect(() => {
    setTargetInfiniteScroll(tableRef.current?.lastChild as HTMLElement);
  }, [tableRef.current?.lastChild]);

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

  function handleChangeTrack(obj: ITrack) {
    setCurrentTrack(obj);
    audioRef.current?.pause();
    audioRef.current?.load();
    audioRef.current?.play();
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

  useEffect(() => {
    audioRef.current?.addEventListener('ended', () => {
      const index = tracks.findIndex((i) => i.id === currentTrack.id);
      if (index + 1 < tracks.length) {
        handleChangeTrack(tracks[index + 1]);
      }
    });
  }, []);

  useEffect(() => {
    setSeo({
      title:
        'Exoo Sound | ' +
        currentTrack.name +
        ' - ' +
        currentTrack.artists.map((i) => i.name).join(', '),
    });
  }, [currentTrack]);

  return (
    <>
      <NextSeo {...seo} />
      <div className="w-screen md:max-w-6xl grid md:grid-cols-2 bg-neutral mx-auto divide-y md:divide-x divide-neutral-700 h-full">
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
          <table className="table table-fixed w-full text-sm">
            <thead>
              <tr>
                <th className="w-16 text-center">#</th>
                <th>Track</th>
                <th>Artists</th>
              </tr>
            </thead>
            <tbody ref={tableRef}>
              {queue.map((ltrack, index) => (
                <tr
                  key={ltrack.spotify_id}
                  className={classNames(
                    ltrack.id == currentTrack.id && 'active',
                    'rounded cursor-pointer hover:active [&>td]:py-2 [&>td:not(:first-child)]:px-2'
                  )}
                  onClick={() => handleChangeTrack(ltrack)}
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
    currentPlaylist = (await apiAxios.get(`/playlists/${playlist}`)).data;
    listInfo = (await apiAxios.get(`/playlists/${playlist}/tracks`)).data;
  }

  if (!!artist) {
    currentArtist = (await apiAxios.get(`/artists/${artist}`)).data;
    listInfo = (await apiAxios.get(`/artists/${artist}/tracks`)).data;
  }

  if (!!album) {
    currentAlbum = (await apiAxios.get(`/albums/${album}`)).data;
    listInfo = (await apiAxios.get(`/albums/${album}/tracks`)).data;
  }

  if (!!dataset) {
    currentDataset = (await apiAxios.get(`/datasets/${dataset}`)).data;
    listInfo = (await apiAxios.get(`/datasets/${dataset}/tracks`)).data;
  }

  if (!!q) {
    listInfo = (await apiAxios.get(`/tracks/search`, { params: { q } })).data;
  }

  tracks = !!listInfo ? listInfo?.results : [];

  if (!!track) {
    currentTrack = (await apiAxios.get(`/tracks/${track}`)).data;
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
