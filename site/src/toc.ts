export type MenuLink = {
  id: string
  href: string
  label: string
}

export type MenuSection = MenuLink & {
  children: MenuLink[]
}

export const MENU: MenuSection[] = [
  { id: "structure", href: "#structure", label: "Structure", children: [] },
  { id: "process", href: "#process", label: "Process", children: [] },
  { id: "chemistry", href: "#chemistry", label: "Chemistry", children: [] },
  { id: "now", href: "#now", label: "Now", children: [] },
  { id: "contact", href: "#contact", label: "Contact", children: [] },
]

export const SECTION_IDS = ["structure", "process", "chemistry", "now", "contact"] as const
