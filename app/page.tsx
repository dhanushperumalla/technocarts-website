"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SignupFormDemo } from "@/components/ui/NewsletterSignup";
import SocialIcons from "@/components/ui/SocialIcons";
import { useState, useCallback } from "react";
import { Boxes } from "@/components/ui/background-boxes";

// Import data
import initiativeCardsData from "@/data/initiativeCards.json";
import staffData from "@/data/staffData.json";
import studentsData from "@/data/studentsData.json";

// Import logo
import logoSrc from "../assets/logo.png";

// Types
interface NavItem {
  name: string;
  link: string;
}

interface Word {
  text: string;
  className: string;
}

interface CardType {
  src: string;
  title: string;
  category: string;
  content: string;
}

interface StaffMember {
  image: string;
  name: string;
  position: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

// Constants
const navItems: NavItem[] = [
  { name: "Home", link: "home" },
  { name: "Initiatives", link: "initiatives" },
  { name: "About Us", link: "about-us" },
];

const words: Word[] = [
  { text: "Welcome", className: "text-white" },
  { text: "to", className: "text-white" },
  { text: "TechnoCrats", className: "text-blue-500 dark:text-blue-500" },
];

// Card Component
const Card = ({ card }: { card: CardType }) => {
  return (
    <div className="relative w-[300px] h-[500px] rounded-3xl overflow-hidden">
      <Image
        src={card.src.startsWith("/") ? card.src : `/${card.src}`}
        alt={card.title}
        fill
        sizes="(max-width: 300px) 100vw, 300px"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end z-10">
        <p className="text-white text-sm font-medium">{card.category}</p>
        <h3 className="text-white text-2xl font-semibold mt-2">{card.title}</h3>
        <p className="text-white text-sm mt-2">{card.content}</p>
      </div>
    </div>
  );
};

// Staff Card Component
const StaffCard = ({ staff }: { staff: StaffMember }) => (
  <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
    <div className="relative w-full h-60 mb-4">
      <Image
        src={staff.image}
        alt={staff.name}
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
      {staff.name}
    </h3>
    <p className="text-neutral-600 dark:text-neutral-400">{staff.position}</p>
  </BackgroundGradient>
);

export default function Home() {
  const [signupStatus, setSignupStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSignupSubmit = useCallback(async (formData: FormData) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupStatus("success");
        setStatusMessage("Successfully subscribed to the newsletter!");
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSignupStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    }
  }, []);

  return (
    <div className="bg-black">
      <AuroraBackground className="h-screen" id="home">
        <div className="relative w-full h-screen">
          <div className="absolute top-0 left-0 right-0 z-50">
            <FloatingNav navItems={navItems} />
          </div>

          <div className="absolute top-6 left-6 z-40">
            <div className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-xl font-bold text-white backdrop-blur-3xl">
                TechnoCrats
              </span>
            </div>
          </div>

          <div className="flex h-full">
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

            <div className="w-[50%] flex items-center justify-center">
              <div className="relative w-full h-[300px]">
                <Image
                  src={logoSrc}
                  alt="TechnoCrats Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>

      <div
        className="min-h-screen py-20 bg-gradient-to-r from-slate-900 to-slate-700"
        id="initiatives"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Initiatives
          </h2>
          <Carousel
            items={initiativeCardsData.map((card: CardType) => (
              <Card key={card.title} card={card} />
            ))}
          />
        </div>
      </div>

      <div
        className="bg-gradient-to-r from-slate-500 to-slate-800 pt-10 pb-20"
        id="about-us"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            About Us
          </h2>
          <p className="text-xl text-white text-center mb-5">Staff</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {staffData.map((staff: StaffMember) => (
              <StaffCard key={staff.name} staff={staff} />
            ))}
          </div>
          <p className="text-xl text-white text-center mb-8 mt-16">
            Association - Students
          </p>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={studentsData} />
          </div>
        </div>
      </div>

      <div
        className="bg-slate-900 pt-10 pb-20 relative overflow-hidden"
        id="newsletter"
      >
        <Boxes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <SignupFormDemo onSubmit={handleSignupSubmit} />
              {statusMessage && (
                <p
                  className={`mt-2 text-${
                    signupStatus === "success" ? "green" : "red"
                  }-500`}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">TechnoCrats</h2>
              <p className="text-gray-400">
                Empowering innovation through technology
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.link}>
                    <a
                      href={`#${item.link}`}
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
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
