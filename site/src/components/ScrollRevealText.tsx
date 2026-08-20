import { useEffect, useRef } from "react"
import { runwayProgress } from "../runway"

type Props = {
  text: string
  runwayId: string
}

export function ScrollRevealText({ text, runwayId }: Props) {
  const rootRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const runway = document.getElementById(runwayId)
    if (!root || !runway) return
    const chars = [...root.querySelectorAll("span")]

    let raf = 0
    const tick = () => {
      const p = runwayProgress(runway)
      const n = chars.length
      chars.forEach((el, i) => {
        const local = Math.min(1, Math.max(0, p * (n + 6) - i))
        el.style.opacity = String(0.08 + local * 0.92)
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [runwayId, text])

  return (
    <p
      ref={rootRef}
      className="text-black mb-5 sm:mb-6 whitespace-pre-wrap"
      style={{
        fontSize: "clamp(18px, 4vw, 26px)",
        lineHeight: 1.35,
        fontWeight: 400,
        minHeight: 90,
      }}
    >
      {[...text].map((ch, i) => (
        <span key={i} style={{ opacity: 0.08 }}>
          {ch}
        </span>
      ))}
    </p>
  )
}
