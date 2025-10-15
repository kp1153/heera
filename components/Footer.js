// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>
          © 2025 विवेक त्यागी | संपर्क: 97170 44638 | ईमेल:        
        </p>
        <p>
          वेबसाइट Developed by:{" "}
          <a
            href="https://www.web-developer-kp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-red-600 hover:text-white transition-colors duration-200"
          >
            www.web-developer-kp.com
          </a>
        </p>
      </div>
    </footer>
  );
}
