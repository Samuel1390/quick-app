"use server"

import { LighthouseResult, PageSpeedResponse, RuntimeError } from "./types"

export type LighthouseMetrics = {
  first_contentful_paint_ms: {
    value: string | undefined
    label: string
    abreviation: string
  }
  speed_index: {
    value: string | undefined
    label: string
    abreviation: string
  }
  largest_contentful_paint_ms: {
    value: string | undefined
    label: string
    abreviation: string
  }
  total_blocking_time_ms: {
    value: string | undefined
    label: string
    abreviation: string
  }
  time_to_interactive_ms: {
    value: string | undefined
    label: string
    abreviation: string
  }
}
export type ReturnValue =
  | { lighthouse: LighthouseResult; lighthouseMetrics: LighthouseMetrics }
  | RuntimeError
  | null

export default async function analize(
  targetUrl: string,
  device: string
): Promise<ReturnValue> {
  const apiKey = process.env.PAGE_SPEED_INSIGHTS_API_KEY
  if (!apiKey) {
    throw new Error("API Key no encontrada. Verifica tus variables de entorno.")
  }

  const targetDevice = device || "desktop"
  const apiEndpoint =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  const url = new URL(apiEndpoint)
  url.searchParams.set("url", targetUrl)
  url.searchParams.set("strategy", targetDevice)
  if (apiKey) {
    url.searchParams.set("key", apiKey)
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.log(response.statusText)
      if (response.status === 400) {
        return {
          code: "INVALID_URL",
          message: "URL inválida. Verifica la URL ingresada.",
        }
      }
      if (response.status === 429) {
        throw new Error("Demasiadas peticiones. Espera 24 horas.")
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const json: PageSpeedResponse = await response.json()
    if (json?.lighthouseResult.runtimeError) {
      return json.lighthouseResult.runtimeError
    }

    // const cruxMetrics = {
    //   first_contentful_paint_ms: {
    //     value:
    //       json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS?.category,
    //     label: "First Contentful Paint",
    //   },
    //   interaction_to_next_paint: {
    //     value:
    //       json.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT?.category,
    //     label: "Interaction to Next Paint",
    //   },
    // }

    const lighthouse = json.lighthouseResult
    const lighthouseMetrics = {
      first_contentful_paint_ms: {
        value: lighthouse.audits["first-contentful-paint"]?.displayValue,
        label: "Primer Pintado de Contenido",
        abreviation: "FCP",
      },
      speed_index: {
        value: lighthouse.audits["speed-index"]?.displayValue,
        label: "Índice de Velocidad",
        abreviation: "SI",
      },
      largest_contentful_paint_ms: {
        value: lighthouse.audits["largest-contentful-paint"]?.displayValue,
        label: "Pintado de Contenido Más Grande",
        abreviation: "LCP",
      },
      total_blocking_time_ms: {
        value: lighthouse.audits["total-blocking-time"]?.displayValue,
        label: "Tiempo de Bloqueo Total",
        abreviation: "TBT",
      },
      time_to_interactive_ms: {
        value: lighthouse.audits["interactive"]?.displayValue,
        label: "Tiempo para la Interactividad",
        abreviation: "TTI",
      },
    }
    return { lighthouse, lighthouseMetrics }
  } catch (error) {
    console.error("Fetching PageSpeed Insights failed:", error)
    return null
  }
}

function showInitialContent(id: string) {
  document.body.innerHTML = "" // Clear previous content
  const title = document.createElement("h1")
  title.textContent = "PageSpeed Insights API Demo"
  document.body.appendChild(title)

  const page = document.createElement("p")
  page.textContent = `Page tested: ${id}`
  document.body.appendChild(page)
}

function showCruxContent(cruxMetrics: Record<string, string>) {
  const cruxHeader = document.createElement("h2")
  cruxHeader.textContent = "Chrome User Experience Report Results"
  document.body.appendChild(cruxHeader)

  for (const key in cruxMetrics) {
    const p = document.createElement("p")
    p.textContent = `${key}: ${cruxMetrics[key]}`
    document.body.appendChild(p)
  }
}

function showLighthouseContent(lighthouseMetrics: any) {
  const lighthouseHeader = document.createElement("h2")
  lighthouseHeader.textContent = "Lighthouse Results"
  document.body.appendChild(lighthouseHeader)

  for (const key in lighthouseMetrics) {
    const p = document.createElement("p")
    p.textContent = `${key}: ${lighthouseMetrics[key]}`
    document.body.appendChild(p)
  }
}
