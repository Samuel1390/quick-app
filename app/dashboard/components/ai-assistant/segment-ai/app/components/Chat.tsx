"use client"
import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import MessagesManager from "./messages/MessagesManager"
import Errors from "./errors/BackendErrors"
import ChatGreeting from "./chat/ChatGreeting"
import ChatInputForm from "./chat/ChatInputForm"
import { useChatState } from "../hooks/useChatState"
import useIsOnline from "../hooks/useOnline"
import { useChatInput } from "../hooks/useChatInput"

const Chat = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const isOnline = useIsOnline()

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
    setModelObj,
  } = useChatInput(setFeedbackMessage)

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
        handleSubmit() // Delegamos directamente al submit
      } else {
        e.preventDefault()
      }
    }
  }

  return (
    <div className="fixed top-0 right-0 z-600 h-screen max-w-75 overflow-y-auto border-r border-l border-neutral-950 bg-white p-2 dark:border-neutral-50 dark:bg-black">
      <section
        className={cn(
          `flex min-h-[calc(100vh_-_10.5rem)] w-full flex-1 flex-col items-center justify-start px-2`
        )}
      >
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
        setModelObj={setModelObj}
        isFormAvailable={isFormAvailable}
        isStreaming={isStreaming}
        sendStreamingMessage={sendStreamingMessage}
      />
    </div>
  )
}

export default Chat
