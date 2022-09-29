export type TreeNode = {
  title: string
  nav_title: string | null
  breadcrumb_title: string | null
  hide_from_site_nav?: boolean | null
  label: string | null
  excerpt: string | null
  urlPath: string
  urlPathAliases: string[]
  children: TreeNode[]
  collapsible: boolean | null
  collapsed: boolean | null
  isGrouping: boolean
}
