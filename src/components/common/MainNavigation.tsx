import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useKBar } from 'kbar'
import { Icon, IconName } from './Icon'
import { Label } from './Label'
import { Logo } from './Logo'
import { useRouter } from 'next/router'
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher'
import { isExternalUrl } from '../../utils/helpers'
import { Button } from './Button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import HorizontalContainer from './HorizontalContainer'
import classNames from 'classnames'
import { DocsNavigation } from '../docs/DocsNavigation'
import { TreeNode } from 'types/TreeNode'

const navLinks: Array<{ label: string; url: string }> = [
  { label: 'Docs', url: '/docs/latest' },
  { label: 'Blog', url: '/blog' },
  { label: 'Jobs', url: '/join' },
]

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  { label: 'Github', icon: 'github', url: 'https://github.com/theatre-js/theatre' },
  { label: 'Discord', icon: 'discord', url: 'https://discord.gg/bm9f8F9Y9N' },
]

const NavLink: FC<{ label?: string; hideLabel?: boolean; icon?: IconName; url: string; noActive?: boolean }> = ({
  label,
  hideLabel = false,
  icon,
  url,
  noActive,
}) => {
  const router = useRouter()
  const active = router.pathname.split('/')[1] == url.replace('/', '')

  return (
    <Link href={url}>
      <a
        className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
          active && noActive !== true
            ? 'dark:bg-gray-850 dark:text-teal-50'
            : 'text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-850 dark:hover:text-gray-200'
        }`}
        target={isExternalUrl(url) ? '_blank' : undefined}
        rel={undefined}
      >
        {icon && (
          <span className="block w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400">
            <Icon name={icon} />
          </span>
        )}
        {label && <span className={hideLabel ? 'sr-only' : ''}>{label}</span>}
      </a>
    </Link>
  )
}

export const SearchButton: FC<{ showShortcut?: boolean }> = ({ showShortcut = true }) => {
  const { query } = useKBar()

  return (
    <button
      aria-label="Search"
      onClick={query.toggle}
      className="flex h-8 w-full cursor-text items-center rounded-md border border-gray-200 bg-gray-50 px-2 text-sm hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800"
    >
      <span className="mr-2 block w-3">
        <Icon name="search" />
      </span>
      <span className="mr-8 grow text-left text-gray-400 dark:text-gray-500">Search...</span>
      {showShortcut && <Label text="⌘K" />}
    </button>
  )
}

export const MainNavigation: React.FC<{ className?: string; docsTree?: TreeNode[] }> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={classNames(
        'z-45-global-topbar w-full bg-opacity-90 dark:border-gray-850 ',
        // Use z-45-global-topbar to ensure "Docs Menu" button shows up
        'fixed z-45-global-topbar border-b border-gray-200 dark:bg-gray-900',
        props.className,
      )}
    >
      <HorizontalContainer className={classNames('flex items-center justify-between', 'h-16')}>
        <div className="flex items-center space-x-2.5">
          <Link href="/">
            <a className="flex items-center space-x-2.5 font-bold text-gray-800 no-underline dark:text-white">
              <Logo fillColor="white" />
              <VisuallyHidden>Theatre.js</VisuallyHidden>
            </a>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-end text-gray-600 dark:text-gray-300"
          >
            <span className="inline-block w-4">
              <Icon name={open ? 'close' : 'bars'} />
            </span>
          </button>
          {open && (
            <div
              className="fixed right-0 bottom-0 left-0 top-[65px] z-50-global-nav bg-gray-950/10 pb-20 dark:bg-gray-950/50"
              onClick={() => setOpen(false)}
            >
              <div className="absolute inset-0 -z-10" />
              <nav className="-b-30 pb-30 t-0 absolute right-0 h-full divide-y divide-gray-200 overflow-y-auto border-l border-gray-200 bg-white  dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
                <div className="m-8 flex flex-col items-start space-y-2 pb-8 lg:items-end">
                  {!props.docsTree && (
                    <div className="mb-2">
                      <SearchButton showShortcut={false} />
                    </div>
                  )}

                  {navLinks.map(({ label, url }, index) => (
                    <NavLink key={index} label={label} url={url} />
                  ))}
                  {props.docsTree && <DocsNavigation tree={props.docsTree} />}
                </div>

                <div className="flex flex-col content-center items-center justify-center pt-8 align-middle">
                  <div className="flex gap-4 pb-8">
                    {iconLinks.map(({ label, icon, url }, index) => (
                      <NavLink key={index} label={label} hideLabel url={url} icon={icon} />
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
        <nav className="hidden items-center divide-x divide-gray-200 dark:divide-gray-800 md:flex">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink key={index} label={label} url={url} />
            ))}
          </div>
          <div className="flex items-center pl-2 lg:space-x-2 lg:pl-8">
            {/* <ColorSchemeSwitcher /> */}
            {iconLinks.map(({ label, icon, url }, index) => (
              <NavLink key={index} label={label} hideLabel url={url} icon={icon} noActive />
            ))}
          </div>
        </nav>
      </HorizontalContainer>
    </header>
  )
}
