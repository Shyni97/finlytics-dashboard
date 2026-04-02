import { Moon, Sun, Download, Menu, LogOut } from 'lucide-react'
import Button from '../ui/Button'

function TopNavbar({
  role,
  theme,
  onToggleTheme,
  onExportCsv,
  onOpenMobileNav,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#d7dde3] bg-[#f8f9fb]/90 px-4 py-3 backdrop-blur-xl md:px-6 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg border border-slate-200 p-2 md:hidden dark:border-slate-700"
            onClick={onOpenMobileNav}
            aria-label="Open navigation"
          >
            <Menu size={18} className="text-slate-700 dark:text-slate-200" />
          </button>

          <div>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-100">Finlytics</h2>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">Track, analyze, and optimize your money flow</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-w-[120px] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium capitalize text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            {role}
          </span>

          <Button variant="ghost" onClick={onToggleTheme} aria-label="Toggle dark mode">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </Button>

          <Button variant="ghost" onClick={onExportCsv} className="hidden md:inline-flex">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>

          <Button variant="ghost" onClick={onLogout} className="px-3 sm:px-4">
            <LogOut size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
