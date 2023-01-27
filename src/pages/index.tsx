import type { InferGetStaticPropsType } from 'next'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { ColorScheme, snippetToHtml } from '../utils/syntax-highlighting'
import { promiseAllProperties, mapObjectValues } from '../utils/object'
import { MetaWrapper } from '../components/common/MetaWrapper'
import { BasicHeaderMainFooterLayout } from 'src/components/common/layouts/BasicHeaderMainFooterLayout'
import classNames from 'classnames'
import Image from 'next/image'
import MuxVideoWithFallback from 'src/components/MuxVideoWithFallback'

function nl2br(text: string) {
  let lines = text.split('\n')
  return lines.map(function (line, i) {
    return (
      <span key={i}>
        {line}
        <br />
      </span>
    )
  })
}

const Card: React.FC<{ title: string; message?: string; imgUrl: string }> = ({ title, message, imgUrl }) => (
  <div className="group relative flex min-h-[150px] flex-col gap-3 overflow-hidden rounded-lg border-t border-b border-r border-neutral-400/10 bg-neutral-900 bg-center drop-shadow transition-all lg:hover:z-10">
    <div className="absolute h-full w-full overflow-hidden">
      <div className="relative h-full w-full rotate-12 scale-175 bg-cover bg-left-top transition-all group-hover:rotate-6 group-hover:scale-125">
        <Image src={imgUrl} layout="fill" objectFit="cover" alt=""></Image>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-transparent"></div>
    </div>
    <div className="absolute p-4">
      <h2 className="text-md font-semibold text-white/70 transition-all group-hover:text-white">{title}</h2>
      {message && <p className="text-sm leading-6">{message}</p>}
    </div>
  </div>
)

const ThreeCards: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">{children}</div>
)

const TwoCards: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">{children}</div>
)

const GetStarted = () => (
  <div className="group relative">
    <a
      href="/docs/"
      className="relative z-10 block rounded-xl border-4 border-white/30 bg-white bg-clip-padding p-3 px-8 font-bold text-black"
    >
      Get started with Theatre.js
    </a>

    <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden blur-lg transition-transform duration-500 will-change-transform group-hover:scale-110">
      <div className="aspect-square w-full scale-110">
        <div className="h-full w-full bg-gradient-to-tr from-amber-600 to-teal-600 group-hover:animate-spin-slow" />
      </div>
    </div>
  </div>
)

const Section: React.FC<{ children: React.ReactNode; flare?: boolean }> = ({ children, flare = false }) => (
  <section className="relative">
    {flare && (
      <>
        <div className={`absolute inset-0 -z-10 grid place-items-center`}>
          <div className="h-3/4 w-1/4 translate-x-1/4 rotate-45 rounded-tl-3xl rounded-br-3xl bg-gradient-to-tl from-blue-900 to-teal-600 opacity-50 blur-3xl"></div>
          <div className="-translate-x-1/5 h-4/6 w-3/4 -rotate-12 rounded-tl-3xl rounded-br-3xl bg-gradient-to-l from-blue-900 to-teal-600 opacity-40 blur-3xl"></div>
        </div>
        {/*<div className={`pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-30`}>*/}
        {/*  <div className="h-3/4 w-1/4 translate-x-1/4 rotate-45 rounded-tl-3xl rounded-br-3xl bg-gradient-to-tl from-blue-900 to-teal-600 opacity-40 blur-3xl"></div>*/}
        {/*  <div className="-translate-x-1/5 h-4/6 w-3/4 -rotate-12 rounded-tl-3xl rounded-br-3xl bg-gradient-to-l from-blue-900 to-teal-600 opacity-30 blur-3xl"></div>*/}
        {/*</div>*/}
      </>
    )}
    {children}
  </section>
)

const Tweet: React.FC<{ imgSrc: string; handle: string; content: string; name: string; src: string }> = ({
  imgSrc,
  handle,
  content,
  name,
  src,
}) => (
  <a
    className="flex flex-col gap-6 rounded-xl border border-white/5 bg-gray-900 p-6 transition-all hover:bg-white/5"
    href={src}
    target="_blank"
    rel="noreferrer"
  >
    <div className="flex gap-5">
      <Image className="rounded-3xl" src={imgSrc} height={50} width={50} alt={handle + `'s twitter profile pic`} />
      <div>
        <div className="font-display font-bold tracking-tight text-white">{name}</div>
        <div className="text-white/50">{handle}</div>
      </div>
    </div>
    <div className="text-white/70">{nl2br(content)}</div>
  </a>
)

const Video: FC<{
  src: string
  children: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  playsInline?: boolean
  type?: 'small' | 'normal'
  videoClassName?: string
  muted?: boolean
  poster?: string
}> = ({
  src,
  videoClassName,
  children,
  autoplay = true,
  loop = true,
  playsInline = true,
  controls = true,
  type,
  muted = true,
  poster,
}) => {
  const descriptorId = useMemo(() => src.replace(/[^a-zA-Z\d]/g, '-').toLowerCase(), [src])

  return (
    <div
      className="relative mt-12 flex justify-center"
      style={{
        boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.7)',
      }}
    >
      <MuxVideoWithFallback
        className="w-full overflow-hidden rounded-lg border border-neutral-400/10"
        path={src}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        describedby={descriptorId}
        poster={poster}
        title=""
      />
      {/* <video
        className="w-full overflow-hidden rounded-lg border border-neutral-400/10"
        src={src}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        aria-describedby={descriptorId}
        poster={poster}
      /> */}
      <div id={descriptorId} aria-hidden="true" className="hidden">
        {children}
      </div>
    </div>
  )
}

const Page: React.FC<InferGetStaticPropsType<{}>> = ({}) => {
  const [stars, setStars] = useState(7700)

  useEffect(() => {
    fetch('https://api.github.com/repos/theatre-js/theatre')
      .then((res) => res.json())
      .then((json) => {
        setStars(json.stargazers_count)
      })
      // catch all errors, we already have a default star count, no need to do anything else
      .catch(() => {})
  })

  return (
    <>
      <MetaWrapper>
        <BasicHeaderMainFooterLayout>
          {/* title and sub */}
          <div className="relative mx-auto mt-32 w-full max-w-screen-lg px-4 md:px-8 lg:px-8">
            <div className="relative">
              <div className="absolute inset-0 -z-10 grid place-items-center">
                <div className="h-3/4 w-1/4 translate-x-1/4 rotate-45 rounded-tl-3xl rounded-br-3xl bg-gradient-to-tl from-blue-900 to-teal-600 opacity-50 blur-3xl"></div>
                <div className="-translate-x-1/5 h-4/6 w-3/4 -rotate-12 rounded-tl-3xl rounded-br-3xl bg-gradient-to-l from-blue-900 to-teal-600 opacity-40 blur-3xl"></div>
              </div>
              {/*<div className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-30">*/}
              {/*  <div className="h-3/4 w-1/4 translate-x-1/4 rotate-45 rounded-tl-3xl rounded-br-3xl bg-gradient-to-tl from-blue-900 to-teal-600 opacity-40 blur-3xl"></div>*/}
              {/*  <div className="-translate-x-1/5 h-4/6 w-3/4 -rotate-12 rounded-tl-3xl rounded-br-3xl bg-gradient-to-l from-blue-900 to-teal-600 opacity-30 blur-3xl"></div>*/}
              {/*</div>*/}
              <h2 className="text-center font-display text-6xl font-black tracking-tight text-white lg:text-hero">
                Powerful <span className="text-green-400">motion design</span>
                <br />
                in the browser
              </h2>
              <p className="mx-auto mt-6 px-4 text-center text-xl font-normal leading-8 text-white/60">
                Theatre.js is a javascript animation library with a professional motion design toolset. It helps you
                create any animation, from cinematic scenes in THREE.js, to delightful UI interactions.
              </p>
              <div className="mt-12">
                <Video
                  src="/images/landing-page/intro-05.mp4"
                  videoClassName="w-full"
                  controls={true}
                  muted={false}
                  autoplay={false}
                  playsInline={false}
                  poster="/images/landing-page/intro-05-poster.png"
                >
                  Video showing a 3D scene with a flying butterfly whose position/rotation is being controlled by a set
                  of keyframes in a sequence editor.
                </Video>
              </div>
              <div className="mt-14 flex justify-center">
                <GetStarted />
              </div>
            </div>
            <div className="mt-24 flex flex-col gap-24">
              <Section>
                <h2 className={classNames(sectionH2)}>
                  Iterate with <span className="text-green-400">ease</span>
                </h2>
                <p className={classNames(sectionP)}>
                  Block out your sequence in seconds with our cutting-edge sequence editor. Use presets to add quick
                  flare. When you are ready, dive into the graph editor and fine-tune every frame.
                </p>
                <Video src="/images/landing-page/iterate-with-ease.mp4" videoClassName="w-full" controls={false}>
                  Video showing a 3D scene with a flying butterfly whose position/rotation is being controlled by a set
                  of keyframes in a sequence editor.
                </Video>
                <ThreeCards>
                  <Card title="Dope sheet" imgUrl="/images/landing-page/dope-sheet.png" />
                  <Card title="Graph editor" imgUrl="/images/landing-page/graph-editor.png" />
                  <Card title="Easing presets" imgUrl="/images/landing-page/easing-presets.png" />
                </ThreeCards>
              </Section>
              <Section>
                <h2 className={classNames(sectionH2)}>
                  Code{' '}
                  <span className="relative">
                    <span className="">vs</span>
                    <span className="absolute -inset-x-1 mt-[20px] h-[5px] bg-white" />
                  </span>{' '}
                  <em className="text-green-400">plus</em> Art
                </h2>
                <p className={classNames(sectionP)}>
                  It is not either/or. Create in code, perfect in the browser — best of both worlds.
                </p>
                <Video src="/images/landing-page/code-plus-art.mp4" videoClassName="w-full" controls={false}>
                  Video showing a 3D scene with a flying butterfly whose position/rotation is being controlled by a set
                  of keyframes in a sequence editor.
                </Video>
                <TwoCards>
                  <Card title="Outline" imgUrl="/images/landing-page/outline.png" />
                  <Card title="Property editor" imgUrl="/images/landing-page/property-editor.png" />
                </TwoCards>
              </Section>
              <Section flare={true}>
                <h2 className={classNames(sectionH2)}>
                  Create your own workflow with <span className="text-green-400">extensions</span>
                </h2>
                <p className={classNames(sectionP)}>
                  Theatre.js is extensible. Move the camera around for the perfect shot. Adjust lights. Tweak shaders.
                  With official extensions, or tools of your own.
                </p>
                <Video src="/images/landing-page/extensions.mp4" videoClassName="w-full" controls={false}>
                  Video showing a 3D scene with a flying butterfly whose position/rotation is being controlled by a set
                  of keyframes in a sequence editor.
                </Video>
                <ThreeCards>
                  <Card title="Custom UI" imgUrl="/images/landing-page/custom-ui.png" />
                  <Card title="Custom tools" imgUrl="/images/landing-page/custom-tools.png" />
                  <Card title="Custom workflows" imgUrl="/images/landing-page/custom-workflows.png" />
                </ThreeCards>
                <div className="mt-8 rounded-lg border-t border-b border-r border-neutral-400/10 bg-teal-600 bg-white/5 p-1">
                  <div className="flex flex-col gap-4 rounded p-8 text-lg">
                    <h3 className="font-display text-xl font-bold tracking-tight text-white">
                      Theatre.js works with any stack!
                    </h3>
                    <div className="text-base text-white/80">
                      Have a custom THREE.js setup? Wrote your own WebGPU library? Theatre.js works with all of that.
                      All it does is change JS variables. It is up to you what you do with them.
                    </div>
                  </div>
                </div>
              </Section>
            </div>
            <div className="mt-14 flex justify-center">
              <GetStarted />
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/theatre-js/theatre"
              className="group mt-12 flex flex-col items-start gap-6 rounded-md border-t border-b border-white/5 bg-gradient-to-r from-black to-gray-850 bg-cover bg-clip-border p-8 sm:flex-row"
            >
              <Image src="/images/landing-page/github.png" width={60} height={60} alt="github logo" />
              <div className="flex flex-col gap-2">
                <div className="font-display text-xl font-bold tracking-tight text-white">{stars} GitHub Stars</div>
                <div className="text-base text-white/80 transition-all group-hover:text-white">
                  We are building in the open. Join us in creating the animation tools of the future!{' '}
                  <span className="transition-all group-hover:pl-1 group-hover:text-green-400">&rarr;</span>
                </div>
              </div>
            </a>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1547454426247356417/ZZXsm7Xj_400x400.jpg"
                handle="@karanganesan"
                content={`@theatre_js is the best thing happened to the world of animation on the web since the days of Flash games in the web. Reminds me the “Inventing on principle” talk by @worrydream. Super excited to build things using it.

                  Amazing work @ariaminaei @AndrewPrifer and team.`}
                name="Karan Ganesan"
                src="https://twitter.com/karanganesan/status/1570709671396380672"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1172019003457527808/DzCd_tv6_400x400.jpg"
                handle="@feiss"
                content="These are the kind of things that the web misses from the end of Flash. So happy to see something like this happening.. Thank you, really smart and neat!!"
                name="Diego F. Goberna 🏠"
                src="https://twitter.com/feiss/status/1439941970827296769"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/920692374585643009/BSkAGk-U_400x400.jpg"
                handle="@studioswong"
                content="This looks amazing - reminds me of the good (very) old days into my first foray into 3D with flash (and then later on with Rhino), of course with the exception that this is all ran on the browser 🤯 - another witness to how far the web has come! #ibelieveinweb #webdevelopment"
                name="Susanna Wong"
                src="https://twitter.com/studioswong/status/1457885418066792451"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1527869577564016640/Y0jNbYgz_400x400.jpg"
                handle="@davidhoang"
                content={`Incredible work by the @theatre_js team—one of the best implementations of visual manipulation directly in code.`}
                name="David Hoang"
                src="https://twitter.com/davidhoang/status/1570708216551714816"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1362053856247623680/q23Y_71D_400x400.jpg"
                handle="@0xca0a"
                content="looks like theatrejs was released today 🤩 it's not just any other editor, it links your code to in-app gui tools in a way i haven't seen before."
                name="☄︎"
                src="https://twitter.com/0xca0a/status/1570453173088690181"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1215667226000359429/6Xzyh3z-_400x400.png"
                handle="@GrantCuster"
                content="The approach to bridging code and direct manipulation here is really interesting. Libraries you can add to get GUI tools to generate animations you can then bake into the app."
                name="grant"
                src="https://twitter.com/GrantCuster/status/1570463498433626112"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1571871072370233345/JoKGOxjn_400x400.jpg"
                handle="@seflless"
                content="Theatre.js just launched on Product Hunt, I think we’re about to see their animation tool everywhere! It’ll be in all the cool 3D web demos and general web-based story telling."
                name="Francois Laberge"
                src="https://twitter.com/seflless/status/1570360440441688064"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/1476648722419355650/cQNn0lnw_400x400.jpg"
                handle="@frankgoertzen"
                content='@theatre_js
 reminds me of the early years of the internet, where you could do a "wish search" and sometimes find exactly what you wish existed. #magic'
                name="FRANK"
                src="https://twitter.com/frankgoertzen/status/1535328758835593220"
              />
              <Tweet
                imgSrc="https://pbs.twimg.com/profile_images/939471299931443201/sNFkFAfQ_400x400.jpg"
                handle="@1stfloor"
                content="I can’t remember being so excited for a ‘tool” to be released.
This looks amazing, and I can see amazing things being created with it. Wow!"
                name="Vince"
                src="https://twitter.com/1stfloor/status/1570348973684326400"
              />
            </div>
            <div className="mt-14 flex justify-center">
              <GetStarted />
            </div>
          </div>
        </BasicHeaderMainFooterLayout>
      </MetaWrapper>
    </>
  )
}

const sectionH2 = `text-center font-display text-4xl font-bold tracking-tight text-white`
const sectionP = `mx-auto mt-2 px-6 text-center text-xl font-medium leading-8 text-white/60 max-w-3xl font-normal`
const sectionVideo = `mx-auto mt-8 w-full max-w-5xl`
const videoPlaceholder = 'mx-auto aspect-anamorphic w-full max-w-5xl bg-slate-500 my-8'

export default Page
