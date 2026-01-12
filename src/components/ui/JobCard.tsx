// src/components/ui/JobCard.tsx
import type { Job } from "../../types";

export function JobCard({ job }: { job: Job }) {
  {
    /* Strategy: Use relative positioning to ensure cards stack correctly in the list flow. */
  }
  return (
    <div className="relative p-6 bg-industrial-surface border border-zinc-800 rounded-sm space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-black uppercase tracking-tight text-white leading-tight">
          {job.location.display}
        </h3>
        {/* Use high-contrast status badges for instant readability in glare. */}
        <span className="text-[10px] font-black px-2 py-1 bg-zinc-800 text-industrial-muted uppercase tracking-tighter ring-1 ring-zinc-700">
          {job.status}
        </span>
      </div>

      {/* Horizontal divider to separate the location from the metadata. */}
      <div className="h-px bg-zinc-800 w-full opacity-50"></div>

      <p className="text-xs text-industrial-muted font-bold uppercase tracking-widest leading-none">
        {job.clientName} —{" "}
        <span className="text-industrial-action">${job.price}</span>
      </p>
    </div>
  );
}
