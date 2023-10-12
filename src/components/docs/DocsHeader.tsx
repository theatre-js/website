import { FC, Fragment, useState, useEffect } from 'react'
import { TreeNode } from 'types/TreeNode'
import Link from 'next/link'
import { DocsNavigation } from './DocsNavigation'
import { Icon } from '../common/Icon'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export const DocsHeader: FC<{ tree: TreeNode[]; breadcrumbs: any[]; title: string }> = ({
  tree,
  breadcrumbs,
  title,
}) => {
  const [top, setTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 100)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className="relative w-full">
        <div className="mx-auto w-full space-y-2 py-8 md:mt-20  ">
          <ul className="-mx-1 flex flex-wrap items-center text-sm">
            {breadcrumbs.map(({ path, title }, index) => (
              <Fragment key={index}>
                {index < breadcrumbs.length - 1 && (
                  <li className="mx-1 flex items-center space-x-2">
                    <Link href={path}>
                      <a className="inline whitespace-nowrap uppercase text-yellow-300 hover:text-gray-600 dark:hover:text-gray-300">
                        {title}
                      </a>
                    </Link>
                    <span className="inline-block w-1.5 text-gray-400 dark:text-yellow-300">
                      <Icon name="chevron-right" />
                    </span>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <h1 className="font-sans text-4xl font-black tracking-tight text-headings-light dark:text-headings-dark md:text-4xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </header>

      <div
        className={classNames(
          `fixed top-16 z-10 hidden h-16 w-full border-b border-gray-200 `,
          `bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:border-gray-800 dark:bg-gray-900 lg:block`,
          top ? 'opacity-0' : 'opacity-100',
        )}
      >
        <ul className="flex h-full items-center space-x-2 text-sm">
          {breadcrumbs.map(({ path, title }, index) => (
            <Fragment key={index}>
              {index < breadcrumbs.length - 1 && (
                <li className="flex items-center space-x-2">
                  <Link href={path}>
                    <a className="inline whitespace-nowrap hover:text-gray-600 dark:hover:text-gray-300">{title}</a>
                  </Link>
                  <span className="inline-block w-1.5 text-gray-400 dark:text-gray-500">
                    <Icon name="chevron-right" />
                  </span>
                </li>
              )}
            </Fragment>
          ))}
          <li className="hidden text-gray-800 dark:text-gray-200 lg:block">{title}</li>
        </ul>
      </div>
    </>
  )
}
