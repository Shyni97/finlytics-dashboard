import { AnimatePresence, motion } from 'framer-motion'

const MotionDiv = motion.div

function Modal({ isOpen, title, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <MotionDiv
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionDiv
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            {children}
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
