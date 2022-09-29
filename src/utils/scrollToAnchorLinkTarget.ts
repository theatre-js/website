import { MouseEvent } from 'react'

/**
 * Use smooth scroll to navigate to the target of the link
 * if it's an anchor link.
 */
export default function scrollToAnchorLinkTarget(event: MouseEvent, href: string) {
  event.preventDefault()
  const targetSection = document.getElementById(href.slice(1))
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' })
  }
}
