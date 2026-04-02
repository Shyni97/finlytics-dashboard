import { ChevronRight } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/finance'

function RecentTransactionsWidget({ transactions }) {
  return (
    <section className="rounded-2xl border border-[#d7dde3] bg-[#f6f8fb] p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Transaction</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest activity in one place.</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          View All <ChevronRight size={14} />
        </span>
      </div>

      <div className="mb-4 flex gap-4 border-b border-slate-200 text-sm font-semibold dark:border-slate-700">
        <button className="border-b-2 border-[#2fa49a] pb-3 text-[#2fa49a]">All</button>
        <button className="pb-3 text-slate-500 dark:text-slate-400">Revenue</button>
        <button className="pb-3 text-slate-500 dark:text-slate-400">Expenses</button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-950/60"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{transaction.category}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {transaction.type === 'income' ? 'Income' : 'Expense'} • {formatDate(transaction.date)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {transaction.type === 'expense' ? '-' : '+'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(transaction.date)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentTransactionsWidget
