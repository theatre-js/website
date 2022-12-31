import classNames from 'classnames'
import { ReactNode } from 'react'

export const Section: React.FC<{ children: ReactNode; className?: string | '' }> = ({ children, className }) => {
  return (
    <div className={`my-8 rounded-lg border dark:border-teal-500/50 dark:bg-teal-500/10 ${className}`}>
      <div className="relative p-4 py-4 text-violet-600 dark:text-white/80">
        <div className="theatre-callout-content my-0 mx-3  prose-a:font-semibold">{children}</div>
      </div>
    </div>
  )
}
