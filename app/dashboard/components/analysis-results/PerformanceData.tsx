import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Loader2 } from "lucide-react"
import { SectionCards } from "@/components/section-cards"
import Screenshots from "./Screenshots"
import ResourceSizePieChart from "./ResourceSizePieChart"
import MainThreadMetricsData from "./MainThreadMetricsData"
import LayoutShiftImpact from "./LayoutShiftImpact"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import analize from "@/app/server-functions/analize"
import LighthouseError from "./LighthouseErrors"
import { RuntimeError } from "@/app/server-functions/types"
import { Suspense } from "react"
type Props = {
  searchParams: { url?: string; device?: string }
}

const PerformanceData = async ({ searchParams }: Props) => {
  const params = searchParams
  const url = params.url
  if (!url) {
    return <URLNotProvided />
  }
  let device = params.device || "desktop"
  if (device !== "desktop" && device !== "mobile") {
    device = "desktop"
  }
  const data = await analize(url, device)
  if (data && "code" in data && "message" in data) {
    return <LighthouseError runtimeError={data as RuntimeError} />
  }
  return (
    <>
      <Card className="mx-3 md:mx-6">
        <CardHeader>
          <CardTitle>
            Resultados de Lighthouse de la pagina:{" "}
            <a href={url} className="text-sky-400 underline">
              {url}
            </a>{" "}
            para{" "}
            <Badge variant={"outline"} className="text-sm">
              <Monitor className="inline h-4 w-4" />
              {device === "desktop" ? "Escritorio" : "Móvil"}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>
      {data && "lighthouseMetrics" in data && (
        <>
          <Suspense fallback={<ComponentLoader />}>
            <SectionCards lighthouseMetrics={data.lighthouseMetrics} />
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <Screenshots lighthouseResult={data.response.lighthouseResult} />
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <ResourceSizePieChart
              resourceSummary={
                data.response.lighthouseResult.audits["resource-summary"]
              }
            />
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <MainThreadMetricsData
              mainThreadWorkBreakdown={
                data.response.lighthouseResult.audits[
                  "mainthread-work-breakdown"
                ]
              }
            />
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <LayoutShiftImpact
              layoutShiftsAudit={
                data.response.lighthouseResult.audits["layout-shifts"]
              }
            />
          </Suspense>
        </>
      )}
    </>
  )
}
function ComponentLoader() {
  return (
    <div className="flex justify-center p-10">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
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
export default PerformanceData
