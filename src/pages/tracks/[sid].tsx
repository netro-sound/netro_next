import Hero from '@/components/layouts/Hero';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import { useEffect, useState } from 'react';
import { ITrack } from '@/interfaces/TrackInterface';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/router';
import TrackService from '@/services/TrackService';
import { GridTracks } from '@/components/tracks/GridTracks';
import usePlayerStore from '@/stores/usePlayerStore';

export default function Page() {
  const [changeTrack] = usePlayerStore((state) => [state.changeTrack]);
  const user = useAuthStore((state) => state.user);
  const [track, setTrack] = useState<ITrack>();
  const [similarTracks, setSimilarTracks] = useState<ITrack[]>([]);

  const sid = useRouter().query.sid as string;

  async function fetchTrack() {
    const track = await TrackService.fetch(sid);
    setTrack(track);
  }

  async function fetchSimilarTracks() {
    const tracks = await TrackService.fetchSimilarTracks(sid);
    setSimilarTracks(tracks);
  }

  function handleChangeTrack() {
    if (track) changeTrack(track, true);
  }

  useEffect(() => {
    if (user && sid) {
      fetchTrack();
      fetchSimilarTracks();
    }
  }, [user, sid]);

  return (
    <>
      <Hero />
      <ContentWrapper>
        <div className="flex w-full">
          <h1 className="text-xl">{track?.name}</h1>
          <button onClick={handleChangeTrack}>Play</button>

          <GridTracks tracks={similarTracks} />
        </div>
      </ContentWrapper>
    </>
  );
}
