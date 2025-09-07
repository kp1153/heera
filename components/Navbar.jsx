export default function Navbar() {
  const navItems = [
    { name: "होम", href: "/" },
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
      {/* Header with Title */}
      <header className="bg-black border-b-2 border-red-800 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-wide">
              हीरालाल नागर
            </h1>
            <p className="text-red-500 font-semibold text-lg md:text-xl uppercase tracking-wider">
              सुपरिचित कथाकार | कवि | आलोचक | संपादक
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            {/* Navigation */}
            <div className="flex space-x-1 w-full justify-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative px-4 py-3 text-gray-300 hover:text-white transition-all duration-300 font-medium text-base"
                >
                  <span>{item.name}</span>

                  {/* Hover effect */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>

                  {/* Active state background */}
                  <span className="absolute inset-0 bg-red-900/20 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-800 border-b border-gray-600 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="flex text-sm text-gray-400" aria-label="Breadcrumb">
            <a
              href="/"
              className="hover:text-red-400 transition-colors duration-200"
            >
              होम
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
