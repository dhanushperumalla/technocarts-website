"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import logo from "../assets/logo.png";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import initiativeCardsData from "@/data/initiativeCards.json";
import { CARD_WIDTH, CARD_SPACING } from "@/components/ui/carousel"; // Import both constants
import { BackgroundGradient } from "@/components/ui/background-gradient";
import staffData from "@/data/staffData.json";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import studentsData from "@/data/studentsData.json";
import { SignupFormDemo } from "@/components/ui/NewsletterSignup";
import SocialIcons from "@/components/ui/SocialIcons";

const navItems = [
  {
    name: "Home",
    link: "home", // or you could use "/" if you prefer
  },
  {
    name: "Initiatives",
    link: "initiatives",
  },
  {
    name: "About Us",
    link: "about-us",
  },
];

const words = [
  {
    text: "Welcome",
    className: "text-white",
  },
  {
    text: "to",
    className: "text-white",
  },
  {
    text: "TechnoCrats",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function Home() {
  return (
    <div className="bg-black">
      {/* <-- Hero Section --> */}
      <AuroraBackground className="h-screen" id="home">
        <div className="relative w-full h-screen">
          {/* FloatingNav positioned at the top */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <FloatingNav navItems={navItems} />
          </div>

          {/* Larger logo in top left corner (preserved) */}
          <div className="absolute top-6 left-6 z-40">
            <div className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-xl font-bold text-white backdrop-blur-3xl">
                TechnoCrats
              </span>
            </div>
          </div>

          {/* New 70-30 split layout */}
          <div className="flex h-full">
            {/* Left side: 70% width with welcome message and join button */}
            <div className="w-[70%] flex flex-col items-center justify-center space-y-8">
              <TypewriterEffect words={words} />
              <button
                onClick={() =>
                  document
                    .getElementById("newsletter")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex h-14 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 font-semibold text-white text-lg transition-colors focus:outline-none active:border-0 active:outline-none"
              >
                Join Now
              </button>
            </div>

            {/* Right side: 30% width (empty for now, can be used for additional content) */}
            <div className="w-[50%] flex items-center justify-center">
              <img
                src={logo.src}
                alt="TechnoCrats Logo"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </AuroraBackground>
      {/*  <-- Initiatives Section --> */}
      <div className="min-h-screen bg-slate-900 py-20" id="initiatives">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Initiatives
          </h2>
          <Carousel
            items={initiativeCardsData.map((card, index) => (
              <Card key={index} card={card} index={index} />
            ))}
          />
        </div>
      </div>
      {/*  <-- About US Section --> */}
      <div className=" bg-slate-900 py-20" id="about-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            About Us
          </h2>
          <p className="text-xl text-white text-center mb-5">Staff</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {staffData.map((staff, index) => (
              <BackgroundGradient
                key={index}
                className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900"
              >
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  {staff.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {staff.position}
                </p>
              </BackgroundGradient>
            ))}
          </div>
          <p className="text-xl text-white text-center mb-5 mt-6">
            Association - Students
          </p>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={studentsData} />
          </div>
        </div>
      </div>
      {/*  <-- NewsLetter Section --> */}
      <div className="bg-slate-900 pt-10 pb-20" id="newsletter">
        {" "}
        {/* Changed py-20 to pt-10 pb-20 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 max-w-md">
                Subscribe to our newsletter for the latest updates and
                innovations.
              </p>
            </div>
            <div className="md:w-1/2">
              <SignupFormDemo />
            </div>
          </div>
        </div>
      </div>
      {/*  <-- Footer Section --> */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">TechnoCrats</h2>
              <p className="text-gray-400">
                Empowering innovation through technology
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#initiatives"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Initiatives
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#newsletter"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media and Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <SocialIcons />
              <p className="text-sm text-gray-400 mt-4">
                Stay updated with our latest news and innovations.
              </p>
              <a
                href="#newsletter"
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2024 TechnoCrats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Update the Card component to use Next.js Image component and handle relative paths
const Card = ({ card, index }: { card: any; index: number }) => {
  return (
    <div className="relative w-[300px] h-[500px] rounded-3xl overflow-hidden">
      {" "}
      {/* Increased height to 500px */}
      <Image
        src={card.src.startsWith("/") ? card.src : `/${card.src}`}
        alt={card.title}
        width={300}
        height={500} // Increased height to 500
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end">
        <p className="text-white text-sm font-medium">{card.category}</p>
        <h3 className="text-white text-2xl font-semibold mt-2">{card.title}</h3>
        <p className="text-white text-sm mt-2">{card.content}</p>
      </div>
    </div>
  );
};
