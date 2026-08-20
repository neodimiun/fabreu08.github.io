import { useEffect, useState } from "react"

export function useScrollCurrent(ids: readonly string[], offset = 170) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => {
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [ids, offset])

  return active
}

export const SECTION_IDS = ["path", "lab", "credentials", "contact"] as const
