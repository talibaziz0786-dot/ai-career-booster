const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Adobe",
  "Meta",
];

export default function TrustedCompanies() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-sm uppercase tracking-widest text-slate-500">
          Trusted By Candidates Targeting
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-center
                    font-semibold
                    text-slate-700
                    shadow-md

                    dark:border-white/10
                    dark:bg-white/5
                    dark:text-slate-300
                    "
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}