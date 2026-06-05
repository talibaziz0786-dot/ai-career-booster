interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`
      relative
      py-28
      ${className}
      `}
    >
      <div className="mx-auto max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}