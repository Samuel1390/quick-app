import React, { RefObject } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import type { Models } from "../../constants"
import ModelsSelect from "./ModelsSelect"
import Microphone from "../Microphone"
import { ModelHashes } from "../../constants"
import type { HistoryData } from "../../hooks/useChatState"
import LoadFilesButton from "./LoadFilesButton"
import SendButton from "./SendButton"
import Attachments from "./Attachments"

type ChatInputFormProps = {
  formRef: RefObject<HTMLFormElement | null>
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  prompt: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  model: ModelHashes
  setModel: (model: ModelHashes) => void
  isPending: boolean
  recorder: any
  feedbackMessage?: string
  setFeedbackMessage: (message: string) => void
  files: File[]
  handleFilesChange: (files: File[]) => void
  historyData: HistoryData[]
  setForm: (form: any) => void
  formLoading: boolean
  modelObj: Models[number]
  setModelObj: (modelObj: Models[number]) => void
  isFormAvailable: (extracontitions: boolean[]) => boolean
  isOnline: boolean
  isStreaming: boolean
  sendStreamingMessage: (formData: FormData) => Promise<void>
}

export default function ChatInputForm({
  formRef,
  handleSubmit,
  handleKeyDown,
  prompt,
  handleChange,
  model,
  setModel,
  feedbackMessage,
  setFeedbackMessage,
  recorder,
  handleFilesChange,
  files,
  historyData,
  setForm,
  formLoading,
  modelObj,
}: ChatInputFormProps) {
  return (
    <form
      ref={formRef as any}
      onSubmit={handleSubmit}
      className={cn(
        "w-[calc(100%_-_0.95rem)] shadow-[0_-10px_40px_#fff] dark:shadow-[0_-10px_40px_#000]",
        "max-w-[780px] rounded-lg",
        "absolute bg-neutral-50 dark:bg-neutral-900",
        "lg:px-3/2 bottom-4.5 z-50 px-1 text-sm"
      )}
    >
      <div className="absolute bottom-full">
        <Attachments files={files} setForm={setForm} modelObj={modelObj} />
        {feedbackMessage && (
          <p className="h-fit text-sm text-amber-600 dark:text-amber-400">
            {feedbackMessage}
          </p>
        )}
      </div>
      <Textarea
        value={prompt}
        onChange={handleChange}
        name={"prompt"}
        className="max-h-24 min-h-12 w-full overflow-y-auto text-sm"
        onKeyDown={handleKeyDown}
        placeholder="Pregunta a Segment"
      />
      <input
        hidden
        name="historyData"
        onChange={() => {}}
        value={JSON.stringify(historyData)}
      />
      <div className="flex h-7 w-full items-center justify-between px-1 py-7">
        <div className="flex items-center gap-1">
          <ModelsSelect model={model} setModel={setModel} modelObj={modelObj} />
          <LoadFilesButton
            files={files}
            handleFilesChange={handleFilesChange}
            modelObj={modelObj}
            model={model}
            setFeedbackMessage={setFeedbackMessage}
          />
        </div>
        <div className="max-sm:gap-1/2 flex items-center gap-1 max-sm:scale-90">
          <Microphone
            setFeedbackMessage={setFeedbackMessage}
            recorder={recorder}
          />
          <SendButton
            formLoading={formLoading}
            isFormAvailable={() => true} // Pasado por prop original si lo necesitas
            isStreaming={false}
          />
        </div>
        <h3
          className={cn(
            "absolute -bottom-5 left-1/2 -translate-x-1/2 text-[0.8rem] text-nowrap text-neutral-500 max-[250px]:text-[0.6rem] dark:text-neutral-400",
            "z-40 rounded-md bg-white/50 px-1 backdrop-blur-sm dark:bg-black/50"
          )}
        >
          Segment es una IA, puede cometer errores.
        </h3>
      </div>
    </form>
  )
}
