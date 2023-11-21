/* eslint-disable react/no-children-prop */
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ClassAttributes, FC, HTMLAttributes } from 'react'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import scheme from 'react-syntax-highlighter/dist/esm/languages/prism/scheme'
import ReactMarkdown, { ExtraProps } from 'react-markdown'
import { useLoaderData } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { parseMarkdownHeaders } from '../util/util'

/* Because we are using prism-light, we need to register the languages we want to use
xml and js seem to be supported out of the box for some unknown reason */
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('scheme', scheme)

type CodeBlockProps = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps

/* If code is detected, show code block with syntax highlighting */
const CodeBlock = (props: CodeBlockProps) => {
  const { children, className, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : undefined /* eg 'xml', 'js', 'jsx', or 'markdown' */
  return match ? (
    <SyntaxHighlighter
      language={language}
      PreTag="div"
      {...rest}
      children={String(children).replace(/\n$/, '')}
      style={materialDark}
      wrapLongLines={true}
      ref={null} /* Override ref because the types are not compatible */
    />
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

export const BlogPost: FC = () => {
  const contentWithMetadata = useLoaderData() as string /* Data is loaded in Router */

  type MarkdownHeaderTags = {
    title: string
    date: string
    tags: string
  }

  const { title } = parseMarkdownHeaders<MarkdownHeaderTags>(contentWithMetadata)

  /* Remove the metadata at the top of the content.  Metadata begins and ends with --- */
  const content = contentWithMetadata.replace(/(---[\s\S]*?)---/, '')

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-center">
        <article className="prose prose-sm prose-slate m-4 md:prose-base lg:prose-lg prose-h2:underline md:m-20">
          <ReactMarkdown children={content} components={{ code: (props) => CodeBlock(props) }} />
        </article>
      </div>
    </>
  )
}
