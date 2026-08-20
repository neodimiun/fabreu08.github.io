import { useEffect, useState } from "react"
import { LINKS } from "../links"
import { Background } from "./Background"
import { ScrollRevealText } from "./ScrollRevealText"

const BODY_TEXT =
  "Glad you stopped in. As a former chemist & microbiologist with over a decade of lab experience, I'm always looking to collaborate."

const PILLS = [
  { label: "Read my path", href: "#path" },
  { label: "Open the CV", href: LINKS.cv, external: true },
  { label: "Send a brief hello", href: LINKS.mailto },
  { label: "See how I work", href: "#work" },
] as const

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8.5 3.2V2.2A1.2 1.2 0 0 0 7.3 1H2.2A1.2 1.2 0 0 0 1 2.2v5.1A1.2 1.2 0 0 0 2.2 8.5H3.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function Hero() {
  const [pillsOn, setPillsOn] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setPillsOn(true), 400)
    return () => window.clearTimeout(t)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="top" className="relative z-[1]">
      <div id="hero-runway" className="h-[200vh]">
        <div className="hero-stage sticky top-0 h-screen overflow-hidden">
          <Background runwayId="hero-runway" />
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 pointer-events-none">
            <div className="max-w-xl pointer-events-auto">
              <p
                className="mb-5 sm:mb-6 text-black"
                style={{
                  fontSize: "clamp(18px, 4vw, 26px)",
                  lineHeight: 1.3,
                  fontWeight: 400,
                }}
              >
                Hi there, I&apos;m José,
                <br />
                M&amp;PT Engineer, Collins Aerospace
              </p>

              <ScrollRevealText text={BODY_TEXT} runwayId="hero-runway" />

              <div
                className="flex flex-wrap gap-y-1"
                style={{
                  opacity: pillsOn ? 1 : 0,
                  transform: pillsOn ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {PILLS.map((pill) => (
                  <a
                    key={pill.label}
                    href={pill.href}
                    {...("external" in pill && pill.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    {pill.label}
                  </a>
                ))}

                <button
                  type="button"
                  onClick={() => void copyEmail()}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 text-black bg-transparent border border-black rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <span>
                    {copied ? "Copied: " : "Reach me: "}
                    <span className="underline underline-offset-1">{LINKS.email}</span>
                  </span>
                  <CopyIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
