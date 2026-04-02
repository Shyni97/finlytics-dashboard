import { motion } from 'framer-motion'
import { CalendarDays, CreditCard } from 'lucide-react'
import { billsData } from '../data/billsData'
import { formatCurrency } from '../utils/finance'

const MotionArticle = motion.article

function BillsPage() {
  const totalUpcoming = billsData.reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Upcoming Bills</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track recurring payments and due dates before they hit your balance.
          </p>
        </div>

        <div className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] px-4 py-3 dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Total Upcoming</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(totalUpcoming)}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-white/80 text-xs uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300">
              <tr>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Logo</th>
                <th className="px-5 py-4">Item Description</th>
                <th className="px-5 py-4">Last Charge</th>
                <th className="px-5 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {billsData.map((bill) => (
                <tr key={bill.id} className="border-b border-slate-200/70 last:border-b-0 dark:border-slate-800">
                  <td className="px-5 py-5">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{bill.dueMonth}</span>
                      <span className="text-lg font-semibold">{bill.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
                        style={{ backgroundColor: bill.accent }}
                      >
                        {bill.badge}
                      </div>
                      <span className="text-base font-medium text-slate-900 dark:text-slate-100">{bill.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{bill.description}</p>
                      <p className="mt-1 max-w-xl text-sm text-slate-500 dark:text-slate-400">{bill.details}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-slate-500 dark:text-slate-400">{bill.lastCharge}</td>
                  <td className="px-5 py-5 text-right">
                    <span className="inline-flex min-w-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                      {formatCurrency(bill.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 lg:hidden">
          {billsData.map((bill, index) => (
            <MotionArticle
              key={bill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
                    style={{ backgroundColor: bill.accent }}
                  >
                    {bill.badge}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{bill.company}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Due {bill.dueMonth} {bill.dueDate}</p>
                  </div>
                </div>
                <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  {formatCurrency(bill.amount)}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p className="font-medium text-slate-900 dark:text-slate-100">{bill.description}</p>
                <p className="text-slate-500 dark:text-slate-400">{bill.details}</p>
                <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CalendarDays size={14} />
                  Last charge: {bill.lastCharge}
                </p>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-4 dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Due Soon</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">2</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Bills due in the next 7 days.</p>
        </div>
        <div className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-4 dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Autopay Ready</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">3</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Recurring bills configured for auto payment.</p>
        </div>
        <div className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-4 dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Payment Reminder</p>
          <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            <CreditCard size={20} className="text-[#2fa49a]" />
            On
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Notifications are enabled for bill due dates.</p>
        </div>
      </div>
    </section>
  )
}

export default BillsPage
