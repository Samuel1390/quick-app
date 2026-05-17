"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import analize from "../server-functions/analize"
import { Monitor, Smartphone, ArrowRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { urlRegex } from "../constants"

export default function URLInput() {
  const [url, setUrl] = useState("")
  const router = useRouter()
  const [isValidURL, setIsValidURL] = useState<boolean | null>(null) // Solo validaremos al enviar el formulario, por lo que puede ser true incluso si la url no es valida, esto es con fines de darle feedback al usuario
  const [device, setDevice] = useState("desktop")
  const [inputOnFocus, setInputOnFocus] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url.trim()) {
      setIsValidURL(false)
      setFeedbackMessage("Por favor ingresa una URL")
      return
    } else if (!urlRegex.test(url)) {
      setIsValidURL(false)
      setFeedbackMessage("La URL ingresada no es válida")
      return
    }
    setFeedbackMessage("")
    setIsValidURL(true)
    router.push(`/dashboard?url=${url}&device=${device}`)
  }
  function focusClass() {
    if (inputOnFocus) {
      if (isValidURL === true || isValidURL === null) {
        return "border-ring ring-3 ring-ring/50"
      } else {
        return "border-ring ring-red-500/50 ring-3"
      }
    }
    return ""
  }
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackMessage("")
    setIsValidURL(true) // no es que sea realmente valido, si no que cambia el estado a true para que el input deje de estar en rojo
    setUrl(e.target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-lg grid-cols-1 gap-2 px-4"
    >
      <div
        className={`${focusClass()} relative flex rounded-md transition-all`}
      >
        <span className="absolute top-1/2 -left-46 -translate-y-1/2 text-right text-sm text-xsm text-destructive/70">
          {feedbackMessage}
        </span>
        <Input
          required
          placeholder="Ingresa tu url"
          className={`${isValidURL === false ? "border-red-300 bg-red-400/10 dark:border-red-800 dark:bg-red-800/40" : ""} flex w-full rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0`}
          value={url}
          onChange={inputOnChange}
          onFocus={() => setInputOnFocus(true)}
          onBlur={() => setInputOnFocus(false)}
        />
        <Button
          variant="default"
          onClick={() => {
            if (!url.trim()) {
              setIsValidURL(false)
              setFeedbackMessage("Por favor ingresa una URL")
              return
            }
          }}
          className={`${isValidURL === false ? "border-red-300 dark:border-red-800" : "border-neutral-400 dark:border-neutral-600"} focus-visible:ring-skry-400/50 rounded-l-none border`}
        >
          Analizar
          <ArrowRight className="ml-1/2 h-4 w-4" />
        </Button>
      </div>
      <div>
        <Select value={device} onValueChange={setDevice}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar dispositivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desktop">
              <span className="flex items-center gap-2 text-xsm">
                <Monitor size={10} />
                Escritorio
              </span>
            </SelectItem>
            <SelectItem value="mobile">
              <span className="flex items-center gap-2 text-xsm">
                <Smartphone size={10} />
                Móvil
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}
