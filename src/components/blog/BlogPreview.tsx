import { Post } from 'contentlayer/generated'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export const BlogPreview: FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className="group block">
        <div className="relative">
          <Image
            src={post.cover_image.url}
            alt={post.cover_image.alt}
            width={post.cover_image.width}
            height={post.cover_image.height}
            placeholder="blur"
            blurDataURL={post.cover_image.url}
            layout="responsive"
            className="rounded-xl"
          />
        </div>
        <div className="relative flex flex-col justify-between pt-3 sm:flex-row sm:items-center md:pt-4">
          <div>
            <span className="mb-2 block text-sm font-medium text-yellow-300">{post.category}</span>
            <h2 className="text-foreground-600 max-w-xl text-h3-mobile font-bold leading-tight md:text-h3-desktop md:leading-tight">
              {post.title}
            </h2>
            <div className="text-foreground-600 mt-2 text-xs tracking-tight md:text-sm">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </div>
          </div>
          <div className="my-3 flex items-center -space-x-1 sm:justify-end md:ml-8 lg:-space-x-2">
            {post.authors.map(({ avatar }, index) => (
              <div
                key={index}
                className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-gray-950 lg:h-8 lg:w-8"
              >
                <Image src={avatar} alt="Avatar" height={100} width={100} />
              </div>
            ))}
          </div>
        </div>
      </a>
    </Link>
  )
}
