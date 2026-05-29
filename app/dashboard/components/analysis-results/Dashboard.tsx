import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCards } from "@/components/section-cards"
import Screenshots from "./Screenshots"
import MainThreadMetricsData from "./MainThreadMetricsData"
import LayoutShiftImpact from "./LayoutShiftImpact"
import LighthouseError from "./LighthouseErrors"
import ResourceSizePieChart from "./ResourceSizePieChart"
import { Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { RuntimeError } from "../../../server-functions/types"

const Dashboard = ({
  data,
  url,
  device,
}: {
  data: any
  url: string
  device: string
}) => {
  return (
    <>
      {data && "lighthouseMetrics" in data && (
        <div className="flex w-full flex-col gap-5">
          <Card>
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
          <SectionCards lighthouseMetrics={data?.lighthouseMetrics} />
          {data.response.lighthouseResult.audits && (
            <Screenshots lighthouseResult={data.response.lighthouseResult} />
          )}
          <ResourceSizePieChart
            resourceSummary={
              data.response.lighthouseResult.audits["resource-summary"]
            }
          />
          <MainThreadMetricsData
            mainThreadWorkBreakdown={
              data.response.lighthouseResult.audits["mainthread-work-breakdown"]
            }
          />
          <LayoutShiftImpact
            layoutShiftsAudit={
              data.response.lighthouseResult.audits["layout-shifts"]
            }
          />
        </div>
      )}
      {data && "code" in data && "message" in data && (
        <LighthouseError runtimeError={data as RuntimeError} />
      )}
    </>
  )
}

export default Dashboard
