// src/db/index.ts

import Dexie, { type Table } from "dexie";
import type { Job } from "../types";

/**
 * THE VAULT (Database)
 * This class wraps IndexedDB (the browser's built-in hard drive).
 * It ensures our data is saved permanently, even if the user closes the app.
 */
export class GroundsKeeperDB extends Dexie {
  // This tells Typescript: "The 'jobs' table returns 'Job' objects."
  jobs!: Table<Job>;

  constructor() {
    // 1. DATABASE NAME
    // This is the name of the file on the user's phone.
    super("GroundsKeeperDB");

    // 2. SCHEMA DEFINITION (The Critical Part)
    // We define our tables and their "Keys" (Indexes).
    this.version(1).stores({
      // 'id': The Primary Key. It must be unique. It identifies the record.
      // 'status': Indexed so we can fast-filter: "Show me pending jobs."
      // 'createdAt': Indexed so we can fast-sort: "Show me newest jobs first."
      jobs: "id, status, createdAt",
    });
  }
}

// 3. THE SINGLETON EXPORT
// We export ONE instance of the database.
export const db = new GroundsKeeperDB();
