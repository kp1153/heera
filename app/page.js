// app/page.js   होम पेज
import React from "react";
import { getAllPosts } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">ताज़ा खबरें</h1>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">कोई खबर उपलब्ध नहीं है।</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">ताज़ा खबरें</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {post.mainImage && (
              <div className="relative w-full h-52">
                <Image
                  src={post.mainImage}
                  alt={post.mainImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {post.category?.name || "सामान्य"}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-4 line-clamp-2 leading-tight text-gray-900 hover:text-blue-700 transition-colors">
                <Link
                  href={`/${post.category?.slug?.current}/${post.slug?.current}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.excerpt || "खबर का विवरण उपलब्ध नहीं है।"}
              </p>

              {post.category?.slug?.current && post.slug?.current && (
                <Link
                  href={`/${post.category.slug.current}/${post.slug.current}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline transition-colors"
                >
                  और पढ़ें
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            कोई खबर उपलब्ध नहीं
          </h2>
          <p className="text-gray-600">
            कृपया बाद में फिर से जांचें या अन्य श्रेणियों को देखें।
          </p>
        </div>
      )}
    </div>
  );
}
