import * as React from "react"
import { ExperimentType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import { siteConfig } from "@/config/site"
import fetchGraphQL from "@/lib/client"
import AudioRecorder from "@/components/audio-recorder"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

type Props = {
  experiments: ExperimentType[]
}

export function SiteHeader({ experiments }: Props) {
  return (
    <header className="top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <AudioRecorder experiments={experiments} />

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
