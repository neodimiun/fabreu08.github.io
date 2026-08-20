import type { ReactNode } from "react"

type Entry = {
  title: string
  meta: string
  body: ReactNode
}

const ENTRIES: Entry[] = [
  {
    title: "CompMedic, LLC · IT Technical Support",
    meta: "Hollywood, FL · 2008–2015",
    body: "Paid for my first degrees by fixing computers. Learned to model a system before touching it, test the cheapest hypothesis first, and explain a failure to someone who does not want a technical explanation.",
  },
  {
    title: "Miami Dade College · A.A., Certificate, A.S., B.S. Biological Sciences (Biotechnology)",
    meta: "Miami, FL · 2009–2015 · Highest Honors, upper-division GPA 4.0",
    body: (
      <>
        Stacked the credentials on purpose, choosing the biotechnology track each time to stay at the bench. Two summers set the direction: drug pedigree records and compliance audits at PharmaMed, where I learned that undocumented work did not happen, and chloroplast DNA isolation and amplification for an{" "}
        <em>rbcL</em> study of the golden cane palm.
      </>
    ),
  },
  {
    title: "Advanced Environmental Laboratories · Senior Analyst, Inorganic Chemistry & Microbiology",
    meta: "Miramar, FL · 2015–2018",
    body: "Chose a commercial lab for the longest method list under one roof: anions by ion chromatography in water and soil, hexavalent chromium, solids and residue, oxygen demand, and the full coliform suite. Client data gets audited, so I learned to write a result I could defend a year later. Senior analyst over three people across wet chemistry and microbiology.",
  },
  {
    title: "University of Florida · M.S. Microbiology & Cell Science",
    meta: "Gainesville, FL · 2018 · Medical Microbiology & Biochemistry · GPA 3.90",
    body: "Completed while working full time. I was already doing analytical chemistry daily and wanted the microbiology to match it. Fluency in both is why I have been able to move between water chemistry, pharmaceutical QC, and metal finishing without starting over.",
  },
  {
    title: "City of Boca Raton · Lead Wastewater Analyst",
    meta: "Boca Raton, FL · 2018–2024",
    body: "Left contract work for a utility because I wanted results acted on the same shift rather than mailed out. Ran the plant's nutrient, solids, oxygen demand, and physical methods and led two analysts. Owned calibration, troubleshooting, reagent preparation, LIMS review, chain of custody, and inventory.",
  },
  {
    title: "Aveva Drug Delivery Systems · QC Microbiologist II",
    meta: "Tamarac, FL · 2025",
    body: "Moved into cGMP manufacturing to learn quality at its strictest. Kinetic chromogenic endotoxin testing on purified water, WFI, and pure steam; point-of-use sampling inside cleanrooms; VITEK 2 identification; a facility-wide disinfectant efficacy study carried from execution through co-authored report. Validation is the discipline I took with me.",
  },
  {
    title: "South Florida Water Management District · Chemist II",
    meta: "West Palm Beach, FL · 2025",
    body: "Scale and automation: over 1,000 samples a month, total nitrogen by flow injection, automated color by UV-Vis, total organic carbon. When the queue never empties, only process discipline protects the data.",
  },
  {
    title: "Collins Aerospace · Chemical Process Laboratory",
    meta: "Opa-Locka, FL · 2025–2026",
    body: "The deliberate turn. Everywhere else the solution in front of me was the sample. Here it is the tool: a bath whose concentration decides whether a landing gear component is airworthy. Tested process solutions against specification and control schedule, trended critical parameters, and evaluated trivalent chromium and iron after dummying. Owned the TrueChem record, calibration and standards, and controlled documents. Supported Nadcap, customer, and internal audits. Held stop-work authority on specification violations, and used it.",
  },
  {
    title: "Collins Aerospace · Senior Engineer, Materials & Process Technologies",
    meta: "Landing Systems, Opa-Locka, FL · 2026–present",
    body: "The same work one level up: I own the process rather than measure it from outside. Laboratory and process-control testing for chemical processing and surface engineering, including corrosion resistance, water break, paint and bend adhesion, hydrogen embrittlement, heat resistance, microhardness, and porosity on conversion coating, passivation, cadmium, sulfamate nickel, and chrome. Troubleshooting and corrective action across production, overhaul, and repair. Review and approval of new materials, chemicals, technique sheets, and work instructions. Owner of the brush plating work instructions, RRCA team member, site focal for Nadcap special process audits, certified trainer for shot peen.",
  },
]

export function Path() {
  return (
    <section id="path" className="relative z-[2] bg-white px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="max-w-3xl">
        <h2
          className="text-[22px] sm:text-[28px] mb-6 text-black tracking-tight"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
        >
          Path &amp; Work
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.65] text-black mb-14">
          Every move was made to acquire something specific: a class of methods, a regulatory system, a different kind of accountability. Each one made the next possible.
        </p>

        {ENTRIES.map((entry) => (
          <article key={entry.title} className="py-8 border-t border-black/15">
            <h3 className="text-[18px] sm:text-[22px] mb-1 text-black leading-[1.35]">{entry.title}</h3>
            <p className="text-[14px] sm:text-[15px] text-black/55 mb-4">{entry.meta}</p>
            <p className="text-[16px] sm:text-[18px] leading-[1.65] text-black">{entry.body}</p>
          </article>
        ))}

        <article className="py-8 border-t border-black/15">
          <h3 className="text-[18px] sm:text-[22px] mb-4 text-black leading-[1.35]">The line through it</h3>
          <p className="text-[16px] sm:text-[18px] leading-[1.65] text-black">
            Environmental work taught volume and defensibility. Pharmaceutical work taught validation. Aerospace asks for both and adds a consequence I like: the part I sign off on has to land. Run the method, own the method, own the process the method protects.
          </p>
        </article>
      </div>
    </section>
  )
}
