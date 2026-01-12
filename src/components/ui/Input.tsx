import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold uppercase tracking-wider text-industrial-muted">
        {label}
      </label>
      {/* Force 18px font (text-lg) to prevent iOS from auto-zooming on focus. */}
      <input
        className={`w-full h-[60px] bg-industrial-surface border-2 border-zinc-800 focus:border-industrial-action text-industrial-text px-4 text-lg rounded-sm outline-none transition-colors appearance-none ${className}`}
        {...props}
      />
    </div>
  );
}
