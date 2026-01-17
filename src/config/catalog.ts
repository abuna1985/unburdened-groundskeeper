export const SERVICE_PRESETS = [
  { id: "mow_sm", label: "Mow/Edge (S)", defaultPrice: 65 },
  { id: "mow_lg", label: "Mow/Edge (L)", defaultPrice: 95 },
  { id: "trim", label: "Hedge Trim", defaultPrice: 75 },
  { id: "weed", label: "Weeding", defaultPrice: 30 },
  { id: "cleanup", label: "Yard Cleanup", defaultPrice: 150 },
  { id: "mulch", label: "Mulch (Bag)", defaultPrice: 12 },
  { id: "haul", label: "Haul Away", defaultPrice: 85 },
  { id: "custom", label: "Misc Labor", defaultPrice: 50 },
] as const;
