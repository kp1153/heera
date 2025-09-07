import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main
        className="
          max-w-7xl mx-auto 
          py-8 sm:py-12 lg:py-16 
          px-4 sm:px-6 lg:px-8
          grid grid-cols-1 md:grid-cols-2 
          gap-8 md:gap-12 lg:gap-16
        "
      >
        {/* Left Column */}
        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {/* Introduction */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              परिचय
            </h2>
            <p className="leading-relaxed text-gray-300 text-sm sm:text-base lg:text-lg">
              सुपरिचित कथाकार। कविता तथा आलोचना में भी दखल।
            </p>
          </section>

          {/* Education & Military */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              शैक्षिक एवं सैन्य पृष्ठभूमि
            </h2>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 leading-relaxed text-sm sm:text-base">
              <li>• स्नातक, संचार अभियांत्रिकी व पत्रकारिता में डिप्लोमा।</li>
              <li>
                • जनवरी, 1972 को भारतीय स्थल सेना (सिग्नल कोर) में प्रवेश।
              </li>
              <li>
                • 24 वर्षों की गरिमापूर्ण सेवा के उपरांत 1996 में सेवामुक्त।
              </li>
              <li>
                • वर्ष 1987 से 1989 तक विदेश सेवा में भारतीय शांति सेना के साथ
                श्रीलंका में।
              </li>
            </ul>
          </section>

          {/* Literary Works */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              साहित्यिक रचनाएँ
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 border-l-2 border-red-700 rounded-lg">
                <h3 className="font-bold text-red-400">कविता संग्रह</h3>
                <p>• 'जंगल के खिलाफ' (1994)</p>
              </div>
              <div className="bg-gray-800 p-4 border-l-2 border-red-700 rounded-lg">
                <h3 className="font-bold text-red-400">कहानी-संग्रह</h3>
                <p>• 'अधूरी हसरतों का अंत' (2004)</p>
                <p>• 'बची हुई रात' (2023)</p>
              </div>
              <div className="bg-gray-800 p-4 border-l-2 border-red-700 rounded-lg">
                <h3 className="font-bold text-red-400">उपन्यास</h3>
                <p>• 'डेक पर अंधेरा' (2013)</p>
              </div>
              <div className="bg-gray-800 p-4 border-l-2 border-red-700 rounded-lg">
                <h3 className="font-bold text-red-400">लघुकथा संग्रह</h3>
                <p>• 'उज्ज्वल परंपरा' (2017)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {/* Biographies & Edited Works */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              जीवनियाँ एवं सम्पादित पुस्तकें
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-red-400">
                  भारतीय ज्ञानपीठ द्वारा प्रकाशित जीवनियाँ:
                </h3>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>सरदार वल्लभ भाई पटेल</li>
                  <li>महात्मा ज्योतिबा फुले</li>
                  <li>मौलाना अबुल कलाम आजाद</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-red-400">सम्पादित पुस्तकें:</h3>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>'कितनी आवाजें' (लघु कथा संग्रह)</li>
                  <li>'सोलह छतों का घर' (कमलेश्वर की चुनिंदा कहानियाँ)</li>
                  <li>'महेश दर्पणः एक शिनाख्त'</li>
                  <li>'कथा साकीबा' (कहानी में समकालीन हस्तक्षेप)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Editorial Work */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              पत्रकारिता एवं संपादकीय कार्य
            </h2>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              समय चेतना, दैनिक भास्कर, अहा जिंदगी, भारतीय ज्ञानपीठ, नया ज्ञानोदय
              के संपादकीय विभाग में वरिष्ठ पदों पर कार्य।
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              सम्प्रतिः{" "}
              <span className="text-red-400 font-semibold">वाणी प्रकाशन</span>{" "}
              के अधीन।
            </p>
          </section>

          {/* Awards */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              पुरस्कार एवं सम्मान
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>• आर्य स्मृति कथा सम्मान</li>
              <li>• शैलेश मटियानी स्मृति कथा सम्मान</li>
              <li>• श्री अरविन्द साहित्य सम्मान</li>
            </ul>
          </section>

          {/* Current Work */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              वर्तमान कार्य
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              स्वतंत्र लेखन, शोध तथा सम्पादन।
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-l-4 border-red-600 pl-4">
              संपर्क
            </h2>
            <div className="bg-black p-6 border border-gray-700 rounded-lg">
              <p className="font-mono text-red-400 mb-2 text-sm sm:text-base">
                📱 9968551414
              </p>
              <p className="font-mono text-red-400 text-sm sm:text-base">
                ✉️ hiralalnagar51@gmail.com
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
