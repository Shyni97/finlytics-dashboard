# Finance Dashboard UI

A clean, modern, and fully responsive finance dashboard built with React, Tailwind CSS, Recharts, and Zustand.

This project demonstrates a production-style frontend architecture with role-based UI behavior, local persistence, analytics, and reusable components.

## Project Overview

The dashboard allows users to:

- View financial summaries (balance, income, expenses)
- Analyze trends over time with charts
- Manage and filter transactions
- Use account-based roles (Viewer/Admin) assigned at signup
- Read automatic spending insights
- Persist data and preferences in localStorage
- Use a localStorage-based login/signup flow with protected dashboard access

No backend is required. All data is mock/static and managed on the client.

## Features

### Layout & Navigation

- Responsive sidebar navigation (Dashboard, Transactions, Insights)
- Top navigation with:
	- Current role badge (Viewer/Admin)
	- Dark mode toggle
	- CSV export action
- Mobile slide-in navigation drawer

### Authentication (New)

- Dedicated Login and Signup pages
- Required flow: Signup -> Login -> Dashboard
- Required field validation and disabled submit buttons until forms are complete
- Password show/hide toggle on both Login and Signup
- Role selector (Viewer/Admin) on Signup form
- Keep me signed in checkbox and forgot password link (UI)
- Continue with Google button (UI)
- Protected dashboard route:
	- Not logged in: redirected to /login
	- Logged in: allowed access to /dashboard
- Logout from dashboard clears the active session and redirects to /login

### Dashboard Overview

- Summary cards:
	- Total Balance
	- Total Income
	- Total Expenses
- Balance trend line chart
- Spending breakdown pie chart by category

### Transactions

- Transaction table with:
	- Date
	- Amount
	- Category
	- Type (Income/Expense)
- Search by category or amount
- Filter by type
- Sort by date and amount
- Admin-only capabilities:
	- Add transaction
	- Edit transaction (modal form)
- Viewer mode is read-only
- Empty states for filtered/no data views

### Insights

- Highest spending category
- Monthly income vs expense comparison
- Dynamic observation text based on month-over-month spending changes

### UX & Polish

- Smooth transitions and page animations
- Modern card/table/modal design language
- Light and dark themes
- localStorage persistence for:
	- Role
	- Theme
	- Transactions

## Tech Stack

- React (functional components + hooks)
- Vite
- Tailwind CSS (via @tailwindcss/vite)
- Recharts
- Zustand (with persist middleware)
- Framer Motion
- Lucide React icons
- React Router DOM

## Folder Structure

src/
- components/
	- Button.jsx
	- Card.jsx
	- Input.jsx
	- charts/
	- layout/
	- transactions/
	- ui/
- data/
- pages/
	- Login.jsx
	- Signup.jsx
	- DashboardShell.jsx
- routes/
	- ProtectedRoute.jsx
- store/
- utils/
	- auth.js

## State Management Approach

Zustand store centralizes UI and financial state:

- role: viewer/admin
- theme: light/dark
- activePage: dashboard/transactions/insights
- transactions: list of records
- filters: search, type, sort

Key design choices:

- Store actions encapsulate all writes (add/edit/filter/theme/role)
- Persistence uses localStorage through Zustand middleware
- Selective persistence keeps only necessary state across refreshes

## Role-Based Logic

- Viewer:
	- Can browse dashboard, transactions, and insights
	- Cannot add or edit transactions
- Admin:
	- Full Viewer access
	- Can add and edit transactions through modal forms

Role is assigned when the account is created and applied at signup.

To use the app: create an account first, then login to access the dashboard.

## Setup Instructions

### 1. Install dependencies

npm install

### 2. Start development server

npm run dev

### 3. Build for production

npm run build

### 4. Lint the project

npm run lint

## Notes

- Data starts from static mock transactions.
- All updates are persisted locally in the browser.
- CSV export downloads the current transaction dataset.
- Quick note: finance data is sensitive, so login is implemented to protect dashboard access.

## Future Enhancements

- Add category management and tags
- Add recurring transaction simulation
- Add budget goals and alerts
- Add route-based URLs for each section

