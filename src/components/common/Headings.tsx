import { sluggifyTitle, getNodeText } from 'src/utils/sluggify'
import { ReactNode } from 'react'
import { parseHeading } from 'src/utils/parseHeading'

const headingClass = 'group cursor-pointer relative'
const spanClass = 'absolute -left-8 hidden text-gray-400 dark:text-gray-600 lg:group-hover:inline'

const transformHeading = (text: ReactNode) => {
  if (typeof text !== 'string') {
    return text
  }

  const heading = parseHeading(text)

  return heading.api ? (
    <span className="group">
      <span className="opacity-30 transition-opacity group-hover:opacity-100">{heading.api.base}</span>
      <span>{heading.api.identifier}</span>
      <span className="opacity-30 transition-opacity group-hover:opacity-100">{heading.api.suffix}</span>
      {heading.api.type === '$fn' && (
        <span className="ml-4 inline-block whitespace-nowrap rounded border px-1.5 align-middle font-medium leading-4 tracking-wide [font-size:10px] dark:border-gray-600 dark:text-gray-400">
          fn
        </span>
      )}
    </span>
  ) : (
    <>{heading.cleanText}</>
  )
}

export const H2: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(parseHeading(getNodeText(children)).cleanText)

  const heading = transformHeading(children as string)

  return (
    <h2
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className={`${headingClass} mt-12 text-h2-mobile md:text-h2-desktop`}
    >
      <span className={spanClass}>#</span>
      {heading}
    </h2>
  )
}

export const H3: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(parseHeading(getNodeText(children)).cleanText)

  const heading = transformHeading(children as string)

  return (
    <h3 id={slug} onClick={() => (window.location.hash = `#${slug}`)} className={headingClass}>
      <span className={spanClass}>#</span>
      {heading}
    </h3>
  )
}

export const H4: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(parseHeading(getNodeText(children)).cleanText)

  const heading = transformHeading(children as string)

  return (
    <h4 id={slug} onClick={() => (window.location.hash = `#${slug}`)} className={headingClass}>
      <span className={spanClass}>#</span>
      {heading}
    </h4>
  )
}
