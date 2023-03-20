import { useEffect, useState } from 'react';

import {
  AudioTrack,
  Interval,
  MediaRecorderEvent,
  Recorder,
  SetRecorder,
} from '@/interfaces/RecorderInterface';

const initialState: Recorder = {
  recordingMiliseconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  audioBlob: null,
};

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function saveRecording(recorder: any) {
  if (recorder.state !== 'inactive') recorder.stop();
}

export default function useRecorder(
  minTime: number = 5000,
  maxTime: number = 5000
) {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState);

  const lookUpTime = 100;

  useEffect(() => {
    const MAX_RECORDER_TIME = maxTime;
    const MIN_RECORDER_TIME = minTime;
    let recordingInterval: Interval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (prevState.recordingMiliseconds >= MAX_RECORDER_TIME) {
            saveRecording(prevState.mediaRecorder);
            return {
              ...prevState,
              initRecording: false,
            };
          } else if (prevState.recordingMiliseconds <= MIN_RECORDER_TIME) {
            return {
              ...prevState,
              recordingMiliseconds: prevState.recordingMiliseconds + lookUpTime,
            };
          } else {
            return {
              ...prevState,
              recordingMiliseconds: prevState.recordingMiliseconds + lookUpTime,
            };
          }
        });
      }, lookUpTime);
    else
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);
    };
  });

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      else return prevState;
    });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === 'inactive') {
      recorder.start();

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        chunks = [];

        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              recordingMiliseconds: prevState.recordingMiliseconds,
              audio: window.URL.createObjectURL(blob),
              audioBlob: blob,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
