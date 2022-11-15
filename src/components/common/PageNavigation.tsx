import { FC, useState, useEffect, MouseEvent } from 'react'
import { type DocHeading } from '../../contentlayer/document/Doc'
import { parseHeading } from 'src/utils/parseHeading'
import { Icon } from './Icon'
import { sluggifyTitle } from '../../utils/sluggify'
import scrollToAnchorLinkTarget from 'src/utils/scrollToAnchorLinkTarget'

const transformHeading = (text: string) => {
  const heading = parseHeading(text)

  return heading.api ? (
    <span>
      <span
        className="font-displayMono font-bold"
        dangerouslySetInnerHTML={{
          __html: heading.api.identifier
            .replace(/</g, '&lt;')
            .replace('`', '<code style="font-size: 0.75rem;">')
            .replace('`', '</code>'),
        }}
      />
      {heading.api.isFunction && <span className=" whitespace-nowrap ">()</span>}
    </span>
  ) : (
    <span
      dangerouslySetInnerHTML={{
        __html: heading.cleanText
          .replace(/</g, '&lt;')
          .replace('`', '<code style="font-size: 0.75rem;">')
          .replace('`', '</code>'),
      }}
    />
  )
}

export const PageNavigation: FC<{ headings: DocHeading[] }> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const heading of headings) {
        const slug = heading.id
        const element = document.getElementById(slug)
        if (element && element.getBoundingClientRect().top < 240) current = slug
      }
      setActiveHeading(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const headingsToRender = headings.filter((_) => _.level > 1)

  if ((headingsToRender ?? []).length === 0) return null

  function followTheLink(event: MouseEvent, href: string) {
    scrollToAnchorLinkTarget(event, href)
  }

  return (
    <div className="text-sm">
      <h4 className="dark:text-white/600 mb-4 font-medium">On this page</h4>
      <ul className="space-y-2  dark:border-gray-800">
        {headingsToRender.map(({ title, level, id }, index) => {
          const href = `#${sluggifyTitle(parseHeading(title).cleanText)}`

          return (
            <li key={index}>
              <a
                href={href}
                style={{ marginLeft: (level - 2) * 12 }}
                className={`flex text-slate-400 ${
                  id == activeHeading ? 'dark:text-glow-100' : 'dark:hover:text-glow-100'
                }`}
                onClick={(event) => followTheLink(event, href)}
              >
                {transformHeading(title)}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
