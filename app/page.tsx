import URLInput from "./components/URLInput"
export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold lg:text-4xl">Quick app</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Mide el rendimiento de cualquier sitio web. Solo ingresa la url y
        obtendrás datos para mejorar el tiempo de carga con precisión
        quirúrgica.
      </p>
      <URLInput />
    </main>
  )
}
