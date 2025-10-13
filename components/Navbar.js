"use client";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "होम", href: "/" }, // सही रूट
    { name: "कविता", href: "/kavita" },
    { name: "कहानी", href: "/kahani" },
    { name: "उपन्यास", href: "/upanyas" },
    { name: "आलोचना", href: "/alochna" },
    { name: "आलेख", href: "/aalekh" },
    { name: "संपादन", href: "/sampadhan" },
    { name: "जीवनी", href: "/jivani" },
    { name: "विविध", href: "/vividh" },
  ];

  return (
    <>
      {/* Top Title Section */}
      <div className="bg-black py-6 text-center border-b border-red-800">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
          हीरालाल नागर
        </h1>
        <p className="text-red-500 font-medium text-lg md:text-xl mt-2">
          कथाकार, आलोचक और कवि
        </p>
      </div>

      {/* Navbar Section */}
      <header className="bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-2 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm md:text-base transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
