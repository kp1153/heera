export default function MagazineLayout({ posts = [], popularPosts = [], categories = [] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">कोई पोस्ट उपलब्ध नहीं है।</p>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const mediumPosts = posts.slice(1, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-8">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 relative bg-gradient-to-r from-blue-500 to-purple-600">
                {featuredPost.image && (
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-8">
                {featuredPost.category && (
                  <span className={`${featuredPost.category.color || 'bg-blue-500'} text-white px-3 py-1 rounded text-sm`}>
                    {featuredPost.category.name}
                  </span>
                )}
                <h2 className="text-4xl font-bold mt-4 mb-3">
                  {featuredPost.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {featuredPost.date}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    पढ़ें →
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Medium Posts - Left Side */}
          <div className="md:col-span-2 space-y-6">
            {mediumPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex gap-4">
                  {post.image && (
                    <div className="w-48 h-32 relative rounded flex-shrink-0 overflow-hidden bg-gray-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {post.category && (
                      <span className={`${post.category.color || 'bg-blue-500'} text-white px-2 py-1 rounded text-xs`}>
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mt-2 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Popular Posts */}
            {popularPosts && popularPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">
                  लोकप्रिय पोस्ट
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className={index < popularPosts.length - 1 ? "border-b pb-3" : "pb-3"}
                    >
                      <h4 className="font-semibold text-sm mb-1 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {post.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">
                  श्रेणियाँ
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.slug} className="flex justify-between">
                      <span className="text-sm hover:text-blue-600 cursor-pointer">
                        {cat.name}
                      </span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}