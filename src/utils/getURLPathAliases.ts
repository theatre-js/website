import { LATEST_VERSION, LATEST_VERSION_PATH } from 'src/LATEST_VERSION'

/** first item is preferred path */
export function getURLPathAliases(
  doc: { pathSegments?: PathSegment[]; version: string },
  versionPathSegment: string | undefined,
): [string, ...string[]] {
  if (!versionPathSegment) {
    return ['/docs/' + doc.pathSegments?.map((_: PathSegment) => _.pathName).join('/') ?? '']
  }

  const versionPathAliases =
    versionPathSegment === LATEST_VERSION_PATH
      ? [LATEST_VERSION_PATH, LATEST_VERSION]
      : doc.version === LATEST_VERSION
      ? [LATEST_VERSION, LATEST_VERSION_PATH]
      : [doc.version]

  return versionPathAliases.map((versionPathPart) => {
    return '/' + ['docs', versionPathPart, ...(doc.pathSegments?.map((_: PathSegment) => _.pathName) ?? [])].join('/')
  }) as [string, ...string[]]
}
