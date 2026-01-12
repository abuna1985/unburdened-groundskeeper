 # ADR 001: The "Unburdened" Architecture

**Status:** Accepted
**Date:** 2026-01-11
**Purpose:** To define the architectural standards for a rugged, offline-first field application.
**Context:** Tradespeople operate in hostile digital environments (dead zones, direct sunlight) and operate with thin margins. Standard web applications fail these constraints.

## 1. Infrastructure: Static Edge Deployment
**The Pain:** "I hate paying monthly fees for software I barely use."
**The Fix:** **Astro (Static Site Generation)**.
*   **Why:** We pre-render the entire app as fixed files. No server to maintain or pay for.
*   **The Gain:** **Infinite ROI.** $0 monthly cost. The app runs for free forever.
*   **The Price:** **Dynamic Limitation.** We cannot easily add server-side features (like real-time chat) without adding a separate backend. *We accept this constraint to keep the hosting cost at $0.*

## 2. Data: Local-First Architecture
**The Pain:** "I hate waiting for spinners in a bad signal area."
**The Fix:** **Dexie.js (IndexedDB)**.
*   **Why:** We treat the phone's hard drive as the Master. The Internet is just a backup.
*   **The Gain:** **Zero Latency.** Works perfectly in a dead zone.
*   **The Price:** **Future Integration Path.** We launch without a login system now to minimize friction, knowing we must architect a seamless "Local-to-Cloud" migration path when we introduce secure sync features later.

## 3. UX: High-Contrast "Industrial" Design System
**The Pain:** "I can't read the screen in the sun, and I can't tap buttons with gloves on."
**The Fix:** **Strict High-Contrast Tokens**.
*   **Why:** We use Pure Black/White/Yellow and enforce 60px touch targets.
*   **The Gain:** **Environmental Resilience.** Legible in direct sunlight. Glove-friendly.
*   **The Price:** **Aesthetic Trade-off.** The app looks "rugged" rather than "trendy" or "soft." *We trade beauty for utility.*

## 4. Architecture: Decoupled State Management
**The Pain:** "Adapting this software for a new industry (e.g., from Landscaping to Plumbing) usually requires a full rewrite."
**The Fix:** **Nano Stores (Decoupled Logic)**.
*   **Why:** We keep the "Brain" (Business Logic) separate from the "Skin" (React UI).
*   **The Gain:** **Franchise Scalability.** We can swap the interface for a new vertical without breaking the core business rules.
*   **The Price:** **Abstraction Cost.** We write generic, modular code today (which requires more planning) to avoid rewriting it entirely tomorrow.

## 5. Security: Client-Side Data Custody
**The Pain:** "I don't trust you with my client list."
**The Fix:** **Privacy by Design (No Central Database)**.
*   **Why:** We do not store user data on our servers. It stays on their device.
*   **The Gain:** **Zero Liability.** We cannot leak what we do not have.
*   **The Price:** **Zero Recovery.** We cannot reset a password or recover lost data. *We accept this because the user holds the only keys.*

## 6. Accessibility: Robust Interaction Model
**The Pain:** "My hands are shaky and I'm distracted."
**The Fix:** **Semantic HTML (Native Controls)**.
*   **Why:** We use standard `<button>` and `<input>` tags, not custom divs.
*   **The Gain:** **Reliability.** Works with screen readers and voice control out of the box.
*   **The Price:** **Design Rigor.** We cannot use lazy coding shortcuts. Every interactive element must be rigorously built to standard, requiring more thought than typical web development.

## 7. Quality Assurance: Behavioral Unit Testing
**The Pain:** "I'm scared to update the app because I might break the save button."
**The Fix:** **Vitest (Logic Testing)**.
*   **Why:** We automate the verification of the business logic.
*   **The Gain:** **Refactoring Confidence.** We can change the UI aggressively knowing the logic works.
*   **The Price:** **Development Discipline.** We shift effort from "Manual Bug Fixing" to "Automated Verification." It requires patience upfront but eliminates the "fix-break-fix" cycle long-term.
