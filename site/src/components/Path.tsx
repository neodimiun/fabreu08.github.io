const STEPS = [
  {
    num: "01",
    title: "Aerospace · M&PT",
    body: "Materials & Process Technology Engineer at Collins Aerospace Landing Systems, an RTX business, in Miami Gardens / Opa-Locka. Chemical processing, coatings, process qualification, and NADCAP-governed control for landing gear in manufacturing, overhaul, and repair.",
  },
  {
    num: "02",
    title: "Chemistry",
    body: "High-volume wet chemistry across environmental enforcement labs. At South Florida Water Management District: 1,000+ samples a month, total nitrogen by flow injection, UV-Vis colorimetry, and TOC. At the City of Boca Raton (2018–2024): QC Analyst and Lead Wastewater Analyst — ion chromatography, CBOD, solids, nutrients, LIMS, chain of custody, and the schedule for two analysts. Before that, senior analyst at AEL leading three.",
  },
  {
    num: "03",
    title: "Microbiology",
    body: "M.S. Microbiology & Cell Science, University of Florida (GPA 3.90). At Aveva Drug Delivery Systems: disinfectant efficacy work under USP, kinetic chromogenic bacterial endotoxin testing, pharmaceutical water (PW/WFI) sampling, and isolate identification. The same discipline — if it is not documented, it did not happen.",
  },
  {
    num: "04",
    title: "Systems",
    body: "CompMedic, 2008–2015: hardware, networks, diagnostics, and talking people through a broken system until it was not. A process is only as good as the record it leaves. That instinct now sits under LIMS, process software, and special-process control. Bilingual English / Spanish.",
  },
] as const

export function Path() {
  return (
    <section id="path" className="relative z-[2] bg-white px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <h2 className="text-[13px] sm:text-[15px] tracking-[0.18em] uppercase text-black/50 mb-10">
        Path
      </h2>
      <div className="max-w-4xl">
        {STEPS.map((step) => (
          <article
            key={step.num}
            className="flex flex-col sm:flex-row gap-3 sm:gap-10 py-8 border-t border-black/15"
          >
            <div className="text-[42px] sm:text-[56px] leading-none min-w-[1.4em] text-black/80">
              {step.num}
            </div>
            <div>
              <h3 className="text-[22px] sm:text-[28px] mb-2">{step.title}</h3>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-black/65 max-w-2xl">
                {step.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
