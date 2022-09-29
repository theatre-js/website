import { FC } from 'react'
import classnames from 'classnames'
import { Icon, IconName } from './Icon'
import Link from 'next/link'
import { isExternalUrl } from '../../utils/helpers'

const themeClasses = {
  primary:
    'bg-teal-600 text-teal-50 border-teal-800 hover:bg-teal-500 dark:bg-teal-600 dark:border-teal-700 dark:hover:bg-teal-500 dark:hover:border-teal-600',
  secondary:
    'bg-white-100 text-white-800 border-white-200 hover:bg-white-50 dark:text-white-300 dark:border-white-500/30 dark:hover:bg-white-500/30 dark:bg-white-500/20',
}

export const Button: FC<{
  label: string
  action?: () => void
  theme?: 'primary' | 'secondary'
  href?: string
  icon?: IconName
  className?: string
}> = ({ label, action, href, theme = 'primary', icon, className }) => {
  const sharedClasses =
    'px-6 py-2 flex justify-center items-center space-x-3 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-900'

  if (href) {
    return (
      <Link href={href}>
        <a
          className={classnames(sharedClasses, themeClasses[theme], className)}
          onClick={action}
          aria-label={label}
          target={isExternalUrl(href) ? '_blank' : undefined}
          rel={isExternalUrl(href) ? 'noreferrer' : undefined}
        >
          <span className="whitespace-nowrap">{label}</span>
          {icon && (
            <span className="w-5">
              <Icon name={icon} />
            </span>
          )}
        </a>
      </Link>
    )
  } else {
    return (
      <button className={classnames(sharedClasses, themeClasses[theme], className)} onClick={action} aria-label={label}>
        <span>{label}</span>
        {icon && (
          <span className="w-5">
            <Icon name={icon} />
          </span>
        )}
      </button>
    )
  }
}
