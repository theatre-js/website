import { FC, useMemo } from 'react'
import MuxVideoWithFallback from '../MuxVideoWithFallback'

export const Video: FC<{
  src: string
  className?: string | ''
  children: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  type?: 'small' | 'normal'
  videoClassName?: string
}> = ({ src, videoClassName, children, autoplay = true, loop = true, controls = true, className, type }) => {
  const descriptorId = useMemo(() => src.replace(/[^a-zA-Z\d]/g, '-').toLowerCase(), [src])

  return (
    <div className={`not-prose my-8 flex justify-center overflow-hidden ${className ?? ''}`}>
      <MuxVideoWithFallback
        className={videoClassName ?? `w-full rounded-lg border-violet-400`}
        path={src}
        controls={controls}
        autoPlay={autoplay}
        muted
        loop={loop}
        describedby={descriptorId}
        title=""
      />

      <div id={descriptorId} aria-hidden="true" className="hidden">
        {children}
      </div>
    </div>
  )
}
