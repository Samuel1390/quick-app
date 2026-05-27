"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { urlRegex } from "../constants"
import Dashboard from "./components/analysis-results/Dashboard"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSearchParams } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useTransition, useEffect, useState } from "react"
import analize, { type ReturnValue } from "../server-functions/analize"
import { DocsSection, docsSections } from "./sections"
import * as React from "react"
import MarkdownRenderer from "./components/MarkDownRenderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chat from "./components/ai-assistant/segment-ai/app/components/Chat"
import { ErrorCard } from "./components/ErrorCard"
import FallbackComponent from "./components/analysis-results/FallbackComponent"
import LateralFilePreviewProvider from "./components/ai-assistant/segment-ai/app/components/context/LateralFilePreviewProvider"
import ThemeProvider from "./components/ai-assistant/segment-ai/app/components/context/ThemeProvider"
export default function Page() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const device = searchParams.get("device")

  const isValidUrl = urlRegex.test(url || "")
  const isValidDevice = device === "desktop" || device === "mobile"

  let errorReason: "invalid-url" | "invalid-device" | "both" | null = null
  if (!isValidUrl && !isValidDevice) errorReason = "both"
  else if (!isValidUrl) errorReason = "invalid-url"
  else if (!isValidDevice) errorReason = "invalid-device"

  // Si no hay error, continuar con el análisis
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<ReturnValue>(null)
  const [selectedSection, setSelectedSection] = useState<DocsSection | null>(
    null
  )

  useEffect(() => {
    if (errorReason || !url || !device) return
    startTransition(async () => {
      const res: ReturnValue = await analize(url, device)
      if (!res) return
      setData(res)
    })
  }, [url, device])

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
        <AppSidebar
          docs={docsSections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="mx-3 flex flex-col gap-4 py-4 md:mx-6 md:gap-6 md:py-6">
                {/*isPending && !errorReason && url && device && (
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
                )*/}
                <LateralFilePreviewProvider>
                  <ThemeProvider>
                    <Chat />
                  </ThemeProvider>
                </LateralFilePreviewProvider>
              </div>
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}
