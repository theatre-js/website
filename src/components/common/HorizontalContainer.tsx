import classNames from 'classnames'
import React from 'react'

const HorizontalContainer: React.FC<React.PropsWithChildren<{ className?: string; type?: 'normal' | 'cinematic' }>> = ({
  children,
  type,
  className,
}) => {
  return (
    <div
      className={classNames(
        `mx-auto w-full px-4 md:px-4 lg:px-8`,
        type === 'cinematic' ? 'max-w-screen-md' : 'max-w-screen-1.5xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default HorizontalContainer
