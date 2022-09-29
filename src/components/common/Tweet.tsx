import { FC, ReactNode } from 'react'
import Image from 'next/image'

export type ITweet = {
  imageSrc?: string
  twitterUser: {
    name: string
    avatarUrl: string
    handler: string
  }
  post: { url: string }
  children: ReactNode
}

export const Tweet: FC<ITweet> = ({ imageSrc, children, twitterUser, post }) => {
  return (
    <div className="mx-auto my-10 max-w-md rounded-xl border border-gray-100 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-950 md:my-16">
      <div className="mb-6 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="my-0 block h-12 rounded-full" src={twitterUser.avatarUrl} alt="Twitter Avatar" />
        <div>
          <div className="leading-tight">{twitterUser.name}</div>
          <div className="leading-tight text-gray-500">@{twitterUser.handler}</div>
        </div>
      </div>
      <span>{children}</span>
      <div>
        <a href={post.url} className="block">
          View on Twitter
        </a>
      </div>
    </div>
  )
}
