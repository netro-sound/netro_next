"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ItemProp = {
  value: number
  label: string
  percentage: number
  color: string
}

interface Props {
  predictTime: ItemProp
  preprocessTime: ItemProp
  loadTime: ItemProp
  fingerprintTime: ItemProp
}

export default function TimeQuery({
  preprocessTime,
  predictTime,
  loadTime,
  fingerprintTime,
}: Props) {
  return (
    <>
      <div className="flex w-full rounded px-4">
        <TooltipProvider>
          {[fingerprintTime, loadTime, preprocessTime, predictTime].map(
            (item) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    style={{
                      width: `${item.percentage}%`,
                    }}
                    className={`h-4 ${item.color}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {item.label} - {item.value.toFixed(2)} sec
                  </p>
                </TooltipContent>
              </Tooltip>
            )
          )}
        </TooltipProvider>
      </div>
      <div className="mt-2 flex gap-4 px-4">
        {[fingerprintTime, loadTime, preprocessTime, predictTime].map(
          (item) => (
            <p className="inline-flex items-center gap-2">
              <span className={cn("block h-2 w-2 rounded-full", item.color)} />
              {item.label}
            </p>
          )
        )}
      </div>
    </>
  )
}
