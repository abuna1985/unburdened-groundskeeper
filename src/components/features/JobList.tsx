// src/components/features/JobList.tsx
import { useStore } from "@nanostores/react";
import { $jobs, $isHydrated } from "../../stores/jobs";
import { JobCard } from "../ui/JobCard";

/**
 * - GOAL: The history view of the ledger.
 * - FEEDBACK: Shows a live count of active jobs.
 * - EMPTY STATE: A dashed "Slot" that invites the user to fill it.
 */
export function JobList() {
  const jobs = useStore($jobs);
  const isHydrated = useStore($isHydrated);

  // Prevent hydration mismatch by waiting for the database.
  if (!isHydrated) return null;

 return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-500">
      {/* HEADER: Label + Count */}
      <div className="flex justify-between items-end border-b-2 border-slate-200 pb-4">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-ledger-muted">
          Active Jobs
        </h2>
        <span className="text-xs font-black text-ledger-action px-2 py-0.5 bg-blue-50 rounded-md">
          {jobs.length}
        </span>
      </div>

      <div className="space-y-4">
        {/* EMPTY STATE: Looks like an empty slot in a binder */}
        {jobs.length === 0 ? (
          <div className="py-12 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 italic">
              Ledger Empty
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job as any} />)
        )}
      </div>
    </div>
  );}
