import { useState } from 'react'
import Button from '../ui/Button'

const baseForm = {
  date: '',
  amount: '',
  category: '',
  type: 'expense',
}

const buildInitialForm = (initialValues) =>
  initialValues
    ? {
        date: initialValues.date,
        amount: String(initialValues.amount),
        category: initialValues.category,
        type: initialValues.type,
      }
    : baseForm

function TransactionForm({ mode = 'add', initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => buildInitialForm(initialValues))

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      date: form.date,
      amount: Number(form.amount),
      category: form.category.trim(),
      type: form.type,
    })

    if (mode === 'add') {
      setForm(baseForm)
    }
  }

  const isDisabled =
    !form.date || !form.category.trim() || Number.isNaN(Number(form.amount)) || Number(form.amount) <= 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Date
          <input
            type="date"
            value={form.date}
            onChange={(event) => handleChange('date', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Amount
          <input
            type="number"
            min="1"
            value={form.amount}
            onChange={(event) => handleChange('amount', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Category
          <input
            type="text"
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
            placeholder="Salary, Groceries, Utilities..."
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Type
          <select
            value={form.type}
            onChange={(event) => handleChange('type', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isDisabled}>
          {mode === 'add' ? 'Add Transaction' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
