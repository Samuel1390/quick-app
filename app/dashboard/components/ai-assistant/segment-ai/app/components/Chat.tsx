"use client"
import React, { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import MessagesManager from "./messages/MessagesManager"
import Errors from "./errors/BackendErrors"
import ChatGreeting from "./chat/ChatGreeting"
import ChatInputForm from "./chat/ChatInputForm"
import { useChatState } from "../hooks/useChatState"
import useIsOnline from "../hooks/useOnline"
import { useChatInput } from "../hooks/useChatInput"
import { useSegmentChat } from "./context/SegmentChatContext"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const Chat = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const isOnline = useIsOnline()
  const chatCtx = useSegmentChat()
  const isChatOpen = chatCtx?.isChatOpen ?? false

  const {
    isPending,
    openErrorModal,
    setOpenErrorModal,
    errorCode,
    feedbackMessage,
    setFeedbackMessage,
    lastUserMessage,
    setLastMessage,
    retry,
    historyData,
    isStreaming,
    streamingContent,
    streamingModel,
    sendStreamingMessage,
  } = useChatState()

  const {
    form,
    recorder,
    handleChange,
    setModel,
    clearPrompt,
    handleFilesChange,
    setForm,
    formLoading,
    modelObj,
  } = useChatInput(setFeedbackMessage)

  // Inyectar el diagnóstico de performance cuando esté disponible
  useEffect(() => {
    if (chatCtx?.pendingDiagnostic) {
      const { file, prompt } = chatCtx.pendingDiagnostic
      // Establecer el archivo y el prompt directamente en el formulario
      setForm((prev) => ({
        ...prev,
        files: [file],
        prompt,
      }))
      chatCtx.clearPendingDiagnostic()
    }
  }, [chatCtx?.pendingDiagnostic])

  function isFormAvailable([...extraConditions]: boolean[]): boolean {
    const isFilesAvailable =
      !(!modelObj.supportsFiles && form.files.length > 0) ||
      modelObj.supportsFiles
    const weHavePrompt = form.prompt.trim().length > 0
    const readyToSend = !(isPending || isStreaming || formLoading)

    return (
      isFilesAvailable &&
      weHavePrompt &&
      extraConditions.every((v) => !!v) &&
      readyToSend
    )
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()

    if (!isOnline) {
      setFeedbackMessage("Comprueba tu conexión a internet")
      return
    }

    if (!formRef.current) return

    // Generar el FormData manualmente para garantizar datos consistentes
    const formData = new FormData(formRef.current)
    form.files.forEach((file) => formData.append("files", file))

    sendStreamingMessage(formData)

    setLastMessage({
      prompt: form.prompt,
      files: form.files,
      filesNames: form.files.map((file) => file.name),
    })

    handleFilesChange([])
    clearPrompt()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (isFormAvailable([])) {
        e.preventDefault()
        handleSubmit()
      } else {
        e.preventDefault()
      }
    }
  }

  return (
    <div
      style={{
        scrollbarColor: "#333 #77777722",
        overflowY: "scroll",
      }}
      className={cn(
        "fixed top-0 right-0 z-600 h-screen w-screen overflow-y-auto border-l border-neutral-200 bg-white p-2 sm:w-75 2xl:w-100 dark:border-neutral-800 dark:bg-black",
        "transition-transform duration-300 ease-in-out",
        isChatOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <section
        className={cn(
          `flex min-h-[calc(100vh_-_11rem)] w-full flex-1 flex-col items-center justify-start px-2`
        )}
      >
        <section className="sticky top-0 z-50 flex w-full items-center bg-neutral-50/50 backdrop-blur-sm sm:hidden dark:bg-neutral-950/50">
          <Button variant={"link"} onClick={() => chatCtx?.toggleChat()}>
            <ArrowLeft className="inline size-4" />
            Cerrar
          </Button>
        </section>
        <Errors
          code={errorCode}
          open={openErrorModal}
          setOpen={setOpenErrorModal}
          onRetry={() => retry(formRef)}
        />
        {lastUserMessage.prompt ? (
          <MessagesManager
            isPending={isPending}
            lastUserMessage={lastUserMessage}
            hasError={!!errorCode}
            onRetry={() => retry(formRef)}
            historyData={historyData}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            streamingModel={streamingModel}
          />
        ) : (
          <ChatGreeting />
        )}
      </section>

      <ChatInputForm
        isOnline={isOnline}
        historyData={historyData}
        formRef={formRef}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
        prompt={form.prompt}
        handleChange={handleChange}
        model={form.model}
        files={form.files}
        handleFilesChange={handleFilesChange}
        setModel={setModel}
        isPending={isPending}
        recorder={recorder}
        feedbackMessage={feedbackMessage}
        setFeedbackMessage={setFeedbackMessage}
        setForm={setForm}
        formLoading={formLoading}
        modelObj={modelObj}
        isFormAvailable={isFormAvailable}
        isStreaming={isStreaming}
        sendStreamingMessage={sendStreamingMessage}
      />
    </div>
  )
}

export default Chat
