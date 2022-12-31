import classNames from 'classnames'
import { ReactNode } from 'react'
import { Icon, IconName } from './Icon'

const CALLOUT_TYPES = defineTypes(
  {
    info: {},
    warning: {
      iconName: 'exclamation',
      classes: {
        outer: classNames('dark:border-yellow-300/50 dark:bg-yellow-300/10'),
        text: classNames('dark:text-yellow-300'),
      },
    },
  },
  {
    iconName: 'info',
    classes: {
      outer: classNames('dark:border-teal-500/50 dark:bg-teal-500/10'),
      text: classNames('dark:text-teal-500'),
    },
  },
)

type CalloutTypeOptions = {
  iconName: IconName
  classes: {
    outer: string
    text: string
  }
}

export type CalloutType = keyof typeof CALLOUT_TYPES['types']

function defineTypes<T extends Record<string, Partial<CalloutTypeOptions>>>(
  types: T,
  defaultOptions: CalloutTypeOptions,
): { types: T; defaultOptions: CalloutTypeOptions } {
  return {
    types,
    defaultOptions,
  }
}

export const Callout: React.FC<{ children: ReactNode; className?: string | ''; type?: CalloutType }> = ({
  children,
  className,
  type: calloutType = 'warning',
}) => {
  const callout = { ...CALLOUT_TYPES.defaultOptions, ...CALLOUT_TYPES.types[calloutType] }
  return (
    <div className={`my-8 rounded-lg border ${callout.classes.outer} ${className}`}>
      <div className="relative p-6 py-4 text-violet-600 dark:text-white/80">
        <div className={`absolute top-7 left-8 w-5 ${callout.classes.text}`}>
          <Icon name={callout.iconName} />
        </div>
        <div className="theatre-callout-content my-2 mr-6 ml-12 prose-a:font-semibold">{children}</div>
      </div>
    </div>
  )
}
