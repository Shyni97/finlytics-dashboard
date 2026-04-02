import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopNavbar from '../components/layout/TopNavbar'
import DashboardPage from './DashboardPage'
import TransactionsPage from './TransactionsPage'
import BillsPage from './BillsPage'
import InsightsPage from './InsightsPage'
import { useFinanceStore } from '../store/useFinanceStore'
import { downloadCsv } from '../utils/finance'
import { logoutUser } from '../utils/auth'

const MotionDiv = motion.div

function DashboardShell() {
  const navigate = useNavigate()

  const {
    role,
    theme,
    activePage,
    filters,
    transactions,
    setTheme,
    setActivePage,
    setFilters,
    resetFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinanceStore()

  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleLogout = () => {
    logoutUser()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f1f3f6_0%,#e7ebf0_100%)] dark:bg-[linear-gradient(180deg,#0b1117_0%,#121b25_100%)]">
      <div className="min-h-screen w-full md:pl-64">
        <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:block md:w-64">
          <Sidebar activePage={activePage} onChange={setActivePage} />
        </div>

        <div className="flex min-h-screen flex-col">
          <TopNavbar
            role={role}
            theme={theme}
            onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            onExportCsv={() => downloadCsv(transactions)}
            onOpenMobileNav={() => setMobileNavOpen(true)}
            onLogout={handleLogout}
          />

          <AnimatePresence>
            {isMobileNavOpen ? (
              <MotionDiv
                className="fixed inset-0 z-30 bg-slate-950/45 p-3 sm:p-4 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileNavOpen(false)}
              >
                <MotionDiv
                  className="w-full max-w-[19rem] rounded-2xl bg-white dark:bg-slate-900"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Sidebar
                    activePage={activePage}
                    onChange={(page) => {
                      setActivePage(page)
                      setMobileNavOpen(false)
                    }}
                  />
                </MotionDiv>
              </MotionDiv>
            ) : null}
          </AnimatePresence>

          <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 md:px-6">
            <MotionDiv
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === 'dashboard' ? <DashboardPage transactions={transactions} /> : null}

              {activePage === 'transactions' ? (
                <TransactionsPage
                  role={role}
                  transactions={transactions}
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={resetFilters}
                  onAddTransaction={addTransaction}
                  onEditTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                />
              ) : null}

              {activePage === 'bills' ? <BillsPage /> : null}

              {activePage === 'insights' ? <InsightsPage transactions={transactions} /> : null}
            </MotionDiv>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardShell
