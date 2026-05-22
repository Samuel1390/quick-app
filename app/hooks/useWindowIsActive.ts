import { useState, useEffect } from "react"

export function useWindowIsActive() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return { isActive, setIsActive }
}
export default useWindowIsActive
