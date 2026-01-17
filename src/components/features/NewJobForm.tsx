// src/components/features/NewJobForm.tsx
import { useState, useId } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { addJob } from "../../stores/jobs";
import { SERVICE_PRESETS } from "../../config/catalog";

/**
 * - GOAL: "Cash Register" speed for field logging.
 * - LAYOUT: Stacked inputs (readability) + Grid buttons (speed).
 * - DATA: Saves exact text/price snapshots to preserve history.
 */

export function NewJobForm() {
  const locationId = useId();
  const clientId = useId();
  const workId = useId();
  const priceId = useId();

  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [work, setWork] = useState("");
  const [price, setPrice] = useState("");

  const isValid = location.trim().length > 0 && client.trim().length > 0;

  // LOGIC: Handles the "Math" and string stacking when a button is tapped.
  const handlePresetClick = (preset: typeof SERVICE_PRESETS[number]) => {
    // String logic: Prevents a leading comma if the box is currently empty.
    setWork(prev => prev ? `${prev}, ${preset.label}` : preset.label);
    // Math logic: Converts text to number, adds the price, then converts back to text.
    setPrice(prev => (parseFloat(prev || "0") + preset.defaultPrice).toString());
  };

  // LOGIC: Handles the form submission.
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    await addJob({
      clientName: client,
      description: work || "General Maintenance",
      price: parseFloat(price) || 0,
      location: { display: location },
    });

    // Reset the form.
    setWork(""); setPrice(""); setLocation(""); setClient("");
  };

  return (
    <form onSubmit={handleSave} aria-label="Job entry form" className="space-y-6">

      {/* 1. DETAILS: Full width for readability. */}
      <div className="space-y-4">
        <Input id={locationId} label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Input id={clientId} label="Client" value={client} onChange={(e) => setClient(e.target.value)} />
      </div>

      {/* 2. MENU: Grid for speed. */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-ledger-muted mb-3">Quick Services</legend>
        <div className="grid grid-cols-2 gap-3">
          {SERVICE_PRESETS.map(p => (
            <button key={p.id} type="button" onClick={() => handlePresetClick(p)}
              className="h-20 bg-white border-2 border-slate-200 rounded-xl active:border-ledger-action active:bg-blue-50 transition-all flex flex-col items-center justify-center p-2 shadow-sm touch-manipulation"
            >
              <span className="text-sm font-bold text-ledger-ink uppercase">{p.label}</span>
              <span className="text-lg font-black text-ledger-success">${p.defaultPrice}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 3. CLOSE: Total next to Save for fast verification. */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <Input id={workId} label="Description" value={work} onChange={(e) => setWork(e.target.value)} />
        <div className="grid grid-cols-2 gap-4 items-end">
          <Input id={priceId} label="Total ($)" type="number" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button type="submit" disabled={!isValid}>
            {isValid ? "SAVE JOB" : "ENTER INFO"}
          </Button>
        </div>
      </div>
    </form>
  );
}
