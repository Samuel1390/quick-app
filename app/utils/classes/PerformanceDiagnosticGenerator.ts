import type { LighthouseMetrics } from "@/app/server-functions/analize"
import type { Root } from "@/app/server-functions/types"

export type AnalysisData = {
  lighthouseMetrics: LighthouseMetrics
  response: Root
}

export class PerformanceDiagnosticGenerator {
  private data: AnalysisData
  private url: string
  private device: string
  private analysisDate: string

  constructor(data: AnalysisData, url: string, device: string) {
    this.data = data
    this.url = url
    this.device = device
    this.analysisDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    })
  }

  generateDiagnosticMarkdown(): string {
    const { lighthouseMetrics, response } = this.data
    const audits = response.lighthouseResult.audits
    const categories = response.lighthouseResult.categories

    const lines: string[] = []

    // ── Header ────────────────────────────────────────────────────────────────
    lines.push("# Web Performance Diagnostic Report")
    lines.push("")
    lines.push(`**URL:** ${this.url}`)
    lines.push(`**Device:** ${this.device}`)
    lines.push(`**Analysis Date:** ${this.analysisDate}`)
    lines.push("")

    // ── Performance Score ─────────────────────────────────────────────────────
    const perfScore = (categories as any)?.performance?.score
    if (perfScore !== undefined) {
      const scorePercent = Math.round(perfScore * 100)
      const rating =
        scorePercent >= 90 ? "🟢 Good" : scorePercent >= 50 ? "🟡 Needs Improvement" : "🔴 Poor"
      lines.push(`## Performance Score: ${scorePercent}/100 — ${rating}`)
      lines.push("")
    }

    // ── Core Web Vitals ───────────────────────────────────────────────────────
    lines.push("## Core Metrics")
    lines.push("")
    lines.push("| Metric | Value |")
    lines.push("| --- | --- |")
    if (lighthouseMetrics.first_contentful_paint_ms)
      lines.push(`| First Contentful Paint (FCP) | ${lighthouseMetrics.first_contentful_paint_ms} |`)
    if (lighthouseMetrics.speed_index)
      lines.push(`| Speed Index | ${lighthouseMetrics.speed_index} |`)
    if (lighthouseMetrics.largest_contentful_paint_ms)
      lines.push(`| Largest Contentful Paint (LCP) | ${lighthouseMetrics.largest_contentful_paint_ms} |`)
    if (lighthouseMetrics.total_blocking_time_ms)
      lines.push(`| Total Blocking Time (TBT) | ${lighthouseMetrics.total_blocking_time_ms} |`)
    if (lighthouseMetrics.time_to_interactive_ms)
      lines.push(`| Time to Interactive (TTI) | ${lighthouseMetrics.time_to_interactive_ms} |`)
    if (lighthouseMetrics.network_server_latency_ms)
      lines.push(`| Server Latency | ${lighthouseMetrics.network_server_latency_ms} |`)
    lines.push("")

    // ── Unused JavaScript ─────────────────────────────────────────────────────
    const unusedJs = audits["unused-javascript"] as any
    if (unusedJs?.numericValue > 0 && unusedJs?.details?.items?.length > 0) {
      lines.push("## Unused JavaScript")
      lines.push("")
      const savings = unusedJs.details.overallSavingsBytes
      const savingsMs = unusedJs.details.overallSavingsMs
      lines.push(
        `Potential savings: **${this._formatBytes(savings)}** (~${savingsMs?.toFixed(0) ?? "?"}ms)`
      )
      lines.push("")
      lines.push("| File | Wasted | Total |")
      lines.push("| --- | --- | --- |")
      unusedJs.details.items.slice(0, 5).forEach((item: any) => {
        lines.push(
          `| ${this._shortenUrl(item.url)} | ${this._formatBytes(item.wastedBytes)} | ${this._formatBytes(item.totalBytes)} |`
        )
      })
      lines.push("")
    }

    // ── Unused CSS ────────────────────────────────────────────────────────────
    const unusedCss = audits["unused-css-rules"] as any
    if (unusedCss?.numericValue > 0) {
      lines.push("## Unused CSS")
      lines.push("")
      const savings = unusedCss.details?.overallSavingsBytes ?? 0
      const savingsMs = unusedCss.details?.overallSavingsMs
      lines.push(
        `Potential savings: **${this._formatBytes(savings)}** (~${savingsMs?.toFixed(0) ?? "?"}ms)`
      )
      lines.push("")
    }

    // ── Unminified JavaScript ─────────────────────────────────────────────────
    const unminJs = audits["unminified-javascript"] as any
    if (unminJs?.numericValue > 0) {
      lines.push("## Unminified JavaScript")
      lines.push("")
      lines.push(`Potential savings: **${unminJs.displayValue ?? ""}**`)
      if (unminJs.details?.items?.length > 0) {
        lines.push("")
        lines.push("| File | Wasted Bytes |")
        lines.push("| --- | --- |")
        unminJs.details.items.slice(0, 5).forEach((item: any) => {
          lines.push(`| ${this._shortenUrl(item.url)} | ${this._formatBytes(item.wastedBytes)} |`)
        })
      }
      lines.push("")
    }

    // ── Unminified CSS ────────────────────────────────────────────────────────
    const unminCss = audits["unminified-css"] as any
    if (unminCss?.numericValue > 0) {
      lines.push("## Unminified CSS")
      lines.push("")
      lines.push(`Potential savings: **${unminCss.displayValue ?? ""}**`)
      lines.push("")
    }

    // ── Main Thread Work ──────────────────────────────────────────────────────
    const mainThread = audits["mainthread-work-breakdown"] as any
    if (mainThread?.details?.items?.length > 0) {
      lines.push("## Main Thread Work Breakdown")
      lines.push("")
      lines.push(`**Total time:** ${mainThread.displayValue}`)
      lines.push("")
      lines.push("| Category | Duration |")
      lines.push("| --- | --- |")
      mainThread.details.items.forEach((item: any) => {
        lines.push(`| ${item.groupLabel} | ${item.duration?.toFixed(0) ?? "?"}ms |`)
      })
      lines.push("")
    }

    // ── Layout Shifts ─────────────────────────────────────────────────────────
    const layoutShifts = audits["layout-shifts"] as any
    if (layoutShifts?.details?.items?.length > 0) {
      lines.push("## Cumulative Layout Shift (CLS)")
      lines.push("")
      lines.push(`**CLS score:** ${layoutShifts.displayValue}`)
      lines.push("")
      lines.push("| Element | CLS Score |")
      lines.push("| --- | --- |")
      layoutShifts.details.items.slice(0, 5).forEach((item: any) => {
        const selector = item.node?.selector ?? item.node?.nodeLabel ?? "Unknown element"
        const shortSel =
          selector.length > 60 ? selector.slice(0, 60) + "…" : selector
        lines.push(`| ${shortSel} | ${item.score?.toFixed(4) ?? "?"} |`)
      })
      lines.push("")
    }

    // ── Resource Summary ──────────────────────────────────────────────────────
    const resourceSummary = audits["resource-summary"] as any
    if (resourceSummary?.details?.items?.length > 0) {
      lines.push("## Resource Summary (by type)")
      lines.push("")
      lines.push("| Type | Size | Requests |")
      lines.push("| --- | --- | --- |")
      resourceSummary.details.items.forEach((item: any) => {
        if (item.label && item.transferSize > 0) {
          lines.push(
            `| ${item.label} | ${this._formatBytes(item.transferSize)} | ${item.requestCount ?? "?"} |`
          )
        }
      })
      lines.push("")
    }

    // ── Server Latency by Origin ──────────────────────────────────────────────
    const serverLatency = audits["network-server-latency"] as any
    if (serverLatency?.details?.items?.length > 0) {
      lines.push("## Server Response Times by Origin")
      lines.push("")
      lines.push("| Origin | Latency |")
      lines.push("| --- | --- |")
      serverLatency.details.items.slice(0, 5).forEach((item: any) => {
        lines.push(`| ${item.origin} | ${item.serverResponseTime?.toFixed(0) ?? "?"}ms |`)
      })
      lines.push("")
    }

    return lines.join("\n")
  }

  generateJustificationMarkdown(): string {
    return `# Justificación de Datos Seleccionados para el Diagnóstico de Rendimiento

## Criterio general de selección

Se seleccionaron únicamente los datos sobre los cuales el programador tiene **control directo** y que producen un impacto medible en las métricas de Core Web Vitals (FCP, LCP, TBT, CLS). Se descartaron datos internos de Lighthouse (capturas de pantalla, trazas del navegador, datos de árbol de scripts) por ser informativos pero no accionables.

---

## Datos incluidos y por qué

### Métricas Core (FCP, LCP, TBT, Speed Index, TTI, Latencia del servidor)
Son los KPIs principales de Lighthouse y los que Google usa en el ranking SEO. Cada métrica tiene un umbral claro (ej: LCP < 2.5s = bueno) y estrategias conocidas de mejora.

### JavaScript sin usar (\`unused-javascript\`)
El código JS que se carga pero no se ejecuta en el primer render es uno de los mayores culpables del TBT alto y el LCP tardío. El programador puede aplicar code-splitting, lazy loading o eliminar dependencias innecesarias.

### CSS sin usar (\`unused-css-rules\`)
El CSS bloqueante y no utilizado retrasa el FCP. Se puede resolver con PurgeCSS, critical CSS, o cargando estilos de forma diferida.

### JavaScript no minificado (\`unminified-javascript\`)
La minificación reduce el tamaño de transferencia y el tiempo de parseo. Es una optimización de bajo costo y alto impacto que debería estar automatizada en el proceso de build.

### CSS no minificado (\`unminified-css\`)
Mismo razonamiento que el JS. Una hoja de estilos sin minificar puede ser 2-3x más grande que la versión minificada.

### Desglose del trabajo del hilo principal (\`mainthread-work-breakdown\`)
Muestra cuánto tiempo ocupa cada tipo de tarea (scripting, rendering, parsing). Permite identificar si el problema es exceso de JS, re-renders innecesarios o estilos complejos.

### Desplazamientos de layout (\`layout-shifts\`)
El CLS alto degrada significativamente la experiencia del usuario. Los elementos causantes son directamente accionables: se puede especificar dimensiones explícitas, usar \`aspect-ratio\`, o reservar espacio para contenido cargado de forma asíncrona.

### Resumen de recursos (\`resource-summary\`)
Da una visión general del peso de la página por tipo de recurso. Permite al programador identificar si el problema es de imágenes pesadas, JS excesivo o fuentes grandes.

### Latencia del servidor por origen (\`network-server-latency\`)
Un servidor lento es la causa raíz de un TTFB alto y, en consecuencia, de un LCP tardío. El programador puede mejorar esto con CDN, optimización de servidor, o cacheo de respuestas.

---

## Datos excluidos y por qué

| Dato | Razón de exclusión |
| --- | --- |
| \`screenshot-thumbnails\` / \`final-screenshot\` | Datos visuales no textuales, no accionables como texto |
| \`fullPageScreenshot\` | Idem, imagen base64 de varios KB |
| \`script-treemap-data\` | Estructura interna de árbol, demasiado verboso |
| \`metrics\` (timestamps internos) | Datos de traza de Lighthouse, no directamente accionables |
| Insights de terceros | El programador tiene control limitado sobre scripts de terceros |
| \`user-timings\` | Solo relevante si la app usa la Performance API, caso específico |
| \`network-requests\` | Demasiado verboso (puede haber cientos de peticiones) |
| Datos de entorno (\`environment\`, \`configSettings\`) | Metadatos de Lighthouse, no accionables |
`
  }

  /** Genera un File object (texto markdown) listo para adjuntar al chat de Segment AI */
  toFile(): File {
    const content = this.generateDiagnosticMarkdown()
    return new File([content], "performance-diagnostic.md", { type: "text/plain" })
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _formatBytes(bytes: number): string {
    if (!bytes || bytes === 0) return "0 B"
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  private _shortenUrl(url: string): string {
    if (!url) return "—"
    try {
      const u = new URL(url)
      const path = u.pathname
      return path.length > 55 ? `…${path.slice(-55)}` : path || url
    } catch {
      return url.length > 60 ? `…${url.slice(-60)}` : url
    }
  }
}
