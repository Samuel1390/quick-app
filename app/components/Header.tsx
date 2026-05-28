"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from "./Logo"
import MagneticWrapper from "./MagneticWrapper"
import Link from "next/link"
import { docsSections } from "../dashboard/sections"
const Header = () => {
  const docsPath = "./dashboard?page="
  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between p-4">
      <div>
        <MagneticWrapper borderRadius={14}>
          <Logo className="p-1" showLabel />
        </MagneticWrapper>
      </div>
      <section className="pointer-events-auto flex items-center gap-4">
        <MagneticWrapper range={120} strength={0.2} borderRadius={12}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"link"} className="text-sm md:text-[1.2rem]">
                Más acerca de rendimiento
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-70">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Documentos</DropdownMenuLabel>
                {docsSections.map((section) => (
                  <Button
                    key={section.slug}
                    variant={"ghost"}
                    className="w-full min-w-0 justify-start p-1 md:p-2"
                  >
                    <Link
                      className="block w-full max-w-[200px] p-0"
                      href={docsPath + section.slug}
                    >
                      <span className="block truncate text-start">
                        {section.title}
                      </span>
                    </Link>
                  </Button>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </MagneticWrapper>
      </section>
    </header>
  )
}

export default Header
