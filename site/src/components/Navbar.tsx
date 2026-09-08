import { useEffect, useState } from "react"
import { MENU, SECTION_IDS } from "../toc"
import { useScrollCurrent } from "../hooks/useScrollCurrent"

const itemClass = "menu-link"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const currentSection = useScrollCurrent(SECTION_IDS)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-1.5 sm:py-2 bg-[color:var(--nav-bg)] backdrop-blur-sm">
        <a
          href="#top"
          className="relative z-50 inline-flex items-center justify-center text-black hover:opacity-60 transition-opacity"
          aria-label="Home"
          onClick={close}
        >
          <img
            src={`${import.meta.env.BASE_URL}home-mark.png`}
            alt=""
            className="h-[35px] sm:h-10 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-6 text-[13px] tracking-[0.04em]">
          {MENU.map((section) => (
            <li key={section.id}>
              <a
                href={section.href}
                className={`${itemClass} ${
                  currentSection === section.id
                    ? "underline underline-offset-4 decoration-1"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-50 flex md:hidden flex-col items-center justify-center gap-[5px] min-h-9 min-w-9 rounded-md p-1.5 touch-manipulation"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition duration-300 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition duration-300 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-40 bg-[color:var(--paper)] overflow-y-auto md:hidden">
          <div className="min-h-full px-8 pt-20 pb-16 max-w-xl mx-auto text-center">
            {MENU.map((section) => (
              <div key={section.id} className="mb-8">
                <a
                  href={section.href}
                  onClick={close}
                  className={`${itemClass} text-[28px] ${
                    currentSection === section.id
                      ? "underline underline-offset-4 decoration-1"
                      : ""
                  }`}
                >
                  {section.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
