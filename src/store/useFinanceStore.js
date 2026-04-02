import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'

const defaultFilters = {
  search: '',
  type: 'all',
  sortBy: 'date_desc',
}

export const useFinanceStore = create(
  persist(
    (set) => ({
      role: 'viewer',
      theme: 'light',
      activePage: 'dashboard',
      filters: defaultFilters,
      transactions: mockTransactions,
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setActivePage: (activePage) => set({ activePage }),
      setFilters: (partial) =>
        set((state) => ({ filters: { ...state.filters, ...partial } })),
      resetFilters: () => set({ filters: defaultFilters }),
      addTransaction: (payload) =>
        set((state) => ({
          ...(state.role !== 'admin'
            ? { transactions: state.transactions }
            : { transactions: [{ ...payload, id: crypto.randomUUID() }, ...state.transactions] }),
        })),
      updateTransaction: (id, payload) =>
        set((state) => ({
          ...(state.role !== 'admin'
            ? { transactions: state.transactions }
            : {
                transactions: state.transactions.map((tx) =>
                  tx.id === id ? { ...tx, ...payload } : tx,
                ),
              }),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          ...(state.role !== 'admin'
            ? { transactions: state.transactions }
            : { transactions: state.transactions.filter((tx) => tx.id !== id) }),
        })),
    }),
    {
      name: 'finance-dashboard-store-v1',
      partialize: (state) => ({
        role: state.role,
        theme: state.theme,
        transactions: state.transactions,
        activePage: state.activePage,
      }),
    },
  ),
)
