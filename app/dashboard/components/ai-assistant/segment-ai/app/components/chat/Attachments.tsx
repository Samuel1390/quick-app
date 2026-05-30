"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import { FileIcon, X } from "lucide-react"
import { getIcon } from "omni-file"
import Image from "next/image"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { fileStore } from "../context/fileStore"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const Attachments = ({
  files,
  setForm,
  modelObj,
}: {
  files: File[]
  setForm: (form: any) => void
  modelObj: any
}) => {
  const router = useRouter()
  const params = useSearchParams()
  const url = params.get("url")
  const device = params.get("device")

  const handleRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    event.stopPropagation()
    setForm((prev: any) => {
      const filesFiltered = prev.files.filter(
        (_: any, index: number) => index !== i
      )
      return {
        ...prev,
        files: filesFiltered,
      }
    })
  }

  return (
    <div className="mb-2 flex w-full flex-wrap gap-2">
      {files.map((file, i) => (
        <HoverCard key={`${file.name}-${i}`}>
          <HoverCardTrigger asChild>
            <div
              onClick={() => handleViewFile(file, router, url, device)}
              className={cn(
                `flex items-center gap-2 border font-semibold transition-opacity hover:cursor-pointer hover:opacity-80`,
                `rounded-md px-3 py-1 text-sm`,
                `${
                  modelObj.supportsFiles
                    ? "border-green-400 bg-green-900/60 text-green-400 dark:text-green-400"
                    : "border-red-400 bg-red-950/60 text-red-400 dark:text-red-400"
                }`
              )}
            >
              <Image
                src={`/icons/${getIcon(file.name)}.svg`}
                alt={file.name}
                width={16}
                height={16}
              />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                type="button"
                className="ml-1 text-neutral-500 transition-colors hover:text-red-500"
                onClick={(e) => handleRemoveFile(e, i)}
              >
                <X size={16} />
              </button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent side="top" className="z-620">
            <span>Ver contenido de {file.name}</span>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
export const handleViewFile = (
  file: File,
  router: AppRouterInstance,
  url: string | null | undefined,
  device: string | null | undefined
) => {
  const viewFileURL = new URLSearchParams()
  if (device) viewFileURL.set("device", device)
  if (url) viewFileURL.set("url", url)
  fileStore.setFile(file)
  router.push(
    `/dashboard/view-file/${encodeURIComponent(file.name)}?${viewFileURL.toString()}`
  )
}

export default Attachments
