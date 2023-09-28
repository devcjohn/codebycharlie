import { BlogPost } from '../components/BlogPost'
import post1 from '/posts/post1.md?raw'
//import post2 from '/posts/post2.md?raw'

export const Posts = () => {
  const allPosts = [post1]

  return (
    <div className="flex items-center justify-center min-h-screen">
      {allPosts.map((post) => (
        <BlogPost mdContent={post} />
      ))}
    </div>
  )
}
