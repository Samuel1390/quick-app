"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { type PageSpeedResponse } from "../server-functions/types"
import Link from "next/link"
import { useTransition, useEffect, useState } from "react"
import analize, { type ReturnValue } from "../server-functions/analize"
import LighthouseError from "./LighthouseErrors"
import {
  type LighthouseResult,
  type RuntimeError,
} from "../server-functions/types"

export default function Page() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  if (!url) {
    return <URLNotProvided />
  }
  const device = searchParams.get("device") || "desktop"
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<ReturnValue>(null)

  useEffect(() => {
    if (!url) {
      return
    }
    startTransition(async () => {
      const res: ReturnValue = await analize(url, device)
      if (!res) {
        return
      }
      setData(res)
      console.log(res)
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
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {data && "lighthouseMetrics" in data && (
                  <SectionCards lighthouseMetrics={data?.lighthouseMetrics} />
                )}
                {data && "code" in data && "message" in data && (
                  <LighthouseError runtimeError={data as RuntimeError} />
                )}
                {/* <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div> */}
                {/* <DataTable data={data} /> */}
              </div>
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}

function URLNotProvided() {
  return (
    <div>
      <h1>No se ha proporcionado una URL</h1>
      <p>
        Por favor, proporciona una URL para analizar en la página principal.
      </p>
      <Link href="/">
        <Button>Volver</Button>
      </Link>
    </div>
  )
}

function ErrorScreen() {
  return (
    <div>
      <h1>Error al analizar la URL</h1>
      <p>
        Por favor, verifica que la URL sea correcta y que no haya ningún
        problema con la conexión.
      </p>
      <Link href="/">
        <Button>Volver</Button>
      </Link>
    </div>
  )
}
