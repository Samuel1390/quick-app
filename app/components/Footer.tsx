"use client"
import MagneticWrapper from "./MagneticWrapper"
import { BrandGithubFilledIcon } from "@/components/icons/tabler-brand-github-filled"
import { CircleQuestionMark } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const RANGE = 80

const Footer = () => {
  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 flex justify-between p-4">
      <div className="pointer-events-auto">
        <MagneticWrapper borderRadius={50} range={RANGE}>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link
                href="https://github.com/Samuel1390"
                target="_blank"
                className="group block rounded-full opacity-80 transition-opacity hover:opacity-100"
              >
                <CircleQuestionMark size={38} />
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit max-w-70 p-2">
              <div className="">
                <h2 className="my-4 text-lg font-bold text-pretty">
                  ¿Qué es Quick-app y cómo funciona?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Quick-app es una aplicación que mide el rendimiento de las
                  aplicaciones web, proporcionando información detallada y
                  consejos para mejorar su performance, de esta manera tus
                  aplicaciones web serán más rápidas y eficientes, reteniendo
                  más usuarios. Solo debes ingresar la URL de tu sitio web,
                  seleccionar un dispositivo y Quick-app hará el resto.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </MagneticWrapper>
      </div>
      <div className="flex items-center gap-10">
        <div className="pointer-events-auto">
          <MagneticWrapper borderRadius={50} range={RANGE}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href="https://github.com/Samuel1390"
                  target="_blank"
                  className="group block rounded-full bg-gray-950 p-[6px] transition-colors hover:bg-white"
                >
                  <BrandGithubFilledIcon
                    className="size-[26px] fill-white stroke-none group-hover:fill-gray-950"
                    size={26}
                  />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit p-2">
                Repositorio de Github
              </HoverCardContent>
            </HoverCard>
          </MagneticWrapper>
        </div>

        <div className="pointer-events-auto">
          <MagneticWrapper borderRadius={50} range={RANGE}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href="https://github.com/Samuel1390"
                  target="_blank"
                  className="group block rounded-full opacity-80 transition-opacity hover:opacity-100"
                >
                  <Image
                    alt="Avatar de Github de Samuel Nelo, desarrollador del proyecto"
                    src={
                      "https://avatars.githubusercontent.com/u/195463641?v=4"
                    }
                    width={38}
                    height={38}
                    className="rounded-full"
                  />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit max-w-100 p-2">
                <div className="flex items-center gap-2">
                  <Image
                    alt="Avatar de Github de Samuel Nelo, desarrollador del proyecto"
                    src={
                      "https://avatars.githubusercontent.com/u/195463641?v=4"
                    }
                    width={95}
                    height={95}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-md font-semibold">Samuel Nelo</h2>
                    <p className="text-sm text-muted-foreground">
                      Portfolio de Samuel Nelo, desarrollador del proyecto.
                      ¡Explora y descubre más sobre mi trabajo!
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </MagneticWrapper>
        </div>
      </div>
    </footer>
  )
}

export default Footer
