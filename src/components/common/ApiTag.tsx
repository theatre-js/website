import { FC } from 'react'

export const ApiTag: FC<{ kind?: string }> = ({ kind = 'api' }) => {
  return (
    <span className="ml-[0.75em] inline-block whitespace-nowrap rounded border px-[.5em] align-middle font-medium leading-[1.5em] tracking-wide [font-size:0.65em] dark:border-gray-600 dark:text-gray-400">
      {kind}
    </span>
  )
}
