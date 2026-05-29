"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSegmentChat } from "@/app/dashboard/components/ai-assistant/segment-ai/app/components/context/SegmentChatContext"
import { BotMessageSquare } from "lucide-react"
import React from "react"

export function SiteHeader({ children }: { children: React.JSX.Element }) {
  const chatCtx = useSegmentChat()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background text-primary transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:sticky md:top-0 md:z-500">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <section className="flex-1 text-base font-medium">{children}</section>

        {/* Botón toggle del chat de Segment AI */}
        {chatCtx && (
          <Button
            variant={chatCtx.isChatOpen ? "default" : "outline"}
            size="sm"
            onClick={chatCtx.toggleChat}
            className="ml-auto flex items-center gap-2 transition-all duration-200"
            title={
              chatCtx.isChatOpen ? "Cerrar Segment AI" : "Abrir Segment AI"
            }
          >
            <BotMessageSquare className="size-4" />
            <span className="hidden sm:inline">Segment AI</span>
            {/* Indicador de diagnóstico listo */}
            {chatCtx.pendingDiagnostic && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  )
}
