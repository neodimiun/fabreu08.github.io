import { LINKS } from "../links"

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-[2] bg-black text-white px-5 sm:px-8 md:px-10 pt-24 pb-16 sm:pt-28 sm:pb-20 text-center"
    >
      <h2
        className="text-[22px] sm:text-[28px] mb-8 tracking-tight"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
      >
        Contact
      </h2>
      <p className="text-[16px] sm:text-[18px] leading-[1.7]">
        <a href={LINKS.mailto} className="underline underline-offset-2 hover:opacity-60 transition-opacity">
          {LINKS.email}
        </a>
        {" · "}
        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          {LINKS.linkedinLabel}
        </a>
      </p>
    </footer>
  )
}
