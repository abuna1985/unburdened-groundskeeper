// src/stores/jobs.ts
import { atom, onMount } from "nanostores";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import type { Job } from "../types";

// We hold data in RAM so the UI never stutters while waiting for the disk.
export const $jobs = atom<Job[]>([]);

// This flag prevents the UI from showing "Empty State" while the disk is still waking up.
export const $isHydrated = atom(false);

// We wrap this in a check so the app doesn't crash during the server build process.
if (!import.meta.env.SSR) {
  db.jobs
    .orderBy("createdAt")
    .reverse()
    .toArray()
    .then((jobs) => {
      $jobs.set(jobs);
      $isHydrated.set(true);
    });
}

// This empty listener keeps the data alive in memory while the user navigates the app.
onMount($jobs, () => {});

export async function addJob(
  data: Pick<Job, "clientName" | "description" | "price" | "location">,
) {
  const newJob: Job = {
    id: uuidv4(), // We generate IDs here so the user can save work without a cell signal.
    ...data,
    status: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // We update the screen instantly (0ms) so the user doesn't wait for a "Success" message.
  $jobs.set([newJob, ...$jobs.get()]);

  // We save to the hard drive in the background so the user can move to the next task immediately.
  await db.jobs.add(newJob);
}

export async function updateStatus(id: string, status: Job["status"]) {
  // We replace the entire list to force React to redraw the updated job card.
  const current = $jobs.get();
  const updated = current.map((job) =>
    job.id === id ? { ...job, status, updatedAt: Date.now() } : job,
  );

  $jobs.set(updated);

  // We keep the permanent database in sync with what the user sees on the screen.
  await db.jobs.update(id, { status, updatedAt: Date.now() });
}
