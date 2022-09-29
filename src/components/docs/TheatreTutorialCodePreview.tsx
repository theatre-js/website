import { useState } from 'react'

const HTML_TEMPLATE_DEFAULT = `<!DOCTYPE html>
<html>
  <head>
    <title>Theatre.js Example Project</title>
    <style>html, body { margin: 0; font-family: sans-serif; color: white; background: black; }</style>
  </head>
  <body>
<!-- Add HTML here -->

<script type="module">
import 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-and-studio.js'
// Add JavaScript here
</script>
  </body>
</html>`

function dissectAsCodeBlock(target: Element | null | undefined): { source: string; language: string } | null {
  if (!target) return null

  if (target instanceof HTMLPreElement && target.textContent) {
    // using built in remark highlight
    return {
      source: target.textContent,
      language: target.innerHTML.match(/language-([\w-]+)/)?.[1] ?? 'unknown',
    }
  } else if (target.classList.contains('ch-codeblock') || target.classList.contains('ch-codegroup')) {
    // this works at the start of loading (where CodeHike hasn't actually made replacements)
    const lineElts = target.querySelectorAll('.ch-code-scroll-parent > div > div')
    const source = Array.from(lineElts)
      .map((lineElt) => lineElt.textContent)
      .join('\n')

    const result = {
      source,
      // CodeHike does not tell us the language! BOooo...
      language: source.includes('<html>') ? 'html' : source.includes('<script') ? 'html' : 'javascript',
    }

    // console.log('code hike source', result)

    return result
  }
  return null
}

export function TheatreTutorialCodePreview(props: { filename?: string }) {
  const [editor, setEditor] = useState<null | { openHref: string }>(null)

  return (
    <div
      ref={(elt) => {
        if (!elt || editor) return
        let viewSiblingsOfElt = elt as HTMLElement
        while (viewSiblingsOfElt.parentElement instanceof HTMLDetailsElement) {
          viewSiblingsOfElt = viewSiblingsOfElt.parentElement
        }

        let useHTMLTemplate = HTML_TEMPLATE_DEFAULT
        const precedingCodeBlocks: { source: string; language: string }[] = []
        let prevPre = viewSiblingsOfElt?.previousElementSibling
        while (prevPre) {
          const maybeCodeBlock = dissectAsCodeBlock(prevPre)
          if (maybeCodeBlock) {
            if (maybeCodeBlock.source.includes('<!DOCTYPE')) {
              useHTMLTemplate = maybeCodeBlock.source
              // html templates establish the start of all new code section
              break
            }

            precedingCodeBlocks.unshift(maybeCodeBlock)
          }

          prevPre = prevPre.previousElementSibling
        }

        const url = URL.createObjectURL(
          new Blob(
            [
              useHTMLTemplate
                .replace(
                  /\/\/ Add JavaScript here/,
                  precedingCodeBlocks
                    .map((b) => (b.language === 'javascript' ? b.source : `/* ${b.language} */`))
                    .join('\n\n'),
                )
                .replace(
                  /<!-- Add HTML here -->/,
                  precedingCodeBlocks
                    .map((b) => (b.language === 'html' ? b.source : ``))
                    .filter(Boolean) // filter out empty
                    .join('\n\n'),
                ),
            ],
            {
              type: 'text/html',
            },
          ),
        )
        setEditor({
          openHref: url,
        })
      }}
    >
      {editor && (
        <>
          <iframe
            src={editor.openHref}
            // Allow for pointer lock for scrubbing within the iframe
            // See https://www.w3schools.com/tags/att_iframe_sandbox.asp
            sandbox="allow-pointer-lock allow-scripts allow-same-origin"
            style={{
              width: '100%',
              minHeight: '300px',
              border: '2px solid #444',
              borderRadius: '4px',
            }}
          />
          <a href={editor.openHref} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
          &nbsp;
          <a href={editor.openHref} target="_blank" rel="noreferrer" download={props.filename || true}>
            Download
          </a>
        </>
      )}
    </div>
  )
}
