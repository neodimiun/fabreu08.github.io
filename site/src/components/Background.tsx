import { useEffect, useRef } from "react"

const SENSITIVITY = 0.8
const MASK_SCALE = 0.4

function radius() {
  return Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
}

export function Background() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const xrayRef = useRef<HTMLImageElement>(null)
  const mouse = useRef({
    x: typeof window === "undefined" ? 0 : window.innerWidth * 0.72,
    y: typeof window === "undefined" ? 0 : window.innerHeight * 0.5,
  })
  const smooth = useRef({ ...mouse.current })
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const duration = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    const xray = xrayRef.current
    if (!video || !xray) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * MASK_SCALE))
      canvas.height = Math.max(1, Math.round(window.innerHeight * MASK_SCALE))
    }
    resize()

    let raf = 0
    const frame = () => {
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
      xray.style.maskImage = `url(${url})`
      xray.style.webkitMaskImage = `url(${url})`
      xray.style.maskSize = "100% 100%"
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onMeta = () => {
      duration.current = video.duration || 0
    }
    if (video.readyState >= 1) onMeta()

    const onSeeked = () => {
      seeking.current = false
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }

    const applyScrub = (clientX: number, clientY: number) => {
      mouse.current.x = clientX
      mouse.current.y = clientY
      if (prevX.current == null) {
        prevX.current = clientX
        return
      }
      const delta = clientX - prevX.current
      prevX.current = clientX
      const d = duration.current
      if (!d) return
      const offset = (delta / window.innerWidth) * SENSITIVITY * d
      targetTime.current = Math.min(d, Math.max(0, targetTime.current + offset))
      if (!seeking.current) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }

    const onMouse = (e: MouseEvent) => applyScrub(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) applyScrub(t.clientX, t.clientY)
    }
    const unlock = () => {
      void video.play().then(() => video.pause()).catch(() => undefined)
    }

    video.addEventListener("loadedmetadata", onMeta)
    video.addEventListener("seeked", onSeeked)
    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("pointerdown", unlock, { once: true })
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener("loadedmetadata", onMeta)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("resize", resize)
    }
  }, [])

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
      <img
        ref={xrayRef}
        className="hero-xray"
        src={media("bg-2.jpg")}
        alt=""
        aria-hidden
      />
      <div className="hero-scrim" aria-hidden />
    </>
  )
}
