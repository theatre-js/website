import { globby } from 'globby'
import fs from 'fs'
const Mux = require('@mux/mux-node')
const dotenv = require('dotenv')
dotenv.config()

// make sure mux tokens are set on your .env file
const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env
if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
  throw new Error('Please set your MUX_TOKEN_ID and MUX_TOKEN_SECRET environment variables')
}

const PATH_TO_DB = './src/mux-db.json'

const { Video } = new Mux()

// reads the current db, adds the new data, and writes it back to the db
function setOnDb(filePath: string, muxData: unknown) {
  const db = JSON.parse(fs.readFileSync(PATH_TO_DB, { encoding: 'utf-8' }))
  const newDb = { ...db, [filePath]: muxData }
  fs.writeFileSync(PATH_TO_DB, JSON.stringify(newDb, null, 2))
  return db
}

function getFromDb(filePath: string): unknown {
  const db = JSON.parse(fs.readFileSync(PATH_TO_DB, { encoding: 'utf-8' }))
  return db[filePath]
}

// get a list of all video files in the ./public directory recursively
async function getVideoFiles() {
  const files = await globby(['./public/**/*.{mp4,mov,webm}'])
  return files
}

// a mapping of video files to a base64 encoding of their path, starting from ./public
async function getVideoFilesMap() {
  const files = await getVideoFiles()
  const map = files.reduce((acc, file) => {
    const key = file.replace('./public', '')
    const value = Buffer.from(key).toString('base64')
    return { ...acc, [key]: value }
  }, {})
  return map
}

async function main() {
  const files = await getVideoFiles()
  // const filePathToHash = await getVideoFilesMap()
  // const hashToFilePath = Object.entries(filePathToHash).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {})

  // for each file, check if it's in the db
  // if it's not, upload it to mux and add it to the db
  const listOfFilesToUpload = files.filter((file) => !getFromDb(file))
  if (listOfFilesToUpload.length === 0) {
    console.log('All files are already uploaded to Mux')
    return
  }
  // listOfFilesToUpload.length = 10
  for (const file of listOfFilesToUpload) {
    const upload = await Video.Uploads.create({
      new_asset_settings: { playback_policy: 'public' },
    })
    // The URL you get back from the upload API is resumable, and the file can be uploaded using a `PUT` request (or a series of them).
    console.log('upload', file)

    const readStream = await fs.createReadStream(file)
    await fetch(upload.url, { method: 'PUT', body: readStream as any })
    const updatedUpload = await Video.Uploads.get(upload.id)
    const asset = await Video.Assets.get(updatedUpload['asset_id'])

    const muxData = { playbackId: asset.playback_ids[0].id, uploadId: upload.id, assetId: asset.id }

    setOnDb(file, muxData)
    console.log('uploaded and saved', file, muxData)
  }
}

main()
