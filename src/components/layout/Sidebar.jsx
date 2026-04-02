import { LayoutDashboard, WalletCards, Lightbulb, ReceiptText } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'transactions', label: 'Transactions', icon: WalletCards },
  { key: 'bills', label: 'Bills', icon: ReceiptText },
  { key: 'insights', label: 'Insights', icon: Lightbulb },
]

function Sidebar({ activePage, onChange, className = '' }) {
  return (
    <aside className={`flex h-full w-full flex-col border-r border-[#1f2a33] bg-[#11161d] p-5 md:w-64 ${className}`}>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Finlytics</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">Finance Dashboard</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                activePage === item.key
                  ? 'bg-[#2fa49a] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-[#1a232d]',
              )}
            >
              <Icon size={18} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-[#1f2a33] bg-[#161d25] p-4">
        <p className="text-xs text-slate-400">Tip</p>
        <p className="mt-1 text-sm text-slate-200">
          Use role switcher in the top bar to test Viewer/Admin behavior.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
