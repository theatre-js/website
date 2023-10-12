import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { TreeNode } from 'types/TreeNode'
import { Label } from '../common/Label'
import { Icon } from '../common/Icon'
import { SearchButton } from '../common/MainNavigation'

const NavLink: FC<{
  title: string
  label?: string
  url: string
  level: number
  activePath: string
  collapsible: boolean
  collapsed: boolean
  isGrouping: boolean
  toggleCollapsed: () => void
}> = ({ title, label, url, level, activePath, collapsible, isGrouping, collapsed, toggleCollapsed }) => {
  const isActive = url == activePath
  const isRoot = level == 0

  return (
    <div
      className={classNames(
        'group flex h-9 items-center justify-between whitespace-nowrap px-3 text-sm leading-none',
        isGrouping
          ? 'mt-4 text-base font-semibold tracking-tight text-white'
          : isActive
          ? `font-medium dark:text-glow-100`
          : 'font-normal dark:text-slate-400',
      )}
    >
      {isGrouping ? (
        <span className="flex grow items-center space-x-2">
          <span>{title}</span>
          {label && <Label text={label} />}
        </span>
      ) : (
        <Link href={url}>
          <a className="flex h-full grow items-center space-x-2">
            <span>{title}</span>
            {label && <Label text={label} />}
          </a>
        </Link>
      )}

      {collapsible && (
        <button aria-label="Toggle children" onClick={toggleCollapsed} className="mr-2 shrink-0 px-2 py-1">
          <span className={`block w-2.5 ${collapsed ? '-rotate-90 transform' : ''}`}>
            <Icon name="chevron-down" />
          </span>
        </button>
      )}
    </div>
  )
}

const Node: FC<{ node: TreeNode; level: number; activePath: string }> = ({ node, level, activePath }) => {
  const [collapsed, setCollapsed] = useState<boolean>(node.collapsed ?? false)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  useEffect(() => {
    if (activePath == node.urlPath || node.children.map((_) => _.urlPath).includes(activePath)) {
      setCollapsed(false)
    }
  }, [activePath, node.children, node.urlPath])

  if (node.urlPath.includes('api-ref') || node.hide_from_site_nav) return null

  return (
    <>
      <NavLink
        title={node.nav_title || node.title}
        label={node.label || undefined}
        url={node.urlPath}
        level={level}
        activePath={activePath}
        collapsible={node.collapsible ?? false}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        isGrouping={node.isGrouping === true}
      />
      {node.children.length > 0 && !collapsed && (
        <Tree tree={node.children} level={level + 1} activePath={activePath} />
      )}
      {level === 0 && <div className="h-2"></div>}
    </>
  )
}

const Tree: FC<{ tree: TreeNode[]; level: number; activePath: string }> = ({ tree, level, activePath }) => {
  return (
    <div>
      {tree.map((treeNode, index) => (
        <Node key={index} node={treeNode} level={level} activePath={activePath} />
      ))}
    </div>
  )
}

export const DocsNavigation: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  const router = useRouter()

  return (
    <aside className="w-full ">
      <div>
        <div className="w-full py-3">
          <SearchButton />
        </div>
        <Tree tree={tree} level={0} activePath={router.asPath} />
      </div>
    </aside>
  )
}
