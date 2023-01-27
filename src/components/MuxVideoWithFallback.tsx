// since we upload all the .mp4 files to the CDN (currently Mux), this component will read from the
// existing db record to get the .mp4 file url and use that as the source for the video element,
// or if that fails, it will fall back to the .mp4 url.
// Make sure to run `yarn sync-with-mux` to upload the .mp4 files to Mux, otherwise we'll serve
// the video from the local server, or when in production, from vercel/netlify, which is not
// cost effective.

import React, { useState, useEffect } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import _db from '../mux-db.json'

const db = _db as Record<string, { playbackId: string }>

export default function MuxVideoWithFallback(props: {
  // the path of the video file, relative to root/public
  path: string
  className?: string
  title: string
  controls: boolean
  autoPlay: boolean
  muted: boolean
  loop: boolean
  playsInline?: boolean
  describedby: string
  poster?: string
}) {
  const dbEntry = db['./public' + props.path]
  if (dbEntry) {
    return (
      <MuxPlayer
        streamType="on-demand"
        className={props.className}
        style={
          {
            '--seek-backward-button': 'none',
            '--seek-forward-button': 'none',
            '--volume-range': 'none',
            '--mute-button': 'none',
            '--playback-rate-button': 'none',
            '--bottom-play-button': 'none',
            ...(props.controls === false ? { '--controls': 'none' } : {}),
          } as any
        }
        // aria-describedby={descriptorId}
        playbackId={dbEntry.playbackId}
        metadata={{
          video_title: props.title,
        }}
        autoPlay={props.autoPlay}
        muted={props.muted}
        loop={props.loop}
        playsInline={props.playsInline}
        poster={props.poster}
      />
    )
  } else {
    return (
      <video
        title={props.title}
        className={props.className}
        src={props.path}
        controls={props.controls}
        autoPlay={props.autoPlay}
        muted={props.muted}
        loop={props.loop}
        playsInline={props.playsInline}
        aria-describedby={props.describedby}
        poster={props.poster}
      />
    )
  }
}
