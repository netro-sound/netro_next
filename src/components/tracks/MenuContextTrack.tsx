import { ContextMenuPoints } from '@/hooks/useContextMenu';
import { concatAPIUrl } from '@/utils';
import { ITrack } from '@/interfaces/TrackInterface';
import usePlayerStore from '@/stores/usePlayerStore';
import { useMemo } from 'react';
import MenuContext from '@/components/MenuContext';
import { useAuthStore } from '@/stores/useAuthStore';

type Props = {
  points: ContextMenuPoints;
  show: boolean;
  tracks: ITrack[];
};

export default function MenuContextTrack({ points, show, tracks }: Props) {
  const [addTracksToQueue, setQueue, changeTrack] = usePlayerStore((state) => [
    state.addTracksToQueue,
    state.setQueue,
    state.changeTrack,
  ]);

  const [user] = useAuthStore((state) => [state.user]);

  const menuItems = useMemo(
    () =>
      [
        {
          label: 'Play',
          id: 'play',
          onClick: () => {
            setQueue(tracks);
            changeTrack(tracks[0], true);
          },
        },
        {
          label: 'Add to queue',
          id: 'add-to-queue',
          onClick: addToQueue,
        },
        {},
        {
          label: 'Download',
          id: 'download',
          onClick: downloadTrack,
          single: true,
          restrict: true,
        },
      ].filter(
        (item) =>
          (item.single ? tracks.length === 1 : true) &&
          item.restrict &&
          user?.is_staff
      ),
    [tracks]
  );

  function addToQueue() {
    addTracksToQueue(tracks);
  }

  function downloadTrack() {
    const link = document.createElement('a');
    link.href = concatAPIUrl(`/v1/tracks/${tracks[0].spotify_id}/download`);
    link.download = tracks[0].spotify_id;
    link.click();
  }

  return <MenuContext points={points} show={show} menuItems={menuItems} />;
}
