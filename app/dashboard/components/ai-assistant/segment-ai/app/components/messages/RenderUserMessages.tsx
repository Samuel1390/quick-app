"use client"
import { RetryIcon } from "@/components/icons/pajamas-retry"
import { Ref } from "react"
import { LastUserMessage } from "../../hooks/useChatState"
import { FileIcon } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image"
import { getIcon } from "omni-file"

interface RenderUserMessageProps {
  userMessage: LastUserMessage
  failed?: boolean
  retry?: () => void
  ref?: Ref<HTMLDivElement>
}

const RenderUserMessage = ({
  userMessage,
  failed,
  retry,
  ref,
}: RenderUserMessageProps) => {
  return (
    <div className="mb-4 flex w-full flex-col items-end gap-1" ref={ref}>
      {/* CONTENEDOR PARA EL MENSAJE DEL USUARIO */}
      <div
        style={{
          scrollbarColor: "#aaa transparent",
        }}
        className={`mr-1 ml-auto max-h-40 w-fit max-w-[80%] overflow-y-auto rounded-lg bg-neutral-200 p-3 text-right text-neutral-950 shadow-md shadow-neutral-700/40 dark:bg-neutral-200 dark:text-neutral-800`}
      >
        <p className="mb-1 text-sm font-bold">Tú</p>
        <p className="text-md">{userMessage.prompt}</p>
      </div>
      {/*------- Contenido extra del mensaje -------- */}

      {/* CONTENEDOR PARA LOS ARCHIVOS ADJUNTOS */}
      <div className="flex flex-wrap justify-end gap-2">
        {userMessage.files &&
          userMessage.files.length > 0 &&
          userMessage.files.map((file, i) => (
            <HoverCard key={`${i}-${file.name}-${file.size}`}>
              <HoverCardTrigger>
                <div className="sm:text-md mt-1 flex cursor-pointer items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 sm:flex-row dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                  {getIcon(file.name) ? (
                    <Image
                      src={`/icons/${getIcon(file.name)}.svg`}
                      alt={file.name}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  ) : (
                    <FileIcon size={16} />
                  )}
                  <span className="">{userMessage.filesNames?.[i]}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <p>Ver contenido de {file.name}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
      </div>
      {/* si el mensaje fallo, se muestra un boton de reintentar */}
      {failed && retry && (
        <button
          type="button"
          onClick={retry}
          className="mt-1 flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/50"
        >
          <RetryIcon size={14} /> Reintentar
        </button>
      )}
    </div>
  )
}
export default RenderUserMessage
