"use client"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { DocsSection } from "@/app/dashboard/sections"

export function NavMain({
  selectedSection,
  setSelectedSection,
  items,
}: {
  items: DocsSection[]
  selectedSection: any
  setSelectedSection: any
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenuItem className="px-3 text-muted-foreground">
          Documentos
        </SidebarMenuItem>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="p-0"
                tooltip={item.title}
                onClick={() => setSelectedSection(item)}
                asChild
              >
                <Button
                  className={`w-full justify-start truncate px-2 ${selectedSection && selectedSection.slug === item.slug ? "hover:bg-primary hover:text-background" : ""}`}
                  variant={
                    selectedSection && selectedSection.slug === item.slug
                      ? "default"
                      : "ghost"
                  }
                >
                  {item.icon}
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
