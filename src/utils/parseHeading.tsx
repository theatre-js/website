export function parseHeading(text: string): {
  cleanText: string
  api: null | {
    type: '$fn' | '$api'
    base?: string
    identifier: string
    suffix?: string
  }
} {
  const args = text.match(/\$[a-z]*/g) ?? []
  const cleanText = text.replaceAll(/\$[a-z]*/g, '').trim()

  const isFn = args.includes('$fn')
  const isApi = args.includes('$api') || isFn

  const lastDotIndex = cleanText.lastIndexOf('.')
  const base = cleanText.slice(0, lastDotIndex + 1) || undefined
  const afterDot = cleanText.slice(lastDotIndex + 1, cleanText.length)
  const [_, symbol, call] = afterDot.match(/^(\w+)(\W.*)$/) ?? ([undefined, afterDot, undefined] as const)

  return {
    cleanText,
    api: isApi
      ? {
          type: isFn ? '$fn' : '$api',
          base,
          identifier: symbol,
          suffix: call,
        }
      : null,
  }
}
