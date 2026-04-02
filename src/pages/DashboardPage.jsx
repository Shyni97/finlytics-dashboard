import Card from '../components/ui/Card'
import BalanceLineChart from '../components/charts/BalanceLineChart'
import EmptyState from '../components/ui/EmptyState'
import GoalsProgressWidget from '../components/widgets/GoalsProgressWidget'
import UpcomingBillsWidget from '../components/widgets/UpcomingBillsWidget'
import RecentTransactionsWidget from '../components/dashboard/RecentTransactionsWidget'
import ExpenseBreakdownWidget from '../components/dashboard/ExpenseBreakdownWidget'
import {
  formatCurrency,
  getSummary,
  getBalanceTrend,
  getGoalProgress,
  getUpcomingBills,
  getRecentTransactions,
  getExpenseCategories,
} from '../utils/finance'

function DashboardPage({ transactions }) {
  const summary = getSummary(transactions)
  const trendData = getBalanceTrend(transactions)
  const goalData = getGoalProgress(transactions)
  const upcomingBills = getUpcomingBills(transactions)
  const recentTransactions = getRecentTransactions(transactions)
  const expenseCategories = getExpenseCategories(transactions)

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#d7dde3] bg-[#f6f8fb] px-5 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Dashboard Overview</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">Your money at a glance</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Start here to see what you have, what you’ve spent, and what needs attention next.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card
              title="Total Balance"
              value={formatCurrency(summary.totalBalance)}
              subtitle="What you have left after spending"
              accent="from-[#2fa49a] to-[#24958d]"
            />
            <Card
              title="Total Income"
              value={formatCurrency(summary.totalIncome)}
              subtitle="Money coming in"
              accent="from-[#49b7ae] to-[#2fa49a]"
            />
            <Card
              title="Total Expenses"
              value={formatCurrency(summary.totalExpenses)}
              subtitle="Money going out"
              accent="from-[#5a646e] to-[#3f4952]"
            />
          </div>

          {transactions.length === 0 ? (
            <EmptyState
              title="No financial activity yet"
              description="Add your first transaction to unlock trends and charts."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <RecentTransactionsWidget transactions={recentTransactions} />
              <section className="rounded-2xl border border-[#d7dde3] bg-[#f6f8fb] p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Statistics</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      A simple trend view of your balance over time.
                    </p>
                  </div>
                </div>
                <BalanceLineChart data={trendData} />
              </section>
            </div>
          )}

          {transactions.length > 0 ? <ExpenseBreakdownWidget categories={expenseCategories} /> : null}
        </div>

        <aside className="space-y-6">
          <GoalsProgressWidget goal={goalData} />
          <UpcomingBillsWidget bills={upcomingBills} />
        </aside>
      </div>
    </section>
  )
}

export default DashboardPage
