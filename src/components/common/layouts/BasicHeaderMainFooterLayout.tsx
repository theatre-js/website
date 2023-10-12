import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { children } from 'cheerio/lib/api/traversing'
import { Footer } from '../Footer'
import { MainNavigation } from '../MainNavigation'
import { TreeNode } from 'types/TreeNode'

export const BasicHeaderMainFooterLayout: FC<PropsWithChildren<{ className?: string; docsTree?: TreeNode[] }>> = ({
  children,
  className,
  docsTree,
}) => {
  return (
    <>
      <MainNavigation docsTree={docsTree} />
      <div
        className={classNames('flex min-h-screen w-full flex-col justify-between', className)}
        style={{
          minWidth: 500,
        }}
      >
        <main className="relative" style={{ scrollPaddingTop: '150px' }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
