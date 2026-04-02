function Input({ label, error, rightSlot, className = '', ...props }) {
  return (
    <label className="block text-sm text-slate-600 dark:text-slate-300">
      <span className="mb-1 block font-medium">{label}</span>
      <div className="relative">
        <input
          className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`}
          {...props}
        />
        {rightSlot ? <div className="absolute inset-y-0 right-2 flex items-center">{rightSlot}</div> : null}
      </div>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </label>
  )
}

export default Input
