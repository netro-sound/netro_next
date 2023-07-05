import "@/app/globals.css"
import { Metadata } from "next"
import { ExperimentType } from "@/__generated__/graphql"
import { gql } from "graphql-tag"

import { siteConfig } from "@/config/site"
import fetchGraphQL from "@/lib/client"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import PlayerContainer from "@/components/player-container"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const GET_EXPERIMENTS = gql`
  query getExperiments {
    experiments {
      id
      models {
        id
        type
      }
      description
      name
    }
  }
`

export default async function RootLayout({ children }: RootLayoutProps) {
  const { experiments } = await fetchGraphQL<
    {
      experiments: ExperimentType[]
    },
    unknown
  >(GET_EXPERIMENTS)

  return (
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader experiments={experiments} />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
            <PlayerContainer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
