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
  const { asPath } = useRouter()
  const [navBurgerOpen, setNavBurgerOpen] = useState<boolean>(false)
  const [top, setTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 100)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setNavBurgerOpen(false)
  }, [asPath])

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
          <h1 className="sr-only font-sans font-black tracking-tight text-headings-light dark:text-headings-dark md:text-3xl lg:not-sr-only lg:text-6xl">
            {title}
          </h1>
          <div className="lg:hidden">
            <button aria-label="Show docs navigation" onClick={() => setNavBurgerOpen((v) => !v)}>
              <span className="fixed top-5 left-36 z-45-global-topbar flex items-center space-x-2 text-gray-800 dark:text-gray-200 md:top-5 md:left-40">
                {/* <span className="inline-block w-4 flex-shrink-0">
                  <Icon name="bars" />
                </span> */}
                <span>Docs Menu</span>
              </span>
              <span className="inline-block flex-shrink font-sans text-2xl font-black text-headings-light dark:text-headings-dark md:space-x-3 md:text-3xl lg:text-4xl">
                {title}
              </span>
            </button>
          </div>
        </div>
      </header>
      {navBurgerOpen && (
        <div
          className="fixed inset-0 z-50-global-nav h-screen bg-gray-950/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50"
          onClick={() => setNavBurgerOpen(!navBurgerOpen)}
        >
          <div
            className="absolute left-0 h-full divide-y divide-gray-200 overflow-y-scroll border-r border-gray-200 bg-white p-4 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950"
            onClick={(evt) => evt.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-xl font-semibold text-headings-light dark:text-headings-dark">Theatre.js Docs</h2>
              <button
                type="button"
                aria-label="Close docs navigation"
                onClick={() => setNavBurgerOpen(!navBurgerOpen)}
                className="flex h-8 w-8 items-center justify-end text-gray-600 dark:text-gray-300"
              >
                <span className="inline-block w-4">
                  <Icon name="close" />
                </span>
              </button>
            </div>
            <div className="pt-4">
              <DocsNavigation tree={tree} />
            </div>
          </div>
        </div>
      )}
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
