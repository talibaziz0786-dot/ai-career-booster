export default function Footer() {
  return (
    <footer className="bg-white
border-t
border-slate-200

dark:bg-slate-950
dark:border-white/10 py-16">


      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
           <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              CareerBoost AI
            </h3>

            <p className="mt-4 text-slate-600 dark:text-slate-400 ">
              AI-powered career acceleration platform.
            </p>
          </div>

          <div>
            <h4
  className="
  font-semibold
  text-slate-900
  dark:text-white
  "
>
              Product
            </h4>

            <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-400 ">
              <p>Resume Builder</p>
              <p>ATS Checker</p>
              <p>Interview Prep</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-white">
              Company
            </h4>

            <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <p>About</p>
              <p>Pricing</p>
              <p>Contact</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-white">
              Legal
            </h4>

            <div className="mt-4 space-y-2 text-slate-600  dark:text-slate-400">
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black dark:border-white/10 pt-8 text-center text-slate-600  dark:text-slate-400">
          © 2026 CareerBoost AI
        </div>
      </div>
    </footer>
  );
}