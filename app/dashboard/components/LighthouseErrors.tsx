import React from "react"
import { type RuntimeError } from "../../server-functions/types"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import {
  Ghost,
  Frown,
  CircleX,
  TriangleAlert,
  CheckCircle,
  Timer,
} from "lucide-react"

type LighthouseErrors = {
  [key: string]: {
    code: number
    message: string
    icon?: React.JSX.Element
  }
}

const lighthouseErrors: LighthouseErrors = {
  NO_ERROR: {
    code: 0,
    message: "Todo ha salido bien.",
    icon: <CheckCircle className="text-green-400" />,
  },
  UNKNOWN_ERROR: {
    code: 1,
    message:
      "Error inesperado: Algún error desconocido ocurrió, probablemente una excepción de JavaScript.",
    icon: <Ghost />,
  },
  NO_SPEEDLINE_FRAMES: {
    code: 2,
    message: "No se encontraron imágenes del paso de carga.",
    icon: <Ghost />,
  },
  SPEEDINDEX_OF_ZERO: {
    code: 3,
    message: "No hubo cambios visuales entre el inicio y el final de la carga.",
    icon: <Ghost />,
  },
  NO_SCREENSHOTS: {
    code: 4,
    message: "El rastro (trace) no contiene eventos de captura de pantalla.",
    icon: <Ghost />,
  },
  INVALID_SPEEDLINE: {
    code: 5,
    message: "Los resultados calculados de Speed Index no son finitos.",
    icon: <CircleX />,
  },
  NO_TRACING_STARTED: {
    code: 6,
    message:
      "El rastro no contiene el evento de inicio (TracingStartedInPage).",
    icon: <CircleX />,
  },
  NO_NAVSTART: {
    code: 7,
    message: "El rastro no contiene el evento navigationStart.",
    icon: <CircleX />,
  },
  NO_FCP: {
    code: 8,
    message: "El rastro no contiene el evento First Contentful Paint (FCP).",
    icon: <CircleX />,
  },
  NO_DCL: {
    code: 9,
    message: "El rastro no contiene el evento domContentLoaded (DCL).",
    icon: <CircleX />,
  },
  NO_DOCUMENT_REQUEST: {
    code: 10,
    message:
      "No se pudo identificar ninguna solicitud de red como el documento HTML principal.",
    icon: <CircleX />,
  },
  FAILED_DOCUMENT_REQUEST: {
    code: 11,
    message:
      "La solicitud del documento HTML falló por razones internas de Chrome (cancelada, bloqueada, etc.).",
    icon: <CircleX />,
  },
  ERRORED_DOCUMENT_REQUEST: {
    code: 12,
    message:
      "La solicitud del documento se completó, pero devolvió un código de estado HTTP 4xx o 5xx.",
    icon: <CircleX />,
  },
  TRACING_ALREADY_STARTED: {
    code: 13,
    message:
      "El controlador de rastro de Chromium no pudo iniciar; generalmente se soluciona reiniciando Chromium.",
    icon: <TriangleAlert className="text-yellow-500" />,
  },
  PARSING_PROBLEM: {
    code: 14,
    message:
      "Los datos del rastro (trace data) no se analizaron correctamente.",
    icon: <TriangleAlert className="text-yellow-500" />,
  },
  READ_FAILED: {
    code: 15,
    message: "Fallo al transmitir los datos del rastro a través del protocolo.",
    icon: <CircleX />,
  },
  INSECURE_DOCUMENT_REQUEST: {
    code: 16,
    message: "Error de seguridad que impidió la carga de la página.",
    icon: <CircleX />,
  },
  PROTOCOL_TIMEOUT: {
    code: 17,
    message: "Se agotó el tiempo de espera del comando del protocolo.",
    icon: <Timer />,
  },
  PAGE_HUNG: {
    code: 18,
    message:
      "La página dejó de responder después del tiempo máximo de espera de carga.",
    icon: <CircleX />,
  },
  DNS_FAILURE: {
    code: 19,
    message:
      "Fallo de DNS en el documento principal (sin resolución o tiempo agotado).",
    icon: <CircleX />,
  },
  CRI_TIMEOUT: {
    code: 20,
    message:
      "Tiempo de espera agotado en la conexión inicial con el protocolo del depurador.",
    icon: <Timer />,
  },
  NOT_HTML: {
    code: 21,
    message: "La página solicitada no es un documento HTML.",
    icon: <CircleX />,
  },
  NO_RESOURCE_REQUEST: {
    code: 22,
    message:
      "El rastro no contiene ningún evento de solicitud de recursos (ResourceSendRequest).",
    icon: <CircleX />,
  },
  INVALID_URL: {
    code: 400,
    message: "URL inválida. Verifica la URL ingresada.",
    icon: <CircleX />,
  },
  RATE_LIMITED: {
    code: 429,
    message:
      "Lo sentimos, hubo un error interno en el servidor, intentalo más tarde.",
    icon: <Frown />,
  },
}
export default function LighthouseError({
  runtimeError,
}: {
  runtimeError: RuntimeError
}) {
  const errorMessage = lighthouseErrors[runtimeError.code]
  if (!errorMessage) {
    console.warn(
      `El error de lighthouse ${runtimeError.code} no coincide con ningun error conocido`
    )
    return (
      <Card className="mx-30 border-destructive/20 bg-destructive/5">
        <CardHeader>
          <div>{lighthouseErrors.UNKNOWN_ERROR.icon}</div>
          <CardTitle>Error al analizar la URL</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {lighthouseErrors.UNKNOWN_ERROR.message}
          </CardDescription>
        </CardContent>
      </Card>
    )
  } else if (errorMessage.code === 0) {
    return null
  }
  return (
    <Card className="mx-5 border-destructive/20 bg-destructive/5 text-center sm:mx-10">
      <CardHeader>
        <div className="mx-auto">
          {errorMessage?.icon ? (
            React.cloneElement(errorMessage.icon, {
              size: 40,
              className: "text-destructive",
            })
          ) : (
            <Frown />
          )}
        </div>
        <CardTitle className="text-xl">Error al analizar la URL</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{errorMessage.message}</CardDescription>
      </CardContent>
    </Card>
  )
}
