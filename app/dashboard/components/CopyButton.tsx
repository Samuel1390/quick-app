"use client"
import useCopyClipboard from "@/app/hooks/useCopyClipboard"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

function CopyButton({
  language,
  content,
  hoverContent,
  copiedContent,
  ref,
}: {
  ref?: SimpleCopyButtonProps["ref"]
  language: string
  content: string
  hoverContent?: string
  copiedContent?: string
}) {
  return (
    <div className="flex w-full justify-between border-b-2 border-neutral-200 bg-[#fafafa] p-2 dark:border-neutral-600 dark:bg-[#0a0a0a]">
      <span className="p-1 text-sm font-medium">{language}</span>
      <SimpleCopyButton
        ref={ref}
        hoverContent={hoverContent}
        copiedContent={copiedContent}
        content={content}
      />
    </div>
  )
}

interface SimpleCopyButtonProps {
  content: string
  hoverContent?: string
  copiedContent?: string
  ref?: React.RefObject<HTMLButtonElement | null>
  label?: string
}

export function SimpleCopyButton({
  content,
  hoverContent = "Copiar al portapapeles",
  copiedContent = "¡Copiado!",
  ref,
  label,
}: SimpleCopyButtonProps) {
  const { copied, copy } = useCopyClipboard()

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger>
        <Button
          variant={"outline"}
          ref={ref ? ref : undefined}
          className={`p cursor-pointer rounded-md p-1 transition-colors ${copied ? "bg-emerald-400/35 hover:bg-emerald-400/35" : "hover:bg-neutral-200 dark:hover:bg-neutral-800"} `}
          onClick={() => copy(content)}
        >
          <div className="flex items-center gap-2 px-1">
            {label && <span>{label}</span>}

            {copied ? (
              <CheckIcon color="var(--color-emerald-500)" size={18} />
            ) : (
              <CopyIcon size={18} className="text-foreground" />
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit p-1" side="top">
        <p className="text-sm">{copied ? copiedContent : hoverContent}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default CopyButton
