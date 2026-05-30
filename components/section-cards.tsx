"use client"
import LighthouseMetricsContent from "@/app/classes/lighthouseMetricsContent"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type LighthouseMetrics } from "../app/server-functions/analize"
import { Badge } from "@/components/ui/badge"

const categoryColorClass = {
  Excelente:
    "bg-green-600/50 border-green-600 dark:border-green-400 text-green-900 dark:text-green-400",
  Bueno:
    "bg-emerald-600/50 border-emerald-600 dark:border-emerald-400 text-emerald-900 dark:text-emerald-400",
  Malo: "bg-yellow-600/50 border-yellow-600 dark:border-yellow-400 text-yellow-900 dark:text-yellow-400",
  Crítico:
    "bg-red-700/50 border-red-700 dark:border-red-400 text-red-900 dark:text-red-400",
}

export function SectionCards({
  lighthouseMetrics,
}: {
  lighthouseMetrics: LighthouseMetrics
}) {
  const lighthouseMetricsContent = new LighthouseMetricsContent({
    lighthouseMetrics,
  })
  return (
    <div className="grid w-full grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2">
      {Object.keys(lighthouseMetrics).map((key) => {
        const metric =
          lighthouseMetricsContent[key as keyof typeof lighthouseMetricsContent]
        return (
          <Card
            key={key}
            className={`bg-gradient-to-t ${!metric?.value ? "from-neutral-300/50 to-red-400/20 dark:from-red-950/15 dark:to-red-800/50" : "from-primary/5 to-card dark:bg-card dark:from-transparent dark:to-transparent"}`}
          >
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                {metric.label} ({metric.abreviation})
              </CardDescription>
              <CardTitle
                className={`text-3xl font-semibold tabular-nums @[250px]/card:text-3xl ${
                  metric.metricColorClass ?? ""
                }`}
              >
                {metric.value
                  ? metric.value.replace(/\s/g, "")
                  : `Error al obtener datos del: ${metric.label}`}
              </CardTitle>
              {metric.category && (
                <div>
                  <Badge
                    variant={"secondary"}
                    className={`font-bold ${categoryColorClass[metric.category]}`}
                  >
                    {metric.category}
                  </Badge>
                </div>
              )}
              <CardAction>{metric.icon}</CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm text-muted-foreground">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.description}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
