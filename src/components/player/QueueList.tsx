import { useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover } from '@headlessui/react';
import { RiPlayListFill } from 'react-icons/ri';
import TableTracks from '@/components/tracks/TableTracks';
import usePlayerStore from '@/stores/usePlayerStore';
import { ITrack } from '@/interfaces/TrackInterface';
import { toastSuccess } from '@/libs/toasts';
import { useRouter } from 'next/router';

type Props = {};

export default function QueueList({}: Props) {
  const [queue, changeTrack] = usePlayerStore((state) => [
    state.queue,
    state.changeTrack,
  ]);
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [30, 20],
        },
      },
    ],
  });

  const router = useRouter();

  function handleChangeTrack(obj: ITrack, play = true) {
    changeTrack(obj, play);
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

  return (
    <>
      <Popover>
        <Popover.Button ref={setReferenceElement}>
          <RiPlayListFill className="text-xl" />
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="w-96 max-h-96 overflow-y-auto rounded-box shadow-lg"
        >
          <TableTracks
            tracks={queue}
            changeTrack={handleChangeTrack}
            header={false}
          />
        </Popover.Panel>
      </Popover>
    </>
  );
}
