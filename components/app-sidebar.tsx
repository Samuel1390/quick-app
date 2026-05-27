"use client"
import * as React from "react"
import { NavMain } from "@/components/nav-main"
import Logo from "@/app/components/Logo"
import { LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { DocsSection } from "@/app/dashboard/sections"
import Link from "next/link"

export function AppSidebar({
  selectedSection,
  setSelectedSection,
  docs,
  ...props
}: {
  selectedSection: any
  setSelectedSection: any
  docs: DocsSection[]
  props?: React.ComponentProps<typeof Sidebar>
}) {
  const [dashBoardSelected, setDashBoardSelected] = useState(true)
  useEffect(() => {
    setDashBoardSelected(!selectedSection)
  }, [selectedSection])
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="">
              <Link href="./" className="!min-h-10">
                <Logo showLabel />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="mt-3 py-5 hover:cursor-pointer data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Button
                variant={dashBoardSelected ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedSection(null)}
              >
                <LayoutDashboard size={56} className="size-[56px]" />
                <span className="ml-2 truncate text-xl font-semibold">
                  Resultados del análisis
                </span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          items={docs}
        />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
