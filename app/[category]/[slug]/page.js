import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default async function NewsDetailPage({ params }) {
  const { category, slug } = params;

  const categoryMap = {
    home: "होम",
    kavita: "कविता",
    kahani: "कहानी",
    upanyas: "उपन्यास",
    alochna: "आलोचना",
    aalekh: "आलेख",
    sampadhan: "संपादन",
    jivani: "जीवनी",
    vividh: "विविध",
  };

  if (!categoryMap[category]) notFound();

  // Fetch single post from Sanity
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    content,
    "mainImage": mainImage.asset->url,
    _createdAt,
    author->{name}
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          होम
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/${category}`} className="text-blue-600 hover:underline">
          {categoryMap[category]}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-500">{post.title}</span>
      </nav>

      <article className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
            {categoryMap[category]}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
          <span>
            🕐 {new Date(post._createdAt).toLocaleDateString("hi-IN")}
          </span>
          <span>👤 {post.author?.name}</span>
        </div>

        {post.mainImage && (
          <div className="mb-6">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div
          className="prose max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 pt-6 border-t">
          <Link
            href={`/${category}`}
            className="text-blue-600 hover:underline font-medium"
          >
            ← {categoryMap[category]} की और खबरें
          </Link>
        </div>
      </article>
    </div>
  );
}
