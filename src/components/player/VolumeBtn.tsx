import { Popover } from '@headlessui/react';
import { RiVolumeDownFill } from 'react-icons/ri';
import { useState } from 'react';
import { usePopper } from 'react-popper';

type Props = {};

export default function VolumeBtn({}: Props) {
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
          <RiVolumeDownFill className="text-xl" />
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
            className="range range-primary w-32 -rotate-90"
          />
        </Popover.Panel>
      </Popover>
    </>
  );
}
