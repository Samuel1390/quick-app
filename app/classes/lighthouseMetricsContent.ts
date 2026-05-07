import { type LighthouseMetrics } from "@/app/server-functions/analize"
import { Zap, Timer, TableOfContents } from "lucide-react"
import { createElement } from "react"

type Content = {
  value?: string
  label: string
  abreviation: string
  description: string
  icon: React.JSX.Element
  metricColorClass: string | null // clase de color del valor de la métrica
  category: "Excelente" | "Bueno" | "Malo" | "Crítico" | null // calificación del valor de la métrica
}

const METRIC_THRESHOLDS = {
  first_contentful_paint_ms: { excellent: 1, good: 1.8, poor: 3 },
  speed_index: { excellent: 2, good: 3.4, poor: 5.8 },
  largest_contentful_paint_ms: { excellent: 1.5, good: 2.5, poor: 4 },
  total_blocking_time_ms: { excellent: 50, good: 200, poor: 400 }, // milisegundos
  time_to_interactive_ms: { excellent: 2, good: 3.8, poor: 7.3 },
} as const

type MetricKey = keyof typeof METRIC_THRESHOLDS

const METRIC_COLOR_CLASSES = {
  excellent: "text-green-600 dark:text-green-400",
  good: "text-emerald-600 dark:text-emerald-400",
  poor: "text-yellow-600 dark:text-yellow-400",
  critical: "text-red-700 dark:text-red-800",
}

class LighthouseMetricsContent {
  [key: string]: Content
  constructor({ lighthouseMetrics }: { lighthouseMetrics: LighthouseMetrics }) {
    this.first_contentful_paint_ms = {
      value: lighthouseMetrics.first_contentful_paint_ms,
      label: "Primera Pintura de Contenido",
      abreviation: "FCP",
      description:
        "Tiempo transcurrido desde que la página comienza a cargar hasta que se renderiza el primer contenido visible.",
      icon: createElement(Timer),
      metricColorClass: getMetricColor(
        "first_contentful_paint_ms",
        lighthouseMetrics.first_contentful_paint_ms
      ),
      category: getMetricCategory(
        "first_contentful_paint_ms",
        lighthouseMetrics.first_contentful_paint_ms
      ),
    }
    this.speed_index = {
      value: lighthouseMetrics.speed_index,
      label: "Índice de Velocidad",
      abreviation: "SI",
      description:
        "Mide la rapidez con la que el contenido de la página se vuelve visible.",
      icon: createElement(Zap),
      metricColorClass: getMetricColor(
        "speed_index",
        lighthouseMetrics.speed_index
      ),
      category: getMetricCategory("speed_index", lighthouseMetrics.speed_index),
    }
    this.largest_contentful_paint_ms = {
      value: lighthouseMetrics.largest_contentful_paint_ms,
      label: "Pintura de Contenido Más Grande",
      abreviation: "LCP",
      description:
        "Tiempo transcurrido desde que la página comienza a cargar hasta que se renderiza el elemento de contenido más grande.",
      icon: createElement(TableOfContents),
      metricColorClass: getMetricColor(
        "largest_contentful_paint_ms",
        lighthouseMetrics.largest_contentful_paint_ms
      ),
      category: getMetricCategory(
        "largest_contentful_paint_ms",
        lighthouseMetrics.largest_contentful_paint_ms
      ),
    }
    this.total_blocking_time_ms = {
      value: lighthouseMetrics.total_blocking_time_ms,
      label: "Tiempo Total de Bloqueo",
      abreviation: "TBT",
      description:
        "Cantidad de tiempo durante la carga de la página en la que la página no responde a la interacción del usuario.",
      icon: createElement(Timer),
      metricColorClass: getMetricColor(
        "total_blocking_time_ms",
        lighthouseMetrics.total_blocking_time_ms
      ),
      category: getMetricCategory(
        "total_blocking_time_ms",
        lighthouseMetrics.total_blocking_time_ms
      ),
    }
    this.time_to_interactive_ms = {
      value: lighthouseMetrics.time_to_interactive_ms,
      label: "Tiempo hasta la Interactividad",
      abreviation: "TTI",
      description:
        "Tiempo transcurrido desde que la página comienza a cargar hasta que la página es completamente interactiva.",
      icon: createElement(TableOfContents),
      metricColorClass: getMetricColor(
        "time_to_interactive_ms",
        lighthouseMetrics.time_to_interactive_ms
      ),
      category: getMetricCategory(
        "time_to_interactive_ms",
        lighthouseMetrics.time_to_interactive_ms
      ),
    }
  }
}

const getMetricColor = (key: MetricKey, strValue?: string): string | null => {
  if (!strValue) {
    return null
  }
  const value = parseInt(strValue.replace(/ms|s/g, ""))
  const metric = METRIC_THRESHOLDS[key]
  if (value < metric.excellent) return METRIC_COLOR_CLASSES.excellent
  if (value < metric.good) return METRIC_COLOR_CLASSES.good
  if (value < metric.poor) return METRIC_COLOR_CLASSES.poor
  return METRIC_COLOR_CLASSES.critical
}
const getMetricCategory = (
  key: MetricKey,
  strValue?: string
): "Excelente" | "Bueno" | "Malo" | "Crítico" | null => {
  if (!strValue) {
    return null
  }
  const value = parseFloat(strValue.replace(/ms|s/g, ""))

  const metric = METRIC_THRESHOLDS[key]
  if (value < metric.excellent) return "Excelente"
  if (value < metric.good) return "Bueno"
  if (value < metric.poor) return "Malo"
  return "Crítico"
}

export default LighthouseMetricsContent
