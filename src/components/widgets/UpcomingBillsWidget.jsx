import { CalendarClock } from 'lucide-react'
import { formatCurrency } from '../../utils/finance'

function UpcomingBillsWidget({ bills }) {
  return (
    <section className="rounded-[22px] border border-[#d7dde3] bg-[#f6f8fb] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Upcoming Bills</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Scheduled Payments</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A quick reminder of what’s coming up next.
          </p>
        </div>
        <div className="rounded-2xl bg-[#2fa49a]/10 p-3 text-[#2fa49a] dark:bg-[#2fa49a]/15">
          <CalendarClock size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {bills.map((bill) => (
          <article
            key={`${bill.category}-${bill.dueDate}`}
            className="flex items-center justify-between rounded-2xl border border-[#d9e2ec] bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/60"
          >
            <div className="min-w-0">
              <p className="truncate text-base font-medium text-slate-900 dark:text-slate-100">{bill.category}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Due {bill.month} {bill.dueDate}
              </p>
            </div>
            <p className="ml-4 shrink-0 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(bill.amount)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default UpcomingBillsWidget
