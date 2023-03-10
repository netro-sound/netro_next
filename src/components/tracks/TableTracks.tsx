import { ITrack } from '@/interfaces/TrackInterface';
import { classNames, concatAPIUrl, concatSSRUrl } from '@/utils';
import Image from 'next/image';
import React, { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import usePlayerStore from '@/stores/usePlayerStore';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

type Props = {
  header?: boolean;
  tracks: ITrack[];
  changeTrack: (
    track: ITrack,
    play: boolean,
    element: HTMLTableSectionElement
  ) => void;
};
export default forwardRef(function TableTracks(
  { tracks, changeTrack, header = true }: Props,
  ref: ForwardedRef<HTMLTableSectionElement>
) {
  const [ordering, setOrdering] = useState<
    'id' | '-id' | 'name' | '-name' | 'artists' | '-artists' | 'default'
  >('default');

  const [currentTrack] = usePlayerStore((state) => [
    state.currentTrack,
    state.changeTrack,
  ]);

  const orderBy = {
    default: () => tracks,
    id: () => tracks.sort((a, b) => a.id - b.id),
    '-id': () => tracks.sort((a, b) => b.id - a.id),
    name: () => tracks.sort((a, b) => a.name.localeCompare(b.name)),
    '-name': () => tracks.sort((a, b) => b.name.localeCompare(a.name)),
    artists: () =>
      tracks.sort((a, b) => a.artists[0].name.localeCompare(b.artists[0].name)),
    '-artists': () =>
      tracks.sort((a, b) => b.artists[0].name.localeCompare(a.artists[0].name)),
  };

  const loadTracks = useMemo(() => orderBy[ordering](), [tracks, ordering]);

  function toggleOrdering(id: string) {
    switch (ordering) {
      case `-${id}`:
        setOrdering('default');
        break;
      case id:
        setOrdering(('-' + id) as any);
        break;
      case 'default':
        setOrdering(id as any);
        break;
      default:
        setOrdering(id as any);
        break;
    }
  }

  return (
    <table className="table table-fixed w-full text-sm active">
      <thead className={classNames(!header && 'hidden')}>
        <tr>
          <th
            className="w-16 text-center cursor-pointer"
            onClick={() => toggleOrdering('id')}
          >
            <p className="flex justify-center items-center w-full">
              {' '}
              #{' '}
              {(ordering == 'id' && <BiChevronUp className="text-lg" />) ||
                (ordering == '-id' && <BiChevronDown className="text-lg" />)}
            </p>
          </th>
          <th className="cursor-pointer" onClick={() => toggleOrdering('name')}>
            <p className="flex items-center w-full">
              {' '}
              Track{' '}
              {(ordering == 'name' && <BiChevronUp className="text-lg" />) ||
                (ordering == '-name' && <BiChevronDown className="text-lg" />)}
            </p>
          </th>
          <th
            className="cursor-pointer"
            onClick={() => toggleOrdering('artists')}
          >
            <p className="flex items-center w-full">
              {' '}
              Artists{' '}
              {(ordering == 'artists' && <BiChevronUp className="text-lg" />) ||
                (ordering == '-artists' && (
                  <BiChevronDown className="text-lg" />
                ))}
            </p>
          </th>
        </tr>
      </thead>
      <tbody ref={ref}>
        {loadTracks.map((ltrack) => (
          <tr
            key={ltrack.spotify_id}
            id={ltrack.spotify_id}
            data-track-spotify_id={ltrack.spotify_id}
            className={classNames(
              ltrack.id == currentTrack?.id && 'active',
              'rounded cursor-pointer [&>td]:py-2 [&>td:not(:first-child)]:px-2'
            )}
            onClick={function (ev) {
              const el = ev.target as HTMLTableSectionElement;
              changeTrack(ltrack, true, el);
            }}
          >
            <td className="w-16">
              <div className="avatar w-8 h-8">
                <div className="mask mask-squircle ">
                  <ImageSkeleton
                    checker={!!ltrack.thumbnails.length}
                    width={ltrack.thumbnails[0].width}
                    height={ltrack.thumbnails[0].height}
                    src={ltrack.thumbnails[0].image}
                    alt={ltrack.name}
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
  );
});
