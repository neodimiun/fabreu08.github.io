import { headingActive } from "./SectionStill"
import { SECTION_IDS } from "../toc"
import { useScrollCurrent } from "../hooks/useScrollCurrent"

const ITEMS = [
  "M.S. Microbiology & Cell Science, University of Florida, 2018",
  "B.S. Biological Sciences (Biotechnology), Miami Dade College, 2015",
  "English / Español — native fluency in both",
]

export function Credentials() {
  const sectionOn = useScrollCurrent(SECTION_IDS) === "credentials"

  return (
    <section
      id="credentials"
      className="relative z-[2] bg-white px-[1.125rem] sm:px-[1.8rem] md:px-[2.25rem] pt-16 pb-20 sm:pt-20 sm:pb-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className={`mb-8 text-[22px] sm:text-[28px] text-black tracking-tight ${headingActive(sectionOn)}`}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
        >
          Credentials
        </h2>
        <ul className="text-[16px] sm:text-[18px] leading-[1.65] text-black list-none space-y-3">
          {ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
