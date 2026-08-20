import { useEffect, useState } from "react"
import { LAB_TOC, MENU, PATH_TOC, SECTION_IDS } from "../toc"
import { useScrollActive, useScrollCurrent } from "../hooks/useScrollCurrent"

const PATH_IDS = PATH_TOC.map((item) => item.id)
const LAB_IDS = LAB_TOC.map((item) => item.id)

const itemClass = "menu-link"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const currentSection = useScrollCurrent(SECTION_IDS)
  const pathActive = useScrollActive(PATH_IDS)
  const labActive = useScrollActive(LAB_IDS)

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

  const childActive = (sectionId: string, childId: string) => {
    if (sectionId === "path") return pathActive.includes(childId)
    if (sectionId === "lab") return labActive.includes(childId)
    return false
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-white/90">
        <a
          href="#top"
          className="relative z-50 inline-flex items-center justify-center min-h-11 min-w-11 text-black hover:opacity-60 transition-opacity"
          aria-label="Home"
          onClick={close}
        >
          <img
            src={`${import.meta.env.BASE_URL}home-mark.png`}
            alt=""
            className="h-8 sm:h-9 w-auto"
          />
        </a>

        <button
          type="button"
          className="relative z-50 flex flex-col items-center justify-center gap-[5px] min-h-11 min-w-11 rounded-md bg-white p-2.5 touch-manipulation"
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
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="min-h-full px-8 sm:px-12 pt-24 pb-16 max-w-xl mx-auto text-center md:max-w-lg md:mx-0 md:ml-auto md:px-16">
            {MENU.map((section) => (
              <div key={section.id} className="mb-10">
                <a
                  href={section.href}
                  onClick={close}
                  className={`${itemClass} text-[28px] sm:text-[32px] mb-3 ${
                    currentSection === section.id ? "underline underline-offset-4 decoration-1" : ""
                  }`}
                >
                  {section.label}
                </a>
                {section.children.length > 0 ? (
                  <ul className="space-y-2 mt-3">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.href}
                          onClick={close}
                          className={`${itemClass} text-[16px] sm:text-[17px] ${
                            childActive(section.id, child.id)
                              ? "text-black underline underline-offset-4 decoration-1"
                              : "text-black/70"
                          }`}
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
      ) : null}
    </>
  )
}
