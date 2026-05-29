import Logo from "../Logo"
import { cn } from "@/lib/utils"

export default function ChatGreeting() {
  return (
    <div
      className={cn(
        "flex h-fit flex-col text-center",
        "items-center justify-center"
      )}
    >
      <Logo size={60} className="mt-15" />
      <p
        className={cn(
          "lg:text-lg",
          "md:text-md",
          "text-neutral-700",
          "dark:text-neutral-300",
          "font-bold"
        )}
      >
        ¡Comencemos a optimizar tu sitio web!
      </p>
      <p className="mt-10 max-w-100 text-[0.8rem] text-neutral-600 dark:text-neutral-400">
        Segment es un asistente de IA especializado que te ayudará a optimizar
        el rendimiento de tu aplicación
      </p>
    </div>
  )
}
