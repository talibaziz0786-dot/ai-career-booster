import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  className,
}: Props) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400",
        className
      )}
    >
      {children}
    </span>
  );
}