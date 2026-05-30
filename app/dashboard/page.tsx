"use client"
export const dynamic = "force-dynamic"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { urlRegex } from "../constants"
import Dashboard from "./components/analysis-results/Dashboard"
import { useWindowSize } from "../hooks/useWindowResize"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSearchParams } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useTransition, useEffect, useState } from "react"
import analize, { type ReturnValue } from "../server-functions/analize"
import { DocsSection, docsSections } from "./sections"
import * as React from "react"
import MarkdownRenderer from "./components/MarkDownRenderer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Chat from "./components/ai-assistant/segment-ai/app/components/Chat"
import { ErrorCard } from "./components/ErrorCard"
import FallbackComponent from "./components/analysis-results/FallbackComponent"
import { SegmentChatProvider } from "./components/ai-assistant/segment-ai/app/components/context/SegmentChatProvider"
import { useSegmentChat } from "./components/ai-assistant/segment-ai/app/components/context/SegmentChatContext"
import { useRef } from "react"

// ── Componente interno que adapta el layout según el estado del chat ──────────
function DashboardLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const CLOSE_CHAT_BREAKPOINT = 1164 // px
  const { width } = useWindowSize()
  const chatCtx = useSegmentChat()
  const isChatOpen = chatCtx?.isChatOpen ?? false
  const isLess = useRef<boolean>(width ? width < CLOSE_CHAT_BREAKPOINT : false)
  useEffect(() => {
    if (isLess.current && isChatOpen && chatCtx) {
      chatCtx.toggleChat()
    }
  }, [isLess.current])
  useEffect(() => {
    if (width) isLess.current = width < CLOSE_CHAT_BREAKPOINT
    console.log(isLess.current)
  }, [width])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TooltipProvider>
        {sidebar}
        <SidebarInset
          /* cuando la pantalla es muy grande el chat se estira un poco mas cuando esta abierto*/
          className={
            isChatOpen ? "hidden pr-[18.25rem] sm:block 2xl:pr-[25rem]" : ""
          }
          style={{
            transition: "padding-right 300ms ease-in-out",
          }}
        >
          {children}
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function Page() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const device = searchParams.get("device")
  const paramDoc = searchParams.get("page")
  const { width } = useWindowSize()

  const isValidUrl = urlRegex.test(url || "")
  const isValidDevice = device === "desktop" || device === "mobile"

  let errorReason: "invalid-url" | "invalid-device" | "both" | null = null
  if (!isValidUrl && !isValidDevice) errorReason = "both"
  else if (!isValidUrl) errorReason = "invalid-url"
  else if (!isValidDevice) errorReason = "invalid-device"

  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<ReturnValue>(null)
  const [selectedSection, setSelectedSection] = useState<DocsSection | null>(
    null
  )

  useEffect(() => {
    const selectedSectionByParameters = docsSections.find(
      (sec) => sec.slug === paramDoc
    )
    if (selectedSectionByParameters) {
      setSelectedSection(selectedSectionByParameters)
    }
  }, [paramDoc])

  useEffect(() => {
    if (errorReason || !url || !device) return
    startTransition(async () => {
      const res: ReturnValue = await analize(url, device)
      if (!res) return
      setData(res)
    })
  }, [url, device])

  return (
    <SegmentChatProvider data={data} url={url ?? ""} device={device ?? ""}>
      <div className="relative">
        <DashboardLayout
          sidebar={
            <AppSidebar
              docs={docsSections}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          }
        >
          <SiteHeader>
            <Breadcrumb>
              {width && width >= 800 && (
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {selectedSection ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/${selectedSection.slug}?url=${url}&device=${device}`}
                      >
                        {selectedSection.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/dashboard?url=${url}&device=${device}`}
                      >
                        Resultados del análisis
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              )}
            </Breadcrumb>
          </SiteHeader>

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="mx-3 flex gap-4 py-4 md:mx-6 md:gap-6 md:py-6">
                {isPending &&
                  !errorReason &&
                  url &&
                  device &&
                  !selectedSection && (
                    <FallbackComponent url={url!} device={device} />
                  )}
                {selectedSection ? (
                  <MarkdownRenderer
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                  />
                ) : !errorReason && url && device ? (
                  <Dashboard data={data} url={url!} device={device} />
                ) : (
                  <ErrorCard
                    reason={errorReason || "invalid-url"}
                    currentUrl={url || ""}
                    currentDevice={device || ""}
                  />
                )}
              </div>
            </div>
          </div>
        </DashboardLayout>

        {/* Chat de Segment AI — slide desde la derecha */}
        <Chat />
      </div>
    </SegmentChatProvider>
  )
}
