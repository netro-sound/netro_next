import React from "react"

import { Separator } from "@/components/ui/separator"
import { lyricsToHtml } from "@/app/app/tracks/[id]/page"

interface CommonSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function CommonSection({
  title,
  subtitle,
  children,
  className,
  ...props
}: CommonSectionProps) {
  return (
    <div className={className}>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Separator className="my-4" />
      {children}
    </div>
  )
}
