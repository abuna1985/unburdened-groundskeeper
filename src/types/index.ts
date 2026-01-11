// src/types/index.ts

// --- PRIMITIVES ---
// "UUID" ia a  Unique ID, not just any text.
export type UUID = string;

// --- DOMAIN TYPES ---
// We list status here so we can't accidentally type "done" instead of "completed".
export type JobStatus = "pending" | "completed" | "paid" | "cancelled";

// --- THE HYBRID LOCATION ---
// 1. We ALWAYS save what the user types ('display'). It never fails.
// 2. We OPTIONALLY save coordinates later ('coordinates').
export interface JobLocation {
  display: string; // e.g. "123 Main St" (Required)
  coordinates?: {
    // e.g. { lat: 45, lng: -93 } (Optional)
    lat: number;
    lng: number;
  };
}

// --- THE CORE ENTITY: JOB ---
// This is the shape of the data we save to the phone.
export interface Job {
  id: UUID;

  // The Basics
  clientName: string;
  location: JobLocation;
  description: string;
  price: number;
  status: JobStatus;

  // The Timeline (Timestamps)
  // We use numbers (Date.now()) because computers sort numbers faster than dates.
  createdAt: number;
  updatedAt: number;
  completedAt?: number; // Only exists if the job is done.
}
