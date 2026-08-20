import { useEffect, useRef } from "react"
import { runwayProgress } from "../runway"

type Props = {
  text: string
  runwayId: string
}

export function ScrollRevealText({ text, runwayId }: Props) {
  const visibleRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const visible = visibleRef.current
    const cursor = cursorRef.current
    const runway = document.getElementById(runwayId)
    if (!visible || !cursor || !runway) return

    let raf = 0
    const tick = () => {
      const p = runwayProgress(runway)
      const count = Math.min(text.length, Math.max(0, Math.round(p * text.length)))
      visible.textContent = text.slice(0, count)
      cursor.style.display = count >= text.length ? "none" : "inline-block"
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [runwayId, text])

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
