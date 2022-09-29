import { Post } from 'contentlayer/generated'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

export const BlogHeader: FC<{ post: Post }> = ({ post }) => {
  const [top, setTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="relative flex flex-col items-center pb-16 pt-[24vh] lg:pt-[30vh]">
        <h1
          className="mttext-center relative px-4 text-center font-serif text-6xl font-normal tracking-tight text-gray-800 dark:text-gray-100 md:text-8xl lg:px-16"
          dangerouslySetInnerHTML={{ __html: post.title_formatted }}
        ></h1>

        <p className="max-w-xl py-24 px-4 text-center text-2xl font-semibold tracking-tight lg:px-16">{post.excerpt}</p>

        <Image
          src={post.cover_image.url}
          alt={post.cover_image.alt}
          width={post.cover_image.width}
          height={post.cover_image.height}
          placeholder="blur"
          blurDataURL={post.cover_image.url}
          className="rounded-xl"
        />
      </div>
    </>
  )
}
