import { headingActive, SectionStill } from "./SectionStill"
import { SECTION_IDS } from "../toc"
import { useScrollCurrent } from "../hooks/useScrollCurrent"

const ITEMS = [
  "M.S. Microbiology & Cell Science, University of Florida, 2018. Medical Microbiology & Biochemistry, GPA 3.90.",
  "B.S. Biological Sciences (Biotechnology), Miami Dade College, 2015. Highest Honors, upper-division GPA 4.0.",
  "A.S. Biotechnology and College Credit Certificate, Biotechnology, Miami Dade College, 2013. Highest Honors.",
  "A.A., Miami Dade College, 2012. Highest Honors.",
  "Golden Key, Phi Theta Kappa, National Society of Leadership and Success.",
  "North Dade Medical Foundation Scholarship (four times), Dean's List, STEM Ambassador.",
]

export function Credentials() {
  const sectionOn = useScrollCurrent(SECTION_IDS) === "credentials"

  return (
    <section
      id="credentials"
      className="relative z-[2] bg-white px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32"
    >
      <div className="max-w-[1200px] mx-auto lg:grid lg:grid-cols-[minmax(0,38rem)_1fr] lg:gap-16">
        <div>
          <h2
            className={`mb-10 text-[22px] sm:text-[28px] text-black tracking-tight ${headingActive(sectionOn)}`}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Credentials
          </h2>
          <ul className="text-[16px] sm:text-[18px] leading-[1.65] text-black list-disc pl-5 space-y-3">
            {ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-[16px] sm:text-[18px] leading-[1.65] text-black mt-8">
            English and Spanish, native fluency in both.
          </p>
        </div>
        <SectionStill src="headshot.jpg" />
      </div>
    </section>
  )
}
