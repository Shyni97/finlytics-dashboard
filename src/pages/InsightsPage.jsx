import { formatCurrency, getInsights } from '../utils/finance'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'

function InsightsPage({ transactions }) {
  if (!transactions.length) {
    return (
      <EmptyState
        title="No insights available"
        description="Insights appear automatically once transactions are available."
      />
    )
  }

  const insights = getInsights(transactions)
  const latestMonth = insights.monthly[insights.monthly.length - 1]

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Highest Spending Category"
          value={insights.highestSpending.name}
          subtitle={formatCurrency(insights.highestSpending.value)}
          accent="from-rose-500 to-orange-500"
        />
        <Card
          title="Latest Monthly Income"
          value={latestMonth ? formatCurrency(latestMonth.income) : '$0'}
          subtitle={latestMonth ? latestMonth.month : 'N/A'}
          accent="from-emerald-500 to-lime-500"
        />
        <Card
          title="Latest Monthly Expense"
          value={latestMonth ? formatCurrency(latestMonth.expenses) : '$0'}
          subtitle={latestMonth ? latestMonth.month : 'N/A'}
          accent="from-sky-500 to-cyan-500"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Observation</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{insights.observation}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Monthly Income vs Expenses</h3>
        <div className="mt-4 space-y-3">
          {insights.monthly.map((month) => (
            <div key={month.month} className="rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/60">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{month.month}</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Income: {formatCurrency(month.income)}
              </p>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Expenses: {formatCurrency(month.expenses)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InsightsPage
