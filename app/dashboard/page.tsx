"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import Link from "next/link"
import { useTransition, useEffect, useState } from "react"
import analize, { type ReturnValue } from "../server-functions/analize"
import LighthouseError from "./LighthouseErrors"
import { Monitor, Smartphone, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  type LighthouseResult,
  type RuntimeError,
} from "../server-functions/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
                {isPending && <FallbackComponent url={url} device={device} />}

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

function FallbackComponent({ url, device }: { url: string; device: string }) {
  return (
    <>
      <Card className="mx-5">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 scale-150 animate-spin" />
              <span>
                Analizando la pagina{" "}
                <a href={url} className="text-sky-400 underline">
                  {url}
                </a>{" "}
                para{" "}
                {device === "desktop" ? (
                  <Badge variant={"outline"} className="text-sm">
                    <Monitor className="inline h-4 w-4" />
                    Escritorio
                  </Badge>
                ) : (
                  <Badge variant={"outline"} className="text-sm">
                    <Smartphone className="inline h-4 w-4" />
                    Móvil
                  </Badge>
                )}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="animate-pulse text-muted-foreground">
          <p>Relájate mientras analizamos la pagina...</p>
        </CardContent>
      </Card>
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    </>
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
