"use client"

import { HTMLAttributes } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music2,
  PlayCircle,
  Radio,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export default function Sidebar(props: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const links = [
    {
      category: "Discover",
      items: [
        {
          label: "Listen Now",
          icon: PlayCircle,
          href: "/app",
        },
        {
          label: "Browse",
          icon: LayoutGrid,
          href: "/browse",
        },
        {
          label: "Radio",
          icon: Radio,
          href: "/radio",
        },
      ],
    },
    {
      category: "Your Library",
      items: [
        {
          label: "Tracks",
          icon: Music2,
          href: "/app/tracks",
        },
        {
          label: "Playlists",
          icon: ListMusic,
          href: "/app/playlists",
        },

        {
          label: "Albums",
          icon: Library,
          href: "/app/albums",
        },
        {
          label: "Artists",
          icon: Mic2,
          href: "/app/artists",
        },
      ],
    },
  ]

  return (
    <div className={cn("pb-12", props.className)}>
      <div className="space-y-4 py-4">
        {links.map(({ category, items }) => (
          <div key={category} className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {category}
            </h2>
            <div className="space-y-1">
              {items.map(({ label, icon: Icon, href }) => (
                <Button
                  onClick={() => router.push(href)}
                  key={label}
                  variant={pathname === href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/*<div className="space-y-4 p-4">*/}
      {/*  <Select>*/}
      {/*    <SelectTrigger className="w-full">*/}
      {/*      <SelectValue placeholder="Datasets" />*/}
      {/*    </SelectTrigger>*/}
      {/*    <SelectContent>*/}
      {/*      {datasets.map((dataset) => (*/}
      {/*        <SelectItem key={dataset.id} value={dataset.id}>*/}
      {/*          {dataset.name}*/}
      {/*        </SelectItem>*/}
      {/*      ))}*/}
      {/*    </SelectContent>*/}
      {/*  </Select>*/}
      {/*</div>*/}
    </div>
  )
}
