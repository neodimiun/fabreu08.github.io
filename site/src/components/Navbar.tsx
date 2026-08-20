import { useEffect, useState } from "react"

const NAV = [
  { label: "Path & Work", href: "#path" },
  { label: "Lab Methods", href: "#lab" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-white/75 backdrop-blur-sm">
        <a href="#top" className="flex flex-row items-center" onClick={() => setOpen(false)}>
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Jose
          </span>
        </a>

        <div className="hidden md:flex flex-row items-center gap-x-[0.7em] text-[17px] lg:text-[20px] text-black">
          {NAV.map((item, i) => (
            <a key={item.label} href={item.href} className="hover:opacity-60 transition-opacity">
              {i < NAV.length - 1 ? `${item.label},` : item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] z-20 rounded-md bg-white/90 p-2.5"
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
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[32px] font-medium"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
