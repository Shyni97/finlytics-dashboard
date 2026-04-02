import { motion } from 'framer-motion'
import clsx from 'clsx'

const MotionArticle = motion.article

function Card({ title, value, subtitle, accent = 'from-sky-500 to-cyan-500', className }) {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-[#d7dde3] bg-[#f5f7fa] p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/90',
        className,
      )}
    >
      <div
        className={clsx(
          'pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-xl transition group-hover:opacity-35',
          accent,
        )}
      />
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</h3>
      {subtitle ? (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      ) : null}
    </MotionArticle>
  )
}

export default Card
