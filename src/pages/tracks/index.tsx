import { GetServerSidePropsContext } from 'next';
import TrackService from '@/services/TrackService';
import { IPagination } from '@/interfaces/PaginationInterface';
import { ITrack } from '@/interfaces/TrackInterface';
import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import Image from 'next/image';
import { classNames, concatSSRUrl } from '@/utils';
import { RiPlayFill } from 'react-icons/ri';
import usePlayerStore from '@/stores/usePlayerStore';

type Props = {
  tracks: IPagination<ITrack>;
};

export default function Page({ tracks }: Props) {
  const [changeTrack] = usePlayerStore((state) => [state.changeTrack]);
  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="mb-8">
          <h1 className="text-xl">{tracks.count} tracks</h1>
        </div>
        {}
        <div aria-label="row" className="grid grid-cols-2 gap-2">
          {tracks.results.map((track) => {
            return (
              <div
                onClick={() => changeTrack(track, true)}
                key={track.id}
                aria-label="column"
                className="flex justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="mask mask-squircle relative">
                    <div
                      className={classNames(
                        'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 items-center flex justify-center'
                      )}
                    >
                      <RiPlayFill />
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
      </ContentWrapper>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tracks = await TrackService.fetchTracks();

  return {
    props: {
      tracks: tracks,
    },
  };
}
