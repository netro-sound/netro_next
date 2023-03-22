import useRecorder from '@/hooks/useRecorder';
import { UseRecorder } from '@/interfaces/RecorderInterface';
import { classNames, formatTime, objectFormData } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  RiLoader2Fill,
  RiMic2Fill,
  RiPauseFill,
  RiPlayFill,
} from 'react-icons/ri';
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
  const { audioBlob } = recorderState;
  const [recordBlob, setRecordBlob] = useState<Blob | null>(null);
  const { recordingMiliseconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const [session] = useAuthStore((state) => [state.session]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioElement = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  const modelChoices = [
    { id: 'mlp', label: 'Multi Layer Perceptron' },
    { id: 'knn', label: 'K Nearest Neighbors' },
    { id: 'svm', label: 'Support Vector Machine' },
  ];

  async function handleButton() {
    if (recordBlob) {
      if (audioElement.current?.paused) {
        await audioElement.current?.play();
      } else {
        audioElement.current?.pause();
      }
    } else if (initRecording) {
      await saveRecording();
    } else {
      startRecording();
    }
  }

  function handleUploadAudio(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';

    input.click();

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e?.target?.result) return;
      const blob = new Blob([e.target.result], { type: 'audio/wav' });
      setRecordBlob(blob);
    };

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      reader.readAsArrayBuffer(file);
    };
  }

  async function onSubmit(data: IExperimentQueryCreate) {
    if (!recordBlob) return;

    if (duration < minTime / 1000) return toastError('Recording too short');
    if (duration > maxTime / 1000) return toastError('Recording too long');

    setIsSubmitting(true);
    const formData = objectFormData({
      ...data,
      query_track: new File([recordBlob], 'query.wav', { type: 'audio/wav' }),
    });

    ExperimentQuery.create(formData).then((data) => {
      toastSuccess('Experiment created');
      router.push(`/experiments/${data.experiment}/queries/${data.id}`);
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    if (session) {
      Experiment.fetchAll().then((data) => {
        setExperiments(data.results);
      });
    }
  }, [session]);

  function handleEnded() {
    setIsPlaying(false);
  }

  function handlePlay() {
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleDuration() {
    if (audioElement.current?.duration == Infinity) {
      setDuration(recordingMiliseconds / 1000);
    } else {
      setDuration(audioElement.current?.duration || 0);
    }
  }

  useEffect(() => {
    if (audioBlob) setRecordBlob(audioBlob);
  }, [audioBlob]);

  useEffect(() => {
    if (!recordBlob) return;

    const url = URL.createObjectURL(recordBlob);
    setAudioURL(url);
  }, [recordBlob]);

  const handleCancel = () => {
    cancelRecording();
    setRecordBlob(null);
    setAudioURL(null);
  };

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center">
          <button
            type="button"
            className="relative h-32 w-32 outline-none mx-auto"
            title="Start recording"
            onClick={handleButton}
            onContextMenu={handleUploadAudio}
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
              {isSubmitting ? (
                <RiLoader2Fill className="text-4xl animate-spin" />
              ) : (
                <>
                  {recordBlob ? (
                    isPlaying ? (
                      <RiPauseFill className="text-4xl" />
                    ) : (
                      <RiPlayFill className="text-4xl" />
                    )
                  ) : (
                    <RiMic2Fill className="text-4xl" />
                  )}
                  {recordBlob
                    ? formatTime(duration)
                    : formatTime(recordingMiliseconds / 1000)}
                </>
              )}
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
              <option
                value={experiment.id}
                className="truncate"
                key={experiment.id}
              >
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
              <option value={model.id} className="truncate" key={model.id}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-xs"
            disabled={!recordBlob || isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-xs btn-primary"
            disabled={!recordBlob || isSubmitting}
          >
            Predict
            {isSubmitting ? (
              <RiLoader2Fill className="text-lg animate-spin" />
            ) : null}
          </button>
        </div>
      </form>
      {audioURL && (
        <audio
          src={audioURL}
          ref={audioElement}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onDurationChange={handleDuration}
        />
      )}
    </div>
  );
}
