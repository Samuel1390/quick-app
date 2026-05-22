"use client"
import Starfield from "@/components/ui/starfield"
import AnimatedRing from "./components/AnimatedRing"
import URLInput from "./components/URLInput"
import Footer from "./components/Footer"
export default function Page() {
  return (
    <>
      <Starfield />
      <AnimatedRing />
      <main className="relative z-30 flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold lg:text-4xl">Quick app</h1>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Mide el rendimiento de cualquier sitio web. Solo ingresa la url y
          obtendrás datos para mejorar el tiempo de carga con precisión
          quirúrgica.
        </p>
        <URLInput />
      </main>
      <Footer />
    </>
  )
}
