# Theatre.js website

The website/documentation for [Theatre.js](https://www.theatrejs.com).

Uses [Next.js](https://nextjs.org/docs) and [ContentLayer](https://www.contentlayer.dev/docs).

## Development

Run `$ npm run dev` to start next.

## Deployment

Pushing to the `production` branch will trigger a deploy.

## Hosting videos

We use [mux](https://mux.com) to host our videos. Here is the workflow for adding videos to the website:

Initially just add the file to the `./public` folder and use `<MuxVideoWithFallback>` to play it. During development, the video will be served from the `./public` folder. When deployed, the video will be served from Mux.

To _actually_ upload the video to Mux, run `$ yarn sync-with-mux`. This will upload all videos in the `./public` folder to Mux (unless they're alraedy there) and update the `./src/mux-db.json` file. `<MuxVideoWithFallback>` will then use the Mux URL instead of the local URL.

Note that you'll need to have the `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET` environment variables set for this to work. Ask teammates to get yours. Don't commit these to the repo. Put them in `.env.production.local` so they'll be gitignored.

_TODO: Use Git LFS to store the videos instead of regular git._

## Credits

Credit goes to [@schickling](https://twitter.com/schickling) of [Contentlayer](https://www.contentlayer.dev) for open-sourcing their website 💚
