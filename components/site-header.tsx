import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"
export function SiteHeader({ children }: { children: React.JSX.Element }) {
  return (
    <header className="sticky top-0 z-500 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background text-primary transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <section className="text-base font-medium">{children}</section>
      </div>
    </header>
  )
}
