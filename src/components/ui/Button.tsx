import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  const baseStyles =
    "w-full h-[60px] flex items-center justify-center font-bold text-lg uppercase tracking-wide rounded-sm transition-transform active:scale-95 touch-manipulation";

  const variants = {
    primary: "bg-industrial-action text-black hover:bg-yellow-500",
    secondary:
      "bg-industrial-surface text-industrial-text border-2 border-zinc-700",
    danger: "bg-red-900/50 text-red-200 border-2 border-red-900",
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
