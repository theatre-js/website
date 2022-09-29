import { useRouter } from 'next/router'

export function useCheckGrammar() {
  const router = useRouter()
  if (router.query['grammarly'] != null && router.query['grammarly'] !== '0') {
    console.error(
      'Enabling contentEditable so services like grammarly can check our content. Ignore the following React contentEditable errors.',
    )
    return true
  }

  return false
}
