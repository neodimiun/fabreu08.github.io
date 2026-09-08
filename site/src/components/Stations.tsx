import { FilmStation } from "./FilmStation"
import { LINKS } from "../links"

export function Stations() {
  return (
    <>
      <FilmStation
        id="structure"
        stamp="STN 01"
        title="Structure"
        meta="CompMedic · Miami Dade · UF · 2008–2018"
        tone="paper"
      >
        <p>
          Seven years fixing computers paid for the first degrees. Stacked Miami Dade
          biotech credentials at the bench—A.A., certificate, A.S., B.S. Biological
          Sciences—then an M.S. Microbiology &amp; Cell Science from the University of
          Florida while working full time.
        </p>
        <p>
          Habit from both: model the system before touching it, and write a result you
          can defend a year later.
        </p>
      </FilmStation>

      <FilmStation
        id="process"
        stamp="STN 02"
        title="Process"
        meta="AEL · Boca Raton · SFWMD · 2015–2025"
        tone="graphite"
      >
        <p>
          Commercial and municipal labs at volume—anions by IC, nutrients, solids,
          oxygen demand, TOC, the coliform suite. Senior analyst at Advanced
          Environmental Laboratories; lead wastewater analyst for the City of Boca
          Raton; Chemist II at South Florida Water Management District.
        </p>
        <p>
          Environmental work taught volume and defensibility. When the queue never
          empties, only process discipline protects the data.
        </p>
      </FilmStation>

      <FilmStation
        id="chemistry"
        stamp="STN 03"
        title="Chemistry"
        meta="Aveva · Collins CPL · 2025–2026"
        tone="paper"
      >
        <p>
          cGMP at Aveva Drug Delivery Systems: kinetic chromogenic endotoxin on PW,
          WFI, and pure steam; cleanroom point-of-use sampling; VITEK 2 ID; a
          facility-wide disinfectant efficacy study through co-authored report.
        </p>
        <p>
          Then Collins Aerospace Chemical Process Laboratory, Opa-Locka—the bath as
          the tool. Specification testing, TrueChem, controlled documents, Nadcap and
          customer audit support. Held stop-work authority on specification
          violations, and used it.
        </p>
      </FilmStation>

      <FilmStation
        id="now"
        stamp="STN 04"
        title="Now"
        meta="Collins Landing Systems · Opa-Locka · 2026–present"
        tone="film"
      >
        <p>
          Senior Engineer, Materials &amp; Process Technologies, Collins Aerospace
          Landing Systems. Laboratory and process-control testing for chemical
          processing and surface engineering—corrosion, adhesion, hydrogen
          embrittlement, microhardness, porosity—across conversion coating,
          passivation, cadmium, sulfamate nickel, and chrome.
        </p>
        <p>
          Own brush plating work instructions; RRCA team member; site focal for
          Nadcap special process audits; certified trainer for shot peen.
        </p>
        <p className="station-venture">
          Venture:{" "}
          <a href={LINKS.venture} target="_blank" rel="noopener noreferrer">
            {LINKS.ventureLabel}
          </a>
        </p>
      </FilmStation>
    </>
  )
}
