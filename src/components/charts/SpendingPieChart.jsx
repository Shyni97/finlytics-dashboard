import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/finance'

const COLORS = ['#0f766e', '#0ea5e9', '#0369a1', '#155e75', '#14b8a6', '#0284c7']

function SpendingPieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const sortedData = data.slice().sort((a, b) => b.value - a.value)

  return (
    <div className="rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-3 shadow-sm sm:p-4 dark:border-slate-700 dark:bg-slate-900/90">
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h3>

      {!sortedData.length ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No expense data yet.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-center">
          <div className="h-[220px] sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={84}
                  className="sm:[&_.recharts-sector]:opacity-100"
                  paddingAngle={2}
                  label={false}
                  stroke="none"
                >
                  {sortedData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
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

          <div className="space-y-2">
            {sortedData.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(0)
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg bg-slate-100/80 px-3 py-2 text-sm dark:bg-slate-800/70"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="max-w-[140px] truncate text-slate-700 dark:text-slate-200 sm:max-w-none">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpendingPieChart
