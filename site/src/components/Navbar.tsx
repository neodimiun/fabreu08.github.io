import { useEffect, useState } from "react"
import { MENU, SECTION_IDS } from "../toc"
import { useScrollCurrent } from "../hooks/useScrollCurrent"

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
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-white/75 backdrop-blur-sm">
        <a href="#top" className="flex flex-row items-center" onClick={close}>
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Jose
          </span>
        </a>

        <button
          type="button"
          className="flex flex-col gap-[5px] z-20 rounded-md bg-white/90 p-2.5"
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

      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm overflow-y-auto transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="min-h-full px-8 sm:px-12 md:px-16 pt-24 pb-16 max-w-xl">
          {MENU.map((section) => (
            <div key={section.id} className="mb-10">
              <a
                href={section.href}
                onClick={close}
                className={`block text-[28px] sm:text-[32px] mb-3 ${
                  currentSection === section.id ? "underline underline-offset-4 decoration-1" : ""
                }`}
              >
                {section.label}
              </a>
              {section.children.length > 0 ? (
                <ul className="space-y-2">
                  {section.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={child.href}
                        onClick={close}
                        className="text-[16px] sm:text-[17px] text-black/70 hover:text-black transition-colors"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
