import { useEffect, useRef, useState } from "react"

export default function useAudio(ref: React.RefObject<HTMLAudioElement>) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  function onPlay() {
    setIsPlaying(true)
  }

  function onPause() {
    setIsPlaying(false)
  }

  function onTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

  function onDurationChange() {
    setDuration(audioRef.current?.duration || 0)
  }

  function handlePlay() {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  useEffect(() => {
    audioRef.current = ref.current
  }, [ref.current])

  useEffect(() => {
    audioRef.current?.addEventListener("play", onPlay)
    audioRef.current?.addEventListener("pause", onPause)
    audioRef.current?.addEventListener("timeupdate", onTimeUpdate)
    audioRef.current?.addEventListener("durationchange", onDurationChange)

    return () => {
      audioRef.current?.removeEventListener("play", onPlay)
      audioRef.current?.removeEventListener("pause", onPause)
      audioRef.current?.removeEventListener("timeupdate", onTimeUpdate)
      audioRef.current?.removeEventListener("durationchange", onDurationChange)
    }
  }, [audioRef.current])

  return {
    isPlaying,
    playPause: handlePlay,
    currentTime,
    duration,
  }
}
