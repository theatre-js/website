import { bundleMDX } from 'mdx-bundler'
import { resolve } from 'path'
import { DocHeading } from '../contentlayer/document/Doc'
import type * as unified from 'unified'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
import { sluggifyTitle } from './sluggify'

export const computedHeadings = async (doc: {
  title: string
  body: { raw: string }
}): Promise<{ level: number; title: string }[]> => {
  const headings: DocHeading[] = []

  await bundleMDX({
    source: doc.body.raw,
    // pass in cwd, so that the mdx-bundler can resolve paths the same way as internal contentlayer
    cwd: resolve(process.cwd(), './content'),
    mdxOptions: (opts) => {
      opts.remarkPlugins = [...(opts.remarkPlugins ?? []), tocPlugin(headings)]
      return opts
    },
  }).catch((err) => Promise.reject(`Failed to bundle for Doc headings:\n${err.toString()}`))

  return [{ level: 1, title: doc.title }, ...headings]
}

function markdownHeadingChildrenToTitleAndId(children: any[]): { title: string; id: string } {
  const md = toMarkdown({ type: 'paragraph', children }, { extensions: [mdxToMarkdown()] })
  const title = md
    .trim()
    // remove trailing
    .replace(/<LinkToSource.+$/g, '')
    // .replace(/[<\{].*$/g, '')
    .replace(/\\/g, '')
    .trim()
  // I wish we could use substitued id, but it's not accessible via H2 H3 H4 components
  const id = sluggifyTitle(title) // /\{\/\*\s*id:\s*(\S+)\s*\*\/\}/.exec(md)?.[1] || sluggifyTitle(title)
  return { title, id }
}

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter((_: any) => _.type === 'heading' || _.name === 'OptionsTable')) {
        if (element.type === 'heading') {
          const { id, title } = markdownHeadingChildrenToTitleAndId(element.children)
          headings.push({ level: element.depth, title, id })
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((_: any) => _.name === 'OptionTitle')
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === 'heading')
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] },
                  )
                    .trim()
                    .replace(/[<\{].*$/g, '')
                    .replace(/\\/g, '')
                    .trim()
                  headings.push({ level: heading.depth, title, id: sluggifyTitle(title) })
                })
            })
        }
      }
    }
  }
