"use client"
import Starfield from "@/components/ui/starfield"
import AnimatedRing from "./components/AnimatedRing"
import URLInput from "./components/URLInput"
import Footer from "./components/Footer"
import Header from "./components/Header"
export default function Page() {
  return (
    <>
      <Starfield />
      <AnimatedRing />
      <Header />
      <main className="relative z-30 flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold lg:text-4xl">Quick-app</h1>
        <p className="max-w-md px-4 text-center text-[0.7rem] text-muted-foreground sm:text-sm">
          Mide el rendimiento de cualquier sitio web. Solo ingresa la url y
          obtendrás un diagnóstico detallado acerca de su rendimiento, la
          velocidad de carga y otros aspectos clave.
        </p>
        <URLInput />
      </main>
      <Footer />
    </>
  )
}
