"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { type LighthouseMetrics } from "../app/server-functions/analize"

export function SectionCards({
  lighthouseMetrics,
}: {
  lighthouseMetrics: LighthouseMetrics
}) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {Object.keys(lighthouseMetrics).map((key) => {
        const metric = lighthouseMetrics[key as keyof typeof lighthouseMetrics]
        return (
          <Card key={key} className="@container/card">
            <CardHeader>
              <CardDescription>
                {metric.label} ({metric.abreviation})
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value?.replace(" ", "")}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUpIcon />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
