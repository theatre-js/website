import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import { FC, useEffect, useMemo, useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import { MetaWrapper } from '../../components/common/MetaWrapper'
import { defineStaticProps } from '../../utils/next'
import { Callout } from '../../components/common/Callout'
import { Section } from '../../components/common/Section'
import { DocsCard as Card } from '../../components/docs/DocsCard'
import { Link } from 'src/components/common/Link'
import NextImage from 'next/image'
import { ChevronLink } from '../../components/common/ChevronLink'
import { Label } from '../../components/common/Label'
import { BlogHeader } from 'src/components/blog/BlogHeader'
import { RelatedPosts } from 'src/components/blog/RelatedPosts'
import { BulletList, BulletListItem } from 'src/components/blog/BulletList'
import { useColorScheme } from 'src/components/ColorSchemeContext'
import { H2, H3, H4 } from 'src/components/common/Headings'
import { Author } from 'src/components/common/Author'
import { Screenshot } from '../../components/common/Screenshot'
import { Video } from '../../components/common/Video'
import { MainNavigation } from 'src/components/common/MainNavigation'
import { Footer } from 'src/components/common/Footer'
import HorizontalContainer from 'src/components/common/HorizontalContainer'
import classNames from 'classnames'
import { useCheckGrammar } from 'src/utils/useCheckGrammar'

export const getStaticPaths = async () => {
  const paths = allPosts.map(({ slug }) => {
    return { params: { slug } }
  })
  return { paths, fallback: false }
}

export const getStaticProps = defineStaticProps(async (context) => {
  console.time(`getStaticProps /blog/${context.params!.slug}`)

  const params = context.params as any
  const post = allPosts.find((_) => _.slug === params.slug)!

  console.timeEnd(`getStaticProps /blog/${context.params!.slug}`)

  return { props: { post } }
})

const Image: FC<{ src: string; alt?: string; width?: number; height?: number; className?: string }> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <div className={`${className} overflow-hidden rounded-lg`}>
      <div className="-mb-3">
        <NextImage
          src={src}
          alt={alt}
          width={width ?? '1600'}
          height={height ?? '900'}
          placeholder="blur"
          blurDataURL={src}
        />
      </div>
    </div>
  )
}

const P: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="mb-4 text-lg">{children}</div>

const mdxComponents = {
  Callout,
  Section,
  Card,
  Image,
  Link,
  ChevronLink,
  Label,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  p: P,
  img: Image,
  BulletList,
  BulletListItem,
  Video,
  Screenshot,
}

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  useLiveReload()
  const MDXContent = useMDXComponent(post.body.code || '')

  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')
  const checkGrammar = useCheckGrammar()

  useEffect(() => {
    if (preferredColorScheme === 'system') {
      setColorScheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  return (
    <MetaWrapper
      title={post.title + ' – Theatre.js Blog'}
      description={post.excerpt}
      imagePath={post.seo?.imagePath ?? null}
      urlPath={`/${post.url_path}`}
    >
      <MainNavigation className="relative md:fixed" />
      <div className={classNames('flex min-h-screen w-full flex-col justify-between')}>
        <main className="relative" style={{ scrollPaddingTop: '150px' }} contentEditable={checkGrammar}>
          <HorizontalContainer>
            <BlogHeader post={post} />
            <div
              className={
                'prose prose-gray relative mx-auto mb-4  overflow-x-hidden pb-8' +
                'prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-hr:border-gray-800 '
              }
            >
              {MDXContent && <MDXContent components={{ ...mdxComponents }} />}
              {/* <hr /> */}
              {post.authors.map((author, index) => (
                <Author key={index} {...author} />
              ))}
              {post.related_posts && <RelatedPosts posts={post.related_posts} />}
            </div>
          </HorizontalContainer>
        </main>
        <Footer />
      </div>
    </MetaWrapper>
  )
}

export default Post
