import { FC } from 'react'
import Image from 'next/image'

export const Screenshot: FC<{ src: string; className?: string | ''; alt: string }> = ({ src, alt, className }) => {
  return (
    <div
      className={`not-prose border border-gray-100 dark:border-gray-900/50 ${className} mb-8 mt-4 flex justify-center overflow-hidden border-none`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-lg" src={src} alt={alt} />
    </div>
  )
}
