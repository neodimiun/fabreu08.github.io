const METHODS = [
  "NADCAP AC7108",
  "FAA Part 145",
  "USP <85> BET",
  "USP <1231> PW/WFI",
  "USP <1113> ID",
  "EPA 300.0 IC",
  "SM 4500-N TN",
  "SM 5310 B TOC",
  "SM 5210 B CBOD",
  "SM 2540 TSS/TDS",
  "UV-Vis",
  "LIMS",
  "TrueChem",
  "VITEK 2",
  "Chain of custody",
  "ISO 4 EM",
]

export function Lab() {
  return (
    <section id="lab" className="relative z-[2] bg-[#f4f4f4] px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <h2 className="text-[13px] sm:text-[15px] tracking-[0.18em] uppercase text-black/50 mb-6">
        Lab
      </h2>
      <p className="max-w-xl text-[18px] sm:text-[22px] leading-[1.45] mb-10">
        Methods I have run, reviewed, or now sit beside in special-process control. The through-line is
        the same: data that holds up when someone asks how you know.
      </p>
      <div className="flex flex-wrap gap-y-1">
        {METHODS.map((m) => (
          <span
            key={m}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  )
}
