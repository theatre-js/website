import { sluggifyTitle, getNodeText } from 'src/utils/sluggify'
import { Fragment, ReactNode } from 'react'
import { parseHeading } from 'src/utils/parseHeading'

const headingClass = 'group cursor-pointer relative'
const spanClass = 'absolute -left-8 hidden text-gray-400 dark:text-gray-600 lg:group-hover:inline'

const transformHeading = (text: ReactNode) => {
  if (typeof text !== 'string') {
    if (Array.isArray(text)) {
      return text.map((t, i) => <Fragment key={'k' + i}>{transformHeading(t)}</Fragment>)
    } else {
      return text
    }
  }

  const heading = parseHeading(text)

  return heading.api ? (
    <span className="group font-displayMono font-bold">
      <span className="opacity-30 transition-opacity group-hover:opacity-100">{heading.api.base}</span>
      <span>{heading.api.identifier}</span>
      <span className="text-md opacity-30 transition-opacity group-hover:opacity-100">{heading.api.suffix}</span>
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
      className={`${headingClass} mt-16 flex items-center text-h2-mobile first:mt-4 md:text-h2-desktop`}
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
