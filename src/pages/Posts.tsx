const allPosts = [
  {
    id: 1,
    title: '10 Ways Developers can use ChatGPT',
    imageUrl: '/img/ChatGPT_logo.svg',
    date: new Date('10-27-2023'),
  },
  // {
  //   id: 2,
  //   title: 'Another Post!',
  //   imageUrl: null,
  //   date: new Date('10-27-2023'),
  // },
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
              <p className="text-gray-500">{date.toLocaleDateString()}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
