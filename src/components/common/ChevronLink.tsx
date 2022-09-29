import { FC } from 'react'
import Link from 'next/link'
import { Icon, IconName } from './Icon'

const isExternalUrl = (link: string): boolean => !link.startsWith('/')

export const ChevronLink: FC<{ label: string; url: string; icon?: IconName }> = ({ label, url, icon }) => {
  return (
    <Link href={url}>
      <a
        target={isExternalUrl(url) ? '_blank' : undefined}
        rel={isExternalUrl(url) ? 'noreferrer' : undefined}
        className="inline-flex items-center space-x-1.5 no-underline hover:text-teal-700 dark:text-teal-200 dark:hover:text-teal-300"
      >
        {icon ? (
          <span className="block w-4">
            <Icon name={icon} />
          </span>
        ) : undefined}
        <span className="font-semibold">{label}</span>
        <span className="block w-2">
          <Icon name="chevron-right" />
        </span>
      </a>
    </Link>
  )
}
