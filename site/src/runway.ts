export function runwayProgress(runway: HTMLElement) {
  const rect = runway.getBoundingClientRect()
  const range = Math.max(1, rect.height - window.innerHeight)
  return Math.min(1, Math.max(0, -rect.top / range))
}

/** Horizontal focus of the gear in the hero photos (matches object-position). */
export function gearX() {
  return window.innerWidth * (window.innerWidth >= 768 ? 0.72 : 0.58)
}

