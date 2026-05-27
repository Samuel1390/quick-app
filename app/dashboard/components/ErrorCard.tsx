"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  XCircle,
  RefreshCw,
  Monitor,
  Smartphone,
} from "lucide-react"

type ErrorReason = "invalid-url" | "invalid-device" | "both"

interface ErrorCardProps {
  reason: ErrorReason
  currentUrl?: string
  currentDevice?: string
}

export function ErrorCard({
  reason,
  currentUrl = "",
  currentDevice = "desktop",
}: ErrorCardProps) {
  const router = useRouter()
  const [url, setUrl] = useState(currentUrl)
  const [device, setDevice] = useState(currentDevice)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getMessage = () => {
    switch (reason) {
      case "invalid-url":
        return "La URL proporcionada no es válida. Asegúrate de ingresar la ruta correcta."
      case "invalid-device":
        return "El dispositivo seleccionado no es válido. Solo se permiten 'desktop' o 'mobile'."
      case "both":
        return "La URL y el dispositivo no son válidos. Corrige ambos campos para continuar."
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Validación básica
    const isValidUrl =
      url.trim() !== "" &&
      (url.startsWith("http://") || url.startsWith("https://"))
    const isValidDevice = device === "desktop" || device === "mobile"
    if (!isValidUrl || !isValidDevice) {
      // Si sigue siendo inválido, recargamos la página con los valores actuales para que se evalúe de nuevo
      // (o podrías mostrar un toast, pero para simplificar redirigimos con los parámetros)
      const params = new URLSearchParams()
      if (isValidUrl) params.set("url", url)
      if (isValidDevice) params.set("device", device)
      router.push(`/dashboard?${params.toString()}`)
    } else {
      router.push(`/dashboard?url=${encodeURIComponent(url)}&device=${device}`)
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="border-red-500/50 bg-gradient-to-br from-red-950/80 via-red-900/60 to-red-950/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-200">
          <AlertCircle className="h-5 w-5 text-red-300" />
          <span>No se pudo analizar la página</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 rounded-md bg-red-950/50 p-3 text-sm text-red-100">
          <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-300" />
          <p>{getMessage()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="error-url" className="text-red-200">
              URL *
            </Label>
            <Input
              id="error-url"
              type="url"
              placeholder="https://ejemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-red-500/30 bg-black/30 text-white placeholder:text-red-300/50 focus-visible:ring-red-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="error-device" className="text-red-200">
              Dispositivo
            </Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger className="border-red-500/30 bg-black/30 text-white">
                <SelectValue placeholder="Selecciona dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">
                  <Monitor /> Escritorio
                </SelectItem>
                <SelectItem value="mobile">
                  <Smartphone /> Móvil
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant={"default"}
            className="w-full gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isSubmitting ? "animate-spin" : ""}`}
            />
            {isSubmitting ? "Reintentando..." : "Reintentar análisis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
