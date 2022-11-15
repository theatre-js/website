import Document, { Html, Head, Main, NextScript } from 'next/document'

const AnalyticsScripts = () => {
  if (process.env.NODE_ENV !== 'production') return null
  return <></>
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-padding dark">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/logo-white.svg" type="image/svg" media="(prefers-color-scheme: dark)" />
          <link rel="icon" href="/logo-black.svg" type="image/svg" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="/logo_square.png" type="image/png" sizes="288x288" />
          <link rel="icon" href="/logo_square_2x.png" type="image/png" sizes="576x576" />
          <link rel="icon" href="/logo_square_4x.png" type="image/png" sizes="1152x1152" />
          <link rel="preload" href="/fonts/virgil.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

          <script
            dangerouslySetInnerHTML={{
              __html: /* js */ `
                // const savedTheme = localStorage.getItem('theme') ?? 'system'

                document.documentElement.classList.add('dark')

                // if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                //   document.documentElement.classList.add('dark')
                // } else {
                //   document.documentElement.classList.remove('dark')
                // }
          `,
            }}
          />

          <AnalyticsScripts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
