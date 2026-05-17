import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone } from "lucide-react"
import URLInput from "../../components/URLInput"
import { cn } from "@/lib/utils"

type Props = {
  url: string | undefined | null
  device: string | undefined | null
}

export default function CannotAnalizePage({ url, device }: Props) {
  return (
    <>
      <Card
        className={cn(
          "mx-3 bg-linear-to-b from-destructive/30",
          "via-destructive/10 to-destructive/5",
          "md:mx-4",
          "dark:bg-linear-to-b dark:from-destructive/30 dark:via-destructive/10 dark:to-destructive/5"
        )}
      >
        <CardHeader>
          <CardTitle>Error: No es posible analizar la página</CardTitle>
        </CardHeader>
        <CardContent>
          {!url && !device && (
            <p>
              No se ha proporcionado una URL ni un dispositivo para analizar.
              Por favor, proporciona una URL y un dispositivo para analizar.
            </p>
          )}
          {url && !device && (
            <p>
              No se ha proporcionado un dispositivo para analizar la URL: {url}
              Por favor, proporciona un dispositivo para analizar la URL.
            </p>
          )}
          {!url && device && (
            <p>No se ha proporcionado una URL para analizar.</p>
          )}
        </CardContent>
      </Card>
      <URLInput />
    </>
  )
}
