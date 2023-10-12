import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import type { FC } from 'react'
import { allDocs, Doc } from 'contentlayer/generated'
import { MetaWrapper } from '../../../components/common/MetaWrapper'
import { defineStaticProps, toParams } from '../../../utils/next'
import { DocsNavigation } from 'src/components/docs/DocsNavigation'
import { Callout } from '../../../components/common/Callout'
import { Section } from '../../../components/common/Section'
import { DocsCard as Card } from 'src/components/docs/DocsCard'
import { Card as ChildCard } from '../../../components/common/Card'
import { Link as SourceLink } from 'src/components/common/Link'
import Image from 'next/image'
import { DocsHeader } from '../../../components/docs/DocsHeader'
import { ChevronLink } from '../../../components/common/ChevronLink'
import { Label } from '../../../components/common/Label'
import { DocsFooter } from '../../../components/docs/DocsFooter'
import { PageNavigation } from 'src/components/common/PageNavigation'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { H2, H3, H4 } from 'src/components/common/Headings'
import { OptionsTable, OptionTitle, OptionDescription } from 'src/components/docs/OptionsTable'
import { NextRouter, useRouter } from 'next/router'
import { Screenshot } from '../../../components/common/Screenshot'
import { TheatreTutorialCodePreview } from 'src/components/docs/TheatreTutorialCodePreview'
import { Video } from '../../../components/common/Video'
import { TreeNode } from 'types/TreeNode'
import HorizontalContainer from 'src/components/common/HorizontalContainer'
import classNames from 'classnames'
import { TextBody } from 'src/components/common/TextBody'
import { BasicHeaderMainFooterLayout } from 'src/components/common/layouts/BasicHeaderMainFooterLayout'
import { ApiTag } from 'src/components/common/ApiTag'
import { useCheckGrammar } from 'src/utils/useCheckGrammar'
import { LATEST_VERSION, LATEST_VERSION_PATH } from 'src/LATEST_VERSION'
import { getURLPathAliases } from 'src/utils/getURLPathAliases'

export const getStaticPaths = async () => {
  const paths = allDocs
    .flatMap((doc) => {
      const beforeVersionSuffix = '/' + docPathStringWithVersion(doc).replace(/^\//, '')
      return [
        doc.version + beforeVersionSuffix,
        ...(LATEST_VERSION === doc.version ? [LATEST_VERSION_PATH + beforeVersionSuffix] : []),
      ]
    })
    .map(docToParams)
  return { paths, fallback: false }
}

function docToParams(path: string): { params: { slug: string[]; version: string } } {
  const [version, ...slug] = path.replace(/^\//, '').split('/')
  return { params: { slug, version } }
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const version = params.version === LATEST_VERSION_PATH ? LATEST_VERSION : params.version
  const docVersionedPath = [version, ...(params.slug ?? [])].join('/')
  const doc = allDocs.find((doc) => docPathStringWithVersion(doc, doc.version) === docVersionedPath)!
  let slugs = params.slug ? ['', ...(params.slug ?? [])] : []
  // Leads with current version so that breadcrumbs start from the currently specified version
  let breadcrumbPathVersioned = params.version
  let breadcrumbs: any = []
  for (const slug of slugs) {
    breadcrumbPathVersioned += slug ? '/' + slug : ''

    const doc = allDocs.find(
      (doc) => docPathStringWithVersion(doc, params.version).replace(/^\//, '') === breadcrumbPathVersioned,
    )

    breadcrumbs.push({
      path: '/docs/' + breadcrumbPathVersioned,
      slug,
      title: doc?.breadcrumb_title || doc?.nav_title || doc?.title || 'Untitled Page',
    })
  }
  const urlPaths = getURLPathAliases({ version: LATEST_VERSION }, params.version)
  const tree: TreeNode[] = [
    /* Theatre.js hack code to add overview to the docs navigation */ {
      hide_from_site_nav: false,
      title: 'Overview',
      breadcrumb_title: 'Theatre.js Docs',
      nav_title: null,
      label: '',
      excerpt: '',
      urlPath: urlPaths[0],
      urlPathAliases: urlPaths,
      collapsible: false,
      collapsed: false,
      children: [],
      isGrouping: false,
    },
    ...buildDocsTree(allDocs, { versionPathSegment: params.version }),
  ]
  const childrenTree = buildDocsTree(
    allDocs,
    // TODO: add docs version here
    {
      versionPathSegment: params.version,
      parentPathNames: doc.pathSegments.map((_: PathSegment) => _.pathName),
    },
  )

  return { props: { doc, tree, breadcrumbs, childrenTree } }
})

function docPathStringWithVersion(doc: Doc, version?: string) {
  const pathSegments = doc.pathSegments.map((_: PathSegment) => _.pathName)
  return [version, ...pathSegments].join('/')
}

type SourceLink = [relativePath: string, lineNumberFrom0: number]

const THEATRE_REMOTE_TARGET_ID = 'docs-0.5'

function LinkToSource(props: { links: SourceLink[] }) {
  const link = (label: string, [path, ln]: SourceLink) => (
    <a
      href={`https://github.com/theatre-js/theatre/blob/${THEATRE_REMOTE_TARGET_ID}/${path}#L${ln + 1}`}
      target="_blank"
      rel="noreferrer"
      className="link-to-source-link"
      style={{ fontSize: '60%' }}
    >
      {label}
    </a>
  )
  return props.links.length === 0 ? null : props.links.length === 1 ? (
    link('source', props.links[0])
  ) : (
    <span>
      source
      {props.links.map((a, i) => link(` ${i}`, a))}
    </span>
  )
}

const Since = ({ version }: { version: string }) => {
  return (
    <span
      //  yup, tailwind was a mistake...
      style={{
        // @ts-ignore
        'font-family': 'Inter',
        'font-style': 'normal',
        'font-weight': '600',
        'font-size': '12px',
        'line-height': '15px',
        'text-align': 'center',
        'text-transform': 'uppercase',
        padding: '4px 8px',
        background: '#082D22',
        'border-radius': '3px',
        'letter-spacing': '0',
        color: 'rgba(0, 215, 189, 0.56)',
        'margin-left': '1em',
        position: 'relative',
        // top: '-1px',
      }}
    >
      Since {version}
    </span>
  )
}

const mdxComponents = {
  ApiTag,
  Callout,
  Section,
  Card,
  Image,
  Link: SourceLink,
  ChevronLink,
  Label,
  h2: H2,
  h3: H3,
  h4: H4,
  a: SourceLink,
  LinkToSource,
  OptionsTable,
  OptionTitle,
  OptionDescription,
  Screenshot,
  TheatreTutorialCodePreview,
  Video,
  Since,
}

/** Components which depend on environment values */
const injectedComponents = (tree: TreeNode[], router: NextRouter) => {
  return {
    ChildCards(props: {
      urlPath: string
      exclude?: (node: TreeNode) => boolean
      include?: (node: TreeNode) => boolean
    }) {
      const section = findInTreeBFS(tree, (node) => node.urlPathAliases.includes(props.urlPath))
      if (!section) {
        console.warn(`<ChildCards path="${props.urlPath}" /> failed to find section`)
        return null
      }
      // const MDXContent = useMDXComponent(post.body.code || '')
      let list = section.children
      if (props.include) {
        list = list.filter((n) => props.include!(n))
      }
      if (props.exclude) {
        list = list.filter((n) => !props.exclude!(n))
      }
      return <ChildCards childrenTree={list} router={router} />
    },
  }
}

function findInTreeBFS(tree: TreeNode[], check: (node: TreeNode) => boolean): TreeNode | undefined {
  for (const item of tree) {
    if (check(item)) return item
  }
  for (const item of tree) {
    const find = findInTreeBFS(item.children, check)
    if (find != null) return find
  }
}

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ doc, tree, breadcrumbs, childrenTree }) => {
  const router = useRouter()
  useLiveReload()
  const MDXContent = useMDXComponent(doc.body.code || '')
  let content = MDXContent && <MDXContent components={{ ...mdxComponents, ...injectedComponents(tree, router) }} />
  const checkGrammar = useCheckGrammar()

  return (
    <MetaWrapper title={doc.title + ' – Theatre.js'} description={doc.excerpt}>
      <BasicHeaderMainFooterLayout docsTree={tree}>
        <HorizontalContainer className={`theatre-docs-page ${doc.class_names} relative mt-12 md:flex md:items-start`}>
          <div style={{ height: 'calc(100vh - 64px)' }} className="sticky top-16 hidden shrink-0 md:block md:w-1/5">
            <div className="-ml-3 h-full overflow-y-scroll py-8 md:ml-0 lg:pr-4 ">
              <DocsNavigation tree={tree} />
            </div>
          </div>
          <div className="relative grow md:w-4/5 md:pl-8 lg:pl-16" contentEditable={checkGrammar}>
            <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={doc.title} />
            <TextBody className="">
              {content}
              {doc.show_child_cards && (
                <>
                  <hr />
                  <ChildCards className="mt-12" childrenTree={childrenTree} router={router} />
                </>
              )}
              <DocsFooter doc={doc} />
            </TextBody>
          </div>
          <div
            style={{ maxHeight: 'calc(100vh - 128px)' }}
            className="sticky top-40 hidden w-80 shrink-0 overflow-y-scroll py-16 pt-8 pl-10 pr-8 xl:block"
          >
            <PageNavigation headings={doc.headings} />
          </div>
        </HorizontalContainer>
      </BasicHeaderMainFooterLayout>
    </MetaWrapper>
  )
}

export default Page

function ChildCards(props: { className?: string; childrenTree: TreeNode[]; router: NextRouter }) {
  return (
    <div className={classNames('grid grid-cols-1 gap-6 md:grid-cols-2', props.className)}>
      {props.childrenTree.map((card, index) => (
        <div key={index} onClick={() => props.router.push(card.urlPath)} className="cursor-pointer">
          <ChildCard className="h-full p-6 py-4 hover:border-teal-100 hover:bg-teal-50 dark:hover:border-teal-900/50 dark:hover:bg-teal-900/20">
            <h3 className="mt-0 no-underline">{card.title}</h3>
            {card.label && <Label text={card.label} />}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>{card.excerpt}</p>
            </div>
          </ChildCard>
        </div>
      ))}
    </div>
  )
}
