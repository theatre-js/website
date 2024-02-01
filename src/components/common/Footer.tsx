import Link from 'next/link'
import { FC } from 'react'
import { Logo } from './Logo'
import { Icon } from './Icon'
import { Heading } from '../landing-page/Heading'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import HorizontalContainer from './HorizontalContainer'

const isExternalUrl = (link: string): boolean => {
  return !link.startsWith('/')
}

const content = {
  note: (
    <>
      Theatre.js is a design tool in the making. We aim to blur the line between designer/developer, author/consumer,
      and artist/scientist.
    </>
  ),
  menus: [
    {
      title: 'Get started with',
      elements: [
        { label: 'React Three Fiber', url: '/docs/0.5/getting-started/with-react-three-fiber' },
        { label: 'THREE.js', url: '/docs/0.5/getting-started/with-three-js' },
        { label: 'HTML/CSS/SVG', url: '/docs/0.5/getting-started/with-html-svg' },
      ],
    },
    {
      title: 'Docs',
      elements: [
        { label: 'Overview', url: '/docs/0.5/' },
        { label: 'Concepts', url: '/docs/0.5/concepts' },
        { label: 'Getting started', url: '/docs/0.5/getting-started' },
        { label: 'Manual', url: '/docs/0.5/manual' },
        { label: 'API', url: '/docs/0.5/api' },
      ],
    },
    {
      title: 'Community',
      elements: [
        { label: 'Twitter', url: 'https://twitter.com/theatre_js' },
        { label: 'Discord', url: 'https://discord.gg/bm9f8F9Y9N' },
        { label: 'GitHub', url: 'https://github.com/theatre-js/theatre' },
      ],
    },
    {
      title: 'Company',
      elements: [
        {
          label: 'Jobs',
          url: '/join',
        },
        {
          label: 'Blog',
          url: 'https://blog.theatrejs.com',
        },
        {
          label: 'Contact',
          url: 'mailto:hello@theatrejs.com',
        },
      ],
    },
  ],
}

export const Footer: FC = () => {
  return (
    <div className="mt-12 border-t border-gray-900  bg-gray-50 dark:bg-black md:mt-24">
      <HorizontalContainer className="pb-16 pt-20 xl:grid xl:grid-cols-3 xl:gap-8 ">
        <div className="w-80 space-y-8 px-4 xl:col-span-1">
          <Link href="/">
            <a className="flex items-center font-bold text-white no-underline dark:text-white">
              <Logo fillColor="white" />
              <VisuallyHidden>Theatre.js</VisuallyHidden>
            </a>
          </Link>
          <div className="mt-4 text-sm text-white dark:text-white">{content.note}</div>
        </div>
        <div className="mt-12 ml-6 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {[
            [0, 1],
            [2, 3],
          ].map((menuIndexes, i) => (
            <div key={'h' + i} className="md:grid md:grid-cols-2 md:gap-8">
              {menuIndexes.map((i) => {
                const { title, elements } = content.menus[i]
                return (
                  <div key={'menu' + i} className={i % 2 === 1 ? 'mt-12 md:mt-0' : ''}>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-white dark:text-white">
                      {title}
                    </h4>
                    <ul className="mx-0 mt-4 list-none space-y-2 text-sm">
                      {elements.map(({ label, url }, index) => (
                        <li key={index}>
                          <Link href={url}>
                            <a
                              className="text-white-500 inline-flex items-center space-x-1 hover:text-white dark:text-white/50 dark:hover:text-white"
                              target={isExternalUrl(url) ? '_blank' : undefined}
                            >
                              <span>{label}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </HorizontalContainer>
      <div className="mx-auto my-16 text-center text-sm text-gray-300">
        &copy; 2022 <span className="font-bold text-white">Theatre.js</span> Oy – Helsinki.
      </div>
    </div>
  )
}
