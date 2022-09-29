import { Doc } from 'contentlayer/generated'
import { version } from 'react'
import { TreeNode } from 'types/TreeNode'
import { getURLPathAliases } from './getURLPathAliases'

export const buildDocsTree = (
  docs: Doc[],
  options: {
    parentPathNames?: string[]
    /** e.g. "latest" or "0.5" */
    versionPathSegment?: string
  },
): TreeNode[] => {
  const parentPathNames = options.parentPathNames || []
  const level = parentPathNames.length

  return docs
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((doc) => {
      const urlPaths = getURLPathAliases(doc, options.versionPathSegment)
      return {
        nav_title: doc.nav_title ?? null,
        breadcrumb_title: doc.breadcrumb_title ?? null,
        hide_from_site_nav: doc.hide_from_site_nav ?? null,
        title: doc.title,
        label: doc.label ?? null,
        excerpt: doc.excerpt ?? null,
        // TODO: add the version here
        urlPath: urlPaths[0],
        urlPathAliases: urlPaths,
        collapsible: doc.collapsible ?? null,
        collapsed: doc.collapsed ?? null,
        isGrouping: doc.isGrouping === true,
        children: buildDocsTree(docs, {
          versionPathSegment: options.versionPathSegment,
          parentPathNames: doc.pathSegments.map((_: PathSegment) => _.pathName),
        }),
      }
    })
}
