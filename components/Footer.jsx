export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 px-6 mt-12">
      <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm space-y-2">
        <p>© {currentYear} हीरालाल नागर — सर्वाधिकार सुरक्षित।</p>
        <p>साहित्य की सेवा में समर्पित।</p>
        <div className="pt-2 border-t border-gray-700 mt-4">
          <p className="text-xs text-gray-600">
            Website developed by{" "}
            <a
              href="https://www.web-developer-kp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 font-medium hover:text-red-300 hover:underline transition-all duration-200 cursor-pointer"
            >
              https://www.web-developer-kp.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
