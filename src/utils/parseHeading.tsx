type Heading = {
  // everything before an $api tag.
  // example: "props.stringLiteral$api()" => "props.stringLiteral"
  cleanText: string
  // this would be set if the heading includes the string "$api"
  api: null | {
    type: '$api'
    // example: "props.stringLiteral$api()" => "props"
    base?: string
    // "props.stringLiteral$api()" => "stringLiteral"
    identifier: string
    // "props.stringLiteral$api()" => "()"
    suffix?: string
    // "props.stringLiteral$api()" => true
    // "project.address$api" => false
    isFunction: boolean
  }
}

export function parseHeading(text: string): Heading {
  const args: string[] = text.match(/\$[a-z]*/g) ?? []
  const cleanText = text
    // remove everything after "$api"
    .replaceAll(/\$[a-zA-Z]*/g, '')
    // remove everything after "<tag"
    .replaceAll(/\<.*$/g, '')
    .trim()

  const isApi = args.includes('$api')

  const lastDotIndex = cleanText.lastIndexOf('.')
  const base = cleanText.slice(0, lastDotIndex + 1) || undefined
  const afterDot = cleanText.slice(lastDotIndex + 1, cleanText.length)
  const [_, symbol, call] = afterDot.match(/^(\w+)(\W.*)$/) ?? ([undefined, afterDot, undefined] as const)
  const isFunction = call?.startsWith?.('(') || false

  return {
    cleanText,
    api: isApi
      ? {
          type: '$api',
          base,
          identifier: symbol,
          suffix: call,
          isFunction,
        }
      : null,
  }
}
