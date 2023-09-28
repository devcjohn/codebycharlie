/* eslint-disable no-useless-escape */
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import { FC } from 'react'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import ReactMarkdown from 'react-markdown'

/* Because we are using prism-light, we need to register the languages we want to use
xml and js seem to be supported out of the box for some unknown reason */
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markdown', markdown)

/* If code is detected, show code block with syntax highlighting */
const CodeBlock: FC<CodeProps> = ({ className, children, inline, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : undefined /* eg 'xml', 'js', 'jsx', or 'markdown' */
  return language ? (
    <SyntaxHighlighter
      language={language}
      PreTag="div"
      {...props}
      style={materialDark}
      inline={inline}
      wrapLongLines={true}
    >
      {String(children).replace(/\n$/, '')} /* Remove trailing newline */
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

type Props = {
  mdContent: string
}

export const BlogPost: FC<Props> = ({ mdContent }) => (
  <article className="prose lg:prose-lg m-4 md:m-20 flex flex-col items-center justify-center min-h-screen">
    <ReactMarkdown components={{ code: CodeBlock }}>{mdContent}</ReactMarkdown>
  </article>
)
