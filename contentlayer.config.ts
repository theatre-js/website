// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { makeSource } from 'contentlayer/source-files'
// import highlight from 'rehype-highlight'
import { contentDirPath } from './src/contentlayer/utils'

import * as documentTypes from './src/contentlayer'

import { remarkCodeHike } from '@code-hike/mdx'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const theme = require('shiki/themes/poimandres.json')

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [[remarkCodeHike, { theme }]],
//   },
// })

/**
 * Snippets can be used in any mdx file with:
 *
 * ```mdx
 * import ObjectConcept from "./snippets/object-concept.mdx"
 *
 * <Callout type="info">
 *   <ObjectConcept/>
 * </Callout>
 * ```
 */
const snippetsRelativeFolder = './snippets'

const codeHikeConfig: Parameters<typeof remarkCodeHike>[0] = {
  theme,
  skipLanguages: [],
}

export default makeSource({
  contentDirPath,
  contentDirExclude: [snippetsRelativeFolder],
  documentTypes,
  mdx: { rehypePlugins: [], remarkPlugins: [[remarkCodeHike, codeHikeConfig]] },
})
