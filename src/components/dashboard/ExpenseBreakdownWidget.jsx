import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../../utils/finance'

function ExpenseBreakdownWidget({ categories }) {
  const total = categories.reduce((sum, item) => sum + item.value, 0)
  const colors = ['#2fa49a', '#1d8ed1', '#0f766e', '#155e75', '#14b8a6', '#0284c7']

  return (
    <section className="rounded-2xl border border-[#d7dde3] bg-[#f6f8fb] p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Expenses Breakdown</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A pie view of where your spending is concentrated.</p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">*Compare to last month</p>
      </div>

      {!categories.length ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No expense data yet.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
          <div className="h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={96}
                  paddingAngle={2}
                  stroke="none"
                >
                  {categories.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _name, item) => [
                    `${formatCurrency(value)} (${((item.payload.value / total) * 100).toFixed(0)}%)`,
                    item.payload.name,
                  ]}
                  contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {categories.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm dark:bg-slate-800/70"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="truncate font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-3 text-right">
                  <span className="text-slate-500 dark:text-slate-400">{formatCurrency(item.value)}</span>
                  <span className="min-w-10 font-semibold text-slate-900 dark:text-slate-100">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ExpenseBreakdownWidget
