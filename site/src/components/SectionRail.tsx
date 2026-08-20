type Item = { id: string; label: string }

export function SectionRail({
  items,
  activeId,
  image,
}: {
  items: Item[]
  activeId: string
  image?: string
}) {
  if (items.length === 0) return null
  const src = image ? `${import.meta.env.BASE_URL}${image}` : ""

  return (
    <aside className="hidden lg:block relative">
      <div className="sticky top-28 pl-4">
        <nav aria-label="On this page" className="text-[13px] leading-[1.45] text-black/45">
          <ul className="space-y-2.5">
            {items.map((item) => {
              const on = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`transition-colors ${
                      on ? "text-black underline underline-offset-4 decoration-1" : "hover:text-black/70"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        {src ? (
          <img src={src} alt="" className="mt-12 w-full max-w-[280px] object-cover aspect-[3/4]" />
        ) : null}
      </div>
    </aside>
  )
}

export function headingActive(on: boolean) {
  return on ? "underline underline-offset-[6px] decoration-1" : ""
}
