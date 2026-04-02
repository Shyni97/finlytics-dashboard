function TransactionFilters({ filters, onChange, onReset }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm md:grid-cols-4 dark:border-slate-700 dark:bg-slate-900/90">
      <input
        type="text"
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search category or amount"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
      />

      <select
        value={filters.type}
        onChange={(event) => onChange({ type: event.target.value })}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(event) => onChange({ sortBy: event.target.value })}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
      >
        <option value="date_desc">Newest Date</option>
        <option value="date_asc">Oldest Date</option>
        <option value="amount_desc">Highest Amount</option>
        <option value="amount_asc">Lowest Amount</option>
      </select>

      <button
        onClick={onReset}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default TransactionFilters
