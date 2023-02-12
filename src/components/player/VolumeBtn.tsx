import { Popover } from '@headlessui/react';
import {
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from 'react-icons/ri';
import { useState } from 'react';
import { usePopper } from 'react-popper';

type Props = { volume: number; setVolume: (volume: number) => void };

export default function VolumeBtn({ volume, setVolume }: Props) {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 60],
        },
      },
    ],
  });

  return (
    <>
      <Popover>
        <Popover.Button ref={setReferenceElement}>
          {volume === 0 && <RiVolumeMuteFill className="text-xl" />}
          {volume > 0 && volume < 50 && (
            <RiVolumeDownFill className="text-xl" />
          )}
          {volume >= 50 && <RiVolumeUpFill className="text-xl" />}
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value));
            }}
            className="range range-primary w-32 -rotate-90"
          />
        </Popover.Panel>
      </Popover>
    </>
  );
}
