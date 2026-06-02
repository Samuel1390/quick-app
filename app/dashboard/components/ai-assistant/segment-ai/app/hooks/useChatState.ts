import { useState, useEffect, RefObject, useCallback, useRef } from "react"
import { ModelErrorType } from "../components/errors/BackendErrors"
import getModelObj from "../utils/getModelObj"
import type { ModelHashes } from "../constants"
import { nanoid } from "nanoid"

// === TIPOS MIGRADOS DESDE EL ANTIGUO SERVER ACTION ===
export type GenericMessage = {
  role: "user" | "model"
  content: string
  reasoning?: string
}

export type HistoryData = {
  prompt: string
  files?: File[]
  filesNames?: string[]
  messageId: string
  model: ModelHashes
  supportsReasoning: boolean
  messages: GenericMessage[]
}

export type LastUserMessage = {
  prompt: string
  files?: File[]
  filesNames?: string[]
}

export function useChatState() {
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [errorCode, setErrorCode] = useState<ModelErrorType | null>(null)
  const [historyData, setHistoryData] = useState<HistoryData[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState<string>("")
  const [lastUserMessage, setLastUserMessage] = useState<LastUserMessage>({
    prompt: "",
  })

  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [streamingModel, setStreamingModel] = useState<ModelHashes | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const isPending = isStreaming

  useEffect(() => {
    if (feedbackMessage) {
      const timeout = setTimeout(() => setFeedbackMessage(""), 3000)
      return () => clearTimeout(timeout)
    }
  }, [feedbackMessage])

  const setLastMessage = (msg: LastUserMessage) => setLastUserMessage(msg)

  const sendStreamingMessage = useCallback(async (formData: FormData) => {
    const model = formData.get("model") as ModelHashes
    setIsStreaming(true)
    setStreamingContent("")
    setStreamingModel(model)
    setErrorCode(null)

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      // ENDPOINT CORREGIDO - Usa la ruta absoluta de tu API
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      })

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}))
        const code = errorData?.error ?? response.status
        setErrorCode(code)
        setOpenErrorModal(true)
        setFeedbackMessage("Intenta cambiar de modelo, o espera un minuto")
        setIsStreaming(false)
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""
      let reasoning = " "

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value, { stream: true })
        const lines = text.split("\n")

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const jsonStr = line.slice(6).trim()
          if (!jsonStr) continue

          try {
            const parsed = JSON.parse(jsonStr)

            if (parsed.error) {
              setErrorCode(parsed.error as ModelErrorType)
              setOpenErrorModal(true)
              setFeedbackMessage(
                "Intenta cambiar de modelo, o espera un minuto"
              )
              setIsStreaming(false)
              return
            }

            if (parsed.content) {
              accumulated += parsed.content
              setStreamingContent(accumulated)
            }

            if (parsed.done) {
              reasoning = parsed.reasoning || " "
            }
          } catch {
            // Ignorar
          }
        }
      }

      const prompt = formData.get("prompt") as string
      const files = formData.getAll("files") as File[]
      const historyDataRaw = formData.get("historyData") as string
      const prevHistory: HistoryData[] = historyDataRaw
        ? JSON.parse(historyDataRaw)
        : []
      const modelObj = getModelObj(model)

      const messages: GenericMessage[] = [
        { role: "user", content: prompt },
        {
          role: "model",
          content: accumulated || " ",
          reasoning: modelObj.supportsReasoning ? reasoning : undefined,
        },
      ]

      const newHistoryData: HistoryData[] = [
        ...prevHistory,
        {
          prompt,
          files,
          filesNames: files.map((f) => f.name),
          messageId: nanoid(),
          model,
          supportsReasoning: modelObj.supportsReasoning,
          messages,
        },
      ]

      setHistoryData(newHistoryData)
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Streaming error:", e)
        setErrorCode(e?.status ?? 500)
        setOpenErrorModal(true)
        setFeedbackMessage("Intenta cambiar de modelo, o espera un minuto")
      }
    } finally {
      setIsStreaming(false)
      setStreamingContent("")
      setStreamingModel(null)
      abortControllerRef.current = null
    }
  }, [])

  const retry = (formRef: RefObject<HTMLFormElement | null>) => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    formData.set("prompt", lastUserMessage.prompt)
    if (lastUserMessage.files && lastUserMessage.files.length > 0) {
      lastUserMessage.files.forEach((file) => formData.append("files", file))
    }
    sendStreamingMessage(formData)
  }

  return {
    isPending,
    openErrorModal,
    setOpenErrorModal,
    errorCode,
    setErrorCode,
    feedbackMessage,
    setFeedbackMessage,
    lastUserMessage,
    setLastMessage,
    retry,
    historyData,
    setHistoryData,
    isStreaming,
    streamingContent,
    streamingModel,
    sendStreamingMessage,
  }
}
