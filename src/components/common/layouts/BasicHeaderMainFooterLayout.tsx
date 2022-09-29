import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { children } from 'cheerio/lib/api/traversing'
import { Footer } from '../Footer'
import { MainNavigation } from '../MainNavigation'

export const BasicHeaderMainFooterLayout: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <>
      <MainNavigation />
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
