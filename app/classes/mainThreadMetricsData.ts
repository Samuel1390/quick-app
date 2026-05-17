// app/classes/mainThreadMetricsData.ts
import React from "react"
import {
  Cpu,
  Layout,
  Palette,
  FileCode,
  Terminal,
  FileStack,
  Clock,
} from "lucide-react"

// Definimos el tipo para los items que vienen crudos de la API
export interface MainThreadItem {
  group: string
  duration: number
  groupLabel: string
}

const labelsEs = [
  "Evaluación de scripts",
  "Estilos y diseño",
  "Renderizado y pintado",
  "Procesamiento de HTML y CSS",
  "Compilación de scripts",
  "Otros",
] as const

export interface MappedMainThreadItemType extends MainThreadItem {
  labelEs: (typeof labelsEs)[number]
  color: string
  fill: string
  icon: React.JSX.Element
}

// Mapa estático de configuración para evitar usar estructuras switch/case mutables
const METRICS_CONFIG: Record<
  string,
  {
    labelEs: (typeof labelsEs)[number]
    color: string
    icon: React.ComponentType<any>
  }
> = {
  scriptEvaluation: {
    labelEs: "Evaluación de scripts",
    color: "var(--color-amber-500)", // Color dorado/amarillo para JS (como tu componente previo)
    icon: Cpu,
  },
  styleLayout: {
    labelEs: "Estilos y diseño",
    color: "var(--color-sky-500)",
    icon: Layout,
  },
  paintCompositeRender: {
    labelEs: "Renderizado y pintado",
    color: "var(--color-pink-500)",
    icon: Palette,
  },
  parseHTML: {
    labelEs: "Procesamiento de HTML y CSS",
    color: "var(--color-purple-500)",
    icon: FileCode,
  },
  scriptParseCompile: {
    labelEs: "Compilación de scripts",
    color: "var(--color-orange-500)",
    icon: Terminal,
  },
  other: {
    labelEs: "Otros",
    color: "var(--color-indigo-500)",
    icon: FileStack,
  },
}

export class MappedMainThreadItem implements MappedMainThreadItemType {
  group: string
  duration: number
  groupLabel: string
  labelEs: (typeof labelsEs)[number]
  color: string
  fill: string
  icon: React.JSX.Element

  constructor(item: MainThreadItem) {
    this.group = item.group
    this.duration = item.duration
    this.groupLabel = item.groupLabel

    // Buscamos la configuración del grupo o usamos "other" por defecto si Lighthouse añade uno nuevo
    const config = METRICS_CONFIG[item.group] || METRICS_CONFIG["other"]

    this.labelEs = config.labelEs
    this.color = config.color
    this.fill = config.color

    this.icon = React.createElement(config.icon, {
      color: config.color,
      width: 16,
      height: 16,
    })
  }
}
