import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload } from 'next-contentlayer/hooks'
import type { FC } from 'react'
import { allPosts } from 'contentlayer/generated'
import { MetaWrapper } from '../../components/common/MetaWrapper'
import { defineStaticProps } from '../../utils/next'
import { BlogPreview } from 'src/components/blog/BlogPreview'
import { BasicHeaderMainFooterLayout } from 'src/components/common/layouts/BasicHeaderMainFooterLayout'

const content = {
  title: 'Theatre.js Blog',
  description: ``,
}

export const getStaticProps = defineStaticProps(async (context) => {
  const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { props: { posts } }
})

const Blog: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  useLiveReload()

  return (
    <MetaWrapper title="Blog – Theatre.js" description={content.description} urlPath="/blog">
      <BasicHeaderMainFooterLayout>
        <section className="relative pt-20 md:pt-28">
          <div className="mt-16">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <h1 className="text-h1-mobile font-black md:text-h1-desktop">{content.title}</h1>
            </div>
          </div>
        </section>
        <section className="py-14 md:py-24">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="relative">
              <div className="mx-auto flex max-w-2xl flex-col space-y-6 md:space-y-16">
                {posts.map((post, index) => (
                  <BlogPreview key={index} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </BasicHeaderMainFooterLayout>
    </MetaWrapper>
  )
}

export default Blog
