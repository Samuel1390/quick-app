"use client"
import MagneticWrapper from "./MagneticWrapper"
import { BrandGithubFilledIcon } from "@/components/icons/tabler-brand-github-filled"
import React from "react"
import Link from "next/link"

const Footer = () => {
  return (
    // Reemplazamos w-screen por max-w-full e insertamos pointer-events-none
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 flex justify-center p-4">
      {/* Restauramos los pointer-events solo para el elemento magnético */}
      <div className="pointer-events-auto">
        <MagneticWrapper borderRadius={50}>
          <Link
            href="https://github.com/Samuel1390"
            target="_blank"
            className="transition-opacity hover:opacity-80"
          >
            <BrandGithubFilledIcon
              className="fill-white stroke-none"
              size={32}
            />
          </Link>
        </MagneticWrapper>
      </div>
    </footer>
  )
}

export default Footer
