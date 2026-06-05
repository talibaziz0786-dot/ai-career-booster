import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105",
        className
      )}
    >
      {children}
    </button>
  );
}