/* eslint-disable no-useless-escape */
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

//import post1 from '/posts/mdpost.md?raw'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import { FC, useEffect, useState } from 'react'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'

SyntaxHighlighter.registerLanguage('jsx', jsx)
/* xml and js seem to be supported out of the box for some unknown reason */

/* If code is detected, shows code block with syntax highlighting */
const CodeBlock: FC<CodeProps> = ({ className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : undefined /* eg 'xml', 'js', or 'jsx' */
  return language ? (
    <SyntaxHighlighter language={language} PreTag="div" {...props} style={materialDark}>
      {String(children).replace(/\n$/, '')} /* Remove trailing newline */
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export const Posts = () => {
  const [mdContent, setMdContent] = useState('')

  useEffect(() => {
    // Adding a cache-busting query parameter
    fetch(`/posts/mdpost.md`)
      .then((response) => response.text())
      .then((text) => setMdContent(text))
  }, []) // Empty dependency array causes this useEffect to run once on mount

  return (
    <article className="prose lg:prose-lg m-20">
      <ReactMarkdown components={{ code: CodeBlock }}>{mdContent}</ReactMarkdown>
    </article>
  )
}
