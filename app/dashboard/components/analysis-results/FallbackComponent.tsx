'use client"'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Monitor, Smartphone, Loader2 } from "lucide-react"

function FallbackComponent({ url, device }: { url: string; device: string }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 scale-150 animate-spin" />
              <span>
                Analizando la pagina{" "}
                <a href={url} className="text-sky-400 underline">
                  {url}
                </a>{" "}
                para{" "}
                {device === "desktop" ? (
                  <Badge variant={"outline"} className="text-sm">
                    <Monitor className="inline h-4 w-4" />
                    Escritorio
                  </Badge>
                ) : (
                  <Badge variant={"outline"} className="text-sm">
                    <Smartphone className="inline h-4 w-4" />
                    Móvil
                  </Badge>
                )}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="animate-pulse text-muted-foreground">
          <p>Relájate mientras analizamos la pagina...</p>
        </CardContent>
      </Card>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    </div>
  )
}
export default FallbackComponent
