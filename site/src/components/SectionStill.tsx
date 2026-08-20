export function headingActive(on: boolean) {
  return on ? "underline underline-offset-[6px] decoration-1" : ""
}

export function SectionStill({ src }: { src: string }) {
  if (!src) return null
  return (
    <aside className="hidden lg:block relative">
      <div className="sticky top-28">
        <img
          src={`${import.meta.env.BASE_URL}${src}`}
          alt=""
          className="w-full max-w-[320px] object-cover aspect-[3/4]"
        />
      </div>
    </aside>
  )
}
