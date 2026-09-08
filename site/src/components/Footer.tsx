import { LINKS } from "../links"

export function Footer() {
  return (
    <footer id="contact" className="film-contact">
      <div className="film-contact-inner">
        <p className="film-stamp mb-5">STN 05 · Contact</p>
        <h2 className="film-contact-title">Contact</h2>
        <p className="film-contact-links">
          <a href={LINKS.mailto}>{LINKS.email}</a>
          <span aria-hidden className="film-contact-dot">
            ·
          </span>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            {LINKS.linkedinLabel}
          </a>
        </p>
        <p className="film-contact-note">English / Español</p>
      </div>
    </footer>
  )
}
