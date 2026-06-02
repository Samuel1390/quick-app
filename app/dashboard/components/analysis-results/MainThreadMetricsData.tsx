// components/MainThreadPieChart.tsx
"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  MappedMainThreadItem,
  type MappedMainThreadItemType,
} from "@/app/classes/mainThreadMetricsData"

// Tipado estricto para la propiedad que recibe el componente desde la API de PageSpeed
type MainThreadAuditProps = {
  mainThreadWorkBreakdown: {
    id: string
    title: string
    description: string
    numericValue: number // Tiempo total en ms
    details: {
      items: Array<{
        group: string
        duration: number
        groupLabel: string
      }>
    }
  }
}

// Función helper para formatear milisegundos a valores legibles humanos
const timeFixed = (ms: number, fixed: number = 1) => {
  if (ms < 1000) {
    return `${ms.toFixed(fixed)} ms`
  }
  return `${(ms / 1000).toFixed(2)} s`
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export function MainThreadPieChart({
  mainThreadWorkBreakdown,
}: MainThreadAuditProps) {
  // Mapeamos los datos utilizando tu patrón arquitectónico limpio
  const mappedItems = React.useMemo(() => {
    return mainThreadWorkBreakdown.details.items.map(
      (curr) => new MappedMainThreadItem(curr)
    )
  }, [mainThreadWorkBreakdown.details.items])

  // Generamos de forma dinámica el config de Shadcn para los colores de las categorías
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    mappedItems.forEach((item) => {
      config[item.labelEs] = {
        label: item.labelEs,
        color: item.color,
      }
    })
    return config
  }, [mappedItems])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ocupación del Hilo Principal</CardTitle>
        <CardDescription>
          Desglose del tiempo total de procesamiento de la CPU del navegador.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-start gap-4 pb-0 md:flex-row md:items-stretch md:justify-between">
        {/* Sección de leyendas alineada al lado izquierdo (Tu estilo personalizado) */}
        <section className="flex w-full flex-col items-start gap-2 md:w-auto md:flex-1">
          {[...mappedItems]
            .sort((a, b) => b.duration - a.duration)
            .map((item) => (
              <div key={item.group} className="flex items-center gap-2 text-sm">
                {item.icon}
                <span className="font-medium text-muted-foreground">
                  {item.labelEs}:{" "}
                  <span className="font-mono text-foreground">
                    {timeFixed(item.duration)}
                  </span>
                </span>
              </div>
            ))}
        </section>

        {/* Gráfico Donut de Recharts / Shadcn */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, item) => (
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
                          {timeFixed(Number(value))}
                        </span>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Pie
              data={mappedItems}
              dataKey="duration"
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
                      >
                        {/* Texto central superior: Muestra el tiempo global acumulado */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-mono text-2xl font-bold"
                        >
                          {timeFixed(mainThreadWorkBreakdown.numericValue, 0)}
                        </tspan>
                        {/* Texto central inferior */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-muted-foreground text-xs font-semibold tracking-wider uppercase"
                        >
                          Procesador
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

export default MainThreadPieChart
