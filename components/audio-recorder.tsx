"use client"

import { HTMLAttributes, useEffect, useRef, useState } from "react"
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog"
import { useRouter } from "next/navigation"
import { ExperimentType } from "@/__generated__/graphql"
import usePlayerStore from "@/stores/usePlayerStore"
import { DialogClose } from "@radix-ui/react-dialog"
import {
  RiCloseFill,
  RiLoader2Fill,
  RiMic2Fill,
  RiMic2Line,
  RiPauseFill,
  RiPlayFill,
} from "react-icons/ri"
import { useReactMediaRecorder } from "react-media-recorder"

import { fetchAPI } from "@/lib/client"
import { objectToFormData } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props extends HTMLAttributes<HTMLDivElement> {
  experiments: ExperimentType[]
}

const MIN_TIME = 5
const MAX_TIME = 30

export default function AudioRecorder(props: Props) {
  const { pause } = usePlayerStore((state) => state)
  const [openDialog, setOpenDialog] = useState(false)
  const router = useRouter()

  const [statusSubmit, setStatusSubmit] = useState<
    "finished" | "submitting" | "error" | "idle"
  >("idle")

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      video: false,
      stopStreamsOnStop: true,
    })

  const [localMediaURL, setLocalMediaURL] = useState<string | null>(null)

  const [playStatus, setPlayStatus] = useState<"playing" | "paused" | "idle">(
    "idle"
  )
  const audioRef = useRef<HTMLAudioElement>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleRecord() {
    if (status === "idle") {
      startRecording()
    } else {
      stopRecording()
    }
  }

  function handlePlay() {
    if (audioRef.current) {
      if (audioRef.current?.paused) {
        audioRef.current.play()
      } else {
        audioRef.current?.pause()
      }
    }
  }

  const handleDelete = () => {
    clearBlobUrl()
    setLocalMediaURL(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = undefined
      setPlayStatus("idle")
    }
  }

  function uploadAudio() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onPlay = () => setPlayStatus("playing")
  const onPause = () => setPlayStatus("paused")

  const onInputChange = () => {
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0]
      const blob = URL.createObjectURL(file)
      setLocalMediaURL(blob)
      audioRef.current = new Audio(blob)
      setPlayStatus("paused")
    }
  }

  function closeDialog() {
    setOpenDialog(false)
    stopRecording()
    handleDelete()
  }

  async function handleInference() {
    if (!localMediaURL) return
    if (!audioRef.current) return
    if (!props.experiments) return

    const experiment = props.experiments[0].id
    const model = props.experiments[0].models.find((m) => m.type == "MLP")?.id

    if (!experiment || !model) alert("No experiment or model found")

    const duration = audioRef.current?.duration

    if (duration < MIN_TIME) return alert("Recording too short")
    if (duration > MAX_TIME) return alert("Recording too long")

    setStatusSubmit("submitting")

    const recordBlob = await fetch(localMediaURL).then((r) => r.blob())

    const formData = objectToFormData({
      experiment,
      model: "mlp",
      query_track: new File([recordBlob], "query.wav"),
    })

    const query = await fetchAPI("/queries/", {
      method: "POST",
      body: formData,
    })

    setStatusSubmit("finished")

    if (query) {
      router.push(`/app/queries/${query.id}`)
      closeDialog()
    }
  }

  useEffect(() => {
    if (mediaBlobUrl) {
      setLocalMediaURL(mediaBlobUrl)
      audioRef.current = new Audio(mediaBlobUrl)
      setPlayStatus("paused")
    }
  }, [mediaBlobUrl])

  useEffect(() => {
    audioRef.current?.addEventListener("play", onPlay)
    audioRef.current?.addEventListener("pause", onPause)
    audioRef.current?.addEventListener("ended", onPause)

    return () => {
      audioRef.current?.removeEventListener("play", onPlay)
      audioRef.current?.removeEventListener("pause", onPause)
      audioRef.current?.removeEventListener("ended", onPause)
    }
  }, [audioRef.current])

  return (
    <div {...props}>
      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open)
          pause()
          !open && closeDialog()
        }}
      >
        <DialogTrigger asChild className="text-2xl">
          <Button variant="ghost" size="sm" className="text-2xl">
            <RiMic2Fill />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Netro Recognition</DialogTitle>
            <DialogDescription>
              Record or upload a sample to recognize
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="relative z-0 flex flex-col items-center gap-2">
              {localMediaURL ? (
                <Button
                  onClick={handlePlay}
                  className="z-10 h-20 w-20 rounded-full text-2xl"
                >
                  {playStatus == "paused" ? <RiPlayFill /> : <RiPauseFill />}
                </Button>
              ) : (
                <Button
                  onClick={handleRecord}
                  className="z-10 h-20 w-20 rounded-full text-2xl"
                >
                  {status === "idle" ? <RiMic2Fill /> : <RiMic2Line />}
                </Button>
              )}

              {playStatus != "idle" && (
                <button onClick={handleDelete}>
                  <RiCloseFill />
                </button>
              )}
            </div>
            <input
              ref={inputRef}
              className="hidden"
              type={"file"}
              multiple={false}
              accept="audio/*"
              onChange={onInputChange}
            />
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button variant="outline" onClick={uploadAudio}>
              Upload
            </Button>
            <Button
              disabled={!localMediaURL || statusSubmit == "submitting"}
              onClick={handleInference}
            >
              {statusSubmit == "submitting" && (
                <RiLoader2Fill className="mr-2 animate-spin" />
              )}
              Recognize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
