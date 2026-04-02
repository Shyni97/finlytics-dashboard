import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionsTable from '../components/transactions/TransactionsTable'
import TransactionForm from '../components/transactions/TransactionForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { filterAndSortTransactions } from '../utils/finance'

function TransactionsPage({
  role,
  transactions,
  filters,
  onFilterChange,
  onResetFilters,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const [isAddOpen, setAddOpen] = useState(false)
  const [editingTx, setEditingTx] = useState(null)
  const [deletingTx, setDeletingTx] = useState(null)

  const visibleTransactions = useMemo(
    () => filterAndSortTransactions(transactions, filters),
    [transactions, filters],
  )

  const canEdit = role === 'admin'

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Transactions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {canEdit ? 'Manage your financial entries.' : 'Viewer mode: read-only access.'}
          </p>
        </div>

        {canEdit ? (
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Transaction
          </Button>
        ) : null}
      </div>

      <TransactionFilters filters={filters} onChange={onFilterChange} onReset={onResetFilters} />

      {visibleTransactions.length ? (
        <TransactionsTable
          transactions={visibleTransactions}
          canEdit={canEdit}
          onEdit={(tx) => setEditingTx(tx)}
          onDelete={(tx) => setDeletingTx(tx)}
        />
      ) : (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction as Admin."
        />
      )}

      <Modal isOpen={isAddOpen} title="Add Transaction" onClose={() => setAddOpen(false)}>
        <TransactionForm
          key="add-form"
          mode="add"
          onCancel={() => setAddOpen(false)}
          onSubmit={(payload) => {
            onAddTransaction(payload)
            setAddOpen(false)
          }}
        />
      </Modal>

      <Modal
        isOpen={Boolean(editingTx)}
        title="Edit Transaction"
        onClose={() => setEditingTx(null)}
      >
        <TransactionForm
          key={editingTx?.id || 'edit-form'}
          mode="edit"
          initialValues={editingTx}
          onCancel={() => setEditingTx(null)}
          onSubmit={(payload) => {
            onEditTransaction(editingTx.id, payload)
            setEditingTx(null)
          }}
        />
      </Modal>

      <Modal
        isOpen={Boolean(deletingTx)}
        title="Delete Transaction"
        onClose={() => setDeletingTx(null)}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to delete this transaction?
          </p>

          {deletingTx ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/60">
              <p className="font-medium text-slate-900 dark:text-slate-100">{deletingTx.category}</p>
              <p className="text-slate-500 dark:text-slate-400">
                {deletingTx.date} • {deletingTx.type} • ${deletingTx.amount}
              </p>
            </div>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setDeletingTx(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                onDeleteTransaction(deletingTx.id)
                setDeletingTx(null)
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default TransactionsPage
