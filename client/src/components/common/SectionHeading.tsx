interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className="inline-flex rounded-full border border-cyan-500/90 dark:border-cyan-500/20 bg-gray-50 dark:bg-cyan-500/10 px-4 py-2 text-sm text-blue-600 dark:text-cyan-400">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-black dark:text-white text-black md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-black dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}