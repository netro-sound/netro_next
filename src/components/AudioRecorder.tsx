import useRecorder from '@/hooks/useRecorder';
import { UseRecorder } from '@/interfaces/RecorderInterface';
import { classNames, formatTime, objectFormData } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { RiMic2Fill, RiPauseFill, RiPlayFill } from 'react-icons/ri';
import {
  IExperiment,
  IExperimentQueryCreate,
} from '@/interfaces/ExperimentInterface';
import Experiment from '@/services/Experiment';
import { useAuthStore } from '@/stores/useAuthStore';
import { toastError, toastSuccess } from '@/lib/toasts';
import ExperimentQuery from '@/services/ExperimentQuery';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};
export default function AudioRecorder({ className }: Props) {
  const { register, handleSubmit, watch } = useForm<IExperimentQueryCreate>({});
  const maxTime = 30000;
  const minTime = 5000;

  const [experiments, setExperiments] = useState<IExperiment[]>([]);
  const { recorderState, ...handlers }: UseRecorder = useRecorder(
    minTime,
    maxTime
  );
  const { audio, audioBlob } = recorderState;
  const { recordingMiliseconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const [session] = useAuthStore((state) => [state.session]);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioElement = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  const modelChoices = [
    { id: 'mlp', label: 'Multi Layer Perceptron' },
    { id: 'knn', label: 'K Nearest Neighbors' },
    { id: 'svm', label: 'Support Vector Machine' },
  ];

  async function handlePlayPause() {
    if (audioElement.current?.paused) {
      audioElement.current?.play();
      setIsPlaying(true);
    } else {
      audioElement.current?.pause();
      setIsPlaying(false);
    }
  }

  async function handleButton() {
    if (audio) {
      handlePlayPause();
    } else if (initRecording) {
      await saveRecording();
    } else {
      startRecording();
    }
  }

  async function onSubmit(data: IExperimentQueryCreate) {
    if (!audioBlob) return;

    if (recordingMiliseconds < minTime)
      return toastError('Recording too short');
    if (recordingMiliseconds > maxTime) return toastError('Recording too long');

    const formData = objectFormData({
      ...data,
      query_track: new File([audioBlob], 'query.wav', { type: 'audio/wav' }),
    });

    ExperimentQuery.create(formData).then((data) => {
      toastSuccess('Experiment created');
      router.push(`/experiments/${data.experiment}/queries/${data.id}`);
    });
  }

  useEffect(() => {
    if (session) {
      Experiment.fetchAll().then((data) => {
        setExperiments(data.results);
      });
    }
  }, [session]);

  useEffect(() => {
    function handleEnded() {
      setIsPlaying(false);
    }

    if (audioElement.current) {
      audioElement.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioElement.current) {
        audioElement.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioElement.current]);

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <button
            type="button"
            className="relative h-32 w-32 outline-none mx-auto"
            title="Start recording"
            onClick={handleButton}
          >
            <div
              className={classNames(
                'circles h-full w-full',
                initRecording ? 'animate-pulse text-primary' : 'text-primary/40'
              )}
            >
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="absolute top-0 left-0 text-primary-content h-full w-full flex flex-col items-center justify-center">
              {audio ? (
                !isPlaying ? (
                  <RiPlayFill className="text-4xl" />
                ) : (
                  <RiPauseFill className="text-4xl" />
                )
              ) : (
                <RiMic2Fill className="text-4xl" />
              )}
              {formatTime(recordingMiliseconds / 1000)}
            </div>
          </button>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Experiments</span>
          </label>
          <select
            className="select select-xs select-bordered w-full"
            {...register('experiment', { required: true })}
          >
            {experiments.map((experiment) => (
              <option value={experiment.id} className="truncate">
                {experiment.dataset.total_tracks} - {experiment.id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Model</span>
          </label>
          <select
            className="select select-xs select-bordered"
            {...register('model', { required: true })}
          >
            {modelChoices.map((model) => (
              <option value={model.id} className="truncate">
                {model.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            type="button"
            onClick={cancelRecording}
            className="btn btn-xs"
            disabled={!audioBlob}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-xs btn-primary"
            disabled={!audioBlob}
          >
            Predict
          </button>
        </div>
      </form>
      {audio && <audio src={audio} ref={audioElement} />}
    </div>
  );
}
