import { FC, MouseEvent, ReactNode } from 'react'
import NextLink from 'next/link'
import { Icon } from './Icon'
import scrollToAnchorLinkTarget from 'src/utils/scrollToAnchorLinkTarget'

export const Link: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const isExternalUrl = !(href.startsWith('/') || href.startsWith('#'))

  function followTheLink(event: MouseEvent, href: string) {
    const isAnchorLink = href.startsWith('#')
    if (isAnchorLink) {
      scrollToAnchorLinkTarget(event, href)
    }
  }

  return (
    <NextLink href={href}>
      <a
        className="space-x-1"
        target={isExternalUrl ? '_blank' : undefined}
        rel={isExternalUrl ? 'noreferrer' : undefined}
        onClick={(e) => followTheLink(e, href)}
      >
        <span>{children}</span>
        {/* removing the icon as it makes the prose messy */}
        {/* {isExternalUrl && (
          <span className="block w-4">
            <Icon name="external-link" />
          </span>
        )} */}
      </a>
    </NextLink>
  )
}
