export interface Section {
  slug: string
  title: string
  description: string
  tags: string[]
}

export const sections: Section[] = [
  {
    slug: 'mod-e',
    title: 'mod-e',
    description: 'A robot that displays human emotions. Built on the Lövheim cube of emotion with R-STDP learning dynamics and serotonin/dopamine/noradrenaline state modeling.',
    tags: ['neuromorphic', 'zig', 'r-stdp'],
  },
  {
    slug: 'kv-store',
    title: 'kv-store',
    description: 'Building a persistent key-value store from scratch in Zig. WAL, LSM trees, compaction, and everything you learn by not using Redis.',
    tags: ['zig', 'systems', 'storage'],
  },
  {
    slug: 'thoughts',
    title: 'thoughts',
    description: 'Unstructured. Notes on systems engineering, neuroscience, tools I use, and whatever else I feel like writing about.',
    tags: [],
  },
]

export function getSection(slug: string): Section | undefined {
  return sections.find(s => s.slug === slug)
}
