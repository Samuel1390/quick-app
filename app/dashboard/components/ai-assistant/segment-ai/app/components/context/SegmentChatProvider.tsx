"use client"
import { useState, useEffect, type ReactNode } from "react"
import { SegmentChatContext } from "./SegmentChatContext"
import type { ReturnValue } from "@/app/server-functions/analize"
import { PerformanceDiagnosticGenerator } from "@/app/utils/classes/PerformanceDiagnosticGenerator"

interface SegmentChatProviderProps {
  children: ReactNode
  /** Datos de analize(). Cuando tiene `lighthouseMetrics`, se genera el diagnóstico automáticamente. */
  data: ReturnValue
  url: string
  device: string
}

export function SegmentChatProvider({
  children,
  data,
  url,
  device,
}: SegmentChatProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [pendingDiagnostic, setPendingDiagnostic] = useState<{
    file: File
    prompt: string
  } | null>(null)
  const [diagnosticGenerated, setDiagnosticGenerated] = useState(false)

  // Cuando el análisis de Lighthouse se completa exitosamente, genera el diagnóstico
  useEffect(() => {
    if (data && "lighthouseMetrics" in data && !diagnosticGenerated) {
      const generator = new PerformanceDiagnosticGenerator(data, url, device)
      const file = generator.toFile()
      setPendingDiagnostic({
        file,
        prompt:
          "Genera un reporte con las recomendaciones y los cambios que se deben realizar en el código para optimizar el rendimiento.",
      })
      setDiagnosticGenerated(true)
    }
  }, [data])

  const toggleChat = () => setIsChatOpen((prev) => !prev)
  const clearPendingDiagnostic = () => setPendingDiagnostic(null)

  return (
    <SegmentChatContext.Provider
      value={{
        isChatOpen,
        toggleChat,
        pendingDiagnostic,
        clearPendingDiagnostic,
      }}
    >
      {children}
    </SegmentChatContext.Provider>
  )
}
