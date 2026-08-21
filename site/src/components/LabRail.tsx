import { LAB_DISCIPLINES, LAB_TOC } from "../toc"

const LABEL = Object.fromEntries(LAB_TOC.map((item) => [item.id, item.label]))

export function LabRail({ activeIds }: { activeIds: string[] }) {
  return (
    <aside className="hidden lg:block relative">
      <div className="sticky top-20 text-[13px] leading-[1.4]">
        {LAB_DISCIPLINES.map((group) => {
          const groupOn = group.ids.some((id) => activeIds.includes(id))
          return (
            <div key={group.label} className="mb-6">
              <div
                className={`mb-2 text-[11px] tracking-[0.14em] uppercase ${
                  groupOn ? "text-black underline underline-offset-4 decoration-1" : "text-black/40"
                }`}
              >
                {group.label}
              </div>
              <ul className="space-y-1.5">
                {group.ids.map((id) => {
                  const on = activeIds.includes(id)
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`block transition-colors ${
                          on
                            ? "text-black underline underline-offset-4 decoration-1"
                            : "text-black/45 hover:text-black/70"
                        }`}
                      >
                        {LABEL[id]}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
