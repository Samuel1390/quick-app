import { type Item22 } from "@/app/server-functions/types"
import {
  File,
  Images,
  SquarePlay,
  Baseline,
  Package,
  FileStack,
} from "lucide-react"
import { JavascriptIcon } from "@/components/icons/simple-icons-javascript"
import { CssIcon } from "@/components/icons/simple-icons-css"
import React from "react"

const labelsEs = [
  "Scripts",
  "Hojas de estilos",
  "Fuentes",
  "Imágenes",
  "Media",
  "Otros",
  "Paquetes de terceros",
  "Documentos",
  "Total",
] as const

export interface MappedItem22Type extends Item22 {
  labelEs: (typeof labelsEs)[number]
  color: string
  fill: string
  icon: React.JSX.Element
}

export class MappedItem22 implements Item22 {
  labelEs: (typeof labelsEs)[number]
  transferSize: number
  requestCount: number
  label: string
  resourceType: string
  color: string
  fill: string
  icon: React.JSX.Element

  constructor(item22: Item22) {
    const initialValue = ""

    this.transferSize = item22.transferSize
    this.requestCount = item22.requestCount
    this.label = item22.label
    this.resourceType = item22.resourceType

    this.labelEs = labelsEs[0]
    this.color = initialValue
    this.fill = initialValue
    this.icon = React.createElement(File, {})

    this.getExtraProps(item22.label)
  }
  getExtraProps(labelEn: Item22["label"]) {
    const IconSize = {
      width: 16,
      height: 16,
    }
    switch (labelEn) {
      case "Script":
        this.labelEs = "Scripts"
        this.color = "var(--color-yellow-500)"
        this.fill = this.color
        this.icon = React.createElement(JavascriptIcon, {
          fill: this.color,
          color: "transparent",
          ...IconSize,
        })
        break
      case "Stylesheet":
        this.labelEs = "Hojas de estilos"
        this.color = "var(--color-sky-500)"
        this.fill = this.color
        this.icon = React.createElement(CssIcon, {
          fill: this.color,
          color: "transparent",
          ...IconSize,
        })
        break
      case "Font":
        this.labelEs = "Fuentes"
        this.color = "var(--color-violet-500)"
        this.fill = this.color
        this.icon = React.createElement(Baseline, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Image":
        this.labelEs = "Imágenes"
        this.color = "var(--color-green-500)"
        this.fill = this.color
        this.icon = React.createElement(Images, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Media":
        this.labelEs = "Media"
        this.color = "var(--color-pink-500)"
        this.fill = this.color
        this.icon = React.createElement(SquarePlay, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Other":
        this.labelEs = "Otros"
        this.color = "var(--color-indigo-500)"
        this.fill = this.color
        this.icon = React.createElement(FileStack, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Third-party":
        this.labelEs = "Paquetes de terceros"
        this.color = "var(--color-orange-500)"
        this.fill = this.color
        this.icon = React.createElement(Package, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Document":
        this.labelEs = "Documentos"
        this.color = "var(--color-purple-500)"
        this.fill = this.color
        this.icon = React.createElement(File, {
          color: this.color,
          ...IconSize,
        })
        break
      case "Total":
        this.labelEs = "Total"
        this.color = "var(--color-red-500)"
        this.fill = this.color
        this.icon = React.createElement(Package, {
          color: this.color,
          ...IconSize,
        })
        break
      default:
        this.labelEs = "Otros"
        this.color = "var(--color-indigo-500)"
        this.fill = this.color
        this.icon = React.createElement(File, {
          color: this.color,
          ...IconSize,
        })
    }
  }
}
