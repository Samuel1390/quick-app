"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InfoIcon, MoveIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export type LayoutShiftItem = {
  node: {
    snippet?: string
    selector?: string
    nodeLabel?: string
    path?: string
  }
  score: number
}

export type LayoutShiftsAudit = {
  title: string
  description?: string
  score?: number
  scoreDisplayMode?: string
  displayValue?: string
  metricSavings?: {
    CLS: number
  }
  details: {
    items: Array<{
      node: LayoutShiftItem["node"]
      score: number
    }>
  }
}

// Umbrales de CLS según Lighthouse (valores estándar)
// Good: <= 0.1, Needs Improvement: 0.1 - 0.25, Poor: > 0.25
const CLS_THRESHOLDS = {
  GOOD: 0.1,
  NEEDS_IMPROVEMENT: 0.25,
}

function getClsRating(cls: number): {
  label: string
  color: "green" | "yellow" | "red"
  description: string
} {
  if (cls <= CLS_THRESHOLDS.GOOD) {
    return {
      label: "Bueno",
      color: "green",
      description:
        "El diseño es estable, los cambios de layout son apenas perceptibles.",
    }
  } else if (cls <= CLS_THRESHOLDS.NEEDS_IMPROVEMENT) {
    return {
      label: "Necesita mejora",
      color: "yellow",
      description:
        "Se detectan movimientos moderados que pueden afectar la experiencia.",
    }
  } else {
    return {
      label: "Pobre",
      color: "red",
      description:
        "El contenido se mueve excesivamente, lo que frustra a los usuarios.",
    }
  }
}

function formatScore(score: number): string {
  return score.toFixed(6)
}

export default function LayoutShiftImpact({
  layoutShiftsAudit,
}: {
  layoutShiftsAudit: LayoutShiftsAudit
}) {
  const clsValue = layoutShiftsAudit.metricSavings?.CLS ?? 0
  const rating = getClsRating(clsValue)
  const items = layoutShiftsAudit.details?.items ?? []

  // Filtrar solo los shifts con puntaje > 0.00001 (para evitar ruido)
  const significantShifts = items
    .filter((item) => item.score > 0.00001)
    .sort((a, b) => b.score - a.score)

  // Mostrar top 3, pero solo si los siguientes no son extremadamente menores (ej: < 10% del primero)
  let topShifts = significantShifts.slice(0, 3)
  if (significantShifts.length > 3) {
    const firstScore = significantShifts[0].score
    const fourthScore = significantShifts[3]?.score || 0
    // Si el cuarto es menor al 10% del primero, no lo incluimos
    if (fourthScore >= firstScore * 0.1) {
      topShifts = significantShifts.slice(0, 5)
    } else {
      topShifts = significantShifts.slice(0, 3)
    }
  }

  // Calcular el porcentaje para la barra de progreso (CLS máximo considerado = 0.3 para escala)
  const maxClsForBar = 0.3
  const progressPercent = Math.min((clsValue / maxClsForBar) * 100, 100)

  // Colores según rating
  const progressColor =
    rating.color === "green"
      ? "bg-green-500"
      : rating.color === "yellow"
        ? "bg-yellow-500"
        : "bg-red-500"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MoveIcon className="h-5 w-5" />
          Impacto del Layout Shift (CLS)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 cursor-help text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-xs">
                  El CLS mide la estabilidad visual de la página. Un valor bajo
                  significa que el contenido no se mueve inesperadamente.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Valor CLS y barra de progreso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Puntuación CLS:</span>
            <Badge
              variant="outline"
              className={`text-${
                rating.color === "green"
                  ? "green-600"
                  : rating.color === "yellow"
                    ? "yellow-600"
                    : "red-600"
              }`}
            >
              {clsValue.toFixed(4)}
            </Badge>
          </div>
          <Progress value={progressPercent} className={progressColor} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Bueno (≤0.1)</span>
            <span>Regular (0.1 - 0.25)</span>
            <span>Pobre (&gt;0.25)</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {rating.description}
          </p>
        </div>

        {/* Explicación breve del origen */}
        <div className="rounded-md bg-muted/50 p-4 text-sm">
          <h4 className="mb-1 font-medium">¿Por qué ocurren estos shifts?</h4>
          <p className="text-muted-foreground">
            Los desplazamientos suceden cuando elementos se renderizan sin
            dimensiones definidas (imágenes, iframes, contenido dinámico) o
            cuando se insertan elementos de forma asíncrona. En esta página, el
            cambio más grande lo causó un título (&lt;h1&gt;) que posiblemente
            cambió de tamaño o posición durante la carga.
          </p>
        </div>

        {/* Tabla con los shifts más significativos */}
        {topShifts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              Desplazamientos más relevantes
            </h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Elemento afectado</TableHead>
                    <TableHead className="w-32 text-right">
                      Puntaje del shift
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topShifts.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-xs">
                        {item.node?.snippet ||
                          item.node?.selector ||
                          "Desconocido"}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {formatScore(item?.score) || "--"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {topShifts.length === 1 && (
              <p className="text-xs text-muted-foreground">
                * Solo se muestra el shift con mayor impacto; los demás tienen
                una contribución mínima.
              </p>
            )}
          </div>
        )}

        {/* Mensaje cuando no hay shifts relevantes */}
        {topShifts.length === 0 && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            No se detectaron desplazamientos significativos. ¡Excelente!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
