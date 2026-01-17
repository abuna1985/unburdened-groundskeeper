import type { InputHTMLAttributes } from "react";

/**
 * - GOAL: High-visibility input readable in direct sun.
 * - SIZE: 80px/text-2xl (Mobile) for readability; 60px/text-xl (Desktop) for fit.
 * - BEHAVIOR: Font >16px prevents iOS zoom; linked Label hit-area.
*/
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; 
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-bold uppercase tracking-wider text-ledger-muted">
        {label}
      </label>
      <input
        id={id} 
        className={`w-full h-[80px] lg:h-[60px] bg-white border-2 border-slate-200 focus:border-ledger-action text-ledger-ink px-4 text-2xl lg:text-xl font-bold rounded-xl outline-none transition-all shadow-sm appearance-none ${className}`}
        {...props}
      />
    </div>
  );
}
