// src/stores/jobs.ts
import { atom, onMount } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import type { Job } from '../types';

// THE BRAIN (Reactive State)
// We hold the active dataset in RAM so the UI never waits for the disk.
export const $jobs = atom<Job[]>([]);

// THE HYDRATION (Disk -> RAM)
// We stream data from the Vault (Dexie) when the app wakes up.
// STRATEGY: We force the Database to handle the sorting ('createdAt').
onMount($jobs, () => {
  db.jobs.orderBy('createdAt').reverse().toArray().then((jobs) => {
    $jobs.set(jobs);
  });
});

export async function addJob(data: Pick<Job, 'clientName' | 'description' | 'price' | 'location'>) {
  const newJob: Job = {
    // FREEDOM FROM SIGNAL: We mint the ID locally.
    id: uuidv4(),
    ...data,
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // 1. RESPECT THE USER (Optimistic UI)
  // We assume the save will succeed and update the screen instantly (0ms latency).
  $jobs.set([newJob, ...$jobs.get()]);

  // 2. PROTECT THE DATA (Async Persistence)
  // We write to the Vault in the background.
  await db.jobs.add(newJob);
}

export async function updateStatus(id: string, status: Job['status']) {
  // SYSTEM INTEGRITY
  // We map a fresh array reference to ensure the UI framework detects the change.
  const current = $jobs.get();
  const updated = current.map(job => 
    job.id === id ? { ...job, status, updatedAt: Date.now() } : job
  );
  
  $jobs.set(updated);
  
  // Sync the truth to the Vault.
  await db.jobs.update(id, { status, updatedAt: Date.now() });
}
