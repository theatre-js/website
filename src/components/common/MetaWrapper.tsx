import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SearchProvider } from '../SearchContext'

export const MetaWrapper: FC<
  PropsWithChildren<{
    urlPath?: string
    imagePath?: string
    title?: string
    description?: string
    className?: string
  }>
> = ({ children, className, ...customMeta }) => {
  const router = useRouter()

  const baseUrl = `https://www.theatrejs.com`

  const meta = {
    title: 'Theatre.js - animation toolbox for the web',
    description: 'Theatre.js is an animation editor with a visual interface.',
    url: customMeta.urlPath ? `${baseUrl}${customMeta.urlPath}` : baseUrl,
    name: 'Theatre.js Docs',
    image: customMeta.imagePath ? `${baseUrl}${customMeta.imagePath}` : `${baseUrl}/images/op.jpg`,
    type: 'website',
    ...customMeta,
  }
  const jsonLd = {
    '@context': 'http://www.schema.org',
    '@type': 'WebSite',
    name: meta.name,
    url: meta.url,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={meta.url} />
        <link rel="canonical" href={meta.url} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* TEMPORARY: Force dark theme to fix scrollbars */}
        <meta name="color-scheme" content="dark"></meta>
      </Head>
      <SearchProvider>{children}</SearchProvider>
    </>
  )
}
