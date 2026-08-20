export function runwayProgress(runway: HTMLElement) {
  const rect = runway.getBoundingClientRect()
  const range = Math.max(1, rect.height - window.innerHeight)
  return Math.min(1, Math.max(0, -rect.top / range))
}

export function gearX() {
  return window.innerWidth * (window.innerWidth >= 768 ? 0.76 : 0.62)
}
