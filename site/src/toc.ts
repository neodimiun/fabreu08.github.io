export type MenuLink = {
  id: string
  href: string
  label: string
}

export type MenuSection = MenuLink & {
  children: MenuLink[]
}

export const PATH_TOC: MenuLink[] = [
  { id: "path-foundation", href: "#path-foundation", label: "Foundation" },
  { id: "path-4", href: "#path-4", label: "City of Boca Raton" },
  { id: "path-5", href: "#path-5", label: "Aveva Drug Delivery Systems" },
  { id: "path-6", href: "#path-6", label: "South Florida Water Management District" },
  { id: "path-7", href: "#path-7", label: "Collins Aerospace · Chemical Process Laboratory" },
  { id: "path-8", href: "#path-8", label: "Collins Aerospace · Senior Engineer, Materials & Process Technologies" },
  { id: "path-line", href: "#path-line", label: "The line through it" },
]

export const LAB_TOC: MenuLink[] = [
  { id: "lab-0", href: "#lab-0", label: "Aerospace" },
  { id: "lab-1", href: "#lab-1", label: "Process" },
  { id: "lab-2", href: "#lab-2", label: "Quality" },
  { id: "lab-3", href: "#lab-3", label: "Pharma QC" },
  { id: "lab-archive", href: "#lab-archive", label: "Methods archive" },
]

export const MENU: MenuSection[] = [
  { id: "path", href: "#path", label: "Path & Work", children: PATH_TOC },
  { id: "lab", href: "#lab", label: "Lab Methods", children: LAB_TOC },
  { id: "credentials", href: "#credentials", label: "Credentials", children: [] },
  { id: "contact", href: "#contact", label: "Contact", children: [] },
]

export const PATH_IMAGES: Record<string, string> = {
  "path-foundation": "media/obj-cyber.jpg",
  "path-0": "media/obj-cyber.jpg",
  "path-1": "media/obj-microbiology.jpg",
  "path-2": "media/obj-chemistry.jpg",
  "path-3": "media/obj-microbiology.jpg",
  "path-4": "media/obj-chemistry.jpg",
  "path-5": "media/obj-microbiology.jpg",
  "path-6": "media/obj-chemistry.jpg",
  "path-7": "media/obj-aerospace.jpg",
  "path-8": "media/bg-1.jpg",
  "path-line": "media/bg-2.jpg",
}

export const LAB_IMAGES: Record<string, string> = {
  "lab-0": "media/obj-aerospace.jpg",
  "lab-1": "media/bg-1.jpg",
  "lab-2": "media/obj-aerospace.jpg",
  "lab-3": "media/obj-microbiology.jpg",
  "lab-archive": "media/obj-chemistry.jpg",
}

export const LAB_DISCIPLINES: { label: string; ids: string[] }[] = [
  { label: "Methods", ids: ["lab-0", "lab-1", "lab-2", "lab-3", "lab-archive"] },
]

export const SECTION_IDS = ["path", "lab", "credentials", "contact"] as const
