import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/finance'

function BalanceLineChart({ data }) {
  return (
    <div className="h-[280px] rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-3 shadow-sm sm:h-[320px] sm:p-4 dark:border-slate-700 dark:bg-slate-900/90">
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Balance Trend</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ left: 12, right: 12, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b822" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2fa49a"
            strokeWidth={3}
            dot={{ r: 4, fill: '#1d7f77' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceLineChart
