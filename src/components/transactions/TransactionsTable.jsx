import { formatCurrency, formatDate } from '../../utils/finance'
import Button from '../ui/Button'

function TransactionsTable({ transactions, canEdit, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
      <div className="space-y-3 p-3 sm:hidden">
        {transactions.map((tx) => (
          <article key={tx.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{tx.category}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(tx.date)}</p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  tx.type === 'income'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                }`}
              >
                {tx.type}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {tx.type === 'expense' ? '-' : '+'}
                {formatCurrency(tx.amount)}
              </p>
              {canEdit ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => onEdit(tx)} className="px-3 py-1.5 text-xs">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(tx)}
                    className="px-3 py-1.5 text-xs"
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100/70 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              {canEdit ? <th className="px-4 py-3 text-right">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t border-slate-200/70 dark:border-slate-800">
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{formatDate(tx.date)}</td>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                  {tx.type === 'expense' ? '-' : '+'}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{tx.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      tx.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                {canEdit ? (
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="ghost" onClick={() => onEdit(tx)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(tx)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionsTable
