import type { InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
  error,
  ...props
}: Props) {
  return (
    <div>
      <input
        {...props}
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        outline-none
        transition

        focus:border-cyan-500

        dark:border-white/10
        dark:bg-slate-900
        dark:text-white
        "
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}