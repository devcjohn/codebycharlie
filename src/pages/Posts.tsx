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
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold">Blog Posts</h1>
        {allPosts.map(({ id, imageUrl, date, title }) => (
          <a key={title} href={`/posts/${id}`}>
            <div className=" rounded-lg p-6 shadow-md">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="mb-4 h-64 w-full rounded-md object-contain object-center"
                />
              )}
              <h2 className="mb-2 text-2xl font-bold">{title}</h2>
              <p className="text-gray-500">{date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
