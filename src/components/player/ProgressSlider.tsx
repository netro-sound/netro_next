import usePlayerStore from '@/stores/usePlayerStore';

type Props = {
  buffer: number;
  currentTime: number;
  duration: number;
};

export default function ProgressSlider({
  buffer,
  currentTime,
  duration,
}: Props) {
  const [audioTag] = usePlayerStore((state) => [state.audioTag]);

  function changeCurrentTime(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioTag) {
      audioTag.currentTime = Number(e.target.value);
    }
  }

  return (
    <>
      <div className="relative w-full py-2 group">
        <progress
          className="progress absolute bottom-0 left-0 w-full h-1 group-hover:h-3 transition-all duration-300"
          value={buffer || 0}
          max={duration || 0}
        ></progress>
        <input
          type="range"
          min="0"
          value={currentTime}
          max={duration || 0}
          onChange={changeCurrentTime}
          className="absolute bottom-0 range-player range range-primary w-full absolute h-1 group-hover:h-3 transition-all duration-300"
        />
      </div>
    </>
  );
}
