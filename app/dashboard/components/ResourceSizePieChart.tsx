"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { type ResourceSummary } from "@/app/server-functions/types"
import {
  MappedItem22,
  type MappedItem22Type,
} from "@/app/classes/sizeMetricsData"
import { sizeFixed } from "@/app/utils/functions"

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

export const description = "A donut chart with text"

type Props = {
  resourceSummary: ResourceSummary
}

export function ResourceSizePieChart({ resourceSummary }: Props) {
  // console.log(resourceSummary.details.items) // Limpiamos el log si ya no es necesario

  const mappedItems22 = React.useMemo(() => {
    const acc: MappedItem22Type[] = []
    resourceSummary.details.items.forEach((curr) => {
      if (curr.label === "Total") return
      acc.push(new MappedItem22(curr))
    })
    return acc
  }, [resourceSummary.details.items])

  // Generamos el config dinámico (Mantenemos tu lógica)
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    mappedItems22.forEach((item) => {
      config[item.labelEs] = {
        label: item.labelEs,
        color: item.color,
      }
    })
    return config
  }, [mappedItems22])

  // Buscamos el valor total una sola vez para eficiencia
  const totalValue = React.useMemo(() => {
    return (
      resourceSummary.details.items.find((item) => item.label === "Total")
        ?.transferSize ?? 0
    )
  }, [resourceSummary.details.items])

  return (
    // 1. Ajuste de márgenes y padding del Card
    <Card className="mx-3 flex flex-col sm:px-5 md:mx-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución del Peso de Recursos</CardTitle>
        <CardDescription>
          Tamaño total de transferencia de los archivos descargados.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between gap-4 pb-0 xsm:flex-row">
        {/* 3. Sección de leyendas (Tus datos, mi estilo de alineación) */}
        <section className="flex w-full flex-1 flex-col items-start gap-2 xsm:w-auto">
          {mappedItems22
            .sort((a, b) => b.transferSize - a.transferSize)
            .map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                {item.icon}
                {/* Usamos font-mono para que los números queden alineados */}
                <span className="font-medium text-muted-foreground">
                  {item.labelEs}:{" "}
                  <span className="font-mono text-foreground">
                    {sizeFixed(item.transferSize)}
                  </span>
                </span>
              </div>
            ))}
        </section>

        {/* 4. Gráfico Donut (Ajuste de clases y tipografía central) */}
        <ChartContainer
          config={chartConfig}
          // Ajustamos max-width y márgenes para que no se gigante en móvil
          className="mx-auto aspect-square max-h-[250px] w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                // Mantenemos tu formateador personalizado que arreglamos antes, ¡es perfecto!
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
                          {sizeFixed(Number(value))}
                        </span>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Pie
              data={mappedItems22}
              dataKey="transferSize"
              nameKey="labelEs"
              innerRadius={54} // Un poco más fino para un look más moderno
              strokeWidth={10} // Bordes más gruesos entre porciones
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
                        {/* Texto central superior (Valor Total con font-mono técnico) */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-mono text-2xl font-bold"
                        >
                          {sizeFixed(totalValue, 0)}
                        </tspan>
                        {/* Texto central inferior (Etiqueta 'Total' estilizada) */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22} // Ajuste fino de posición vertical
                          className="fill-muted-foreground text-xs font-semibold tracking-wider uppercase"
                        >
                          Peso Total
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
