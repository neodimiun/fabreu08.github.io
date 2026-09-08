export type MenuLink = {
  id: string
  href: string
  label: string
}

export type MenuSection = MenuLink & {
  children: MenuLink[]
}

export const PATH_TOC: MenuLink[] = [
  { id: "path-0", href: "#path-0", label: "CompMedic, LLC" },
  { id: "path-1", href: "#path-1", label: "Miami Dade College" },
  { id: "path-2", href: "#path-2", label: "Advanced Environmental Laboratories" },
  { id: "path-3", href: "#path-3", label: "University of Florida" },
  { id: "path-4", href: "#path-4", label: "City of Boca Raton" },
  { id: "path-5", href: "#path-5", label: "Aveva Drug Delivery Systems" },
  { id: "path-6", href: "#path-6", label: "South Florida Water Management District" },
  { id: "path-7", href: "#path-7", label: "Collins Aerospace · Chemical Process Laboratory" },
  { id: "path-8", href: "#path-8", label: "Collins Aerospace · Senior Engineer, Materials & Process Technologies" },
  { id: "path-line", href: "#path-line", label: "The line through it" },
]

export const LAB_TOC: MenuLink[] = [
  { id: "lab-0", href: "#lab-0", label: "Aerospace special processes and materials testing" },
  { id: "lab-1", href: "#lab-1", label: "Process solution control" },
  { id: "lab-2", href: "#lab-2", label: "Nutrients" },
  { id: "lab-3", href: "#lab-3", label: "Anions and metals" },
  { id: "lab-4", href: "#lab-4", label: "Solids and residue" },
  { id: "lab-5", href: "#lab-5", label: "Oxygen demand" },
  { id: "lab-6", href: "#lab-6", label: "Organic carbon and color" },
  { id: "lab-7", href: "#lab-7", label: "General and physical" },
  { id: "lab-8", href: "#lab-8", label: "Microbiology, water and environmental" },
  { id: "lab-9", href: "#lab-9", label: "Microbiology and QC, pharmaceutical" },
  { id: "lab-10", href: "#lab-10", label: "Molecular biology" },
  { id: "lab-11", href: "#lab-11", label: "Instrumentation and systems" },
  { id: "lab-12", href: "#lab-12", label: "Quality systems and documentation" },
]

export const MENU: MenuSection[] = [
  { id: "path", href: "#path", label: "Path & Work", children: PATH_TOC },
  { id: "lab", href: "#lab", label: "Lab Methods", children: LAB_TOC },
  { id: "credentials", href: "#credentials", label: "Credentials", children: [] },
  { id: "contact", href: "#contact", label: "Contact", children: [] },
]

export const PATH_IMAGES: Record<string, string> = {
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
  "lab-2": "media/obj-chemistry.jpg",
  "lab-3": "media/obj-chemistry.jpg",
  "lab-4": "media/obj-chemistry.jpg",
  "lab-5": "media/obj-chemistry.jpg",
  "lab-6": "media/obj-chemistry.jpg",
  "lab-7": "media/obj-chemistry.jpg",
  "lab-8": "media/obj-microbiology.jpg",
  "lab-9": "media/obj-microbiology.jpg",
  "lab-10": "media/obj-microbiology.jpg",
  "lab-11": "media/obj-cyber.jpg",
  "lab-12": "media/obj-aerospace.jpg",
}

export const LAB_DISCIPLINES: { label: string; ids: string[] }[] = [
  { label: "Aerospace", ids: ["lab-0", "lab-1"] },
  { label: "Environmental", ids: ["lab-2", "lab-3", "lab-4", "lab-5", "lab-6", "lab-7", "lab-8"] },
  { label: "Pharmaceutical", ids: ["lab-9"] },
  { label: "Molecular biology", ids: ["lab-10"] },
  { label: "Systems", ids: ["lab-11", "lab-12"] },
]

export const SECTION_IDS = ["path", "lab", "credentials", "contact"] as const

