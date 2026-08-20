import { LINKS } from "../links"

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-[2] bg-black text-white px-5 sm:px-8 md:px-10 pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <p
        className="text-[28px] sm:text-[40px] mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        José®
      </p>
      <div className="flex flex-wrap gap-x-8 gap-y-3 text-[16px] sm:text-[18px]">
        <a href={LINKS.mailto} className="underline underline-offset-2 hover:opacity-60 transition-opacity">
          {LINKS.email}
        </a>
        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity"
        >
          LinkedIn
        </a>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity"
        >
          GitHub
        </a>
        <a
          href={LINKS.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity"
        >
          CV
        </a>
      </div>
      <p className="mt-10 text-[13px] text-white/40">
        M&amp;PT Engineer · Collins Aerospace Landing Systems · joseqc.com
      </p>
    </footer>
  )
}
