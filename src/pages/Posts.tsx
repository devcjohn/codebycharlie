import ReactMarkdown from 'react-markdown'
import { post1 } from '../posts/post1'

export const Posts = () => {
  return (
    <div className="">
      <article className="prose">
        <ReactMarkdown children={post1} />
      </article>
    </div>
  )
}
