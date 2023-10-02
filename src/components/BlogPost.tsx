import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import { FC } from 'react'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import scheme from 'react-syntax-highlighter/dist/esm/languages/prism/scheme'
import ReactMarkdown from 'react-markdown'
import { useLoaderData } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { parseMarkdownWithYamlFrontmatter } from '../util/util'

/* Because we are using prism-light, we need to register the languages we want to use
xml and js seem to be supported out of the box for some unknown reason */
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('scheme', scheme)

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

export const BlogPost: FC = () => {
  const contentWithMetadata = useLoaderData() as string /* Data is loaded in Router */

  type MarkdownHeaderTags = {
    title?: string
    date?: string
    tags?: string
  }

  const markdownMetadata = parseMarkdownWithYamlFrontmatter<MarkdownHeaderTags>(contentWithMetadata)
  const { title } = markdownMetadata

  /* Remove the metadata at the top of the content.  Metadata begins and ends with --- */
  const content = contentWithMetadata.replace(/(---[\s\S]*?)---/, '')

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-center">
        <article className="prose prose-sm prose-slate m-4 md:prose-base lg:prose-lg prose-h2:underline md:m-20">
          <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
        </article>
      </div>
    </>
  )
}
