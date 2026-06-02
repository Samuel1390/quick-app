import { Suspense } from "react"
import DashboardContent from "./components/DashboardLayout"
import Chat from "./components/ai-assistant/segment-ai/app/components/Chat"

// ── Página principal exportada ────────────────────────────────────────────────
export default function Page() {
  return (
    // El límite de suspensión protege al compilador de Node.js de la falta de contexto del Router
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 text-neutral-400">
          Cargando entorno...
        </div>
      }
    >
      <DashboardContent>
        <Chat />
      </DashboardContent>
    </Suspense>
  )
}
