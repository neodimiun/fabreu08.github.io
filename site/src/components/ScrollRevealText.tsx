import { useEffect, useRef } from "react"
import { runwayProgress } from "../runway"

type Props = {
  text: string
  runwayId: string
  startAt?: number
}

export function ScrollRevealText({ text, runwayId, startAt = 0.5 }: Props) {
  const visibleRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const visible = visibleRef.current
    const cursor = cursorRef.current
    const runway = document.getElementById(runwayId)
    if (!visible || !cursor || !runway) return

    let raf = 0
    let intersecting = true
    const denom = Math.max(1e-6, 1 - startAt)

    const tick = () => {
      if (!intersecting) {
        raf = 0
        return
      }
      const p = runwayProgress(runway)
      const t = Math.min(1, Math.max(0, (p - startAt) / denom))
      const count = Math.min(text.length, Math.max(0, Math.round(t * text.length)))
      visible.textContent = text.slice(0, count)
      cursor.style.display = count >= text.length ? "none" : "inline-block"
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = !!entry?.isIntersecting
        if (intersecting) start()
        else if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0.05 },
    )
    io.observe(runway)
    start()

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [runwayId, text, startAt])

  return (
    <p
      className="text-black mb-5 sm:mb-6"
      style={{
        fontSize: "clamp(18px, 4vw, 26px)",
        lineHeight: 1.35,
        fontWeight: 400,
        minHeight: "6.2em",
      }}
    >
      <span ref={visibleRef} />
      <span
        ref={cursorRef}
        className="cursor-blink inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
        aria-hidden
      />
    </p>
  )
}
