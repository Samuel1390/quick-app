import { useState, useEffect, useRef } from "react"

interface WindowSize {
  width: number | undefined
  height: number | undefined
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
  })

  // useRef guarda el ID de la animación para poder cancelarla si el componente se desmonta rápido
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      // Si ya hay una actualización programada, la cancelamos para no acumular ejecuciones
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      // Programamos la actualización para el próximo ciclo de renderizado del navegador
      animationFrameId.current = requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      })
    }

    window.addEventListener("resize", handleResize)

    // Ejecución inicial por si acaso
    handleResize()

    // Limpieza de eventos y animaciones pendientes al desmontar
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return windowSize
}
