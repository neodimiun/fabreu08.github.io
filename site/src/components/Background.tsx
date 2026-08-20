import { useEffect, useRef } from "react"

const MASK_SCALE = 0.4
const XRAY_KEYS = [
  { t: 0, file: "xray-0.jpg" },
  { t: 5, file: "xray-5.jpg" },
  { t: 9.5, file: "xray-10.jpg" },
] as const

function radius() {
  return Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
}

function xrayWeights(time: number) {
  const keys = XRAY_KEYS
  if (time <= keys[0].t) return [1, 0, 0]
  if (time >= keys[2].t) return [0, 0, 1]
  if (time <= keys[1].t) {
    const p = (time - keys[0].t) / (keys[1].t - keys[0].t)
    return [1 - p, p, 0]
  }
  const p = (time - keys[1].t) / (keys[2].t - keys[1].t)
  return [0, 1 - p, p]
}

type Props = {
  runwayId: string
}

export function Background({ runwayId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const frameRefs = useRef<(HTMLImageElement | null)[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const duration = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    const runway = document.getElementById(runwayId)
    const stage = wrap?.parentElement
    if (!video || !wrap || !runway || !stage) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * MASK_SCALE))
      canvas.height = Math.max(1, Math.round(window.innerHeight * MASK_SCALE))
    }
    resize()

    const applyXrayMix = (time: number) => {
      const w = xrayWeights(time)
      frameRefs.current.forEach((img, i) => {
        if (img) img.style.opacity = String(w[i] ?? 0)
      })
    }

    const syncTime = () => {
      const d = duration.current
      if (!d) return
      const rect = runway.getBoundingClientRect()
      const range = Math.max(1, rect.height - window.innerHeight)
      const p = Math.min(1, Math.max(0, -rect.top / range))
      targetTime.current = p * d
      applyXrayMix(targetTime.current)
    }

    const applySeek = () => {
      if (seeking.current || !duration.current) return
      if (Math.abs(video.currentTime - targetTime.current) < 0.04) return
      seeking.current = true
      video.currentTime = targetTime.current
    }

    let raf = 0
    const frame = () => {
      if (hovering.current && ctx) {
        const m = mouse.current
        const s = smooth.current
        s.x += (m.x - s.x) * 0.1
        s.y += (m.y - s.y) * 0.1
        const r = radius() * MASK_SCALE
        const sx = s.x * MASK_SCALE
        const sy = s.y * MASK_SCALE
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r)
        g.addColorStop(0, "rgba(255,255,255,1)")
        g.addColorStop(0.4, "rgba(255,255,255,1)")
        g.addColorStop(0.6, "rgba(255,255,255,0.75)")
        g.addColorStop(0.75, "rgba(255,255,255,0.4)")
        g.addColorStop(0.88, "rgba(255,255,255,0.12)")
        g.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        const url = canvas.toDataURL("image/png")
        wrap.style.maskImage = `url(${url})`
        wrap.style.webkitMaskImage = `url(${url})`
        wrap.style.maskSize = "100% 100%"
        wrap.style.opacity = "1"
      } else {
        wrap.style.opacity = "0"
      }
      applySeek()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    let primed = false
    const prime = () => {
      if (primed) return
      void video
        .play()
        .then(() => {
          video.pause()
          primed = true
          seeking.current = false
          syncTime()
        })
        .catch(() => undefined)
    }

    const onMeta = () => {
      duration.current = video.duration || 0
      prime()
      syncTime()
    }
    if (video.readyState >= 1) onMeta()

    const onSeeked = () => {
      seeking.current = false
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }

    const setHover = (clientX: number, clientY: number, on: boolean) => {
      hovering.current = on
      mouse.current.x = clientX
      mouse.current.y = clientY
      if (on) {
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
      syncTime()
    }

    video.addEventListener("loadedmetadata", onMeta)
    video.addEventListener("loadeddata", prime)
    video.addEventListener("seeked", onSeeked)
    window.addEventListener("scroll", syncTime, { passive: true })
    window.addEventListener("resize", onResize)
    stage.addEventListener("mousemove", onMouseMove)
    stage.addEventListener("mouseleave", onMouseLeave)
    stage.addEventListener("touchmove", onTouch, { passive: true })
    stage.addEventListener("touchend", onTouchEnd)
    window.addEventListener("pointerdown", prime, { once: true })
    window.addEventListener("scroll", prime, { once: true, passive: true })
    syncTime()

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener("loadedmetadata", onMeta)
      video.removeEventListener("loadeddata", prime)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("scroll", syncTime)
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
      <video
        ref={videoRef}
        className="hero-video"
        muted
        playsInline
        preload="auto"
        poster={media("bg-1.jpg")}
      >
        <source src={media("gear.mp4")} type="video/mp4" />
      </video>
      <div ref={wrapRef} className="hero-xray-wrap" aria-hidden>
        {XRAY_KEYS.map((key, i) => (
          <img
            key={key.file}
            ref={(el) => {
              frameRefs.current[i] = el
            }}
            className="hero-xray"
            src={media(key.file)}
            alt=""
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden />
    </>
  )
}
