import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "हीरालाल नागर",
  description: "सुपरिचित कथाकार, कविता तथा आलोचना में भी दखल",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <Navbar />

        {/* Main content (takes available space) */}
        <main className="flex-grow">{children}</main>

        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  );
}
