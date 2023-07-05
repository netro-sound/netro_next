"use client"

import React from "react"

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
}

export default function TimeQuery({
  preprocessTime,
  predictTime,
  loadTime,
}: Props) {
  return (
    <div className="flex w-full">
      <TooltipProvider>
        {[loadTime, preprocessTime, predictTime].map((item) => (
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
        ))}
      </TooltipProvider>
    </div>
  )
}
