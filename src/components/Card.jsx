function Card({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-950/40">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Finlytics.IO</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  )
}

export default Card
