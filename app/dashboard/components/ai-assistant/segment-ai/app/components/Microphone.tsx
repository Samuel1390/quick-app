"use client"

import React, { useEffect } from "react"
import { Mic, Square } from "lucide-react"
import useRecorder from "../hooks/useRecorder"
import { cn } from "@/lib/utils"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Microphone = ({
  recorder,
  setFeedbackMessage,
}: {
  recorder: ReturnType<typeof useRecorder>
  setFeedbackMessage: (message: string) => void
}) => {
  const { isRecording, startRecording, stopRecording, error } = recorder

  useEffect(() => {
    if (error) {
      setFeedbackMessage(error)
    }
  }, [error])

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className={cn(
                  "flex items-center justify-center bg-black p-1 p-1.5",
                  "rounded-full text-white dark:bg-white dark:text-black",
                  "shadow-md transition-colors hover:opacity-80"
                )}
                title="Iniciar grabación"
              >
                <Mic size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className={cn(
                  "flex items-center justify-center bg-red-500 p-[8px]",
                  "animate-pulse rounded-full text-white shadow-md transition-all hover:bg-red-600"
                )}
                title="Detener grabación"
              >
                <Square size={12} className="fill-current" />
              </button>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        Puedes hacer transcripción de audio a texto con Whisper (requiere
        permisos de micrófono)
      </HoverCardContent>
    </HoverCard>
  )
}

export default Microphone
