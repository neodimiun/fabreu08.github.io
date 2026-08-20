import { Background } from "./Background"
import { ScrollRevealText } from "./ScrollRevealText"

const OPENING =
  "Ten years spent where a measurement becomes a decision: a commercial environmental lab, a municipal wastewater plant, a pharmaceutical cleanroom, a landing gear plant. The setting changes. The question does not. Is this number true, and what has to happen because of it?"

export function Hero() {
  return (
    <section id="top" className="relative z-[1]">
      <div id="hero-runway" className="h-[200vh]">
        <div className="hero-stage sticky top-0 h-screen overflow-hidden">
          <Background runwayId="hero-runway" />
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 pointer-events-none">
            <div className="max-w-2xl pointer-events-auto">
              <h1
                className="text-black mb-3 text-[22px] sm:text-[28px] tracking-tight"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 400, lineHeight: 1.25 }}
              >
                Jose A. Fernandez Abreu
              </h1>
              <p
                className="text-black mb-1"
                style={{ fontSize: "clamp(16px, 2.4vw, 20px)", lineHeight: 1.35 }}
              >
                Senior Engineer, Materials &amp; Process Technologies, Collins Aerospace, Landing Systems
              </p>
              <p
                className="text-black mb-5 sm:mb-6"
                style={{ fontSize: "clamp(16px, 2.4vw, 20px)", lineHeight: 1.35 }}
              >
                M.S. Microbiology &amp; Cell Science, University of Florida
              </p>
              <ScrollRevealText text={OPENING} runwayId="hero-runway" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
