const allPosts = [
  {
    /* TODO: Get this info from MD metadata instead of hardcoding it */
    id: 1,
    title: 'ChatGPT For Developers: A Look At 10 Examples',
    imageUrl: '/img/ChatGPT_logo.svg',
    date: '10-30-2023',
  },
]

export const Posts = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
        {allPosts.map(({ id, imageUrl, date, title }) => (
          <a key={title} href={`/posts/${id}`}>
            <div className=" p-6 rounded-lg shadow-md">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 object-contain object-center rounded-md mb-4"
                />
              )}
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-500">{date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
