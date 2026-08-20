import { useEffect, useState } from "react"

export function useScrollActive(ids: readonly string[]) {
  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const onScroll = () => {
      const soon = window.innerHeight * 0.42
      let current = ""
      let next = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= soon) current = id
        else if (!next && top < window.innerHeight - 48) next = id
      }
      setActive([current, next].filter(Boolean))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}

export function useScrollCurrent(ids: readonly string[]) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => {
      const marker = Math.min(170, window.innerHeight * 0.22)
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= marker) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}

export { SECTION_IDS } from "../toc"
