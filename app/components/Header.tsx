"use client"
import React from "react"
import Logo from "./Logo"
import MagneticWrapper from "./MagneticWrapper"

const Header = () => {
  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between p-4">
      <MagneticWrapper borderRadius={14}>
        <Logo showLabel />
      </MagneticWrapper>
    </header>
  )
}

export default Header
