import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Quick-App",
  authors: [
    { name: "Samuel Nelo", url: "https://samuel-nelo-portfolio.vercel.app" },
  ],
  creator: "Samuel Nelo",
  publisher: "Samuel Nelo",
  description:
    "Mide el rendimiento de cualquier sitio web. Solo ingresa la url y obtendrás un diagnóstico detallado acerca de su rendimiento, la velocidad de carga y otros aspectos clave.",
  keywords: [
    "quick-app",
    "rendimiento",
    "velocidad de carga",
    "lighthouse",
    "SEO",
    "Accesibilidad",
    "Mejores practicas",
    "performance",
    "analizar sitios web",
    "mejorar rendimiento de sitios web",
  ],
  openGraph: {
    title: "Quick-App",
    description:
      "Mide el rendimiento de cualquier sitio web. Solo ingresa la url y obtendrás un diagnóstico detallado acerca de su rendimiento, la velocidad de carga y otros aspectos clave.",
    siteName: "Quick-App",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        "dark"
      )}
    >
      <body>{children}</body>
    </html>
  )
}
