"use server"

import { LighthouseResult, Root, RuntimeError } from "./types"

export type LighthouseMetrics = {
  first_contentful_paint_ms?: string
  speed_index?: string
  largest_contentful_paint_ms?: string
  total_blocking_time_ms?: string
  time_to_interactive_ms?: string
  network_server_latency_ms?: string
}
export type ReturnValue =
  | {
      lighthouse: LighthouseResult
      lighthouseMetrics: LighthouseMetrics
      response: Root
    }
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
    console.log(url.toString())
    const response = await fetch(url, {
      next: {
        revalidate: 600,
        tags: [`page-speed-${targetUrl}-${device}`],
      },
    })
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
    const json: Root = await response.json()
    if (
      json?.lighthouseResult.runtimeError &&
      "code" in json.lighthouseResult.runtimeError
    ) {
      return json.lighthouseResult.runtimeError
    }

    const lighthouse = json.lighthouseResult
    console.log(Object.keys(lighthouse.audits))
    const lighthouseMetrics: LighthouseMetrics = {
      first_contentful_paint_ms:
        lighthouse.audits["first-contentful-paint"]?.displayValue,
      speed_index: lighthouse.audits["speed-index"]?.displayValue,
      largest_contentful_paint_ms:
        lighthouse.audits["largest-contentful-paint"]?.displayValue,
      total_blocking_time_ms:
        lighthouse.audits["total-blocking-time"]?.displayValue,
      time_to_interactive_ms: lighthouse.audits["interactive"]?.displayValue,
      network_server_latency_ms:
        lighthouse.audits["network-server-latency"]?.displayValue,
    }

    return { lighthouse, lighthouseMetrics, response: json }
  } catch (error) {
    console.error("Fetching PageSpeed Insights failed:", error)
    return null
  }
}
