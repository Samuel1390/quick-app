"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useFileStore } from "../../components/ai-assistant/segment-ai/app/components/context/fileStore"
import { getIcon } from "omni-file"
import Image from "next/image"
import MarkdownRenderer from "../../components/ai-assistant/segment-ai/app/components/messages/output/Output"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { cn } from "@/lib/utils"
import {
  oneLight,
  atomDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ViewFilePage() {
  const params = useParams()
  const router = useRouter()
  const fileName = decodeURIComponent(params["file-name"] as string)
  const viewingFile = useFileStore()
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    if (!viewingFile || viewingFile.name !== fileName) {
      // If no file in memory, we can't show it, go back
      router.push("/dashboard")
      return
    }

    const read = async () => {
      const text = await viewingFile.text()
      setContent(text)
    }
    read()
  }, [viewingFile, fileName, router])

  if (!viewingFile) return null

  // Determine language for SyntaxHighlighter based on file extension
  const ext = fileName.split(".").pop()?.toLowerCase() || ""
  const isCode = [
    "js",
    "ts",
    "jsx",
    "tsx",
    "py",
    "json",
    "html",
    "css",
    "md",
    "csv",
    "txt",
    "rs",
    "go",
    "java",
    "c",
    "cpp",
  ].includes(ext)

  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const device = searchParams.get("device")

  return (
    <div className="flex h-screen w-full flex-1 flex-col overflow-y-auto bg-background">
      <Breadcrumb
        className={cn(
          "sticky top-0 z-500 border-b border-neutral-700/80 p-3 backdrop-blur-sm",
          "dark:border-neutral-400/80 dark:bg-neutral-950/40",
          "bg-neutral-50/40"
        )}
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/dashboard?url=${url ? url : "none"}&device=${device ? device : "none"}`}
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">view-file</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              <Image
                src={`/icons/${getIcon(fileName)}.svg`}
                alt={fileName}
                width={16}
                height={16}
              />
              {fileName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mx-auto w-full max-w-[80%] flex-1 p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="flex items-center gap-3 text-2xl font-bold">
            <Image
              src={`/icons/${getIcon(fileName)}.svg`}
              alt={fileName}
              width={28}
              height={28}
            />
            {fileName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tamaño: {(viewingFile.size / 1024).toFixed(2)} KB
          </p>
        </div>

        {ext === "md" ? (
          <MarkdownRenderer content={content} />
        ) : isCode ? (
          <div className="mt-4 overflow-hidden rounded-lg border">
            <SyntaxHighlighter
              style={atomDark}
              language={ext === "txt" || ext === "csv" ? "text" : ext}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                fontSize: "0.875rem",
                backgroundColor: "#0a0a0a",
              }}
            >
              {content}
            </SyntaxHighlighter>
          </div>
        ) : (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap">
            {content}
          </pre>
        )}
      </div>
    </div>
  )
}
