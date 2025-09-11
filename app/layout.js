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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Place the Header component at the top of the body */}
        <Navbar />

        {/* The main content of the page will be rendered here */}
        <main>{children}</main>

        {/* Place the Footer component at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
