import katex from 'katex'
import React from 'react'

// Simple helper: replace $$...$$ (block) and $...$ (inline) with rendered HTML using KaTeX.
// This is a pragmatic approach for static site content. For more advanced markdown, consider parsing libraries.
export function RenderLatex({ children }:{children:string}) {
  const text = children || ''
  // process block $$...$$ first
  let output = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, eq) => {
    try {
      return katex.renderToString(eq.trim(), { displayMode: true, throwOnError: false })
    } catch {
      return '<code>LaTeX error</code>'
    }
  })
  // inline $...$
  output = output.replace(/\$([^\$\n]+?)\$/g, (_, eq) => {
    try {
      return katex.renderToString(eq.trim(), { displayMode: false, throwOnError: false })
    } catch {
      return '<code>LaTeX error</code>'
    }
  })
  return <span dangerouslySetInnerHTML={{ __html: output }} />
}
