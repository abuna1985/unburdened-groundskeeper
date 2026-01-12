// src/components/features/JobList.tsx
import { useStore } from "@nanostores/react";
import { $jobs, $isHydrated } from "../../stores/jobs";
import { JobCard } from "../ui/JobCard";

export function JobList() {
  const jobs = useStore($jobs);
  const isHydrated = useStore($isHydrated);

  // We return null until hydration is complete to prevent visual conflicts with the Static Frame.
  if (!isHydrated) return null;

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-500">
      {/* The header displays the live count of verified records in the local vault. */}
      <div className="flex justify-between items-end border-b-2 border-zinc-800 pb-4">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-industrial-muted">
          Active Jobs
        </h2>
        <span className="text-xs font-black text-industrial-action px-2 py-0.5 bg-zinc-900 rounded-sm">
          {jobs.length}
        </span>
      </div>

      <div className="space-y-4">
        {/* If the vault is verified empty, we show a clear instructional fallback. */}
        {jobs.length === 0 ? (
          <div className="py-12 border-2 border-dashed border-zinc-800 rounded-sm text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 italic">
              Local Vault Empty
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job as any} />)
        )}
      </div>
    </div>
  );
}
