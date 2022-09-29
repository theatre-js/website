import { Icon, IconName } from '../common/Icon'
import { Label } from '../common/Label'
import { ChevronLink } from '../common/ChevronLink'

export const DocsCard: React.FC<
  React.PropsWithChildren<{
    title: string
    icon?: IconName | null
    label?: string | null
    subtitle?: string | null
    link?: { url: string; label: string }
  }>
> = ({ title, icon, label, subtitle, children, link }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`grow border border-gray-100 bg-gray-50 p-6 py-4 dark:border-gray-800 dark:bg-gray-900 
        ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'} ${icon ? 'mt-6' : 'mt-0'}`}
      >
        {icon && (
          <div className="-mt-10 mb-4 block w-12 rounded-full bg-white dark:bg-gray-950">
            <div className="h-12 w-12 rounded-full border border-teal-200 bg-teal-100 p-2.5 text-teal-600 dark:border-teal-900 dark:bg-teal-900/50 dark:text-teal-500">
              <Icon name={icon} />
            </div>
          </div>
        )}
        <h3 className="mt-0">{title}</h3>
        {label && <Label text={label} />}
        {subtitle && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{subtitle}</p>
          </div>
        )}
        {children && <div className="text-sm">{children}</div>}
      </div>
      {link && (
        <div className="rounded-b-2xl border border-teal-100 bg-teal-50 p-6 py-4 dark:border-teal-900/50 dark:bg-teal-900/20">
          <ChevronLink {...link} />
        </div>
      )}
    </div>
  )
}
