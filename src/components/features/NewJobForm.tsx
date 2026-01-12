// src/components/features/NewJobForm.tsx
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { addJob } from "../../stores/jobs";

export function NewJobForm() {
  // Manage form fields in local state (The Scratchpad) before committing to the Vault.
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [work, setWork] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = async () => {
    // BLOCKER: Prevent saving empty work orders to ensure database quality.
    if (!location.trim() || !client.trim()) return;

    // HAND-OFF: Transmit the local state package to the permanent Logic Engine (Nano Store).
    await addJob({
      clientName: client,
      description: work || "General Maintenance",
      price: parseFloat(price) || 0,
      location: { display: location },
    });

    // RESET: Clear the inputs (The Visual Confirmation) to ready the tool for the next task.
    setLocation("");
    setClient("");
    setWork("");
    setPrice("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Job Location"
          placeholder="Street Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          label="Client Name"
          placeholder="e.g. Mrs. Robinson"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <Input
          label="Work Description"
          placeholder="e.g. Mow & Edge"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
        {/* Use inputMode="decimal" to force the phone's number pad for faster data entry. */}
        <Input
          label="Quote Price ($)"
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button onClick={handleSave}>[ + ] LOG NEW JOB</Button>
    </div>
  );
}
