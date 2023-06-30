"use client"

import { Separator } from "@/components/ui/separator"
import CanvasAudioVisualizer from "@/components/audio-visualizer/canvasAudioVisualizer"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Netro Sound
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Plataforma de streaming de música com identificação de músicas em
          tempo real.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex gap-4">
        <CanvasAudioVisualizer className="aspect-square w-full lg:aspect-video lg:h-[480px]" />
      </div>
      {/*<div className="flex gap-4">*/}
      {/*  <Link*/}
      {/*    href={siteConfig.links.docs}*/}
      {/*    target="_blank"*/}
      {/*    rel="noreferrer"*/}
      {/*    className={buttonVariants()}*/}
      {/*  >*/}
      {/*    Documentation*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    target="_blank"*/}
      {/*    rel="noreferrer"*/}
      {/*    href={siteConfig.links.github}*/}
      {/*    className={buttonVariants({ variant: "outline" })}*/}
      {/*  >*/}
      {/*    GitHub*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </section>
  )
}
