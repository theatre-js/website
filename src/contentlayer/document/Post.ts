import { defineDocumentType, defineNestedType } from 'contentlayer/source-files'
import { urlFromFilePath } from '../utils'
import { SEO } from '../nested/SEO'
import { computedHeadings } from '../../utils/computedHeadings'

const RelatedPost = defineNestedType(() => ({
  name: 'RelatedPost',
  fields: {
    slug: { type: 'string', required: true },
  },
}))

const CoverImage = defineNestedType(() => ({
  name: 'CoverImage',
  fields: {
    url: { type: 'string', required: true },
    alt: { type: 'string', required: true },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
  },
}))

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: { type: 'string', required: true },
    handle: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    link: { type: 'string', required: false },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    title_formatted: {
      type: 'string',
      description: 'The title of the post, used for the heading of the blog post (so use line breaks and stuff there)',
      required: true,
    },
    cover_image: {
      type: 'nested',
      of: CoverImage,
      required: true,
    },
    category: {
      type: 'enum',
      required: true,
      options: ['Team Updates', 'Theatre.js Updates'],
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    authors: {
      type: 'list',
      of: Author,
      required: true,
    },
    related_posts: {
      type: 'list',
      of: RelatedPost,
      required: false,
    },
    seo: {
      type: 'nested',
      of: SEO,
      required: true,
    },
  },
  computedFields: {
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    slug: {
      type: 'string',
      resolve: (post) => urlFromFilePath(post).replace('blog/', ''),
    },
    headings: {
      type: 'json',
      resolve: computedHeadings,
    },
  },
  extensions: {},
}))
