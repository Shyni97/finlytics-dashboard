const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' })

export const formatCurrency = (amount) => currencyFormatter.format(amount)

export const formatDate = (dateValue) => {
  const date = new Date(dateValue)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export const getSummary = (transactions) => {
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'income') {
        acc.income += tx.amount
      } else {
        acc.expenses += tx.amount
      }
      return acc
    },
    { income: 0, expenses: 0 },
  )

  return {
    totalIncome: totals.income,
    totalExpenses: totals.expenses,
    totalBalance: totals.income - totals.expenses,
  }
}

export const getBalanceTrend = (transactions) => {
  const grouped = transactions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, tx) => {
      const date = new Date(tx.date)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!acc[key]) {
        acc[key] = {
          monthLabel: monthFormatter.format(date),
          delta: 0,
        }
      }
      acc[key].delta += tx.type === 'income' ? tx.amount : -tx.amount
      return acc
    }, {})

  let runningBalance = 0

  return Object.values(grouped).map((item) => {
    runningBalance += item.delta
    return {
      month: item.monthLabel,
      balance: runningBalance,
    }
  })
}

export const getSpendingBreakdown = (transactions) => {
  const byCategory = transactions.reduce((acc, tx) => {
    if (tx.type !== 'expense') {
      return acc
    }

    acc[tx.category] = (acc[tx.category] || 0) + tx.amount
    return acc
  }, {})

  return Object.entries(byCategory).map(([name, value]) => ({ name, value }))
}

export const getMonthlyComparison = (transactions) => {
  const monthly = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    if (!acc[key]) {
      acc[key] = {
        key,
        month: monthFormatter.format(date),
        income: 0,
        expenses: 0,
      }
    }

    if (tx.type === 'income') {
      acc[key].income += tx.amount
    } else {
      acc[key].expenses += tx.amount
    }

    return acc
  }, {})

  return Object.values(monthly).sort((a, b) => {
    const [aYear, aMonth] = a.key.split('-').map(Number)
    const [bYear, bMonth] = b.key.split('-').map(Number)
    return new Date(aYear, aMonth) - new Date(bYear, bMonth)
  })
}

export const getInsights = (transactions) => {
  const monthly = getMonthlyComparison(transactions)
  const spending = getSpendingBreakdown(transactions)

  const highestSpending = spending.length
    ? spending.reduce((max, item) => (item.value > max.value ? item : max))
    : { name: 'No expenses yet', value: 0 }

  const latestMonth = monthly[monthly.length - 1]
  const previousMonth = monthly[monthly.length - 2]

  let observation = 'Not enough data yet. Add more transactions to unlock trend observations.'

  if (latestMonth && previousMonth && previousMonth.expenses > 0) {
    const change = ((latestMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100
    const rounded = Math.abs(change).toFixed(0)

    if (change > 0) {
      observation = `You spent ${rounded}% more than last month.`
    } else if (change < 0) {
      observation = `Great control: spending dropped ${rounded}% from last month.`
    } else {
      observation = 'Spending stayed exactly the same as last month.'
    }
  }

  return {
    highestSpending,
    monthly,
    observation,
  }
}

export const getGoalProgress = (transactions, target = 20000) => {
  const summary = getSummary(transactions)
  const achieved = Math.max(summary.totalBalance, 0)
  const progressPercent = target > 0 ? (achieved / target) * 100 : 0

  return {
    target,
    achieved,
    progressPercent,
  }
}

export const getUpcomingBills = () => {
  const currentDate = new Date()
  const month = currentDate.toLocaleString('en-US', { month: 'short' })

  return [
    { category: 'Shopping', amount: 450, dueDate: 17, month },
    { category: 'Entertainment', amount: 340, dueDate: 21, month },
    { category: 'Groceries', amount: 155, dueDate: 5, month },
    { category: 'Dining', amount: 280, dueDate: 29, month },
  ]
}

export const getRecentTransactions = (transactions, limit = 5) =>
  transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)

export const getExpenseCategories = (transactions) => {
  const categories = getSpendingBreakdown(transactions).sort((a, b) => b.value - a.value)
  const total = categories.reduce((sum, item) => sum + item.value, 0)

  return categories.map((item) => ({
    name: item.name,
    value: item.value,
    percentage: total ? Math.round((item.value / total) * 100) : 0,
  }))
}

export const filterAndSortTransactions = (transactions, filters) => {
  const query = filters.search.trim().toLowerCase()

  const filtered = transactions.filter((tx) => {
    const matchesType = filters.type === 'all' || tx.type === filters.type

    const amountText = String(tx.amount)
    const matchesSearch =
      !query ||
      tx.category.toLowerCase().includes(query) ||
      amountText.includes(query)

    return matchesType && matchesSearch
  })

  return filtered.sort((a, b) => {
    if (filters.sortBy === 'date_asc') {
      return new Date(a.date) - new Date(b.date)
    }

    if (filters.sortBy === 'amount_desc') {
      return b.amount - a.amount
    }

    if (filters.sortBy === 'amount_asc') {
      return a.amount - b.amount
    }

    return new Date(b.date) - new Date(a.date)
  })
}

export const downloadCsv = (transactions) => {
  const headers = ['Date', 'Amount', 'Category', 'Type']
  const rows = transactions.map((tx) => [tx.date, tx.amount, tx.category, tx.type])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.setAttribute('download', 'transactions.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
