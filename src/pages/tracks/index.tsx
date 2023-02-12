import { GetServerSidePropsContext } from 'next';
import TrackService from '@/services/TrackService';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import Image from 'next/image';
import { classNames, concatSSRUrl } from '@/utils';
import { RiLoaderFill, RiPlayFill } from 'react-icons/ri';
import usePlayerStore from '@/stores/usePlayerStore';
import { useState } from 'react';

type Props = {
  tracks: IPagination<ITrack>;
};

export default function Page({ tracks }: Props) {
  const [changeTrack] = usePlayerStore((state) => [state.changeTrack]);
  const [pagination, setPagination] = useState<IPagination<ITrack>>(tracks);
  const [listTracks, setListTracks] = useState<ITrack[]>(tracks.results);
  const [isFetching, setIsFetching] = useState(false);

  async function loadMore() {
    if (!pagination.next) return;
    setIsFetching(true);

    const params = new URLSearchParams(new URL(pagination.next).search);
    const nextPage = parseInt(params.get('page') || '1');

    const data = await new TrackService(true).fetchTracks(nextPage);
    setPagination(data);
    setListTracks((prevState) => [...prevState, ...data.results]);
    setIsFetching(false);
  }

  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="">
          <h1 className="text-xl">{tracks.count} tracks</h1>
        </div>
        <div aria-label="row" className="grid md:grid-cols-2 gap-2">
          {listTracks.map((track) => {
            return (
              <div
                onClick={() => changeTrack(track, true)}
                key={track.id}
                aria-label="column"
                className="flex justify-between group cursor-pointer hover:bg-base-200 rounded-box"
              >
                <div className="flex items-center space-x-4">
                  <div className="mask mask-squircle relative">
                    <div
                      className={classNames(
                        'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                      )}
                    >
                      <RiPlayFill className="text-primary" />
                    </div>
                    <Image
                      src={
                        concatSSRUrl(track.thumbnails[0].image) ||
                        '/istockphoto-1147544807-612x612.jpg'
                      }
                      height={track.thumbnails[0].height}
                      width={track.thumbnails[0].width}
                      alt={track.name}
                      className="w-12"
                    />
                  </div>
                  <div>
                    <h2>{track.name}</h2>
                    <p className="text-sm font-light">
                      {track.artists.map((i) => i.name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4"></div>
              </div>
            );
          })}
        </div>
        {!!pagination.next && (
          <div className="flex justify-center items-center">
            <button
              onClick={loadMore}
              className="btn btn-sm space-x-2"
              disabled={isFetching}
            >
              {isFetching && <RiLoaderFill className="animate-spin text-lg" />}
              <span>Load More</span>
            </button>
          </div>
        )}
      </ContentWrapper>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tracks = await new TrackService(false).fetchTracks();

  return {
    props: {
      tracks: tracks,
    },
  };
}
