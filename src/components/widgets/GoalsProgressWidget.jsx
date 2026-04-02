import { Target } from 'lucide-react'
import { formatCurrency } from '../../utils/finance'

function GoalsProgressWidget({ goal }) {
  const progress = Math.min(goal.progressPercent, 100)

  return (
    <section className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Goals</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Savings Target</h3>
        </div>
        <div className="rounded-lg bg-[#2fa49a]/10 p-2 text-[#2fa49a]">
          <Target size={18} />
        </div>
      </div>

      <p className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-slate-100">{formatCurrency(goal.target)}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        You’ve saved {formatCurrency(goal.achieved)} so far, or {progress.toFixed(0)}% of your target.
      </p>

      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2fa49a] to-[#24958d] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">A simple view of how close you are to your goal.</p>
    </section>
  )
}

export default GoalsProgressWidget
