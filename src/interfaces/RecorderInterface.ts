import { Dispatch, SetStateAction } from 'react';

export type Recorder = {
  recordingMiliseconds: number;
  initRecording: boolean;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audioBlob: Blob | null;
};

export type UseRecorder = {
  recorderState: Recorder;
  startRecording: () => void;
  cancelRecording: () => void;
  saveRecording: () => void;
};

export type RecorderControlsProps = {
  recorderState: Recorder;
  handlers: {
    startRecording: () => void;
    cancelRecording: () => void;
    saveRecording: () => void;
  };
};

export type RecordingsListProps = {
  audio: string | null;
};

export type Audio = {
  key: string;
  audio: string;
};

export type Interval = null | number | ReturnType<typeof setInterval>;
export type SetRecorder = Dispatch<SetStateAction<Recorder>>;
export type SetRecordings = Dispatch<SetStateAction<Audio[]>>;
export type AudioTrack = MediaStreamTrack;
export type MediaRecorderEvent = {
  data: Blob;
};
