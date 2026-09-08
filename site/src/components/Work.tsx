const CARDS = [
  {
    kicker: "Now",
    title: "Landing Systems",
    text: "M&PT on landing gear: bath chemistry, coatings, qualification, and the paperwork that keeps a process NADCAP-ready. What you see is the finish. Under the cursor, the structure.",
    images: ["media/bg-1.jpg", "media/bg-2.jpg", "media/obj-aerospace.jpg"],
  },
  {
    kicker: "2018–2025",
    title: "Chemistry",
    text: "Municipal and environmental labs at volume. Anions, nutrients, solids, TOC. Leading analysts, keeping instruments in calibration, and never losing the chain of custody.",
    images: ["media/obj-chemistry.jpg"],
  },
  {
    kicker: "M.S.",
    title: "Microbiology",
    text: "UF medical microbiology, then sterile-drug QC: disinfectant efficacy, endotoxin, pharmaceutical water, and isolate ID. Cleanrooms do not forgive a sloppy record.",
    images: ["media/obj-microbiology.jpg"],
  },
  {
    kicker: "Origin",
    title: "Systems",
    text: "Seven years of IT support before the bench. Hardware, networks, and the habit of following a fault until the system makes sense. That is still how I read a process.",
    images: ["media/obj-cyber.jpg"],
  },
] as const

export function Work() {
  const src = (file: string) => `${import.meta.env.BASE_URL}${file}`

  return (
    <section id="work" className="relative z-[2] bg-white px-5 sm:px-8 md:px-10 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <h2 className="text-[13px] sm:text-[15px] tracking-[0.18em] uppercase text-black/50 mb-10">
        Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {CARDS.map((card) => (
          <article key={card.title} className="border border-black/10 rounded-[28px] overflow-hidden bg-white">
            <div
              className={`gap-1 p-1 bg-black/5 ${
                card.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-3"
              }`}
            >
              {card.images.map((image, i) => (
                <img
                  key={`${card.title}-${i}`}
                  src={src(image)}
                  alt=""
                  className="h-36 sm:h-44 w-full object-cover rounded-[22px]"
                />
              ))}
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-[11px] tracking-[0.2em] uppercase text-black/50 mb-2">{card.kicker}</div>
              <h3 className="text-[22px] sm:text-[26px] mb-3">{card.title}</h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-black/65">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
