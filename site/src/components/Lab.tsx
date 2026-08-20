import type { ReactNode } from "react"

function Usp({ n }: { n: string }) {
  return <>USP {"<" + n + ">"}</>
}

const GROUPS: { title: string; body: ReactNode }[] = [
  {
    title: "Aerospace special processes and materials testing",
    body: "Corrosion resistance, water break, paint adhesion, bend adhesion, hydrogen embrittlement, heat resistance, microhardness, porosity. Applied to chemical conversion coating, passivation, cadmium, sulfamate nickel, chrome plating, brush plating, and shot peen.",
  },
  {
    title: "Process solution control",
    body: "Routine and ad-hoc chemical and physical testing of process solutions to specification, work instruction, and control schedule. Critical-parameter trending against shop limits, trivalent chromium and iron trending after dummying, reagent and consumable shelf-life control, full traceability in TrueChem.",
  },
  {
    title: "Nutrients",
    body: (
      <>
        SM 4500-N C-2011 (total nitrogen by flow injection), SM 4500-NH₃ G (ammonia), SM 4500-N<sub>org</sub> D (total Kjeldahl nitrogen), SM 4500-P F (total phosphorus as P).
      </>
    ),
  },
  {
    title: "Anions and metals",
    body: "EPA 300.0 (anions by ion chromatography, water), EPA 9056 (anions by ion chromatography, soil), SM 3500-Cr D 18th/19th ed. (hexavalent chromium by UV-Vis).",
  },
  {
    title: "Solids and residue",
    body: "SM 2540 B / EPA 160.3 (total residue), SM 2540 C / EPA 160.1 (total dissolved solids), SM 2540 D / EPA 160.2 (total suspended solids), SM 2540 C (percent moisture and percent solids).",
  },
  {
    title: "Oxygen demand",
    body: "SM 5210 B (five-day BOD and CBOD).",
  },
  {
    title: "Organic carbon and color",
    body: "SM 5310 B (total organic carbon), SM 2120 C (color, automated, by UV-Vis).",
  },
  {
    title: "General and physical",
    body: "SM 4500-H⁺ B (pH), SM 2320 B (alkalinity), SM 2510 B (conductivity).",
  },
  {
    title: "Microbiology, water and environmental",
    body: "SM 9215 B (heterotrophic plate count), SM 9221 B (total coliforms, multiple-tube fermentation), SM 9221 F (fecal coliform MPN), SM 9222 B (total coliforms, membrane filtration), SM 9222 D (fecal coliforms, membrane filtration), SM 9223 B (enzyme substrate).",
  },
  {
    title: "Microbiology and QC, pharmaceutical",
    body: (
      <>
        <Usp n="85" /> kinetic chromogenic endotoxin on PW, WFI, and pure steam. <Usp n="1231" /> point-of-use water system sampling, including cleanrooms. <Usp n="1113" /> microbial identification by VITEK 2. Facility-wide disinfectant efficacy study per USP guidance, execution through co-authored report.
      </>
    ),
  },
  {
    title: "Molecular biology",
    body: (
      <>
        Chloroplast DNA isolation, purification, and quantification; PCR and <em>rbcL</em> sequence analysis.
      </>
    ),
  },
  {
    title: "Instrumentation and systems",
    body: "Flow injection analyzer · UV-Vis (Shimadzu) · ion chromatography · TOC analyzer · VITEK 2 · kinetic chromogenic endotoxin reader · membrane filtration and multiple-tube fermentation · microhardness testing · LIMS · TrueChem · calibration, standards, and troubleshooting.",
  },
  {
    title: "Quality systems and documentation",
    body: "Nadcap site focal · customer and internal audits · RRCA · authorship and revision of SOPs, work instructions, specifications, methods, manuals, and training materials · technique sheet and material review and approval · process qualification to internal, customer, and proprietary specifications · chain of custody · cGMP and USP, EPA, and Standard Methods compliance.",
  },
]

export function Lab() {
  return (
    <section id="lab" className="relative z-[2] bg-[#f4f4f4] px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="max-w-3xl">
        <h2
          className="text-[22px] sm:text-[28px] mb-10 text-black tracking-tight"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
        >
          Lab Methods
        </h2>
        {GROUPS.map((group) => (
          <article key={group.title} className="mb-8 last:mb-0">
            <h3 className="text-[16px] sm:text-[18px] font-medium mb-2 text-black">{group.title}</h3>
            <p className="text-[15px] sm:text-[17px] leading-[1.65] text-black">{group.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
