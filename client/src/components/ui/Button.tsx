import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";

type Size =
  | "sm"
  | "md"
  | "lg";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants = {
  primary:
    "bg-cyan-500 hover:bg-cyan-400 text-white",

  secondary:
    "bg-violet-600 hover:bg-violet-500 text-white",

  outline:
    "border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10",

  danger:
    "bg-red-600 hover:bg-red-500 text-white",

  ghost:
    "bg-transparent hover:bg-white/10 text-white",
};

const sizes = {
  sm: "px-3 py-2 text-sm",

  md: "px-5 py-3",

  lg: "px-7 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      {...props}
      className={clsx(
        "rounded-2xl font-semibold transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}