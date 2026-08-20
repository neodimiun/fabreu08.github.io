import { useEffect, useRef } from "react"
import { gearX, runwayProgress } from "../runway"

const MASK_SCALE = 0.4

function hoverRadius() {
  return Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
}

type Props = {
  runwayId: string
}

export function Background({ runwayId }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const scrollP = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const runway = document.getElementById(runwayId)
    const stage = wrap?.parentElement
    if (!wrap || !runway || !stage) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * MASK_SCALE))
      canvas.height = Math.max(1, Math.round(window.innerHeight * MASK_SCALE))
    }
    resize()

    const paintBlob = (sx: number, sy: number, r: number) => {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r)
      g.addColorStop(0, "rgba(255,255,255,1)")
      g.addColorStop(0.4, "rgba(255,255,255,1)")
      g.addColorStop(0.6, "rgba(255,255,255,0.75)")
      g.addColorStop(0.75, "rgba(255,255,255,0.4)")
      g.addColorStop(0.88, "rgba(255,255,255,0.12)")
      g.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    let raf = 0
    const frame = () => {
      const p = scrollP.current
      const on = hovering.current
      const w = canvas.width
      const h = canvas.height

      if (!on && p < 0.008) {
        wrap.style.opacity = "0"
        wrap.style.maskImage = "none"
        wrap.style.webkitMaskImage = "none"
        raf = requestAnimationFrame(frame)
        return
      }

      wrap.style.opacity = "1"
      ctx.clearRect(0, 0, w, h)

      if (p >= 0.97) {
        ctx.fillStyle = "rgba(255,255,255,1)"
        ctx.fillRect(0, 0, w, h)
      } else if (p > 0.008) {
        const y = (0.12 + p * 0.8) * h
        const lg = ctx.createLinearGradient(0, 0, 0, h)
        const edge = y / h
        lg.addColorStop(0, "rgba(255,255,255,1)")
        lg.addColorStop(Math.max(0, edge - 0.04), "rgba(255,255,255,1)")
        lg.addColorStop(Math.min(1, edge + 0.14), "rgba(255,255,255,0)")
        lg.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = lg
        ctx.fillRect(0, 0, w, h)

        const scanR = (hoverRadius() * (1 + p * 1.4)) * MASK_SCALE
        paintBlob(gearX() * MASK_SCALE, y, scanR)
      }

      if (on) {
        const s = smooth.current
        const m = mouse.current
        s.x += (m.x - s.x) * 0.1
        s.y += (m.y - s.y) * 0.1
        paintBlob(s.x * MASK_SCALE, s.y * MASK_SCALE, hoverRadius() * MASK_SCALE)
      }

      const url = canvas.toDataURL("image/png")
      wrap.style.maskImage = `url(${url})`
      wrap.style.webkitMaskImage = `url(${url})`
      wrap.style.maskSize = "100% 100%"
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const readScroll = () => {
      scrollP.current = runwayProgress(runway)
    }

    const setHover = (clientX: number, clientY: number, active: boolean) => {
      hovering.current = active
      mouse.current.x = clientX
      mouse.current.y = clientY
      if (active) {
        smooth.current.x = clientX
        smooth.current.y = clientY
      }
    }

    const onMouseMove = (e: MouseEvent) => setHover(e.clientX, e.clientY, true)
    const onMouseLeave = () => {
      hovering.current = false
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) setHover(t.clientX, t.clientY, true)
    }
    const onTouchEnd = () => {
      hovering.current = false
    }
    const onResize = () => {
      resize()
      readScroll()
    }

    window.addEventListener("scroll", readScroll, { passive: true })
    window.addEventListener("resize", onResize)
    stage.addEventListener("mousemove", onMouseMove)
    stage.addEventListener("mouseleave", onMouseLeave)
    stage.addEventListener("touchmove", onTouch, { passive: true })
    stage.addEventListener("touchend", onTouchEnd)
    readScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", readScroll)
      window.removeEventListener("resize", onResize)
      stage.removeEventListener("mousemove", onMouseMove)
      stage.removeEventListener("mouseleave", onMouseLeave)
      stage.removeEventListener("touchmove", onTouch)
      stage.removeEventListener("touchend", onTouchEnd)
    }
  }, [runwayId])

  const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`

  return (
    <>
      <img className="hero-chrome" src={media("bg-1.jpg")} alt="" />
      <div ref={wrapRef} className="hero-xray-wrap" aria-hidden>
        <img className="hero-xray" src={media("bg-2.jpg")} alt="" />
      </div>
      <div className="hero-scrim" aria-hidden />
    </>
  )
}
