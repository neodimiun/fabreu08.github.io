type Item = {
  id: string
  label: string
  year: string
}

export function PathTimeline({ items, activeIds }: { items: Item[]; activeIds: string[] }) {
  return (
    <aside className="hidden lg:block relative">
      <div className="sticky top-14">
        <div className="relative ml-1 border-l border-black/20">
          {items.map((item) => {
            const on = activeIds.includes(item.id)
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative block pl-5 pr-2 py-2.5 -ml-px transition-colors ${
                  on ? "text-black" : "text-black/40 hover:text-black/70"
                }`}
              >
                <span
                  className={`absolute left-[-4px] top-[14px] h-2 w-2 rounded-full border border-black ${
                    on ? "bg-black" : "bg-white"
                  }`}
                />
                {item.year ? (
                  <span className="block text-[11px] tracking-wide">{item.year}</span>
                ) : null}
                <span
                  className={`block text-[13px] leading-[1.35] ${
                    on ? "underline underline-offset-4 decoration-1" : ""
                  }`}
                >
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export function yearFromMeta(meta: string) {
  const m = meta.match(/(20\d{2})(–(?:20\d{2}|present))?/)
  if (!m) return ""
  return m[2] ? `${m[1]}${m[2]}` : m[1]
}
