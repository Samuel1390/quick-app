import { createContext, useContext } from "react"

export interface SegmentChatContextValue {
  isChatOpen: boolean
  toggleChat: () => void
  pendingDiagnostic: { file: File; prompt: string } | null
  clearPendingDiagnostic: () => void
}

export const SegmentChatContext = createContext<SegmentChatContextValue | null>(null)

/**
 * Retorna el contexto del chat de Segment AI.
 * Devuelve `null` si no hay un SegmentChatProvider en el árbol (comportamiento seguro).
 */
export function useSegmentChat(): SegmentChatContextValue | null {
  return useContext(SegmentChatContext)
}
