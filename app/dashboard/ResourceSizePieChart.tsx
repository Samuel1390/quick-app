"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { type ResourceSummary } from "@/app/server-functions/types"
import {
  MappedItem22,
  type MappedItem22Type,
} from "@/app/classes/sizeMetricsData"

const sizeFixed = (sizeInBytes: number, fixed: number = 2) => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`
  }
  if (sizeInBytes < 1024 ** 2) {
    return `${(sizeInBytes / 1024).toFixed(fixed)} KB`
  }
  if (sizeInBytes < 1024 ** 3) {
    return `${(sizeInBytes / 1024 ** 2).toFixed(fixed)} MB`
  }
  return `${(sizeInBytes / 1024 ** 3).toFixed(fixed)} GB`
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

type Props = {
  resourceSummary: ResourceSummary
}

export function ResourceSizePieChart({ resourceSummary }: Props) {
  console.log(resourceSummary.details.items)
  const mappedItems22 = React.useMemo(() => {
    const acc: MappedItem22Type[] = []
    resourceSummary.details.items.forEach((curr) => {
      if (curr.label === "Total") return
      return acc.push(new MappedItem22(curr))
    })
    return acc
  }, [resourceSummary.details.items])

  const chartConfig: ChartConfig = {}
  mappedItems22.forEach((item) => {
    if (item.label === "Total") return

    chartConfig[item.labelEs] = {
      label: item.labelEs,
      color: item.color,
    }
  })

  return (
    <Card className="mx-3 flex flex-col sm:px-5 md:mx-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución del tamaño de los recursos</CardTitle>
        <CardDescription>
          El siguiente gráfico de pastel muestra la distribución del tamaño de
          los recursos descargados.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-0 xsm:flex-row">
        <section className="flex flex-1 flex-col items-start gap-2">
          {mappedItems22
            .sort((a, b) => b.transferSize - a.transferSize)
            .map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium text-muted-foreground">
                  {item.labelEs + ":"}
                </span>
                <span>{sizeFixed(item.transferSize)}</span>
              </div>
            ))}
        </section>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value, name, item) => {
                return (
                  <>
                    <div
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{
                        backgroundColor: item.color || item.payload?.fill,
                      }}
                    />

                    <div className="flex flex-1 justify-between gap-4 leading-none">
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-mono font-medium text-foreground">
                        {sizeFixed(Number(value))}
                      </span>
                    </div>
                  </>
                )
              }}
            />
            <Pie
              data={mappedItems22}
              dataKey="transferSize"
              nameKey="labelEs"
              innerRadius={54}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-mono"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-mono text-3xl font-bold"
                        >
                          {sizeFixed(
                            resourceSummary.details.items.find(
                              (item) => item.label === "Total"
                            )?.transferSize ?? 0,
                            0
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs font-semibold tracking-wider uppercase"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default ResourceSizePieChart
