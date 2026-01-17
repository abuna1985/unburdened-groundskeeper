// src/components/ui/JobCard.tsx
import type { Job } from "../../types";

/**
 * - GOAL: A clean, professional receipt for a completed job 
 * - STYLE: White card with rounded corners and a soft shadow.
 * - READABILITY: Large text (lg) for address; Green for money.
 * - STATUS: Clear badge to show if the job is pending or paid.
*/
export function JobCard({ job }: { job: Job }) {
  return (
    <div className="relative p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3 transition-shadow hover:shadow-md">
      {/* HEADER: Location & Status */}
      <div className="flex justify-between items-start gap-4">
        {/* Address: text-lg (18px) for outdoor readability */}
        <h3 className="font-bold uppercase tracking-tight text-ledger-ink leading-tight text-lg">
          {job.location.display}
        </h3>
        {/* Status: text-xs (12px) so it's not microscopic */}
        <span className="text-xs font-black px-2 py-1 bg-slate-100 text-ledger-muted uppercase tracking-tighter rounded-md ring-1 ring-slate-200 shrink-0">
          {job.status}
        </span>
      </div>

      {/* DIVIDER: Subtle separation like a printed receipt line */}
      <div className="h-px bg-slate-100 w-full"></div>

      {/* DETAILS: Client & Price */}
      <div className="flex justify-between items-end">
        <p className="text-sm text-ledger-muted font-bold uppercase tracking-widest leading-none">
          {job.clientName}
        </p>
        <span className="text-ledger-success text-xl font-black tracking-tight">
          ${job.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
