const cards = [
  {
    title: "Resumes",
    value: "12",
    color: "text-cyan-500",
  },
  {
    title: "ATS Average",
    value: "92%",
    color: "text-emerald-500",
  },
  {
    title: "Applications",
    value: "38",
    color: "text-orange-500",
  },
  {
    title: "Interviews",
    value: "8",
    color: "text-violet-500",
  },
];

export default function AnalyticsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-lg

          dark:border-white/10
          dark:bg-white/5
        "
        >
          <h3 className="text-slate-500 dark:text-slate-400">
            {card.title}
          </h3>

          <p
            className={`mt-4 text-4xl font-black ${card.color}`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}