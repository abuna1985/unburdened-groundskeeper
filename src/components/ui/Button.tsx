import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * - GOAL: Rugged, physical-feeling action button.
 * - SIZE: 80px (Mobile) for gloves; 60px (Desktop) for density.
 * - FEEDBACK: Scale effect confirms tap without sound.
 * - STATE: Distinct disabled style prevents confusion.
*/
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  // Use h-[60px] to accommodate gloves and reduced dexterity in the field.
  const baseStyles = "w-full h-[80px] lg:h-[60px] flex items-center justify-center font-bold text-2xl lg:text-xl rounded-xl transition-all active:scale-95 touch-manipulation disabled:active:scale-100 disabled:cursor-not-allowed";
  const variants = {
    // Main action (Save). Grey when locked.
    primary: "bg-ledger-action text-white shadow-lg shadow-blue-200/50 disabled:bg-slate-300 disabled:shadow-none",
    // Alternative actions (Cancel). Fades text when locked.
    secondary: "bg-white text-ledger-ink border-2 border-slate-200 hover:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100",
    // Destructive actions (Delete).
    danger: "bg-red-50 text-ledger-danger border-2 border-ledger-danger disabled:opacity-50",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
