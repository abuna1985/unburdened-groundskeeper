// src/stores/jobs.test.ts
import "fake-indexeddb/auto"; // Must be first: Mocks browser storage for Node.js environment.
import { describe, it, expect, beforeEach } from "vitest";
import { addJob, $jobs, $isHydrated } from "./jobs";
import { db } from "../db";

describe("The Brain (Jobs Store)", () => {
  beforeEach(async () => {
    // 1. Reset Database: Purge all data to ensure test isolation.
    await db.jobs.clear();
    $jobs.set([]);
    $isHydrated.set(false); // Reset the hydration signal for each test run.

    // 2. Boot Sequence: Force 'onMount' to run now to prevent race conditions.
    const dismount = $jobs.listen(() => {});
    await new Promise((resolve) => setTimeout(resolve, 50)); // Wait 50ms for DB sync.
    dismount();
  });

  it("should guarantee Optimistic UI (Speed) and Persistence (Safety)", async () => {
    // Scenario: User inputs valid job data in the field.
    const jobData = {
      clientName: "Test Client",
      description: "Test Description",
      price: 100,
      location: { display: "123 Test St" },
    };

    // Action: Trigger the save (Simulates clicking the button).
    await addJob(jobData);

    // Verify Memory: UI must update instantly (0ms latency) to feel responsive.
    const memoryJobs = $jobs.get();
    expect(memoryJobs.length).toBe(1);
    expect(memoryJobs[0].clientName).toBe("Test Client");
    expect(memoryJobs[0].id).toBeDefined();

    // Verify Engine Readiness: Ensure the "Hydration" signal is active.
    // If this is false, the app will be permanently stuck on the "Syncing" screen.
    expect($isHydrated.get()).toBe(true);

    // Verify Disk: Data must survive in the vault (simulates app restart).
    const diskJobs = await db.jobs.toArray();
    expect(diskJobs.length).toBe(1);
    expect(diskJobs[0].clientName).toBe("Test Client");
  });
});
