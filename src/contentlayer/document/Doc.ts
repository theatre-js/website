import { defineDocumentType } from 'contentlayer/source-files'

// import { SEO } from '../nested/SEO'
import { getLastEditedDate, urlFromFilePath } from '../utils'
import { computedHeadings } from '../../utils/computedHeadings'

export type DocHeading = { level: 1 | 2 | 3; title: string; id: string }

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  // Question: How does this affect /[version]/getting-started routing?
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
    breadcrumb_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
    hide_from_site_nav: {
      type: 'boolean',
      description: 'Hide this page from showing in the site navigation',
    },
    isGrouping: {
      type: 'boolean',
      description: `Don't link to this page in Nav. It's just a grouping of other pages.`,
      default: false,
      required: false,
    },
    label: {
      type: 'string',
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    show_child_cards: {
      type: 'boolean',
      default: false,
    },
    collapsible: {
      type: 'boolean',
      required: false,
      default: false,
    },
    collapsed: {
      type: 'boolean',
      required: false,
      default: false,
    },
    class_names: {
      type: 'string',
      required: false,
      default: '',
    },
    // seo: { type: 'nested', of: SEO },
  },
  computedFields: {
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    version: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.flattenedPath
          .split('/')
          // skip `/docs` prefix
          .slice(1)
          // `/[version]`
          [0]
      },
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) => {
        // get `/[version]` prefix
        const [version, ...paths] = doc._raw.flattenedPath
          .split('/')
          // skip `/docs` prefix
          .slice(1)
        return paths.map((dirName) => {
          const re = /^((\d+)-)?(.*?)(?:\.generated)?$/
          const [, , orderStr, pathName] = dirName.match(re) ?? []
          const order = orderStr ? parseInt(orderStr) : 0
          return { order, pathName }
        })
      }
        ,
    },
    headings: {
      type: 'json',
      resolve: computedHeadings,
    },
    last_edited: { type: 'date', resolve: getLastEditedDate },
  },
  extensions: {},
}))
