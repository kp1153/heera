"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="py-3 text-center border-b border-red-700">
          <Link href="/" className="text-2xl md:text-3xl font-bold">
            इंडियन न्यूज एंड व्यूज
          </Link>
        </div>

        {/* Menu */}
        <div className="flex items-center justify-center gap-3 md:gap-6 py-3 text-sm md:text-base overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-red-200 transition">
            होम
          </Link>

          <Link href="/bharat" className="hover:text-red-200 transition">
            भारत
          </Link>

          <Link href="/vishwa" className="hover:text-red-200 transition">
            विश्व
          </Link>

          <Link href="/rajneeti" className="hover:text-red-200 transition">
            राजनीति
          </Link>        

          <Link href="/vishleshan" className="hover:text-red-200 transition">
            विश्लेषण
          </Link>

          <Link href="/vichar" className="hover:text-red-200 transition">
            विचार
          </Link>

          <Link href="/video" className="hover:text-red-200 transition">
            वीडियो
          </Link>

          <Link href="/waqt-bewaqt" className="hover:text-red-200 transition">
            वक़्त-बेवक़्त
          </Link>
        </div>
      </div>
    </nav>
  );
}