import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Initiatives",
    link: "/initiatives",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
];

export const metadata: Metadata = {
  title: "TechnoCrats",
  description: "Empowering innovation through technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FloatingNav navItems={navItems} />
        {children}
      </body>
    </html>
  );
}
