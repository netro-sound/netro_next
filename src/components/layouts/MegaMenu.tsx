import {
  RiCloseFill,
  RiMenuUnfoldFill,
  RiPlayFill,
  RiSearch2Line,
} from 'react-icons/ri';
import React, { useState } from 'react';
import { ITrack } from '@/interfaces/TrackInterface';
import { useForm } from 'react-hook-form';
import TrackService from '@/services/TrackService';
import usePlayerStore from '@/stores/usePlayerStore';
import { Transition } from '@headlessui/react';
import { classNames } from '@/utils';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import useEffectTimeout from '@/hooks/useEffectTimeout';

type Props = { sideOpen?: boolean; closeSidebar?: (value: boolean) => void };

type SearchForm = {
  query: string;
};

export default function MegaMenu({ sideOpen, closeSidebar }: Props) {
  const [changeTrack, setQueue] = usePlayerStore((state) => [
    state.changeTrack,
    state.setQueue,
  ]);
  const { register, handleSubmit, watch, getValues } = useForm<SearchForm>();
  const [searchError, setSearchError] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState(false);
  const [query, setQuery] = useState<string>('');

  useEffectTimeout(() => handleSearch({ query: getValues('query') }), 1000, [
    watch('query'),
  ]);

  const [tracks, setTracks] = useState<ITrack[]>([]);
  // const [albums, setAlbums] = useState<Album[]>([]);
  // const [artists, setArtists] = useState<Artist[]>([]);
  // const [playlists, setPlaylists] = useState<Playlist[]>([]);

  async function searchTracks(query: string) {
    const data = await TrackService.searchTracks(query);
    return data.results;
  }

  function handleSearch(data: SearchForm) {
    let error = false;

    const searchQuery = data.query.trim();

    if (searchQuery) {
      searchTracks(searchQuery)
        .then((results) => {
          setTracks(results);
          error = results.length === 0;
        })
        .catch((err) => {
          console.log(err);
          error = true;
        });
      // searchAlbums(searchQuery).then((res) => {
      //   setAlbums(res.data);
      // });
      // searchArtists(searchQuery).then((res) => {
      //   setArtists(res.data);
      // });
      // searchPlaylists(searchQuery).then((res) => {
      //   setPlaylists(res.data);
      // });
    }

    setSearchError(error);
  }

  function handlePlayTrack(track: ITrack) {
    setQueue([track]);
  }

  return (
    <>
      <div className="fixed top-4 right-0 z-20 md:pl-72 md:pr-12 px-2 w-screen ">
        <div className="flex gap-2">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            onClick={() => (closeSidebar ? closeSidebar(!sideOpen) : null)}
            type="button"
            className="inline-flex items-center text-sm text-primary rounded-lg bg-base-100 p-3 md:hidden hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-100"
          >
            <span className="sr-only">Open sidebar</span>
            <RiMenuUnfoldFill className="text-xl" />
          </button>
          <form
            className="shadow-lg w-full"
            onSubmit={handleSubmit(handleSearch)}
          >
            <label
              htmlFor="default-search"
              className="text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiSearch2Line />
              </div>
              <input
                type="search"
                id="default-search"
                className={classNames(
                  'input w-full pl-10 pr-24',
                  searchError && 'input-error'
                )}
                placeholder="Search tracks, artists, albums or playlists..."
                required
                {...register('query')}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2 btn btn-sm btn-primary text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <Transition
          show={onFocus}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex shadow mt-4 bg-neutral text-neutral-content rounded-box py-2">
            <ul className="menu block bg-transparent p-2 w-full">
              <li className="menu-title border-b-primary">
                <p className="inline-flex items-center">
                  <span>Results</span>
                  <RiCloseFill className="text-xl text-primary ml-auto" />
                </p>
              </li>
              <div className="max-h-96 overflow-y-auto overflow-x-hidden grid md:grid-cols-4 ">
                {tracks.length === 0 ? (
                  <li className="disabled">
                    <p className="truncate">No tracks found</p>
                  </li>
                ) : (
                  tracks.map((track) => (
                    <li
                      onClick={() => handlePlayTrack(track)}
                      key={track.id}
                      className="hover-bordered w-full"
                    >
                      <div aria-label="column" className="flex w-full">
                        <div className="flex-none">
                          <div className="mask mask-squircle relative">
                            <div
                              className={classNames(
                                'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                              )}
                            >
                              <RiPlayFill className="text-primary" />
                            </div>
                            {
                              <ImageSkeleton
                                checker={!!track}
                                src={track.thumbnails[0].image}
                                width={track.thumbnails[0].width}
                                height={track.thumbnails[0].height}
                                alt={track.name}
                                className="w-12"
                              />
                            }
                          </div>
                        </div>

                        <div className="overflow-x-clip w-56 md:w-full">
                          <p
                            className="truncate overflow-x-hidden"
                            title={track.name}
                          >
                            {track.name}
                          </p>
                          <p
                            className="text-sm font-light truncate"
                            title={track.artists.map((i) => i.name).join(', ')}
                          >
                            {track.artists.map((i) => i.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </div>
            </ul>
          </div>
        </Transition>
      </div>
    </>
  );
}
