"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export default function CursorFollower() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Capa 1: Aro Grande (Rápido, reactivo, ligero)
  const springLargeX = useSpring(mouseX, { stiffness: 120, damping: 25 })
  const springLargeY = useSpring(mouseY, { stiffness: 120, damping: 25 })

  // Capa 2: Aro Mediano (Más pesado, empieza a arrastrarse)
  const springMediumX = useSpring(mouseX, { stiffness: 70, damping: 20 })
  const springMediumY = useSpring(mouseY, { stiffness: 70, damping: 20 })

  // Capa 3: Aro Pequeño (Muy pesado, con mucha inercia, llega el último)
  const springSmallX = useSpring(mouseX, { stiffness: 40, damping: 15 })
  const springSmallY = useSpring(mouseY, { stiffness: 40, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Agrupamos las configuraciones para renderizarlas en un bucle limpio
  const layers = [
    { size: 80, x: springLargeX, y: springLargeY }, // Grande
    { size: 50, x: springMediumX, y: springMediumY }, // Mediano
    { size: 20, x: springSmallX, y: springSmallY }, // Pequeño
  ]

  return (
    <div className="pointer-events-none fixed inset-0 z-100">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#ffffff66] will-change-transform"
          style={{
            left: layer.x,
            top: layer.y,
            width: layer.size,
            height: layer.size,
            x: "-50%",
            y: "-50%",
          }}
        />
      ))}
    </div>
  )
}
