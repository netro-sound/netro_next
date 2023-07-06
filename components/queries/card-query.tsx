import Link from "next/link"
import { ExperimentQueryType } from "@/__generated__/graphql"

import { cn } from "@/lib/utils"
import ThumbnailImage from "@/components/thumbnail-image"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  query: ExperimentQueryType
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export default function CardQuery({
  query,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  function renderType(type: string) {
    const types = {
      AE_BILSTM: "BiLSTM",
      AE_LSTM: "LSTM",
      AE_MLP: "MLP",
      AE_CNN: "CNN",
      MLP: "MLP",
      CNN: "CNN",
      LSTM: "LSTM",
      BiLSTM: "BiLSTM",
      SVM: "SVM",
    }

    // @ts-ignore
    return type in types ? (types[type] as string) : type
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Link
        href={`/app/queries/${query.id}`}
        className="block overflow-hidden rounded-md "
      >
        <ThumbnailImage
          alt={"Query Artwork"}
          width={width ?? 640}
          height={height ?? 640}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105  hover:brightness-75",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <Link
          href={`/app/queries/${query.id}`}
          title={query.id ?? "Query ID"}
          className="block w-full truncate font-medium leading-none"
        >
          {query.id}
        </Link>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {renderType(query.model.dependsOn?.type!)} - {query.model.type}
        </p>
      </div>
    </div>
  )
}
