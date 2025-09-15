import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

// Category display names mapping
const getCategoryDisplayName = (route) => {
  const displayNames = {
     kavita: "कविता",
    kahani: "कहानी",
    upanyas: "उपन्यास",
    alochna: "आलोचना",
    aalekh: "आलेख",
    sampadhan: "संपादन",
    jivani: "जीवनी",
    vividh: "विविध",
  };
  return displayNames[route] || route;
};

// Custom components for PortableText
const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-800 leading-relaxed text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 bg-blue-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value).width(1200).height(600).url()}
            alt={value.alt || "Article image"}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
};

export default async function NewsPage({ params }) {
  const { category, slug } = await params;

  const safeCategory = decodeURIComponent(category);
  const safeSlug = decodeURIComponent(slug);

  console.log("Params:", { safeCategory, safeSlug });

  const validCategories = [
    "desh-videsh",
    "pratirodh",
    "jeevan-ke-rang",
    "vividh",
    "kala-sahitya",
    "krishi-maveshi",
  ];

  if (!validCategories.includes(safeCategory)) {
    console.warn("Invalid category:", safeCategory);
    notFound();
  }

  const post = await getPostBySlugAndCategory(safeSlug, safeCategory);
  console.log("Fetched post:", post);

  if (!post) {
    console.warn("Post not found for slug:", safeSlug);
    notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categoryDisplayName = getCategoryDisplayName(safeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              होम
            </Link>
            <span className="text-gray-500">›</span>
            <Link
              href={`/${safeCategory}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {categoryDisplayName}
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700 font-medium">वर्तमान खबर</span>
          </nav>
        </div>

        {/* Category and Date */}
        <div className="flex items-center justify-between mb-6">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {categoryDisplayName}
          </span>
          <span className="text-gray-600 text-sm font-medium">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Main Image */}
        {post.mainImageUrl && (
          <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.mainImageUrl}
              alt={post.mainImageAlt}
              fill
              className="object-cover"
              priority // LCP image
            />
          </div>
        )}

        {/* Image Caption */}
        {post.mainImageCaption && (
          <p className="text-center text-sm text-gray-600 mb-8 italic -mt-4">
            {post.mainImageCaption}
          </p>
        )}

        {/* Content */}
        <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        </article>

        {/* Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${safeCategory}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            और {categoryDisplayName} की खबरें देखें
          </Link>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            होम पेज
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
