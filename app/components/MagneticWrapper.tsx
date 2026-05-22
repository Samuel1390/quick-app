"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect } from "react"

interface MagneticWrapperProps {
  children: React.ReactNode
  range?: number // Distancia máxima en píxeles para activar el magnetismo
  strength?: number // Qué tanto se estira hacia el cursor (ej: 0.35 = 35% del camino)
  borderRadius?: number // Radio de borde para el contenedor
}

export default function MagneticWrapper({
  children,
  range = 100,
  strength = 0.35,
  borderRadius = 0,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Valores de movimiento con físicas de resorte para un desplazamiento fluido
  const x = useSpring(0, { stiffness: 60, damping: 15 })
  const y = useSpring(0, { stiffness: 60, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      // Obtener las coordenadas del centro del elemento
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calcular la distancia delta entre el cursor y el centro
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Teorema de Pitágoras para la distancia absoluta
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < range) {
        // Si está dentro del rango, se mueve una fracción de la distancia total hacia el cursor
        x.set(deltaX * strength)
        y.set(deltaY * strength)
      } else {
        // Si sale del rango, regresa suavemente al centro original
        x.set(0)
        y.set(0)
      }
    }

    const handleMouseLeave = () => {
      // Forzar el regreso al centro si el cursor sale abruptamente de la ventana o área
      x.set(0)
      y.set(0)
    }

    window.addEventListener("mousemove", handleMouseMove)
    ref.current?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ref.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [range, strength, x, y])
  return (
    <motion.div ref={ref} style={{ x, y }} className="will-change-transform">
      <div
        style={{ borderRadius: `${borderRadius}px` }}
        className="border border-ring p-3"
      >
        {children}
      </div>
    </motion.div>
  )
}
