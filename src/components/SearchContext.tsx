import { FC, ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarAnimator,
  KBarResults,
  useMatches,
  Action,
} from 'kbar'
import { TreeNode } from 'types/TreeNode'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Label } from './common/Label'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { allDocs, allPosts, Post } from 'contentlayer/generated'
import { format } from 'date-fns'

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  // TODO: Find a way to remove the type assertion!
  const docsTree = buildDocsTree(allDocs, { versionPathSegment: router.query.version as string })

  const actions = useMemo(() => {
    let actions: Action[] = [
      {
        id: '0-homepage',
        name: 'Homepage',
        keywords: 'Theatre.js Home Start Index Overview Features Intro',
        section: 'Home',
        perform: () => router.push('/'),
      },

      {
        id: '3-discord',
        name: 'Discord Community',
        keywords: 'Discord Community Channel Contact',
        section: 'External',
        perform: () => window.open('https://discord.gg/bm9f8F9Y9N', '_ blank'),
      },
      {
        id: '3-twitter',
        name: 'Twitter',
        keywords: 'Twitter Account Tweets Tweet News',
        section: 'External',
        perform: () => window.open('https://twitter.com/theatre_js', '_ blank'),
      },
    ]
    let id = 1

    const mapPosts = (posts: Post[]) => {
      actions.push({
        id: ('2-blog-' + id).toString(),
        name: 'Overview',
        keywords: 'Theatre.js Blog Post List Overview',
        section: 'Blog',
        perform: () => router.push('/blog'),
      })
      id++
      for (const post of posts) {
        actions.push({
          id: ('2-blog-' + id).toString(),
          name: post.title,
          keywords: post?.excerpt || '',
          section: 'Blog',
          subtitle: format(new Date(post.date), 'MMMM dd, yyyy'),
          perform: () => router.push('/' + post.url_path),
        })
        id++
      }
    }
    const mapDocs = (tree: TreeNode[], parent: string) => {
      for (const element of tree) {
        actions.push({
          id: ('4-bldocsog-' + id).toString(),
          name: element.label ? `${element.title} (${element.label})` : element.title,
          keywords: element?.excerpt || '',
          section: 'Documentation',
          subtitle: parent,
          perform: () => router.push(element.urlPath),
        })
        id++
        if (element.children.length) mapDocs(element.children, parent + ' / ' + element.title)
      }
    }
    mapPosts(allPosts)
    mapDocs(docsTree, 'Docs')
    console.log(actions)
    return actions
  }, [docsTree, router])

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <Card>
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5">
                  <Icon name="search" />
                </span>
                <KBarSearch className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500" />
                <Label text="ESC" />
              </div>
              <RenderResults />
            </Card>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

const RenderResults = () => {
  const { results } = useMatches()

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === 'string' ? (
              <div className="pt-3">
                <div className="block border-t border-gray-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase text-gray-400 dark:border-gray-800 dark:text-gray-500">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`block cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
                }`}
              >
                {item.subtitle && <div className="text-xs text-gray-400 dark:text-gray-500">{item.subtitle}</div>}
                <div>{item.name}</div>
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
        No results for your search...
      </div>
    )
  }
}
