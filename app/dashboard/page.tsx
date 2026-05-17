import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import FallbackComponent from "./components/FallbackComponent"
import PerformanceData from "./components/PerformanceData"
import { Suspense } from "react"
import CannotAnalizePage from "./components/CannotAnalizePage"
import { Loader2 } from "lucide-react"

type Props = {
  searchParams: Promise<{ url?: string; device?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { url, device: rawDevice } = await searchParams
  const device = rawDevice || "desktop"
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TooltipProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {url ? (
                  <Suspense
                    fallback={<FallbackComponent url={url} device={device} />}
                  >
                    <PerformanceData
                      searchParams={{
                        url,
                        device,
                      }}
                    />
                  </Suspense>
                ) : (
                  <Suspense
                    fallback={
                      <div className="flex justify-center p-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    }
                  >
                    <CannotAnalizePage url={url} device={device} />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}
