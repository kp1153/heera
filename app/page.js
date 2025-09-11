import { client } from "@/sanity/lib/client";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    "category": category->title
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        नवीनतम लेख
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              श्रेणी: {post.category}
            </p>
            <Link
              href={`/${post.category.toLowerCase()}/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              और पढ़ें →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}