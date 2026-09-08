import { useEffect, useState } from "react"

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = window.setTimeout(() => {
      let i = 0
      interval = window.setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          if (interval) window.clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
