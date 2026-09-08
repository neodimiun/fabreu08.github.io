import type { ReactNode } from "react"

type Props = {
  id: string
  stamp: string
  title: string
  meta?: string
  tone?: "paper" | "graphite" | "film"
  children: ReactNode
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  paper: "station-paper",
  graphite: "station-graphite",
  film: "station-film",
}

export function FilmStation({
  id,
  stamp,
  title,
  meta,
  tone = "paper",
  children,
}: Props) {
  return (
    <section id={id} className={`film-station ${TONE[tone]}`}>
      <div className="film-station-inner">
        <div className="film-station-rail" aria-hidden>
          <span className="film-station-mark">{stamp}</span>
          <span className="film-station-rule" />
        </div>
        <div className="film-station-body">
          <h2 className="film-station-title">{title}</h2>
          {meta ? <p className="film-station-meta">{meta}</p> : null}
          <div className="film-station-copy">{children}</div>
        </div>
      </div>
    </section>
  )
}
