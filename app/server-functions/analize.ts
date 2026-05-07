"use server"

import { LighthouseResult, PageSpeedResponse, RuntimeError } from "./types"

export type LighthouseMetrics = {
  first_contentful_paint_ms?: string
  speed_index?: string
  largest_contentful_paint_ms?: string
  total_blocking_time_ms?: string
  time_to_interactive_ms?: string
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
    const lighthouseMetrics: LighthouseMetrics = {
      first_contentful_paint_ms:
        lighthouse.audits["first-contentful-paint"]?.displayValue,
      speed_index: lighthouse.audits["speed-index"]?.displayValue,
      largest_contentful_paint_ms:
        lighthouse.audits["largest-contentful-paint"]?.displayValue,
      total_blocking_time_ms:
        lighthouse.audits["total-blocking-time"]?.displayValue,
      time_to_interactive_ms: lighthouse.audits["interactive"]?.displayValue,
    }
    return { lighthouse, lighthouseMetrics }
  } catch (error) {
    console.error("Fetching PageSpeed Insights failed:", error)
    return null
  }
}
