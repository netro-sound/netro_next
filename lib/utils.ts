import * as process from "process"
import { Scalars } from "@/__generated__/graphql"
import { Maybe } from "@graphql-tools/utils"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function thumbnailURL(id: number | string) {
  return (
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/thumbnails/" + id + "/download/"
  )
}

export function apiURL(path: Maybe<Scalars["String"]["output"]> | undefined) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`
}

export function formatTime(currentTime: number): string {
  const hours = Math.floor(currentTime / 3600)
  const minutes = Math.floor((currentTime % 3600) / 60)
  const seconds = Math.floor(currentTime % 60)
  const formattedHours = String(hours).padStart(2, "0")
  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(seconds).padStart(2, "0")
  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    return `${formattedMinutes}:${formattedSeconds}`
  }
}
